import type { StateSchema } from "@/app/providers/StoreProvider";
import type { RouteType } from "../types/index.ts";

export const getRouteType = (state: StateSchema): RouteType => {
	return state.tripForm?.routeType || "Оптимальный";
};
