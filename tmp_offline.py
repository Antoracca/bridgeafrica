import re

with open('c:/Users/HP/BRIGDE/bridgeafrica/components/home/ExploreModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("bg-emerald-400", "bg-slate-300")
content = content.replace("text-emerald-500", "text-slate-400")
content = content.replace("En ligne", "Hors ligne")

with open('c:/Users/HP/BRIGDE/bridgeafrica/components/home/ExploreModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done")
