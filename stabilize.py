from vidstab import VidStab
import sys

input_vid = sys.argv[1]
output_vid = sys.argv[2]

stabilizer = VidStab()
# Use a generous smoothing window (30) for heavy shakes
stabilizer.stabilize(input_path=input_vid, output_path=output_vid, smoothing_window=30, border_type='reflect')
print("Done stabilizing video track.")
