export type Budget = "низкий" | "средний" | "высокий";
export type RouteType = "Оптимальный" | "Расширенный";

export interface TripFormSchema {
	budget: Budget;
	travelStyle: string | null;
	routeType: RouteType;
}
