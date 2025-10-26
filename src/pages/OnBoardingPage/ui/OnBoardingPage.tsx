import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { EditableProfileCard } from "@/features/EditableProfileCard";
import { Text } from "@/shared/ui/Text/Text.tsx";
import { Navbar } from "@/widgets/Navbar";

interface AuthPageProps {
	className?: string;
}

const OnBoardingPage = ({ className }: AuthPageProps) => {
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <Text text={"Профиль не найден"} />;
	}

	return (
		<>
			<Navbar />
			<EditableProfileCard
				id={id}
				isOnboarding
			/>
		</>
	);
};

export default memo(OnBoardingPage);
