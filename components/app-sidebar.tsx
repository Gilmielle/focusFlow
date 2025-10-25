import { Home, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SignOutBtn } from "@/components/sign-out-btn";
import { getCurrentUser } from "@/lib/utils";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export async function AppSidebar() {
  const user = await getCurrentUser()

  return (
    <Sidebar>
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
