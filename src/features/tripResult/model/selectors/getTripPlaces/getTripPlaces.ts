import { createSelector } from "@reduxjs/toolkit";
import type { TripPlace } from "../../types/TripRouteSchema.ts";
import { getTripResultData } from "../getTripResultData/getTripResultData.ts";

export const getTripPlaces = createSelector([getTripResultData], (data): TripPlace[] => {
	return data?.places ?? [];
});
