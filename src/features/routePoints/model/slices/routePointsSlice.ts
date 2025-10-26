import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { geocodeFromAddressTo } from "@/features/routePoints/model/services/geocodeAdressTo/geocodeAdressTo.ts";
import { reverseGeocode } from "@/features/routePoints/model/services/reverseGeocode/reverseGeocode.ts";
import { reverseGeocodeTo } from "@/features/routePoints/model/services/reverseGeocodeTo/reverseGeocodeTo.ts";
import { geocodeFromAddress } from "../services/geocodeAdress/geocodeAddress.ts";
import type { RoutePointsSchema } from "../types/routePointsSchema";

const initialState: RoutePointsSchema = {
	from: undefined,
	to: undefined,
	isLoading: false,
	error: undefined,
};

export const routePointsSlice = createSlice({
	name: "routePoints",
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
			})

			.addCase(geocodeFromAddressTo.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(geocodeFromAddressTo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.to = {
					address: state.to?.address ?? "",
					coords: action.payload,
				};
			})
			.addCase(geocodeFromAddressTo.rejected, (state, action) => {
				state.isLoading = false;
				state.error = (action.payload as string) || "Ошибка геокодирования";
				if (state.to) {
					state.to.coords = null;
				}
			})

			.addCase(reverseGeocode.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(reverseGeocode.fulfilled, (state, action) => {
				state.isLoading = false;
				if (state.from) {
					state.from.address = action.payload;
				} else {
					state.from = {
						address: action.payload,
						coords: null,
					};
				}
			})
			.addCase(reverseGeocode.rejected, (state, action) => {
				state.isLoading = false;
				state.error = (action.payload as string) || "Ошибка геокодирования";
				if (state.from) {
					state.from.address = "";
				}
			})

			.addCase(reverseGeocodeTo.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(reverseGeocodeTo.fulfilled, (state, action) => {
				state.isLoading = false;
				if (state.to) {
					state.to.address = action.payload;
				} else {
					state.to = {
						address: action.payload,
						coords: null,
					};
				}
			})
			.addCase(reverseGeocodeTo.rejected, (state, action) => {
				state.isLoading = false;
				state.error = (action.payload as string) || "Ошибка геокодирования";
				if (state.to) {
					state.to.address = "";
				}
			});
	},
});

export const { actions: routePointsActions } = routePointsSlice;
export const { reducer: routePointsReducer } = routePointsSlice;
