
import { Separator } from "@/components/ui/separator"
import { AccountForm } from "./account-form"


export default function AccountFormPage() {
  return (
    <div className="space-y-6">
      <div>
      
        <h3 className="text-lg font-medium">Профиль</h3>
        <p className="text-sm text-muted-foreground">
          Вы можете отредактирвать данные
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  )
}