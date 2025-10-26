import React, { memo } from "react";
import { useSelector } from "react-redux";
import { getTripResultData, getTripRouteMarkers } from "src/features/tripResult";
import { getRoutePointsFromAddressCord, getRoutePointsToAddressCords } from "@/features/routePoints";
import { reverseGeocode } from "@/features/routePoints/model/services/reverseGeocode/reverseGeocode.ts";
import { reverseGeocodeTo } from "@/features/routePoints/model/services/reverseGeocodeTo/reverseGeocodeTo.ts";
import { routePointsActions, routePointsReducer } from "@/features/routePoints/model/slices/routePointsSlice.ts";
import { tripResultActions, tripResultReducer } from "@/features/tripResult/model/slices/TripResultSlice.ts";
import { DynamicModuleLoader } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import { Map, type MarkerData } from "@/shared/ui/Map/Map.tsx";
import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";
import * as cls from "./TravelPage.module.scss";

const reducers = {
	routePoints: routePointsReducer,
	tripResult: tripResultReducer,
};

const TravelPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const fromCoords = useSelector(getRoutePointsFromAddressCord);
	const toCoords = useSelector(getRoutePointsToAddressCords);
	const markers: MarkerData[] = [];
	const result = useSelector(getTripRouteMarkers);
	const tripResult = useSelector(getTripResultData);
	const isRouteBuilt = Boolean(tripResult?.places && tripResult.places.length > 0);

	console.log("result", result);

	const handleResetRoute = () => {
		dispatch(routePointsActions.clearRoutePoints());
		dispatch(tripResultActions.clearTripResult());
		console.log('clear')
	};

	const handleMapClick = (coords: { lat: number; lon: number }) => {
		console.log("Координаты уже в aboutPage", coords);

		const coordArray: [number, number] = [coords.lat, coords.lon];

		if (!fromCoords) {
			dispatch(routePointsActions.setFromCoords(coords));
			dispatch(reverseGeocode(coordArray));
		} else if (!toCoords) {
			dispatch(routePointsActions.setToCoords(coords));
			dispatch(reverseGeocodeTo(coordArray));
		}
	};

	if (fromCoords) {
		markers.push({
			coordinates: [fromCoords.lon, fromCoords.lat],
		});
	}

	if (toCoords) {
		markers.push({
			coordinates: [toCoords.lon, toCoords.lat],
		});
	}

	let markersToDisplay: MarkerData[] = [];

	if (isRouteBuilt) {
		const finalMarkers: MarkerData[] = [];
		if (fromCoords) {
			finalMarkers.push({
				coordinates: [fromCoords.lon, fromCoords.lat],
			});
		}
		finalMarkers.push(...result);

		if (toCoords) {
			finalMarkers.push({
				coordinates: [toCoords.lon, toCoords.lat],
			});
		}

		markersToDisplay = finalMarkers;
	} else {
		if (fromCoords) {
			markersToDisplay.push({
				coordinates: [fromCoords.lon, fromCoords.lat],
			});
		}
		if (toCoords) {
			markersToDisplay.push({
				coordinates: [toCoords.lon, toCoords.lat],
			});
		}
	}

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={cls.verticalContainer}>
				<div className={cls.zIndex}>
					<Navbar />
				</div>
				<Sidebar />
			</div>
			<Map
				className={cls.map}
				onMapClick={handleMapClick}
				markers={markersToDisplay}
				onResetRoute={handleResetRoute}
			/>
		</DynamicModuleLoader>
	);
};

export default memo(TravelPage);
