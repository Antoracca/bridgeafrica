import { Metadata } from "next"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { 
  InkPillButton, 
  OutlinedPillButton, 
  EyebrowDot 
} from "@/components/ui/mastercard-design"
import { Bell, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Notifications | Pont Afrique Santé",
  description: "Consultez vos notifications et alertes médicales.",
}

interface NotificationItem {
  id: string
  title: string
  message: string
  type: string
  is_read: boolean
  action_url: string | null
  created_at: string
}

export default async function NotificationsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user?.id || "")
    .order("created_at", { ascending: false })
    .returns<NotificationItem[]>()

  const items = notifications || []
  const unreadCount = items.filter((n) => !n.is_read).length

  return (
    <div className="max-w-4xl mx-auto space-y-10 w-full">
      {/* En-tête Mastercard */}
      <div className="space-y-1 pb-2">
        <EyebrowDot text="• CENTRE D'ALERTES & DE SUIVI CLINIQUEMENT SÉCURISÉ" />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#141413] tracking-tight">
          Centre de Notifications
        </h1>
        <p className="text-[#696969] text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
          {unreadCount > 0
            ? `${unreadCount} notification${unreadCount > 1 ? "s" : ""} non lue${unreadCount > 1 ? "s" : ""}`
            : "Toutes vos alertes et mises à jour de dossiers sont à jour."}
        </p>
      </div>

      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((notification) => (
            <div
              key={notification.id}
              className={`p-6 rounded-[28px] border transition-all bg-[#FCFBFA] flex items-start gap-4 ${
                !notification.is_read
                  ? "border-[#141413] bg-white shadow-sm"
                  : "border-[#E2DDD7]"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#F3F0EE] text-[#141413] flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-[#CF4500]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-medium text-xs sm:text-sm text-[#141413]">{notification.title}</h3>
                  <span className="text-[11px] text-[#696969] font-mono">
                    {new Date(notification.created_at).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p className="text-xs text-[#696969] leading-relaxed">{notification.message}</p>
                {notification.action_url && (
                  <div className="pt-2">
                    <Link href={notification.action_url} className="inline-flex items-center gap-1 text-xs font-bold text-[#141413] hover:text-[#CF4500] transition-colors">
                      <span>Consulter les détails</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#FCFBFA] border border-[#E2DDD7] rounded-[40px] p-8 sm:p-12 text-center space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="w-16 h-16 mx-auto bg-[#F3F0EE] border border-[#E2DDD7] rounded-full flex items-center justify-center text-[#141413]">
            <Bell className="w-8 h-8 text-[#CF4500]" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-2xl font-medium text-[#141413] tracking-tight">
              Aucune notification active
            </h3>
            <p className="text-[#696969] text-sm leading-relaxed">
              Les alertes relatives à l'évolution de vos dossiers médicaux, la réception de nouveaux devis cliniques ou de nouveaux messages sécurisés s'afficheront ici en temps réel.
            </p>
          </div>

          <div className="pt-2">
            <InkPillButton href="/patient?view=dashboard">
              <span>Retour au tableau de bord</span>
            </InkPillButton>
          </div>
        </div>
      )}
    </div>
  )
}


