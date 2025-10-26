import { memo, useState } from "react";
import { TripForm } from "@/features/tripForm/ui/TripForm.tsx";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text } from "@/shared/ui/Text/Text.tsx";
import * as cls from "./Sidebar.module.scss";

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<aside className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
			<div className={cls.Wrapper}>
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
			</div>
		</aside>
	);
});
