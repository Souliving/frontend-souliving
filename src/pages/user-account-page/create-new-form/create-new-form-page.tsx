import { Separator } from "@/components/ui/separator";
import CreateNewForm from "./create-new-form";


export default function CreateNewFormPage() {
    return (
      <div className="space-y-6">
        <div>
        
          <h3 className="text-lg font-medium">Новая форма</h3>
        </div>
        <Separator />
        <CreateNewForm/>
      </div>
    )
}