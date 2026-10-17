import re

def get_bounds(path_d):
    coords = map(float, re.findall(r'-?\d+\.\d+|-?\d+', path_d))
    coords = list(coords)
    if not coords: return (0,0,0,0)
    # This is a naive way to get min/max X and Y (assuming pairs)
    # Since paths contain commands, it's not perfect but a good proxy.
    xs = [coords[i] for i in range(len(coords)) if i % 2 == 0]
    ys = [coords[i] for i in range(len(coords)) if i % 2 == 1]
    return min(xs), max(xs), min(ys), max(ys)

import sys
d = sys.stdin.read()
paths = d.split('M')
for i, p in enumerate(paths):
    if not p.strip(): continue
    x0, x1, y0, y1 = get_bounds(p)
    print(f"Path {i}: X: {x0:.1f} to {x1:.1f}, Y: {y0:.1f} to {y1:.1f}, W: {x1-x0:.1f}, H: {y1-y0:.1f}")
