import { checkUser } from "@/actions/user";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CafeContextProvider } from "@/context/CafeProvider";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkUser();
  return (
    <CafeContextProvider>
      <SidebarProvider>
        <AppSidebar defaultChecked={true} />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </CafeContextProvider>
  );
}
