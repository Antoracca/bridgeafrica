import re

file_path = 'c:/Users/HP/BRIGDE/bridgeafrica/components/home/Navbar.tsx'
with open(file_path, 'rb') as f:
    text = f.read().decode('utf-8', errors='ignore')

replacements = {
    'Ã©': 'é', 'Ã¨': 'è', 'Ãª': 'ê', 'Ã«': 'ë',
    'Ã ': 'à', 'Ã¢': 'â', 'Ã¤': 'ä',
    'Ã®': 'î', 'Ã¯': 'ï',
    'Ã´': 'ô', 'Ã¶': 'ö',
    'Ã¹': 'ù', 'Ã»': 'û', 'Ã¼': 'ü',
    'Ã§': 'ç',
    'Ã‰': 'É', 'Ãˆ': 'È', 'ÃŠ': 'Ê', 'Ã‹': 'Ë',
    'Ã€': 'À', 'Ã‚': 'Â', 'Ã„': 'Ä',
    'ÃŽ': 'Î', 'Ã': 'Ï',
    'Ã”': 'Ô', 'Ã–': 'Ö',
    'Ã™': 'Ù', 'Ã›': 'Û', 'Ãœ': 'Ü',
    'Ã‡': 'Ç',
    'â€™': "'", 'â€œ': '"', 'â€”': '-',
    'â€¢': '•', 'â€“': '-',
    'â• ': '═', 'â•—': '╗',
    'Ǹ': 'é'
}

for k, v in replacements.items():
    text = text.replace(k, v)

# Fix remaining broken patterns common in this file
text = re.sub(r'ǽ\?\?|ǟ\?|\xe2\x80\x9d|\xe2\x82\xac', 'é', text) 
text = re.sub(r'â•[^\s]*\s', '- ', text)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)
print('Fixed encoding on Navbar.tsx')
