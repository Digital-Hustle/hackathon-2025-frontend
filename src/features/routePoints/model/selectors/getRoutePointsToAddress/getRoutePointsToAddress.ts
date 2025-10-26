import { type StateSchema } from "@/app/providers/StoreProvider";

export const getRoutePointsToAddress = (state: StateSchema) => state.routePoints?.to?.address ?? "";
