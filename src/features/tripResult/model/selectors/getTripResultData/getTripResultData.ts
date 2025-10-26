import type { StateSchema } from "@/app/providers/StoreProvider";

export const getTripResultData = (state: StateSchema) => state.tripResult?.data;
