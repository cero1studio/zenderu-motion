"""Re-time the ORIGINAL voice to the lip timing of an Omni-edited clip (phrase level, pitch preserved).

Omni re-voices speech and its lips follow that new audio. This splits the original voice at real
pauses (>=150 ms), anchors each phrase's start/end to where Omni's audio has it, gently time-stretches
the phrase (atempo, 0.8x-1.25x) and places it. Usage: align2.py orig.mp4 omni.mp4 out.wav [tail_s]
"""
import subprocess, sys
import numpy as np

SR, HOP, OUT_SR = 16000, 160, 48000


def load(path, sr):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(sr), "-f", "s16le", "-"], capture_output=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768


def envelope(x):
    n = len(x) // HOP
    e = np.sqrt((x[:n * HOP].reshape(n, HOP) ** 2).mean(1))
    return np.convolve(20 * np.log10(e + 1e-5), np.ones(3) / 3, "same")


def phrases(env, min_pause=15):
    floor = np.percentile(env, 10)
    speech = env > floor + 6  # low threshold so soft word endings ("-ru", "-mos") are kept
    out, i = [], 0
    while i < len(env):
        if not speech[i]:
            i += 1
            continue
        j, gap = i, 0
        while j < len(env) and gap < min_pause:
            gap = gap + 1 if not speech[j] else 0
            j += 1
        out.append((i, j - gap))
        i = j
    return [(s, e) for s, e in out if e - s >= 10]


def offset(ea, eb, lo, hi, search=40):
    lo, hi = max(0, lo), min(len(ea), hi)
    a = ea[lo:hi]
    best, bk = -2.0, 0
    for k in range(-search, search + 1):
        if lo + k < 0 or hi + k > len(eb):
            continue
        b = eb[lo + k:hi + k]
        r = (np.corrcoef(a, b)[0, 1] if a.std() and b.std() else -1) - 0.002 * abs(k)
        if r > best:
            best, bk = r, k
    return bk


def stretch(x, factor):
    if abs(factor - 1) < 0.01:
        return x
    pcm = (np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes()
    out = subprocess.run(["ffmpeg", "-v", "error", "-f", "s16le", "-ar", str(OUT_SR), "-ac", "1", "-i", "-",
                          "-af", f"atempo={factor:.4f}", "-f", "s16le", "-"], input=pcm, capture_output=True).stdout
    return np.frombuffer(out, np.int16).astype(np.float32) / 32768


def main(orig, omni, out, tail=0.0):
    ea, eb = envelope(load(orig, SR)), envelope(load(omni, SR))
    a = load(orig, OUT_SR)
    H = OUT_SR // 100
    placed, prev_end = [], 0
    for s, e in phrases(ea):
        ns = max(s + offset(ea, eb, s - 5, s + 35), prev_end + 4)
        ne = e + offset(ea, eb, e - 35, e + 5)
        ne = min(max(ne, ns + int((e - s) * 0.8)), ns + int((e - s) * 1.25))
        placed.append((s, e, ns, ne))
        prev_end = ne
    length = max(len(eb) * H, (placed[-1][3] + 8) * H) + int(tail * OUT_SR)
    floor = np.sqrt(np.mean(a[:int(0.2 * OUT_SR)] ** 2)) if len(a) else 0.0
    res = np.convolve(np.random.default_rng(0).normal(0, 1, length).astype(np.float32), np.ones(4) / 4, "same") * min(floor, 0.003)
    fade, m = int(0.015 * OUT_SR), 8
    for s, e, ns, ne in placed:
        src = stretch(a[max(0, (s - m) * H):(e + m) * H], (e - s) / max(1, ne - ns))
        ramp = np.linspace(0, 1, fade)
        src[:fade] *= ramp
        src[-fade:] *= ramp[::-1]
        dst = max(0, (ns - m) * H)
        end = min(length, dst + len(src))
        res[dst:end] += src[:end - dst]
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "s16le", "-ar", str(OUT_SR), "-ac", "1", "-i", "-", out],
                   input=(np.clip(res, -1, 1) * 32767).astype(np.int16).tobytes(), check=True)
    print(out, [(f"{(ns - s) * 10:+d}ms", f"x{(ne - ns) / (e - s):.2f}") for s, e, ns, ne in placed])


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4]) if len(sys.argv) > 4 else 0.0)
