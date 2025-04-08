
import { ErpSidebar } from "./ErpSidebar";
import { MobileHeader } from "./MobileHeader";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader />
      <ErpSidebar />
      <div className="md:ml-64 p-4 md:p-8">
        <Outlet />
      </div>
    </div>
  );
};
