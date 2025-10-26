import type { IProfile } from "@/entities/Profile";
import { ValidateProfileError } from "@/features/EditableProfileCard/model/consts/consts";

export const validateProfile = (profile?: IProfile) => {
	if (!profile) {
		return [ValidateProfileError.NO_DATA];
	}

	const { name } = profile;
	const errors: ValidateProfileError[] = [];
	if (!name) {
		errors.push(ValidateProfileError.INCORRECT_USER_DATA);
	}

	return errors;
};
