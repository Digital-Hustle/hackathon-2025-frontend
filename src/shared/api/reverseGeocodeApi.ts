export const reverseGeocodeApi = async (coordinates: [number, number]): Promise<string | null> => {
	const [lon, lat] = coordinates;

	console.log("api", coordinates);

	if (typeof lat !== "number" || typeof lon !== "number") {
		console.warn("[2GIS] Invalid coordinates: expected [lon, lat] as numbers");
		return null;
	}

	const apiKey = import.meta.env.VITE_2GIS_API_KEY;
	if (!apiKey) {
		throw new Error("2GIS API key is missing. Set VITE_2GIS_API_KEY in .env");
	}

	const url = new URL("https://catalog.api.2gis.com/3.0/items/geocode");
	url.searchParams.set("lat", lat.toString());
	url.searchParams.set("lon", lon.toString());
	url.searchParams.set("key", apiKey);

	console.log("урл", url);

	try {
		const response = await fetch(url.toString());

		if (!response.ok) {
			console.warn(`[2GIS] Reverse geocoding HTTP error: ${response.status} for [${lon}, ${lat}]`);
			return null;
		}

		const data = await response.json();

		if (data.meta.code !== 200 || data.result.total === 0 || !data.result.items[0]) {
			return null;
		}

		const item = data.result.items[0];
		console.log("ITEM", item);
		return item.full_name || "Адрес не найден";
	} catch (error) {
		console.error("[2GIS] Reverse geocoding failed:", error);
		return null;
	}
};
