import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ThunkConfig } from "@/app/providers/StoreProvider";
import type { BuildRouteParams, TripRoute } from "../../model/types/TripRouteSchema.ts";

const MOCK_RESULT: TripRoute = {
	id: "e464f8fb-f7c3-4447-b561-63d66172db06",
	places: [
		{
			id: "11111111-1111-1111-1111-111111111112",
			title: "Ботанический сад ЮФУ",
			latitude: 47.205204,
			longitude: 39.654682,
			address: "г. Ростов-на-Дону, пер. Ботанический Спуск, 7",
			image: null,
			events: [],
		},
		{
			id: "11111111-1111-1111-1111-111111111112",
			title: "Ботанический сад ЮФУ",
			latitude: 47.235204,
			longitude: 39.654682,
			address: "г. Ростов-на-Дону, пер. Ботанический Спуск, 7",
			image: null,
			events: [],
		},
		{
			id: "dddddddd-dddd-dddd-dddd-dddddddddddd",
			title: "Цирк «Ростов»",
			latitude: 47.224444,
			longitude: 39.705,
			address: "г. Ростов-на-Дону, пр. Будённовский, 45",
			image: null,
			events: [
				{
					id: "10000000-0000-0000-0000-000000000015",
					title: "Цирковое представление «Цирк-шапито Алле»",
					date: "2025-10-27T17:00:00",
					duration: "PT2H",
					price: 700.0,
					ageRestriction: 0,
				},
			],
		},
		{
			id: "22222222-2222-2222-2222-222222222223",
			title: "Дом офицеров",
			latitude: 47.221136,
			longitude: 39.70797,
			address: "г. Ростов-на-Дону, пр. Будённовский, 34",
			image: null,
			events: [
				{
					id: "10000000-0000-0000-0000-000000000025",
					title: "Концерт «Лебединое озеро»",
					date: "2025-10-29T19:00:00",
					duration: "PT2H",
					price: 2000.0,
					ageRestriction: 6,
				},
				{
					id: "10000000-0000-0000-0000-000000000022",
					title: "ВИА «Поющие гитары»",
					date: "2025-10-30T19:00:00",
					duration: "PT1H30M",
					price: 1200.0,
					ageRestriction: 6,
				},
				{
					id: "10000000-0000-0000-0000-000000000021",
					title: "Спектакль «Любовь под гипнозом»",
					date: "2025-10-28T19:00:00",
					duration: "PT2H",
					price: 1500.0,
					ageRestriction: 16,
				},
			],
		},
		{
			id: "44444444-4444-4444-4444-444444444444",
			title: "Ростовский областной музей изобразительных искусств",
			latitude: 47.2286,
			longitude: 39.7172,
			address: "г. Ростов-на-Дону, ул. Пушкинская, 115",
			image: null,
			events: [
				{
					id: "10000000-0000-0000-0000-000000000006",
					title: "Выставка «По России с этюдником»",
					date: "2025-10-27T10:00:00",
					duration: "PT3H",
					price: 20.0,
					ageRestriction: 0,
				},
				{
					id: "10000000-0000-0000-0000-000000000033",
					title: "Выставка «Русское искусство XVIII века»",
					date: "2025-10-27T10:00:00",
					duration: "PT3H",
					price: 20.0,
					ageRestriction: 0,
				},
				{
					id: "10000000-0000-0000-0000-000000000005",
					title: "Выставка «Осень. Цвет желтый»",
					date: "2025-10-27T10:00:00",
					duration: "PT3H",
					price: 20.0,
					ageRestriction: 0,
				},
			],
		},
		{
			id: "33333333-3333-3333-3333-333333333333",
			title: "Ростовский областной музей краеведения",
			latitude: 47.223675,
			longitude: 39.722056,
			address: "г. Ростов-на-Дону, ул. Большая Садовая, 79",
			image: null,
			events: [
				{
					id: "10000000-0000-0000-0000-000000000018",
					title: "Выставка «Свет в окне»",
					date: "2025-10-27T10:00:00",
					duration: "PT3H",
					price: 100.0,
					ageRestriction: 0,
				},
				{
					id: "10000000-0000-0000-0000-000000000027",
					title: "Выставка «Палеонтология Донского края»",
					date: "2025-10-27T10:00:00",
					duration: "PT3H",
					price: 150.0,
					ageRestriction: 0,
				},
			],
		},
		{
			id: "11111111-1111-1111-1111-111111111111",
			title: "Ростовский академический театр драмы им. М. Горького",
			latitude: 47.230241,
			longitude: 39.741082,
			address: "г. Ростов-на-Дону, Театральная площадь, 1",
			image: null,
			events: [
				{
					id: "10000000-0000-0000-0000-000000000002",
					title: "Концерт Ирины Понаровской",
					date: "2025-10-29T19:00:00",
					duration: "PT1H30M",
					price: 2500.0,
					ageRestriction: 12,
				},
				{
					id: "10000000-0000-0000-0000-000000000001",
					title: "Приключения Емели, или По щучьему велению",
					date: "2025-10-27T19:00:00",
					duration: "PT2H",
					price: 410.0,
					ageRestriction: 6,
				},
				{
					id: "10000000-0000-0000-0000-000000000031",
					title: "Спектакль «Эйнштейн и Маргарита»",
					date: "2025-10-22T19:00:00",
					duration: "PT2H",
					price: 1800.0,
					ageRestriction: 16,
				},
				{
					id: "10000000-0000-0000-0000-000000000028",
					title: "Спектакль «Юнона и Авось»",
					date: "2025-10-20T19:00:00",
					duration: "PT2H30M",
					price: 2000.0,
					ageRestriction: 12,
				},
			],
		},
		{
			id: "11111111-1111-1111-1111-111111111111",
			title: "Ростовский академический театр драмы им. М. Горького",
			latitude: 47.2689,
			longitude: 39.936,
			address: "г. Ростов-на-Дону, пер. Ботанический Спуск, 7",
			image: null,
			events: [],
		},
	],
};

export const fetchEventsData = createAsyncThunk<TripRoute, BuildRouteParams, ThunkConfig<string>>(
	"tripResult/buildRoute",
	async (params, thunkApi) => {
		const { rejectWithValue } = thunkApi;

		try {
			console.log("MOCK_RESULT", MOCK_RESULT);
			return MOCK_RESULT;

			// const response = await extra.api.post<TripRouteSchema>("/api/routes/generate", params);
			// if (!response.data) {
			//   throw new Error("((");
			// }
			// return response.data;
		} catch (e) {
			console.error("Ошибка при построении маршрута:", e);
			return rejectWithValue("Не удалось построить маршрут");
		}
	}
);
