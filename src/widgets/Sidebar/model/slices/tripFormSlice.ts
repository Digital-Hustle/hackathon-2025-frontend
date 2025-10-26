import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { geocodeFromAddressTo } from "@/features/routePoints/model/services/geocodeAdressTo/geocodeAdressTo.ts";
import { reverseGeocode } from "@/features/routePoints/model/services/reverseGeocode/reverseGeocode.ts";
import { reverseGeocodeTo } from "@/features/routePoints/model/services/reverseGeocodeTo/reverseGeocodeTo.ts";
import { geocodeFromAddress } from "../services/geocodeAdress/geocodeAddress.ts";
import type { RoutePointsSchema } from "../types/routePointsSchema";

const initialState: TripFormSchema = {
	from: undefined,
	to: undefined,
	isLoading: false,
	error: undefined,
};

export const tripFormSlice = createSlice({
	name: "tripForm",
	initialState,
	reducers: {
		setFromAddress: (state, action: PayloadAction<string>) => {
			state.from = {
				address: action.payload,
				coords: state.from?.coords ?? null,
			};
		},
		setToAddress: (state, action: PayloadAction<string>) => {
			state.to = {
				address: action.payload,
				coords: state.to?.coords ?? null,
			};
		},
		setFromCoords: (state, action: PayloadAction<{ lat: number; lon: number } | null>) => {
			state.from = {
				address: state.from?.address ?? "",
				coords: action.payload,
			};
		},
		setToCoords: (state, action: PayloadAction<{ lat: number; lon: number } | null>) => {
			state.to = {
				address: state.to?.address ?? "",
				coords: action.payload,
			};
		},
		clearRoutePoints: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(geocodeFromAddress.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(geocodeFromAddress.fulfilled, (state, action) => {
				state.isLoading = false;
				state.from = {
					address: state.from?.address ?? "",
					coords: action.payload,
				};
			})
			.addCase(geocodeFromAddress.rejected, (state, action) => {
				state.isLoading = false;
				state.error = (action.payload as string) || "Ошибка геокодирования";
				if (state.from) {
					state.from.coords = null;
				}
			});
	},
});

export const { actions: tripFormActions } = tripFormSlice;
export const { reducer: tripFormReducer } = tripFormSlice;
