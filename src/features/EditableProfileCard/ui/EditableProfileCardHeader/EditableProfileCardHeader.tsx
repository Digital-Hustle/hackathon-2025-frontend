import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserAuthData } from "@/entities/User";
import { $api } from "@/shared/api/api";
import { RoutePath } from "@/shared/const/router";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Text/Text";
import * as cls from "./EditableProfileCardHeader.module.scss";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { profileActions } from "../../model/slice/profileSlice";

interface EditableProfileCardHeaderProps {
	className?: string;
	isOnboarding?: boolean;
}

export const EditableProfileCardHeader = ({ className, isOnboarding }: EditableProfileCardHeaderProps) => {
	const { t } = useTranslation("profile");
	const authData = useSelector(getUserAuthData);
	const profileData = useSelector(getProfileData);
	const isMyPage = authData?.id === profileData?.id;
	const readonly = useSelector(getProfileReadonly);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onEdit = useCallback(() => {
		dispatch(profileActions.setReadonly(false));
	}, []);

	const onCancelEdit = useCallback(() => {
		dispatch(profileActions.cancelEdit());
	}, [dispatch]);

	const onSave = useCallback(() => {
		dispatch(updateProfileData());
	}, [dispatch]);

	const onChat = useCallback(async () => {
		if (!profileData?.id) {
			console.log("id нету");
			return;
		}

		try {
			const response = await $api.post(`/chats/create?secondUserId=${profileData.id}`);
			const chatId = response.data?.data?.id;
			if (chatId) {
				navigate(`${RoutePath.chats_details}${chatId}`);
			} else {
				navigate(RoutePath.chats);
			}
		} catch (error) {}
	}, [profileData?.id, navigate]);

	if (isOnboarding) {
		return (
			<div className={cls.wrapperText}>
				<Text
					text={"Расскажите о себе"}
					className={cls.titleH}
					align={"center"}
					as={"h2"}
				/>
				<Text
					text={"Это поможет нам создать идеальный маршрут для вас"}
					className={cls.titleP}
					align={"center"}
					as={"p"}
				/>
			</div>
		);
	}

	return (
		<>
			<div className={cls.wrapperText}>
				<Text
					text={"Привет снова!"}
					className={cls.titleH}
					align={"center"}
					as={"h2"}
				/>
				<Text
					text={"Это поможет нам создать идеальный маршрут для вас"}
					className={cls.titleP}
					align={"center"}
					as={"p"}
				/>
			</div>
			<Text title={t("Профиль")} />
			{isMyPage ? (
				<div className={cls.btnWrapper}>
					{readonly ? (
						<Button
							className={cls.editBtn}
							theme={ButtonTheme.OUTLINE}
							onClick={onEdit}
						>
							{t("Редактировать")}
						</Button>
					) : (
						<>
							<Button
								className={cls.editBtn}
								theme={ButtonTheme.OUTLINE_RED}
								onClick={onCancelEdit}
							>
								{t("Отменить")}
							</Button>
							<Button
								className={cls.saveBtn}
								theme={ButtonTheme.OUTLINE}
								onClick={onSave}
							>
								{t("Сохранить")}
							</Button>
						</>
					)}
				</div>
			) : (
				<div className={cls.btnWrapper}>
					<Button
						className={cls.editBtn}
						theme={ButtonTheme.OUTLINE}
						onClick={onChat}
					>
						{t("Написать")}
					</Button>
				</div>
			)}
		</>
	);
};
