import type { GeoPoint } from "@/features/routePoints/model/types/routePointsSchema.ts";

export interface TripFormSchema {
	fromCoords: GeoPoint | null;
	toCoords: GeoPoint | null;
	budget: 0 | 1 | 2;
	travelStyles: string[];
}
