interface GeocodeItem {
	address_name: string;
	full_name: string;
	point: {
		lat: number;
		lon: number;
	};
}

interface GeocodeResponse {
	meta: {
		code: number;
	};
	result: {
		items: GeocodeItem[];
		total: number;
	};
}

export const geocodeAddressApi = async (address: string): Promise<{ lat: number; lon: number } | null> => {
	if (typeof address !== "string" || !address.trim()) {
		return null;
	}

	const apiKey = import.meta.env.VITE_2GIS_API_KEY;
	if (!apiKey) {
		throw new Error("2GIS API key is missing. Set VITE_2GIS_API_KEY in .env");
	}

	const url = new URL("https://catalog.api.2gis.com/3.0/items/geocode");
	url.searchParams.set("q", address.trim());
	url.searchParams.set("fields", "items.point");
	url.searchParams.set("key", apiKey);

	try {
		const response = await fetch(url.toString());

		if (!response.ok) {
			console.warn(`[2GIS] HTTP error: ${response.status} for "${address}"`);
			return null;
		}

		const data: GeocodeResponse = await response.json();
		console.log("data в целом", data);

		if (data.meta.code !== 200 || data.result.total === 0 || !data.result.items[0]?.point) {
			return null;
		}

		console.log("ответ от 2gis который юзаем : ", data.result.items[0].point);

		return data.result.items[0].point;
	} catch (error) {
		console.error("[2GIS] Geocoding failed:", error);
		return null;
	}
};
