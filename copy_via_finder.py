import subprocess
import os

src_dir = os.path.abspath("ads_aprobados")
dest_dir = os.path.expanduser("~/Library/CloudStorage/GoogleDrive-javier@cerouno.digital/Mi unidad/Zenderu_Marketing_Ads")

items = os.listdir(src_dir)
print(f"Copying {len(items)} items via Finder...")

for item in sorted(items):
    if item.startswith('.'):
        continue
    item_path = os.path.join(src_dir, item)
    print(f"-> Copying {item}...")
    apple_script = f'''
    tell application "Finder"
        set srcItem to POSIX file "{item_path}" as alias
        set destFolder to POSIX file "{dest_dir}" as alias
        duplicate srcItem to destFolder with replacing
    end tell
    '''
    subprocess.run(["osascript", "-e", apple_script], check=True)

print("All items copied via Finder successfully!")
