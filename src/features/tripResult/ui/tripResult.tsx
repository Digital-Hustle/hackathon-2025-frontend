import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import * as cls from "./tripResult.module.scss";

interface tripResultProps {
	className?: string;
}

export const tripResult = ({ className }: tripResultProps) => {
	const { t } = useTranslation();

	return <div className={classNames(cls.tripResult, {}, [className])}></div>;
};
