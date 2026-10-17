import re
with open("src/Expert3Ad.tsx", "r") as f: content = f.read()
with open("new_violeta_subs.txt", "r") as f: new_subs = f.read()

content = re.sub(r"const VIOLETA_SUBS = \[.*?\];", new_subs, content, flags=re.DOTALL)
with open("src/Expert3Ad.tsx", "w") as f: f.write(content)
