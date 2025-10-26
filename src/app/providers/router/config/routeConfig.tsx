import { Navigate } from "react-router-dom";
import { AboutPage } from "src/pages/TravelPage";
import { AuthPage } from "@/pages/AuthPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { OnBoardingPage } from "@/pages/OnBoardingPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { AppRoutes, RoutePath } from "@/shared/const/router";
import type { AppRoutesProps } from "@/shared/types/router";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePath.main,
		element: (
			<Navigate
				to={RoutePath.travel}
				replace
			/>
		),
	},
	[AppRoutes.TRAVEL]: {
		path: RoutePath.travel,
		element: <AboutPage />,
	},
	[AppRoutes.ONBOARDING]: {
		path: `${RoutePath.onboarding}:id`,
		element: <OnBoardingPage />,
	},
	[AppRoutes.AUTH]: {
		path: RoutePath.auth,
		element: <AuthPage />,
	},
	[AppRoutes.PROFILE]: {
		path: `${RoutePath.profile}:id`,
		element: <ProfilePage />,
		authOnly: true,
	},
	// last
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
};
