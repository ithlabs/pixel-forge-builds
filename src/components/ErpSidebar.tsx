
import { cn } from "@/lib/utils";
import { Building2, ClipboardList, LayoutDashboard, ShoppingCart, UserRound, Wallet, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const ErpSidebar = () => {
  const location = useLocation();
  
  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Projects", href: "/projects", icon: Building2 },
    { name: "Workers/HR", href: "/workers", icon: UserRound },
    { name: "Users", href: "/users", icon: Users }, // New navigation item
    { name: "Inventory", href: "/inventory", icon: ShoppingCart },
    { name: "Finance", href: "/finance", icon: Wallet },
    { name: "Reports", href: "/reports", icon: ClipboardList },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-construction-navy text-white h-screen fixed left-0 top-0">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-xl font-bold">Construction ERP</h1>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
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
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-construction-orange rounded-full flex items-center justify-center">
            <span className="text-white font-bold">AD</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-gray-300">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
