import type { StateSchema } from "@/app/providers/StoreProvider";

export const getRoutePointsError = (state: StateSchema) => state.routePoints?.error;
