export interface GeoPoint {
	lat: number;
	lon: number;
}

export interface RoutePoint {
	address: string;
	coords: GeoPoint | null;
}

export interface RoutePointsSchema {
	from?: RoutePoint;
	to?: RoutePoint;
	isLoading: boolean;
	error?: string;
}
