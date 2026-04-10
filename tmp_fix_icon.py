import re

filepath = 'c:/Users/HP/BRIGDE/bridgeafrica/app/destinations/maroc/page.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('Microscopic', 'Microscope')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fix applied")
