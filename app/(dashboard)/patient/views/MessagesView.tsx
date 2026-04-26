"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
    Search, Phone, Video, MoreVertical, Paperclip, Send,
    CheckCircle2, Image as ImageIcon, FileText, Mic, Download
} from "lucide-react"

export function MessagesView() {
    const [activeContact, setActiveContact] = useState(1)

    const contacts = [
        { id: 1, name: "Dr. Fatima El Amrani", role: "Chirurgien Orthopédiste", avatar: "FE", online: true, lastMsg: "Votre IRM est parfaite. On maintient la date." },
        { id: 2, name: "Sarah Coordination", role: "Conciergerie Médicale", avatar: "SC", online: true, lastMsg: "Vos billets sont réservés ! ✈️", unread: 2 },
        { id: 3, name: "Equipe Administrative", role: "Clinique El Manar", avatar: "EA", online: false, lastMsg: "Facture d'acompte envoyée." }
    ]

    const messagesByContact: Record<number, any[]> = {
        1: [
            { id: 1, sender: "doctor", text: "Bonjour Jean-Pierre, j'ai bien reçu votre dernière IRM cervicale.", time: "09:14" },
            { id: 2, sender: "patient", text: "Bonjour Docteur. Tout vous semble correct pour l'opération ?", time: "09:30" },
            { id: 3, sender: "doctor", text: "Oui, c'est parfaitement aligné avec notre plan chirurgical. L'articulation est claire, je n'ai aucune inquiétude. Préparez-vous sereinement pour le voyage.", time: "10:05" },
            { id: 4, sender: "doctor", type: "file", fileName: "Bilan_Pre_Op_Signe.pdf", fileSize: "2.4 MB", time: "10:06" }
        ],
        2: [
            { id: 1, sender: "patient", text: "Bonjour Sarah, avez-vous pu confirmer le vol ?", time: "Hier" },
            { id: 2, sender: "doctor", text: "Bonjour ! Oui, c'est confirmé. Vos billets sont réservés ! ✈️", time: "08:15" },
            { id: 3, sender: "doctor", text: "Je vous envoie le récapitulatif dans un instant.", time: "08:16" }
        ],
        3: [
            { id: 1, sender: "doctor", text: "Bonjour, voici votre facture d'acompte pour l'intervention.", time: "Lundi" },
            { id: 2, sender: "doctor", type: "file", fileName: "Facture_Acompte_001.pdf", fileSize: "1.1 MB", time: "Lundi" },
            { id: 3, sender: "patient", text: "Merci, je procède au virement aujourd'hui.", time: "Lundi" }
        ]
    }

    const activeContactDetails = contacts.find(c => c.id === activeContact) || contacts[0]
    const activeMessages = messagesByContact[activeContact] || []

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="h-[calc(100vh-120px)] bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden flex max-w-7xl mx-auto"
        >
            {/* Left Sidebar - Contacts List */}
            <div className="w-80 border-r border-slate-100 bg-slate-50/50 flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 bg-white">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl font-bold text-slate-900">Messagerie</h2>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 rounded-full bg-slate-100"><MoreVertical className="w-4 h-4" /></Button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input className="pl-9 bg-slate-50 border-transparent focus:border-blue-300 focus:bg-white transition-colors rounded-full text-sm h-10 shadow-inner" placeholder="Rechercher un contact..." />
                    </div>
                </div>

                {/* Contacts */}
                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                    {contacts.map(contact => (
                        <div
                            key={contact.id}
                            onClick={() => setActiveContact(contact.id)}
                            className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${activeContact === contact.id ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-100 text-slate-700'}`}
                        >
                            <div className="relative shrink-0">
                                <Avatar className={`h-12 w-12 border-2 ${activeContact === contact.id ? 'border-white/20' : 'border-white shadow-sm'}`}>
                                    <AvatarFallback className={activeContact === contact.id ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700 font-bold'}>{contact.avatar}</AvatarFallback>
                                </Avatar>
                                {contact.online && <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 rounded-full bg-emerald-500 ${activeContact === contact.id ? 'border-blue-600' : 'border-white'}`} />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className={`font-bold text-sm truncate ${activeContact === contact.id ? 'text-white' : 'text-slate-900'}`}>{contact.name}</h3>
                                    <span className={`text-[10px] ${activeContact === contact.id ? 'text-blue-200' : 'text-slate-400'}`}>10:06</span>
                                </div>
                                <p className={`text-xs truncate ${activeContact === contact.id ? 'text-blue-100' : 'text-slate-500 font-medium'}`}>{contact.lastMsg}</p>
                            </div>
                            {contact.unread && (
                                <div className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-sm">
                                    {contact.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Content - Chat Area */}
            <div className="flex-1 flex flex-col bg-[#F8FAFC]">
                {/* Chat Header */}
                <div className="h-20 border-b border-slate-100 bg-white flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border border-slate-100 shadow-sm">
                            <AvatarFallback className="bg-brand-teal/10 text-brand-teal font-bold">{activeContactDetails.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="font-bold text-slate-900 leading-tight">{activeContactDetails.name}</h2>
                            <p className={`text-xs font-medium flex items-center gap-1 ${activeContactDetails.online ? 'text-emerald-600' : 'text-slate-400'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full inline-block ${activeContactDetails.online ? 'bg-emerald-500' : 'bg-slate-400'}`} /> {activeContactDetails.online ? 'En ligne' : 'Hors ligne'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full"><Phone className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full"><Video className="w-4 h-4" /></Button>
                        <div className="w-px h-6 bg-slate-200 mx-2" />
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"><Search className="w-4 h-4" /></Button>
                    </div>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="text-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-200/50 px-3 py-1 rounded-full">Aujourd'hui</span>
                    </div>

                    {activeMessages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex gap-3 max-w-[70%] ${msg.sender === 'patient' ? 'flex-row-reverse' : 'flex-row'}`}>

                                {msg.sender === 'doctor' && (
                                    <Avatar className="h-8 w-8 shrink-0 mt-auto border border-white shadow-sm">
                                        <AvatarFallback className="bg-brand-teal/10 text-[10px] font-bold text-brand-teal">{activeContactDetails.avatar}</AvatarFallback>
                                    </Avatar>
                                )}

                                <div>
                                    <div className={`p-4 rounded-2xl shadow-sm ${msg.sender === 'patient'
                                        ? 'bg-blue-600 text-white rounded-br-sm'
                                        : 'bg-white border border-slate-100 text-slate-800 rounded-bl-sm'
                                        }`}>
                                        {msg.type === 'file' ? (
                                            <div className="flex items-center gap-3 bg-slate-50 p-2 border border-slate-100 rounded-xl w-64 hover:bg-slate-100 cursor-pointer transition-colors">
                                                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"><FileText className="w-5 h-5" /></div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-bold text-sm text-slate-900 truncate">{msg.fileName}</p>
                                                    <p className="text-xs text-slate-500">{msg.fileSize} • PDF</p>
                                                </div>
                                                <Download className="w-4 h-4 text-slate-400 mr-2" />
                                            </div>
                                        ) : (
                                            <p className="text-[15px] leading-relaxed">{msg.text}</p>
                                        )}
                                    </div>
                                    <div className={`flex items-center gap-1 mt-1 text-[11px] font-medium text-slate-400 ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.time}
                                        {msg.sender === 'patient' && <CheckCircle2 className="w-3 h-3 text-blue-500 ml-1" />}
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat Input Area */}
                <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                    <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-3xl p-2 shadow-inner">
                        <div className="flex gap-1 shrink-0 pb-1">
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500 rounded-full hover:bg-slate-200"><Paperclip className="w-5 h-5" /></Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500 rounded-full hover:bg-slate-200"><ImageIcon className="w-5 h-5" /></Button>
                        </div>

                        <textarea
                            className="flex-1 max-h-32 min-h-[44px] bg-transparent border-none resize-none px-3 py-3 text-[15px] outline-none placeholder:text-slate-400 text-slate-800"
                            placeholder={`Écrivez votre message à ${activeContactDetails.name}...`}
                            rows={1}
                        />

                        <div className="flex gap-1 shrink-0 pb-1 pr-1">
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500 rounded-full hover:bg-slate-200"><Mic className="w-5 h-5" /></Button>
                            <Button className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all scale-95 hover:scale-100">
                                <Send className="w-4 h-4 ml-0.5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </motion.div>
    )
}
