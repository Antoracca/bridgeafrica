import re

with open('c:/Users/HP/BRIGDE/bridgeafrica/components/home/ExploreModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace the AI CTA Banner section
cta_start = r"\{/\* ── AI CTA Banner ──────────────────────────── \*/\}"
cta_end = r"                </AnimatePresence>\n              </div>"

def replace_cta(match):
    return """{/* ── AI CTA Banner ──────────────────────────── */}
              <div className="px-6 pb-4">
                <div className="space-y-2.5">
                  {/* AI invite button — design épuré */}
                  <button
                    onClick={() => setAiMode(true)}
                    className="group w-full flex items-center gap-3.5 px-4 py-3 bg-white border border-slate-200 hover:border-violet-200 hover:shadow-[0_2px_16px_-4px_rgba(139,92,246,0.15)] transition-all duration-300 text-left"
                  >
                    {/* ia.png avatar */}
                    <div className="relative w-9 h-9 shrink-0">
                      <Image
                        src="/ia.png"
                        alt="IA"
                        width={36}
                        height={36}
                        className="w-9 h-9 object-cover rounded-full shadow-sm"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.18em] leading-none mb-0.5">
                        IA MediBridge
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        Décrivez votre situation, je vous guide vers les meilleures options
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[9px] font-bold text-violet-400 uppercase tracking-wider hidden sm:block">
                        Demander
                      </span>
                      <ArrowRight size={14} className="text-violet-400 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </button>

                  {/* Regular search bar */}
                  <div className="relative flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 h-10 focus-within:border-brand-teal focus-within:bg-white transition-all">
                    <Search size={14} className="text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      placeholder="Recherche rapide — clinique, pays, spécialité..."
                      className="flex-1 bg-transparent outline-none text-[12px] text-slate-800 placeholder:text-slate-400"
                      autoFocus
                    />
                    {query && (
                      <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
                        <X size={13} />
                      </button>
                    )}
                  </div>
                </div>
              </div>"""

content = re.sub(cta_start + r".*?" + cta_end, replace_cta, content, flags=re.DOTALL)

# 2. Remove !aiMode && from tabs
content = content.replace("{/* Tabs — masqués en mode IA */}\n              {!aiMode && (", "{/* Tabs */}\n              {(")
content = content.replace("{/* Tabs — masqués en mode IA */}\n              {!aiMode && (", "{/* Tabs */}\n              (true && (")

# 3. Delete AI Mode placeholder
placeholder_start = r"\{/\* ── AI mode: placeholder ─────────────────── \*/\}"
placeholder_end = r"                </motion\.div>\n              \)}"
content = re.sub(placeholder_start + r".*?" + placeholder_end, "{/* Old AI Placeholder removed */}", content, flags=re.DOTALL)

# 4. Remove !aiMode && from Content Tabs
content = content.replace("{/* ═══ TABS CONTENT (masqué en mode IA) ═══════ */}\n              {!aiMode && activeTab === 'clinics' && (", "{/* ═══ TABS CONTENT ═══════ */}\n              {activeTab === 'clinics' && (")
content = content.replace("{!aiMode && activeTab === 'specialties' && (", "{activeTab === 'specialties' && (")
content = content.replace("{!aiMode && activeTab === 'services' && (", "{activeTab === 'services' && (")

# 5. Blur Explore modal on aiMode
content = content.replace("""          {/* Panel — slides from right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full sm:w-[540px] md:w-[620px] lg:w-[680px] bg-white z-[91] flex flex-col shadow-2xl"
          >
""", 
"""          {/* Panel — slides from right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 right-0 h-full w-full sm:w-[540px] md:w-[620px] lg:w-[680px] bg-white z-[91] flex flex-col shadow-2xl ${aiMode ? 'overflow-hidden' : ''}`}
          >
            <motion.div 
              animate={{ opacity: aiMode ? 0 : 1, filter: aiMode ? 'blur(8px)' : 'blur(0px)', scale: aiMode ? 0.98 : 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col h-full pointer-events-auto"
              style={{ pointerEvents: aiMode ? 'none' : 'auto' }}
            >
""")


# 6. Add Overlay before final `</motion.div>\n        </>\n      )}`
overlay = """              </div>
            </div>
            </motion.div>

            {/* ── AI FULL-PANEL OVERLAY ───────────────────── */}
            <AnimatePresence>
              {aiMode && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.02, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-50 bg-white flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.1)]"
                >
                  {/* AI Dedicated Header */}
                  <div className="shrink-0 flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 bg-white/80 backdrop-blur-md">
                    <button
                      onClick={() => setAiMode(false)}
                      className="group flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 hover:text-brand-teal transition-colors"
                    >
                      <CornerDownLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
                      Retour
                    </button>
                    <div className="flex items-center gap-2.5">
                      <div className="relative shrink-0">
                        <Image src="/ia.png" alt="IA" width={28} height={28} className="w-7 h-7 object-cover rounded-full shadow-sm" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border-[1.5px] border-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.2em] leading-none mb-0.5">
                          IA MediBridge
                        </p>
                        <p className="text-[8px] text-emerald-500 font-bold tracking-widest uppercase">
                          En ligne
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => { setAiMode(false); onClose() }}
                      className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  {/* AI Body (Scrollable) */}
                  <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center bg-slate-50/50" style={{ scrollbarWidth: 'thin' }}>
                    <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[400px]">
                        <div className="relative mb-6">
                        <div className="relative w-20 h-20">
                            <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-violet-100 to-blue-50 opacity-80" />
                            <Image src="/ia.png" alt="IA MediBridge" width={80} height={80} className="relative w-20 h-20 rounded-full object-cover shadow-lg shadow-violet-100/50" />
                            <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
                        </div>
                        </div>

                        <p className="text-[9px] font-bold text-brand-teal uppercase tracking-[0.3em] mb-3">
                        Assistant Intelligent
                        </p>
                        <h3 className="text-[24px] text-slate-900 leading-snug tracking-tight mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>
                        Votre conseiller médical personnel
                        </h3>
                        <p className="text-[13px] text-slate-500 leading-relaxed max-w-[320px] text-center mb-10">
                        Décrivez votre situation en langage naturel. Notre IA analysera votre demande pour vous orienter vers les meilleures options du réseau.
                        </p>

                        <div className="w-full max-w-sm space-y-2.5">
                        {[
                            { label: 'Recommandation', desc: 'Orientation clinique selon pathologie, budget et pays' },
                            { label: 'Comparaison', desc: 'Analyse d\\'expertise médicale et des accréditations' },
                            { label: 'Estimation', desc: 'Génération de devis tout compris et logistique' },
                        ].map((cap, i) => (
                            <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            className="flex items-start gap-3.5 px-5 py-4 bg-white border border-slate-150 shadow-sm hover:border-brand-teal/30 transition-colors"
                            >
                            <div className="relative w-4 h-4 shrink-0 mt-0.5">
                                <div className="absolute inset-0 rotate-45 border border-brand-teal/30 bg-brand-teal/8" />
                                <div className="absolute inset-[3.5px] rotate-45 bg-brand-teal/60" />
                            </div>
                            <div>
                                <p className="text-[12px] font-bold text-slate-900 leading-none mb-1">{cap.label}</p>
                                <p className="text-[11px] text-slate-500 leading-relaxed">{cap.desc}</p>
                            </div>
                            </motion.div>
                        ))}
                        </div>
                    </div>
                  </div>

                  {/* AI Input Fixed Bottom */}
                  <div className="shrink-0 bg-white border-t border-slate-150 p-5 sm:px-6 sm:pb-6 sm:pt-4">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-2.5 ml-1">
                      Suggestions rapides
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {AI_PROMPTS.slice(0, 3).map(p => (
                        <button
                          key={p}
                          onClick={() => setAiQuery(p)}
                          className="text-[10px] font-medium text-slate-600 border border-slate-200 bg-white px-3 py-1.5 hover:border-violet-200 hover:text-violet-600 hover:bg-violet-50 transition-colors text-left"
                        >
                          {p}
                        </button>
                      ))}
                    </div>

                    <div className="relative bg-slate-50 border border-slate-200 focus-within:border-brand-teal focus-within:bg-white focus-within:shadow-[0_4px_20px_-6px_rgba(72,156,140,0.15)] transition-all">
                      <textarea
                        ref={aiInputRef}
                        value={aiQuery}
                        onChange={e => setAiQuery(e.target.value)}
                        placeholder="Ex : Je cherche une clinique pour un BBL à Istanbul, budget 4 000 €..."
                        rows={2}
                        className="w-full bg-transparent text-[13px] text-slate-800 placeholder:text-slate-400 outline-none resize-none px-4 py-3.5 leading-relaxed"
                      />
                      <div className="flex justify-between items-center px-4 pb-3 pt-1">
                        <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                          <CornerDownLeft size={10} /> Connexion API en cours
                        </span>
                        <button
                          disabled
                          className="h-8 px-4 flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-brand-teal transition-colors disabled:opacity-40 disabled:bg-slate-200 disabled:text-slate-400 font-bold text-[10px] uppercase tracking-wider"
                        >
                          Analyser <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>"""

content = content.replace("              </div>\n            </div>\n          </motion.div>", overlay)

with open('c:/Users/HP/BRIGDE/bridgeafrica/components/home/ExploreModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement Complete")
