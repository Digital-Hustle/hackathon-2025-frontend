import { type StateSchema } from "@/app/providers/StoreProvider";

export const getRoutePointsFromAddress = (state: StateSchema) => state.routePoints?.from?.address ?? "";
