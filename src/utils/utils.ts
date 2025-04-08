import axios from "axios";

export async function createVrp(
  customers: { id: string; lat: number; long: number }[],
  orders: { id: string; customerId: string }[]
) {
  const input = {
    costMetric: "time",
    routingProfile: "distance",
    timeLimitInSeconds: 3600,
    planner: "jvrp",
    solutionTraits: {
      clustered: true,
      clusterBias: 100,
      ignoreLastLeg: true,
      oneway: false,
      allowMultiTrip: false,
      softExclusiveZones: false,
      allPicksAfterDrops: false,
    },
    locations: customers.map((customer) => ({
      id: customer.id,
      lat: customer.lat,
      lng: customer.long,
    })),

    vehicleTypes: [
      {
        id: "v1",
        startLocationId: "l1",
        endLocationId: "l1",
        capacity: [1200, 1100, 5000],
        maxDistance: 300000,
      },
    ],
    tasks: customers.map((customer) => ({
      id: customer.id,
      pickupLocationId: customer.id,
      dropLocationId: customer.id,
      demand: [600, 0.2, 10],
    })),
    //  Object.entries(groupBy(orders, "customerId")).map(([k, v]) => ({
    //   id: k,
    //   pickupLocationId: l1,
    //   dropLocationId: l1,
    //   demand: [600, 0.2, 10],
    // })),
  };

  const response = await axios.post(
    "https://services.staging.stackbox.xyz/darwin/vrp",
    input
  );
  return response.data;
}
