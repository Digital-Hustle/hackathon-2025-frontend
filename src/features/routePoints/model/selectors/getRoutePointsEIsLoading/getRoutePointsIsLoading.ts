import type { StateSchema } from "@/app/providers/StoreProvider";

export const getRoutePointsIsLoading = (state: StateSchema) => state.routePoints?.isLoading || false;
