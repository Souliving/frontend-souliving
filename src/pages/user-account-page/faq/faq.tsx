import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
    return (
    <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Как я могу найти потенциальных сожителей, 
            которые соответствуют моим критериям?
          </AccordionTrigger>
          <AccordionContent>
          мы предоставляем множество фильтров и параметров поиска, 
          которые позволяют вам уточнить свои предпочтения по местоположению, 
          бюджету, образу жизни и другим факторам. Просто введите свои критерии 
          в соответствующие поля поиска, и наша платформа покажет вам подходящие варианты.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Какие возможности для общения предоставляются на вашей платформе?
          </AccordionTrigger>
          <AccordionContent>
          наши пользователи могут общаться через внутренний чат на платформе, 
          что обеспечивает безопасную и защищенную передачу информации.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Я уже нашел потенциального сожителя. Как дальше действовать?
          </AccordionTrigger>
          <AccordionContent>
            если вы заинтересованы в потенциальном сожителе, 
            вы можете связаться с ним через нашу платформу, 
            обсудить детали проживания или предложить встречу.
          </AccordionContent>
        </AccordionItem>
    </Accordion>
    )
  }