
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CafeContextProvider } from "@/context/CafeProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <CafeContextProvider>
      <SidebarProvider>
        <AppSidebar defaultChecked={true} />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </CafeContextProvider>
  );
}
