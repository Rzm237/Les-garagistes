import { Bell, ChevronRight, Home, Share2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { AppSidebar } from "./app-sidebar";
import { Button } from "./ui/button";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

const getPageTitle = (pathname: string) => {
  if (pathname === "/" || pathname === "/dashboard") return "Dashboard";
  if (pathname === "/clients") return "Client Search";
  if (pathname.startsWith("/clients/") && pathname.includes("/add-vehicle"))
    return "Add Vehicle";
  if (pathname.startsWith("/clients/")) return "Client Details";
  if (pathname.startsWith("/quotes/create")) return "Create Quote";
  return "Garage Pro";
};

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const prevLocationRef = useRef(location.pathname);
  const pageTitle = getPageTitle(location.pathname);

  useEffect(() => {
    if (prevLocationRef.current !== location.pathname) {
      if ("startViewTransition" in document) {
        document.startViewTransition(() => {
          prevLocationRef.current = location.pathname;
        });
      } else {
        prevLocationRef.current = location.pathname;
      }
    }
  }, [location]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <header className="border-b border-border bg-card sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SidebarTrigger className="-ml-1" />
                  <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="text-xl font-bold text-primary hover:opacity-80 transition-opacity"
                  >
                    Garage Pro
                  </button>
                  <div className="hidden md:flex items-center gap-2 ml-4 text-sm text-muted-foreground">
                    <Home className="h-4 w-4" />
                    <ChevronRight className="h-4 w-4" />
                    <span className="font-medium text-foreground">
                      {pageTitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    User Request
                  </span>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-6 flex-1 animate-fade-in">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
