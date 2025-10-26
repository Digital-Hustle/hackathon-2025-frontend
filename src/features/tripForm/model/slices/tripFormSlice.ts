import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Budget, RouteType, TripFormSchema } from "../types/index.ts";

const initialState: TripFormSchema = {
	budget: "средний",
	travelStyle: null,
	routeType: "Оптимальный",
};

export const tripFormSlice = createSlice({
	name: "tripForm",
	initialState,
	reducers: {
		setBudget: (state, action: PayloadAction<Budget>) => {
			state.budget = action.payload;
		},
		setTravelStyle: (state, action: PayloadAction<string>) => {
			state.travelStyle = action.payload; // ← просто замена
		},
		setRouteType: (state, action: PayloadAction<RouteType>) => {
			state.routeType = action.payload;
		},
	},
});

export const { actions: tripFormActions } = tripFormSlice;
export const { reducer: tripFormReducer } = tripFormSlice;
