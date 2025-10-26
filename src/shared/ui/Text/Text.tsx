import { type ElementType, memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from "./Text.module.scss";

export type TextVariant = "primary" | "error" | "accent";

export type TextAlign = "right" | "left" | "center";

export type TextSize = "s" | "m" | "l";

type TextProps = {
	className?: string;
	as?: ElementType;
	text: string;
	size?: TextSize;
	variant?: TextVariant;
	align?: TextAlign;
};

const mapSizeToClass: Record<TextSize, string> = {
	s: cls.size_s,
	m: cls.size_m,
	l: cls.size_l,
};

export const Text = memo((props: TextProps) => {
	const { className, text, as: Tag = "p", size = "m", variant = "primary", align = "left" } = props;

	const sizeClass = mapSizeToClass[size];
	const additionalClasses = [className, cls[variant], cls[align], sizeClass];

	return <Tag className={classNames(cls.text, {}, additionalClasses)}>{text}</Tag>;
});
