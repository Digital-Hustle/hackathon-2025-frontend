import { memo } from "react";
import { useSelector } from "react-redux";
import { TripForm } from "@/features/tripForm";
import { TripResult } from "@/features/tripResult";
import { getTripResultData } from "@/features/tripResult/model/selectors/getTripResultData/getTripResultData.ts";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text } from "@/shared/ui/Text/Text.tsx";
import * as cls from "./Sidebar.module.scss";

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const tripResult = useSelector(getTripResultData);

	return (
		<aside className={classNames(cls.Sidebar, {}, [className])}>
			<div className={cls.Wrapper}>
				{tripResult ? (
					<>
						<div className={cls.TextWrapper}>
							<Text
								text={"Ваш персональный маршрут"}
								className={cls["title"]}
								align={"left"}
								as={"h2"}
								size={"s"}
							/>
						</div>
						<TripResult />
					</>
				) : (
					<>
						<div className={cls.TextWrapper}>
							<Text
								text={"Спланировать маршрут"}
								className={cls["title"]}
								align={"left"}
								as={"h2"}
								size={"s"}
							/>
							<Text
								text={"Выберите точки на карте и настройте параметры"}
								className={cls["title"]}
								align={"left"}
								size={"s"}
								as={"h3"}
							/>
						</div>
						<TripForm />
					</>
				)}
			</div>
		</aside>
	);
});
