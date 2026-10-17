"""Background-tracked stabilization (needs opencv-python-headless + numpy; ffmpeg on PATH).

Tracks features only on the background (top band + side strips, not the talking person), smooths
the camera path with a gaussian, warps each frame and crops slightly. Keeps the original audio.
Usage: stabilize.py in.mp4 out.mp4 [smooth_seconds=2] [zoom=1.08, 0=auto]
  smooth 10 + zoom 0  ~= tripod lock (auto crop, capped at 18%)
"""
import subprocess, sys
import cv2
import numpy as np

src, dst = sys.argv[1], sys.argv[2]
SMOOTH_S = float(sys.argv[3]) if len(sys.argv) > 3 else 2.0
ZOOM = float(sys.argv[4]) if len(sys.argv) > 4 else 1.08

info = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v", "-show_entries",
                       "stream=width,height,r_frame_rate:stream_side_data=rotation", "-of", "default=noprint_wrappers=1", src],
                      capture_output=True, text=True).stdout
d = dict(l.split("=", 1) for l in info.split() if "=" in l)
num, den = map(int, d["r_frame_rate"].split("/"))
FPS = num / den
W, H = int(d["width"]), int(d["height"])
if abs(int(float(d.get("rotation", 0)))) in (90, 270):  # phone video: ffmpeg autorotates on decode
    W, H = H, W


def frames(w, h, gray):
    p = subprocess.Popen(["ffmpeg", "-v", "error", "-i", src, "-vf", f"scale={w}:{h}", "-f", "rawvideo", "-pix_fmt",
                          "gray" if gray else "bgr24", "-"], stdout=subprocess.PIPE)
    n = w * h * (1 if gray else 3)
    while (buf := p.stdout.read(n)) and len(buf) == n:
        yield np.frombuffer(buf, np.uint8).reshape((h, w) if gray else (h, w, 3))


mask = np.zeros((H, W), np.uint8)
mask[: int(H * 0.16), :] = 255
mask[: int(H * 0.75), : int(W * 0.12)] = 255
mask[: int(H * 0.60), int(W * 0.88):] = 255

traj, prev = [np.zeros(4)], None
for g in frames(W, H, True):
    if prev is not None:
        step = np.zeros(4)
        pts = cv2.goodFeaturesToTrack(prev, 600, 0.005, 10, mask=mask)
        if pts is not None and len(pts) >= 8:
            pts = cv2.cornerSubPix(prev, pts, (5, 5), (-1, -1), (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.01))
            nxt, st, _ = cv2.calcOpticalFlowPyrLK(prev, g, pts, None, winSize=(21, 21), maxLevel=3)
            ok = st.ravel() == 1
            if ok.sum() >= 8:
                m, _ = cv2.estimateAffinePartial2D(pts[ok], nxt[ok], method=cv2.RANSAC, ransacReprojThreshold=1.5)
                if m is not None:
                    step = np.array([m[0, 2], m[1, 2], np.arctan2(m[1, 0], m[0, 0]), np.log(np.hypot(m[0, 0], m[1, 0]))])
        traj.append(traj[-1] + step)
    prev = g
traj = np.array(traj)

sig = max(1.0, SMOOTH_S * FPS)
k = np.arange(-int(3 * sig), int(3 * sig) + 1)
kern = np.exp(-0.5 * (k / sig) ** 2)
kern /= kern.sum()
pad = np.pad(traj, ((len(k) // 2, len(k) // 2), (0, 0)), mode="edge")
corr = np.stack([np.convolve(pad[:, i], kern, "valid") for i in range(4)], 1) - traj
if ZOOM == 0:
    ZOOM = min(1.18, 1 + 2 * max(np.abs(corr[:, 0]).max() / W, np.abs(corr[:, 1]).max() / H) / 0.9 + 0.01)
mx, my = (ZOOM - 1) * W / 2 * 0.9, (ZOOM - 1) * H / 2 * 0.9
corr[:, 0] = np.clip(corr[:, 0], -mx, mx)
corr[:, 1] = np.clip(corr[:, 1], -my, my)
corr[:, 2:] = np.clip(corr[:, 2:], -0.02, 0.02)
print(f"{len(traj)} frames {W}x{H} @ {FPS:.2f}fps, zoom {ZOOM:.3f}")

enc = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", f"{num}/{den}",
                        "-i", "-", "-i", src, "-map", "0:v", "-map", "1:a?", "-c:v", "libx264", "-crf", "17", "-preset", "slow",
                        "-pix_fmt", "yuv420p", "-c:a", "copy", "-shortest", "-movflags", "+faststart", dst], stdin=subprocess.PIPE)
for i, f in enumerate(frames(W, H, False)):
    dx, dy, da, ds = corr[min(i, len(corr) - 1)]
    m = cv2.getRotationMatrix2D((W / 2, H / 2), np.degrees(-da), ZOOM * np.exp(ds))  # cv2 angle sign is opposite
    m[:, 2] += (dx, dy)
    enc.stdin.write(cv2.warpAffine(f, m, (W, H), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_REFLECT).tobytes())
enc.stdin.close()
enc.wait()
print("saved", dst)
