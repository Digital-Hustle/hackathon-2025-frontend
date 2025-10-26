export interface TripEvent {
	id: string;
	title: string;
	date: string; // ISO 8601, например "2025-10-27T17:00:00"
	duration: string; // ISO 8601 duration, например "PT2H"
	price: number;
	ageRestriction: number;
}

// Место (place)
export interface TripPlace {
	id: string;
	title: string;
	latitude: number;
	longitude: number;
	address: string;
	image: string | null;
	events: TripEvent[];
}

// Ответ сервера — маршрут
export interface TripRouteSchema {
	id: string;
	places: TripPlace[];
}

export interface TripResultSchema {
	data: TripRouteSchema | null;
	isLoading: boolean;
	error: string | null;
}

export interface BuildRouteParams {
	startPoint: [number, number];
	endPoint: [number, number];
	budget: string;
	style: string;
	categories: string[];
	routeType: string;
}
