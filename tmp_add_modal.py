import re

with open('c:/Users/HP/BRIGDE/bridgeafrica/components/home/Destinations.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
if 'DestinationsModal' not in content:
    content = content.replace("import Link from 'next/link'", "import Link from 'next/link'\nimport { DestinationsModal } from './DestinationsModal'")

# Add state
state_str = r'const \[active, setActive\] = useState\(0\)'
if 'destModalOpen' not in content:
    content = re.sub(state_str, r'const [active, setActive] = useState(0)\n  const [destModalOpen, setDestModalOpen] = useState(false)', content)

# Change link string
link_start = r'<Link\s+href="/liste-pays"\s+className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full\s*bg-slate-900 text-white text-sm font-semibold\s*hover:bg-slate-800 transition-all duration-300 self-start sm:self-auto flex-shrink-0"\s*>'
link_end = r'</Link>'

new_link = """<button
            onClick={() => setDestModalOpen(true)}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                       bg-slate-900 text-white text-sm font-semibold
                       hover:bg-slate-800 transition-all duration-300 self-start sm:self-auto flex-shrink-0"
          >
            Toutes les destinations
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>"""

content = re.sub(link_start + r'.*?' + link_end, new_link, content, flags=re.DOTALL)

# Add modal before closing section
content = content.replace("</section>", "  <DestinationsModal isOpen={destModalOpen} onClose={() => setDestModalOpen(false)} />\n    </section>")

with open('c:/Users/HP/BRIGDE/bridgeafrica/components/home/Destinations.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done")
