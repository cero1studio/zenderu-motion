import re
with open("src/StellaAd.tsx", "r") as f: content = f.read()
with open("new_stella_subs.txt", "r") as f: new_subs = f.read()

content = re.sub(r"const STELLA_SUBS = \[.*?\];", new_subs, content, flags=re.DOTALL)
with open("src/StellaAd.tsx", "w") as f: f.write(content)
