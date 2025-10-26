import type { StateSchema } from "@/app/providers/StoreProvider";

export const getProfileInterests = (state: StateSchema) => state.profile?.data?.interest;
