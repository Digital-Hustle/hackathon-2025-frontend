import type { IProfile } from "@/entities/Profile";
import type { ValidateProfileError } from "@/features/EditableProfileCard/model/consts/consts";

export interface ProfileSchema {
	data?: IProfile;
	form?: IProfile;
	isLoading: boolean;
	error?: string;
	readonly: boolean;
	validateErrors?: ValidateProfileError[];
}
