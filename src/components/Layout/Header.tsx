
import React from "react";
import { Truck } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <Truck size={24} />
        <h1 className="text-xl font-bold">Fleet View</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm">Welcome, Fleet Manager</span>
      </div>
    </header>
  );
};

export default Header;
