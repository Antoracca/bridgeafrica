import { Metadata } from "next"
import { MessagesView } from "../views/MessagesView"

export const metadata: Metadata = {
  title: "Messagerie Sécurisée | Pont Afrique Santé",
  description: "Vos échanges médicaux confidentiels et chiffrés.",
}

export default function MessagesPage() {
  return <MessagesView />
}
