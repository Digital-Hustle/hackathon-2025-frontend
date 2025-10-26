import type { StateSchema } from "@/app/providers/StoreProvider";
import type { Budget } from "@/features/tripForm/model/types";

export const getBudget = (state: StateSchema): Budget => {
	return state.tripForm?.budget || "средний";
};
