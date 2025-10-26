import type { HTMLAttributes } from "react";
import React from "react";
import * as cls from "./Card.module.scss";
import { classNames } from "../../lib/classNames/classNames";

export enum CardTheme {
	NORMAL = "normal",
	OUTLINED = "outlined",
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: React.ReactNode;
	theme?: CardTheme;
}

export const Card = ({ className, children, theme = CardTheme.NORMAL, ...otherprops }: CardProps) => {
	return (
		<div
			className={classNames(cls.Card, {}, [className, cls[theme]])}
			{...otherprops}
		>
			{children}
		</div>
	);
};
