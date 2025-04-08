import React from "react";
import { Truck, Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
type HeaderProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
};

const Header = ({ searchValue, onSearchChange }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-lg">
          <Truck size={22} className="text-white" />
        </div>
        <h1 className="text-xl font-bold">Fleet View</h1>
      </div>
      <div className="flex items-center gap-4 max-w-xs w-full">
        <div className="relative w-full">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70"
            size={16}
          />
          <Input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search vehicles..."
            className="pl-9 bg-blue-700/30 border-white/20 text-white placeholder:text-white/70 w-full rounded-full focus-visible:ring-white/30 h-9"
          />
        </div>
        <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
          <Bell size={18} className="text-white" />
        </button>
      </div>
    </header>
  );
};

export default Header;
