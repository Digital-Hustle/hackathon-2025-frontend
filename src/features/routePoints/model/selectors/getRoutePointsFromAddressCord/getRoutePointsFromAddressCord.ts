import { type StateSchema } from "@/app/providers/StoreProvider";

export const getRoutePointsFromAddressCord = (state: StateSchema) => state.routePoints?.from?.coords ?? null;
