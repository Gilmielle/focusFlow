import { Home, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SignOutBtn } from "@/components/signOutBtn";
import { getCurrentUser } from "@/lib/utils";
import Logo from "@/components/logo";
import { routes } from "@/lib/constants";

// Menu items.
const items = [
  {
    title: "Дашборд",
    url: routes.dashboard,
    icon: Home,
  },
  {
    title: "Настройки",
    url: "#",
    icon: Settings,
  },
]

export async function AppSidebar() {
  const user = await getCurrentUser()

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo
          src={"/logo-1.png"}
          width={150}
          className={"justify-center"}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {!!user ? <>Вы авторизованы как {user.name ?? user.email}</> : <>Вы не авторизованы</>}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SignOutBtn />
      </SidebarFooter>
    </Sidebar>
  )
}
