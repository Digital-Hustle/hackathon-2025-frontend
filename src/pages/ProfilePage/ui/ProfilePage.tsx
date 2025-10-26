import React, { memo } from "react";
import { useParams } from "react-router-dom";
import { EditableProfileCard } from "@/features/EditableProfileCard";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text } from "@/shared/ui/Text/Text";
import { Navbar } from "@/widgets/Navbar";
import { Page } from "@/widgets/Page/Page";

interface ProfilePageProps {
	className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <Text text={"Профиль не найден"} />;
	}

	return (
		<>
			<Navbar />
			<EditableProfileCard id={id} />
		</>
	);
};

export default memo(ProfilePage);
