import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRouter } from "@/app/providers/router";
import { useTheme } from "@/app/providers/ThemeProvider";
import { getUserInited, userActions } from "@/entities/User";
import { classNames } from "@/shared/lib/classNames/classNames";

function App() {
	const { theme } = useTheme();
	const dispatch = useDispatch();

	const inited = useSelector(getUserInited);

	useEffect(() => {
		dispatch(userActions.initAuthData());
	}, [dispatch]);

	return (
		<div className={classNames("app", {}, [theme])}>
			<Suspense fallback="">
				<div className="content-page">{inited && <AppRouter />}</div>
			</Suspense>
		</div>
	);
}

export default App;
