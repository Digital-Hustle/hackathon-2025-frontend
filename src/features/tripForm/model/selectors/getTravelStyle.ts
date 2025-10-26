import type { StateSchema } from "@/app/providers/StoreProvider";

export const getTravelStyle = (state: StateSchema) => state.tripForm?.travelStyle || null;
