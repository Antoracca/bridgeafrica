'use client'

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Stethoscope } from "lucide-react"
import { updateCaseStatus } from "@/lib/actions/cases"
import { toast } from "sonner"

interface CaseActionsProps {
    caseId: string
}

export function CaseActions({ caseId }: CaseActionsProps) {
    const [isPending, startTransition] = useTransition()

    const handleStatusChange = (status: string, label: string) => {
        startTransition(async () => {
            const result = await updateCaseStatus(caseId, status)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success(`Dossier marqué comme : ${label}`)
            }
        })
    }

    return (
        <div className="space-y-4 pt-4">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-md text-sm text-blue-700">
                <p className="font-semibold mb-1 italic">Action recommandée :</p>
                Passer le statut en &quot;En cours d&apos;examen&quot; pour notifier le patient que son dossier est pris en charge.
            </div>

            <Button 
                onClick={() => handleStatusChange('under_review', 'En cours d&apos;examen')}
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
            >
                <Stethoscope className="mr-2 h-4 w-4" />
                Prendre en charge
            </Button>

            <div className="grid grid-cols-2 gap-2">
                <Button 
                    onClick={() => handleStatusChange('approved', 'Approuvé')}
                    disabled={isPending}
                    variant="outline" 
                    className="w-full border-green-200 text-green-700 hover:bg-green-50"
                >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Approuver
                </Button>
                
                <Button 
                    onClick={() => handleStatusChange('cancelled', 'Rejeté')}
                    disabled={isPending}
                    variant="outline" 
                    className="w-full text-red-600 hover:bg-red-50"
                >
                    <XCircle className="mr-2 h-4 w-4" />
                    Rejeter
                </Button>
            </div>
        </div>
    )
}
