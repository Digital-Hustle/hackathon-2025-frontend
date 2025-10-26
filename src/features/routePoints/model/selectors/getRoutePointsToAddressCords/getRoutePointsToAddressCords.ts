import { type StateSchema } from "@/app/providers/StoreProvider";

export const getRoutePointsToAddressCords = (state: StateSchema) => state.routePoints?.to?.coords ?? null;
