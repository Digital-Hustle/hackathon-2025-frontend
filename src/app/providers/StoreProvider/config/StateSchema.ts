import type { UnknownAction, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import type { CombinedState } from "@reduxjs/toolkit/query";
import type { AxiosInstance } from "axios";
import type { TripResultSchema } from "src/features/tripResult";
import type { UserSchema } from "@/entities/User";
import type { LoginSchema } from "@/features/AuthByUsername";
import type { ProfileSchema } from "@/features/EditableProfileCard";
import type { RoutePointsSchema } from "@/features/routePoints";
import type { TripFormSchema } from "@/features/tripForm/model/types";
import type { rtkApi } from "@/shared/api/rtkApi";
import type { ScrollSaveSchema } from "@/widgets/Page/ScrollSave";

export interface StateSchema {
	user: UserSchema;
	scrollSave: ScrollSaveSchema;
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

	// Асинхронные редюсеры
	loginForm?: LoginSchema;
	profile?: ProfileSchema;
	routePoints?: RoutePointsSchema;
	tripForm?: TripFormSchema;
	tripResult?: TripResultSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	// @ts-ignore
	reduce: (state: StateSchema, action: UnknownAction) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
	//true - вмонтирован, false - демонтирован
	getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
	state: StateSchema;
}
