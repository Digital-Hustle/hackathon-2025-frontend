export enum AppRoutes {
	MAIN = "main",
	TRAVEL = "travel",
	ONBOARDING = "onboarding",
	AUTH = "auth",
	PROFILE = "profile",
	// last
	NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: "/",
	[AppRoutes.TRAVEL]: "/travel",
	[AppRoutes.ONBOARDING]: "/onboarding/", // + :id
	[AppRoutes.AUTH]: "/auth",
	[AppRoutes.PROFILE]: "/profile/", // + :id
	// последний
	[AppRoutes.NOT_FOUND]: "*",
};
