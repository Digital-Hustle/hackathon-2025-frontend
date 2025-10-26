import { createSelector } from "@reduxjs/toolkit";
import type { MarkerData } from "@/shared/ui/Map/Map";
import { getTripPlaces } from "../getTripPlaces/getTripPlaces.ts";

export const getTripRouteMarkers = createSelector([getTripPlaces], (places): MarkerData[] => {
	return places.map((place) => ({
		coordinates: [place.longitude, place.latitude],
	}));
});
