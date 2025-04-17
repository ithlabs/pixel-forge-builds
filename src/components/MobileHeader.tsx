
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Building2, ClipboardList, LayoutDashboard, ShoppingCart, UserRound, Wallet, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AccountSettingsDialog } from "./AccountSettingsDialog";

export const MobileHeader = () => {
  const location = useLocation();
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  
  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Projects", href: "/projects", icon: Building2 },
    { name: "Workers/HR", href: "/workers", icon: UserRound },
    { name: "Users", href: "/users", icon: Users },
    { name: "Inventory", href: "/inventory", icon: ShoppingCart },
    { name: "Finance", href: "/finance", icon: Wallet },
    { name: "Reports", href: "/reports", icon: ClipboardList },
  ];

  return (
    <div className="md:hidden flex items-center justify-between p-4 bg-construction-navy text-white">
      <h1 className="text-lg font-bold">Construction ERP</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-construction-navy text-white border-r border-gray-700 w-64 p-0">
          <div className="flex items-center justify-center h-16 border-b border-gray-700">
            <h1 className="text-xl font-bold">Construction ERP</h1>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                  location.pathname === item.href
                    ? "bg-construction-orange text-white"
                    : "text-white hover:bg-gray-700"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-construction-orange rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">AD</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <p className="text-xs text-gray-300">admin@example.com</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-gray-700"
                onClick={() => setShowAccountSettings(true)}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      <AccountSettingsDialog 
        isOpen={showAccountSettings} 
        onClose={() => setShowAccountSettings(false)} 
      />
    </div>
  );
};
