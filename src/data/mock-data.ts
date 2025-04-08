
export type VehicleStatus = 'active' | 'paused' | 'delayed' | 'completed' | 'maintenance';

export interface Vehicle {
  id: string;
  name: string;
  driver: string;
  status: VehicleStatus;
  location: {
    lat: number;
    lng: number;
  };
  destination: string;
  eta: string;
  deliveries: {
    completed: number;
    total: number;
  };
  lastUpdated: string;
  vehicleType: 'truck' | 'van' | 'car';
  fuelLevel: number;
}

export const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    name: 'Truck 101',
    driver: 'John Smith',
    status: 'active',
    location: {
      lat: 40.712,
      lng: -74.006
    },
    destination: '123 Main St, New York, NY',
    eta: '2:30 PM',
    deliveries: {
      completed: 7,
      total: 12
    },
    lastUpdated: '2 mins ago',
    vehicleType: 'truck',
    fuelLevel: 75
  },
  {
    id: 'v2',
    name: 'Van 234',
    driver: 'Sarah Johnson',
    status: 'delayed',
    location: {
      lat: 40.722,
      lng: -73.986
    },
    destination: '456 Park Ave, New York, NY',
    eta: '3:15 PM (15 min delay)',
    deliveries: {
      completed: 4,
      total: 8
    },
    lastUpdated: '5 mins ago',
    vehicleType: 'van',
    fuelLevel: 45
  },
  {
    id: 'v3',
    name: 'Car 567',
    driver: 'Mike Davis',
    status: 'paused',
    location: {
      lat: 40.732,
      lng: -73.996
    },
    destination: '789 Broadway, New York, NY',
    eta: 'Paused',
    deliveries: {
      completed: 2,
      total: 5
    },
    lastUpdated: '12 mins ago',
    vehicleType: 'car',
    fuelLevel: 60
  },
  {
    id: 'v4',
    name: 'Truck 102',
    driver: 'Emily Wilson',
    status: 'active',
    location: {
      lat: 40.708,
      lng: -74.016
    },
    destination: '321 Hudson St, New York, NY',
    eta: '2:45 PM',
    deliveries: {
      completed: 9,
      total: 15
    },
    lastUpdated: '1 min ago',
    vehicleType: 'truck',
    fuelLevel: 80
  },
  {
    id: 'v5',
    name: 'Van 235',
    driver: 'Tom Garcia',
    status: 'maintenance',
    location: {
      lat: 40.718,
      lng: -74.001
    },
    destination: 'Maintenance Depot',
    eta: 'N/A',
    deliveries: {
      completed: 0,
      total: 10
    },
    lastUpdated: '30 mins ago',
    vehicleType: 'van',
    fuelLevel: 20
  },
  {
    id: 'v6',
    name: 'Car 568',
    driver: 'Lisa Brown',
    status: 'completed',
    location: {
      lat: 40.701,
      lng: -73.979
    },
    destination: 'Completed route',
    eta: 'Completed',
    deliveries: {
      completed: 6,
      total: 6
    },
    lastUpdated: '15 mins ago',
    vehicleType: 'car',
    fuelLevel: 35
  },
  {
    id: 'v7',
    name: 'Truck 103',
    driver: 'Alex Rodriguez',
    status: 'active',
    location: {
      lat: 40.726,
      lng: -73.989
    },
    destination: '555 5th Ave, New York, NY',
    eta: '3:00 PM',
    deliveries: {
      completed: 5,
      total: 14
    },
    lastUpdated: '3 mins ago',
    vehicleType: 'truck',
    fuelLevel: 65
  },
  {
    id: 'v8',
    name: 'Van 236',
    driver: 'Nicole Taylor',
    status: 'active',
    location: {
      lat: 40.715,
      lng: -73.995
    },
    destination: '888 6th Ave, New York, NY',
    eta: '2:50 PM',
    deliveries: {
      completed: 8,
      total: 12
    },
    lastUpdated: '2 mins ago',
    vehicleType: 'van',
    fuelLevel: 55
  }
];

export const getStatusColor = (status: VehicleStatus): string => {
  switch (status) {
    case 'active':
      return 'bg-status-active';
    case 'paused':
      return 'bg-status-paused';
    case 'delayed':
      return 'bg-status-delayed';
    case 'completed':
      return 'bg-status-completed';
    case 'maintenance':
      return 'bg-status-maintenance';
    default:
      return 'bg-gray-400';
  }
};

export const getStatusText = (status: VehicleStatus): string => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'paused':
      return 'Paused';
    case 'delayed':
      return 'Delayed';
    case 'completed':
      return 'Completed';
    case 'maintenance':
      return 'Maintenance';
    default:
      return 'Unknown';
  }
};

export const getVehicleTypeIcon = (type: string): string => {
  switch (type) {
    case 'truck':
      return 'truck';
    case 'van':
      return 'truck';
    case 'car':
      return 'car';
    default:
      return 'circle';
  }
};
