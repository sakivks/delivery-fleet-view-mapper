
import React from "react";
import { Truck, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white py-3 px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <Truck size={24} />
        <h1 className="text-xl font-bold">Fleet View</h1>
      </div>
      <div className="flex items-center gap-4 max-w-xs w-full">
        <div className="relative w-full">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/70" size={16} />
          <Input 
            placeholder="Search..." 
            className="pl-8 bg-blue-600/50 border-blue-400/30 text-white placeholder:text-white/70 w-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
