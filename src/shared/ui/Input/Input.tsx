import React, { type InputHTMLAttributes, memo, type ReactNode, useEffect, useRef, useState } from "react";
import { classNames, type Mods } from "@/shared/lib/classNames/classNames";
import cls from "./Input.module.scss";

export enum InputTheme {
	ERROR = "error",
	DONE = "done",
	CLEAR = "clear",
	NOTIFICATION = "notification",
	CLEAR__INVERTED = "clearInverted",
	OUTLINE = "outline",
	OUTLINE_RED = "outline_red",
	BACKGROUND = "background",
	BACKGROUND_INVERTED = "backgroundInverted",
}

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "readOnly" | "size">;

type InputSize = "s" | "m" | "l";

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	label?: string;
	theme?: InputTheme;
	onChange?: (value: string) => void;
	autofocus?: boolean;
	readonly?: boolean;
	addonLeft?: ReactNode;
	addonRight?: ReactNode;
	size?: InputSize;
}

export const Input = memo((props: InputProps) => {
	const {
		className,
		value,
		theme = InputTheme.CLEAR,
		onChange,
		type = "text",
		placeholder,
		autofocus,
		readonly,
		addonLeft,
		addonRight,
		label,
		size = "m",
		...otherProps
	} = props;
	const ref = useRef<HTMLInputElement>(null);
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (autofocus) {
			setIsFocused(true);
			ref.current?.focus();
		}
	}, [autofocus]);

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
	};

	const onBlur = () => {
		setIsFocused(false);
	};

	const onFocus = () => {
		setIsFocused(true);
	};

	const mods: Mods = {
		[cls.readonly]: readonly,
		[cls.focused]: isFocused,
		[cls.withAddonLeft]: Boolean(addonLeft),
		[cls.withAddonRight]: Boolean(addonRight),
		[cls.hasValue]: Boolean(value),
	};

	const input = (
		<div className={classNames(cls.InputWrapper, mods, [className, cls[size], cls[theme]])}>
			<div className={cls.addonLeft}>{addonLeft}</div>
			<input
				ref={ref}
				type={type}
				value={value}
				onChange={onChangeHandler}
				className={cls.input2}
				onFocus={onFocus}
				onBlur={onBlur}
				readOnly={readonly}
				placeholder={placeholder}
				{...otherProps}
			/>
			<div className={cls.addonRight}>{addonRight}</div>
		</div>
	);

	if (label) {
		return (
			<div className={classNames(cls.inputContainer, mods, [className, cls[size]])}>
				<input
					ref={ref}
					type={type}
					value={value}
					onChange={onChangeHandler}
					className={classNames(cls.input2, mods, [className, cls[theme]])}
					onFocus={onFocus}
					onBlur={onBlur}
					readOnly={readonly}
					placeholder={placeholder}
					{...otherProps}
				/>
				<label className={cls.label}>{label}</label>
			</div>
		);
	}

	return input;
});
