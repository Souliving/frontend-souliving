import { Link, useLocation, useNavigate } from 'react-router-dom';


import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

const SidebarNav = ({ className, items, ...props }: SidebarNavProps) => {
    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();
    const createNewForm = () =>{
      navigate('/account/create_new_form');
    }

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
      <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Мои анкеты</AccordionTrigger>
        <AccordionContent>
         <Button onClick={createNewForm}>Создать анкету</Button>
        </AccordionContent>
      </AccordionItem>
      
    </Accordion>
    </nav>
  )
}

export default SidebarNav