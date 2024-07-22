import { Separator } from "@/components/ui/separator";
import FAQ from "./faq";

export default function FAQPage() {
    return (
      <div className="space-y-6">
        <div>
        
          <h3 className="text-lg font-medium">Вопросы</h3>
        </div>
        <Separator />
        <FAQ/>
      </div>
    )
  }