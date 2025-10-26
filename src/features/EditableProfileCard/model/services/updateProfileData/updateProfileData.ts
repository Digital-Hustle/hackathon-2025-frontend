import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ThunkConfig } from "@/app/providers/StoreProvider";
import type { IProfile } from "@/entities/Profile";
import { ValidateProfileError } from "@/features/EditableProfileCard/model/consts/consts";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { validateProfile } from "../validateProfile/validateProfile";

export const updateProfileData = createAsyncThunk<IProfile, void, ThunkConfig<ValidateProfileError[]>>(
	"profile/updateProfileData",
	async (_, thunkApi) => {
		const { extra, rejectWithValue, getState } = thunkApi;

		const formData = getProfileForm(getState());

		const errors = validateProfile(formData);

		if (errors.length) {
			return rejectWithValue(errors);
		}

		try {
			const response = await extra.api.post<IProfile>(`/profile/api/v1/profile/edit`, formData);

			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (e) {
			console.log(e);
			return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
		}
	}
);
