
import React from "react";
import { VehicleStatus, getStatusColor, getStatusText } from "@/data/mock-data";

interface VehicleFilterProps {
  selectedFilters: VehicleStatus[];
  onFilterChange: (filters: VehicleStatus[]) => void;
}

const VehicleFilter = ({ selectedFilters, onFilterChange }: VehicleFilterProps) => {
  const allStatuses: VehicleStatus[] = ['active', 'paused', 'delayed', 'completed', 'maintenance'];

  const toggleFilter = (status: VehicleStatus) => {
    if (selectedFilters.includes(status)) {
      onFilterChange(selectedFilters.filter((f) => f !== status));
    } else {
      onFilterChange([...selectedFilters, status]);
    }
  };

  const selectAll = () => {
    onFilterChange(allStatuses);
  };

  const clearAll = () => {
    onFilterChange([]);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-medium">Filter by Status</h2>
        <div className="flex gap-2">
          <button 
            onClick={selectAll}
            className="text-xs text-primary hover:underline"
          >
            Select All
          </button>
          <span className="text-gray-300">|</span>
          <button 
            onClick={clearAll}
            className="text-xs text-primary hover:underline"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {allStatuses.map((status) => (
          <button
            key={status}
            onClick={() => toggleFilter(status)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors
              ${selectedFilters.includes(status) 
                ? `${getStatusColor(status)} text-white` 
                : 'bg-gray-100 text-gray-700'}`}
          >
            <span 
              className={`w-2 h-2 rounded-full ${selectedFilters.includes(status) ? 'bg-white' : getStatusColor(status)}`}
            />
            {getStatusText(status)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VehicleFilter;
