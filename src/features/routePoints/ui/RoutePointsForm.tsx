import { memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { geocodeFromAddress } from "@/features/routePoints/model/services/geocodeAdress/geocodeAddress.ts";
import { geocodeFromAddressTo } from "@/features/routePoints/model/services/geocodeAdressTo/geocodeAdressTo.ts";
import type { ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { DynamicModuleLoader } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce.ts";
import { Input } from "@/shared/ui/Input/Input.tsx";
import { Text } from "@/shared/ui/Text/Text";
import * as cls from "./RoutePointsForm.module.scss";
import { getRoutePointsFromAddress } from "../model/selectors/getRoutePointsFromAddress/getRoutePointsFromAddress.ts";
import { getRoutePointsToAddress } from "../model/selectors/getRoutePointsToAddress/getRoutePointsToAddress.ts";
import { routePointsActions, routePointsReducer } from "../model/slices/routePointsSlice.ts";

export interface RoutePointsFormProps {
	className?: string;
}

const reducers: ReducersList = {
	routePoints: routePointsReducer,
};

const RoutePointsForm = ({ className }: RoutePointsFormProps) => {
	const dispatch = useAppDispatch();
	const fromAddress = useSelector(getRoutePointsFromAddress);
	const toAddress = useSelector(getRoutePointsToAddress);

	const triggerGeocodeFrom = useCallback(() => {
		if (fromAddress.trim()) {
			dispatch(geocodeFromAddress(fromAddress));
		} else {
			dispatch(routePointsActions.setFromCoords(null));
		}
	}, [fromAddress, dispatch]);

	const debouncedGeocodeFrom = useDebounce(triggerGeocodeFrom, 500);

	useEffect(() => {
		debouncedGeocodeFrom();
	}, [fromAddress, debouncedGeocodeFrom]);

	const triggerGeocodeTo = useCallback(() => {
		if (toAddress.trim()) {
			dispatch(geocodeFromAddressTo(toAddress));
		} else {
			dispatch(routePointsActions.setToCoords(null));
		}
	}, [toAddress, dispatch]);

	const debouncedGeocodeTo = useDebounce(triggerGeocodeTo, 500);

	useEffect(() => {
		debouncedGeocodeTo();
	}, [toAddress, debouncedGeocodeTo]);

	const onChangeFromAddress = useCallback(
		(value?: string) => {
			dispatch(routePointsActions.setFromAddress(value || ""));
		},
		[dispatch]
	);

	const onChangeToAddress = useCallback(
		(value?: string) => {
			dispatch(routePointsActions.setToAddress(value || ""));
		},
		[dispatch]
	);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={cls.FieldGroup1}>
				<Text
					text={"Точки маршрута"}
					className={cls.FieldGroupText}
					align={"left"}
					as={"h3"}
				/>
				<div>
					<Text
						text={"Начальная точка"}
						className={cls.LabelInput}
						align={"left"}
						as={"p"}
					/>
					<Input
						label={"Введите адрес или место"}
						type="text"
						className={cls.InputAuthForm}
						value={fromAddress}
						onChange={onChangeFromAddress}
					/>
				</div>
				<div>
					<Text
						text={"Конечная точка"}
						className={cls.LabelInput}
						align={"left"}
						as={"p"}
					/>
					<Input
						label={"Введите адрес или место"}
						type="text"
						className={cls.InputAuthForm}
						value={toAddress}
						onChange={onChangeToAddress}
					/>
				</div>
			</div>
		</DynamicModuleLoader>
	);
};

export default memo(RoutePointsForm);
