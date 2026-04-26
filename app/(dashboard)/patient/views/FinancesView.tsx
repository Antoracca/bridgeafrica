"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  CreditCard, Download, ArrowDownRight,
  Wallet, Receipt, CheckCircle2,
  ArrowLeft, Building2, Lock, Tag, ChevronDown, Copy, Check
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

type Screen = 'overview' | 'payment'
type PaymentTab = 'card' | 'sepa' | 'installments'

// ─── Animation variants ───────────────────────────────────────────────────────
// dir=1  → going forward (overview→payment): old slides left, new comes from right
// dir=-1 → going back   (payment→overview): old slides right, new comes from left

const SLIDE = {
  enter: (dir: number) => ({
    x: dir * 70,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.38, ease: [0.32, 0.72, 0, 1] },
  },
  exit: (dir: number) => ({
    x: dir * -70,
    opacity: 0,
    transition: { duration: 0.28, ease: [0.32, 0.72, 0, 1] },
  }),
}

// ─── Inline payment brand logos ───────────────────────────────────────────────

function LogoVisa() {
  return (
    <div className="flex items-center justify-center border border-slate-200 rounded bg-white px-2" style={{ height: 26, minWidth: 42 }}>
      <span className="font-black italic text-[#1A1F71] text-[13px]" style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '-0.5px' }}>VISA</span>
    </div>
  )
}

function LogoMastercard() {
  return (
    <div className="flex items-center justify-center border border-slate-200 rounded bg-white px-1" style={{ height: 26, minWidth: 42 }}>
      <svg width="30" height="19" viewBox="0 0 30 19" fill="none">
        <circle cx="10.5" cy="9.5" r="9.5" fill="#EB001B" />
        <circle cx="19.5" cy="9.5" r="9.5" fill="#F79E1B" />
        <path d="M15 2.1a9.5 9.5 0 0 1 0 14.8A9.5 9.5 0 0 1 15 2.1z" fill="#FF5F00" />
      </svg>
    </div>
  )
}

function LogoMaestro() {
  return (
    <div className="flex items-center justify-center border border-slate-200 rounded bg-white px-1" style={{ height: 26, minWidth: 42 }}>
      <svg width="30" height="19" viewBox="0 0 30 19" fill="none">
        <circle cx="10.5" cy="9.5" r="9.5" fill="#0099DF" />
        <circle cx="19.5" cy="9.5" r="9.5" fill="#ED0006" />
        <path d="M15 2.1a9.5 9.5 0 0 1 0 14.8A9.5 9.5 0 0 1 15 2.1z" fill="#7673C0" />
      </svg>
    </div>
  )
}

function LogoCB() {
  return (
    <div className="flex items-center justify-center rounded px-2" style={{ height: 26, minWidth: 42, background: '#0D5AA7' }}>
      <span className="text-white font-black text-[11px]" style={{ fontFamily: 'Arial, sans-serif' }}>CB</span>
    </div>
  )
}

function LogoAmex() {
  return (
    <div className="flex items-center justify-center rounded px-2" style={{ height: 26, minWidth: 42, background: '#2E77BC' }}>
      <span className="text-white font-bold text-[9px] tracking-tight" style={{ fontFamily: 'Arial, sans-serif' }}>AMEX</span>
    </div>
  )
}

function LogoApplePay() {
  return (
    <div className="flex items-center justify-center border border-slate-200 rounded bg-black px-2 gap-1" style={{ height: 26, minWidth: 54 }}>
      <svg width="10" height="12" viewBox="0 0 10 12" fill="white">
        <path d="M8.29 6.37c-.01-1.2.98-1.78 1.03-1.81C8.7 3.1 7.56 2.95 7.16 2.93c-.93-.1-1.83.55-2.3.55-.48 0-1.2-.54-1.98-.52-1 .01-1.94.59-2.45 1.48C-.7 6.08.1 9.13 1.14 10.72c.52.74 1.12 1.57 1.92 1.54.77-.03 1.06-.5 2-.5.93 0 1.19.5 2 .48.83-.01 1.35-.75 1.85-1.5.59-.85.83-1.68.84-1.73-.02-.01-1.45-.56-1.46-2.14z"/>
        <path d="M6.58.75C7.03.2 7.33-.5 7.25-1.2c-.67.03-1.49.45-1.96 1C4.84.3 4.5 1.01 4.59 1.7c.74.06 1.5-.37 1.99-1z"/>
      </svg>
      <span className="text-white font-semibold text-[10px]" style={{ fontFamily: '-apple-system, sans-serif' }}>Pay</span>
    </div>
  )
}

function LogoGooglePay() {
  return (
    <div className="flex items-center justify-center border border-slate-200 rounded bg-white px-2 gap-0.5" style={{ height: 26, minWidth: 54 }}>
      <span className="font-bold text-[11px]" style={{ color: '#4285F4', fontFamily: 'Arial, sans-serif' }}>G</span>
      <span className="font-semibold text-[11px] text-slate-700" style={{ fontFamily: 'Arial, sans-serif' }}>Pay</span>
    </div>
  )
}

function StripeBadge() {
  return (
    <div className="flex items-center gap-1.5">
      <Lock className="w-3 h-3 text-slate-400" />
      <span className="text-[11px] text-slate-400 font-medium">Sécurisé par</span>
      <span className="font-black text-[12px]" style={{ color: '#635BFF' }}>stripe</span>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FinancesView() {
  const [screen, setScreen] = useState<Screen>('overview')
  const [dir, setDir] = useState(1)
  const [paymentTab, setPaymentTab] = useState<PaymentTab>('card')
  const [promoOpen, setPromoOpen] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [cardNum, setCardNum] = useState('')
  const [copied, setCopied] = useState(false)
  const [selectedInstallment, setSelectedInstallment] = useState(0)

  const stats = [
    { label: "Reste à payer", valueEur: "3 500 €", valueMad: "37 500 MAD", icon: Wallet, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Total payé", valueEur: "1 500 €", valueMad: "16 000 MAD", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Devis Initial", valueEur: "5 000 €", valueMad: "53 500 MAD", icon: Receipt, color: "text-brand-teal", bg: "bg-brand-teal/10" },
  ]

  const transactions = [
    { id: 1, type: "Facture d'acompte", amountEur: "1 500 €", amountMad: "16 000 MAD", date: "15 Avril 2026", status: "Payé", ref: "FAC-26-04-092", icon: ArrowDownRight, color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: 2, type: "Intervention Chirurgicale (Solde)", amountEur: "3 500 €", amountMad: "37 500 MAD", date: "À venir", status: "À régler", ref: "DEV-BA-26-991", icon: Receipt, color: "text-amber-500", bg: "bg-amber-50" },
  ]

  const installments = [
    { label: '3 mensualités', amount: '1 166,67 €', total: '3 500,00 €', badge: 'Sans frais', highlight: true },
    { label: '6 mensualités', amount: '606,25 €',   total: '3 637,50 €', badge: '+3,9 % TAEG', highlight: false },
    { label: '12 mensualités', amount: '318,75 €',  total: '3 825,00 €', badge: '+9,3 % TAEG', highlight: false },
  ]

  const goToPayment = () => { setDir(1); setScreen('payment') }
  const goBack      = () => { setDir(-1); setScreen('overview') }

  const formatCard = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

  const copyIBAN = async () => {
    await navigator.clipboard.writeText('FR76 3000 4000 5000 1234 5678 901')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const payLabel =
    paymentTab === 'sepa'         ? 'Confirmer le virement'
    : paymentTab === 'installments' ? `Souscrire · ${installments[selectedInstallment].amount} / mois`
    : 'Payer maintenant · 3 500,00 €'

  // ── LABEL helper ────────────────────────────────────────────────────────────
  const Label = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.18em] mb-2">{children}</p>
  )

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-5xl mx-auto overflow-hidden">
      <AnimatePresence mode="wait" custom={dir}>

        {/* ════════════════════ OVERVIEW SCREEN ════════════════════ */}
        {screen === 'overview' && (
          <motion.div
            key="overview"
            custom={dir}
            variants={SLIDE}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6 lg:space-y-8"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">Finances & Comptabilité</h1>
                <p className="text-slate-500 font-medium">Gérez vos paiements, factures et téléchargez vos justificatifs.</p>
              </div>
              <Button onClick={goToPayment} className="bg-brand-teal hover:bg-brand-teal-dark text-white rounded-full px-6 shadow-md transition-all">
                <CreditCard className="w-4 h-4 mr-2" /> Effectuer un paiement
              </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white border md:border-transparent border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                  <div className="relative z-10 flex flex-col gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-slate-500 font-bold uppercase tracking-wider text-[11px] mb-1">{stat.label}</p>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.valueEur}</h3>
                      <p className="text-sm font-semibold text-slate-400">{stat.valueMad}</p>
                    </div>
                  </div>
                  <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full ${stat.bg} opacity-50 blur-2xl group-hover:scale-150 transition-transform duration-700`} />
                </div>
              ))}
            </div>

            {/* Payment Progress */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Progression du financement</h3>
                  <p className="text-slate-500 text-sm">Prothèse totale du genou — ID : #BGA-09214</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-brand-teal">30 %</span>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Réglé</p>
                </div>
              </div>
              <Progress value={30} className="h-3 bg-slate-100 [&>div]:bg-brand-teal" />
            </div>

            {/* Transactions */}
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-lg">Historique des transactions</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                      <th className="p-4 pl-6 font-medium">Description</th>
                      <th className="p-4 font-medium">Référence</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Montant</th>
                      <th className="p-4 font-medium">Statut</th>
                      <th className="p-4 pr-6 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                    {transactions.map(tx => (
                      <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="p-4 pl-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full ${tx.bg} flex items-center justify-center shrink-0`}>
                              <tx.icon className={`w-4 h-4 ${tx.color}`} />
                            </div>
                            <span className="font-bold text-slate-900">{tx.type}</span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-500 font-mono text-xs">{tx.ref}</td>
                        <td className="p-4 text-slate-600 font-medium">{tx.date}</td>
                        <td className="p-4">
                          <div className="font-bold text-slate-900">{tx.amountEur}</div>
                          <div className="text-xs text-slate-400 font-medium">{tx.amountMad}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                            tx.status === 'Payé'      ? 'bg-emerald-100 text-emerald-700' :
                            tx.status === 'À régler'  ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-200' :
                                                        'bg-slate-100 text-slate-500'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          {tx.status === 'À régler' ? (
                            <Button onClick={goToPayment} size="sm" className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-sm h-8 font-bold">
                              Payer
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-brand-teal bg-white border border-slate-200 shadow-sm rounded-full opacity-0 group-hover:opacity-100 transition-all">
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ════════════════════ PAYMENT SCREEN ════════════════════ */}
        {screen === 'payment' && (
          <motion.div
            key="payment"
            custom={dir}
            variants={SLIDE}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Back nav */}
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-900 transition-colors mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Retour aux finances
            </button>

            {/* Page header */}
            <div className="mb-10">
              <p className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.3em] mb-3">
                MediBridge · Règlement sécurisé
              </p>
              <h1
                className="text-[32px] sm:text-[40px] text-slate-900 leading-tight mb-2"
                style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
              >
                Règlement de votre prise en charge
              </h1>
              <p className="text-slate-500 text-sm font-medium">
                Intervention Chirurgicale (Solde) · Réf. DEV-BA-26-991
              </p>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-8 items-start">

              {/* ── LEFT : Form ─────────────────────────────────────────── */}
              <div className="space-y-7">

                {/* Method selector */}
                <div>
                  <Label>Moyen de paiement</Label>
                  <div className="grid grid-cols-3 gap-2.5 mb-6">
                    {([
                      { id: 'card'         as PaymentTab, label: 'Carte bancaire', icon: CreditCard },
                      { id: 'sepa'         as PaymentTab, label: 'Virement SEPA',  icon: Building2  },
                      { id: 'installments' as PaymentTab, label: 'Facilités',      icon: Receipt    },
                    ] as const).map(m => (
                      <button
                        key={m.id}
                        onClick={() => setPaymentTab(m.id)}
                        className={`flex flex-col items-center gap-2.5 py-4 px-3 border-2 rounded-2xl transition-all text-center ${
                          paymentTab === m.id
                            ? 'border-[#1B433E] bg-[#1B433E]/5 text-[#1B433E]'
                            : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600'
                        }`}
                      >
                        <m.icon className="w-5 h-5" />
                        <span className="text-[11px] font-bold leading-tight">{m.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Card logos row */}
                  {paymentTab === 'card' && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mr-1">Acceptées :</span>
                      <LogoVisa />
                      <LogoMastercard />
                      <LogoMaestro />
                      <LogoCB />
                      <LogoAmex />
                      <LogoApplePay />
                      <LogoGooglePay />
                    </div>
                  )}
                </div>

                {/* ── Card form ── */}
                {paymentTab === 'card' && (
                  <div className="space-y-5">
                    <div>
                      <Label>Adresse e-mail</Label>
                      <Input
                        type="email"
                        placeholder="jean.dupont@email.com"
                        defaultValue="jean.dupont@email.com"
                        className="h-12 border-slate-200 bg-white rounded-xl text-slate-800 placeholder:text-slate-300
                                   focus-visible:ring-[#1B433E] focus-visible:border-[#1B433E]"
                      />
                    </div>

                    <div>
                      <Label>Numéro de carte</Label>
                      <div className="relative">
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="1234  5678  9012  3456"
                          value={cardNum}
                          onChange={e => setCardNum(formatCard(e.target.value))}
                          maxLength={19}
                          className="h-12 border-slate-200 bg-white rounded-xl text-slate-800 placeholder:text-slate-300
                                     font-mono tracking-widest pr-28
                                     focus-visible:ring-[#1B433E] focus-visible:border-[#1B433E]"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                          <LogoVisa />
                          <LogoMastercard />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Expiration</Label>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="MM / AA"
                          maxLength={7}
                          className="h-12 border-slate-200 bg-white rounded-xl text-slate-800 placeholder:text-slate-300
                                     font-mono focus-visible:ring-[#1B433E] focus-visible:border-[#1B433E]"
                        />
                      </div>
                      <div>
                        <Label>CVC / CVV</Label>
                        <Input
                          type="text"
                          inputMode="numeric"
                          placeholder="• • •"
                          maxLength={4}
                          className="h-12 border-slate-200 bg-white rounded-xl text-slate-800 placeholder:text-slate-300
                                     font-mono focus-visible:ring-[#1B433E] focus-visible:border-[#1B433E]"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Titulaire de la carte</Label>
                      <Input
                        type="text"
                        placeholder="Prénom Nom"
                        className="h-12 border-slate-200 bg-white rounded-xl text-slate-800 placeholder:text-slate-300
                                   focus-visible:ring-[#1B433E] focus-visible:border-[#1B433E]"
                      />
                    </div>
                  </div>
                )}

                {/* ── SEPA form ── */}
                {paymentTab === 'sepa' && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                    <div className="flex items-start gap-3 mb-6">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm mb-1">Virement bancaire SEPA</p>
                        <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
                          Effectuez un virement depuis votre banque vers le compte MediBridge. Votre dossier sera mis à jour sous 24–48 h ouvrées après réception des fonds.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-0 divide-y divide-slate-200">
                      {[
                        { label: 'Bénéficiaire', value: 'MediBridge SAS',                        mono: false, highlight: false, copy: false },
                        { label: 'IBAN',          value: 'FR76 3000 4000 5000 1234 5678 901',    mono: true,  highlight: false, copy: true  },
                        { label: 'BIC / SWIFT',   value: 'BNPAFRPPXXX',                          mono: true,  highlight: false, copy: false },
                        { label: 'Référence',     value: 'DEV-BA-26-991',                        mono: true,  highlight: true,  copy: false },
                      ].map(row => (
                        <div key={row.label} className="flex items-center justify-between py-3.5 gap-4">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">{row.label}</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold text-right ${row.highlight ? 'text-brand-teal' : 'text-slate-900'} ${row.mono ? 'font-mono' : ''}`}>
                              {row.value}
                            </span>
                            {row.copy && (
                              <button onClick={copyIBAN} className="text-slate-400 hover:text-slate-700 transition-colors shrink-0">
                                {copied
                                  ? <Check className="w-3.5 h-3.5 text-emerald-500" />
                                  : <Copy className="w-3.5 h-3.5" />
                                }
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Installments form ── */}
                {paymentTab === 'installments' && (
                  <div className="space-y-3">
                    <p className="text-slate-500 text-sm leading-relaxed mb-1">
                      Étalez votre règlement en plusieurs mensualités sans démarche bancaire. Choisissez la formule adaptée à votre situation.
                    </p>
                    {installments.map((opt, i) => (
                      <label
                        key={i}
                        onClick={() => setSelectedInstallment(i)}
                        className={`flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                          selectedInstallment === i
                            ? 'border-[#1B433E] bg-[#1B433E]/5'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                            selectedInstallment === i ? 'border-[#1B433E] bg-[#1B433E]' : 'border-slate-300'
                          }`}>
                            {selectedInstallment === i && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{opt.label}</p>
                            <p className="text-xs text-slate-400 font-medium">Total : {opt.total}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-slate-900 text-sm">
                            {opt.amount}<span className="text-slate-400 font-normal text-xs"> /mois</span>
                          </p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            opt.highlight ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {opt.badge}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                {/* ── Promo code ── */}
                <div className="border border-dashed border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setPromoOpen(!promoOpen)}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Tag className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-semibold text-slate-600">Code promotionnel ou bon de réduction</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${promoOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {promoOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 flex gap-2">
                          <Input
                            placeholder="Ex : MEDIBRIDGE25"
                            value={promoCode}
                            onChange={e => setPromoCode(e.target.value.toUpperCase())}
                            className="h-11 border-slate-200 bg-white rounded-xl text-slate-800 font-mono uppercase text-sm
                                       focus-visible:ring-[#1B433E] focus-visible:border-[#1B433E]"
                          />
                          <Button
                            size="sm"
                            className="h-11 px-5 bg-[#1B433E] hover:bg-black text-white rounded-xl font-bold text-[11px] uppercase tracking-wider shrink-0"
                          >
                            Appliquer
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── CTA + trust ── */}
                <div className="space-y-4 pt-1">
                  <Button className="w-full h-14 bg-[#1B433E] hover:bg-black text-white font-bold rounded-2xl shadow-lg transition-all text-base flex items-center justify-center gap-3">
                    <Lock className="w-4 h-4 text-white/50" />
                    {payLabel}
                  </Button>

                  <div className="flex items-center justify-center gap-5 flex-wrap">
                    <StripeBadge />
                    <span className="w-px h-4 bg-slate-200" />
                    <div className="flex items-center gap-1.5">
                      <LogoVisa />
                      <LogoMastercard />
                      <LogoMaestro />
                      <LogoCB />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── RIGHT : Summary ─────────────────────────────────────────── */}
              <div className="bg-[#FDFBF7] border border-slate-200 rounded-3xl p-6 space-y-6 lg:sticky lg:top-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] mb-4">Récapitulatif</p>
                  <h2
                    className="text-[44px] leading-none text-[#1B433E] mb-1"
                    style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
                  >
                    3 500<span className="text-[26px] align-top mt-2 inline-block">,00</span>
                  </h2>
                  <p className="text-[11px] font-bold text-[#1B433E] tracking-wider mb-0.5">EUR</p>
                  <p className="text-xs text-slate-400 font-medium">≈ 37 500 MAD</p>
                </div>

                <div className="border-t border-slate-200 pt-5 space-y-3.5">
                  <div className="flex justify-between gap-3">
                    <span className="text-xs text-slate-500 font-medium leading-snug">Intervention Chirurgicale (Solde)</span>
                    <span className="text-xs font-bold text-slate-900 shrink-0">3 500,00 €</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-xs text-slate-400">Référence</span>
                    <span className="text-xs font-mono font-bold text-slate-500">DEV-BA-26-991</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-xs text-slate-400">Dossier</span>
                    <span className="text-xs font-mono font-bold text-slate-500">#BGA-09214</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total dû</span>
                  <span
                    className="font-bold text-[#1B433E] text-xl"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    3 500,00 €
                  </span>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-700 font-medium leading-relaxed">
                    Acompte de <strong>1 500 €</strong> réglé le 15 Avril 2026.
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-4 space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Garanties</p>
                  {[
                    'Paiement chiffré TLS 1.3',
                    'Aucune donnée stockée sur nos serveurs',
                    'Conformité PCI-DSS niveau 1',
                  ].map(g => (
                    <div key={g} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span className="text-[11px] text-slate-500 font-medium">{g}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
