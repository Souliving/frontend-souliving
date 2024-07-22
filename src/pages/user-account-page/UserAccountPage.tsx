import AppBar from "@/components/header/AppBar";
import SidebarNav from "./components/sidedar-nav"
import { useStore } from "@/AuthProvider";
import { Separator } from "@/components/ui/separator";

const sidebarNavItems = [
    {
      title: "Моя учетная запись",
      href: "/account/:user_id",
    },
    {
      title: "Приватность",
      href: "/examples/forms/account",
    },
    {
      title: "Оплата",
      href: "/examples/forms/appearance",
    },
    {
      title: "Поддержка",
      href: "/examples/forms/notifications",
    },
    {
      title: "FAQ",
      href: "/account/faq",
    },
  ]
  interface SettingsLayoutProps {
    children: React.ReactNode;
  }
const UserAccountPage : React.FC<SettingsLayoutProps> = ({ children }) => {
  const { user }= useStore();
  sidebarNavItems[0].href=`/account/${user.user.id}`
    return (
      <>
      <AppBar/>
        <div className="hidden space-y-6 p-10 pb-16 md:block">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Аккаунт</h2>
            <p className="text-muted-foreground">
              Бла-бла-бла
            </p>
          </div>
          <Separator />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </>
    )
  }
  export default UserAccountPage