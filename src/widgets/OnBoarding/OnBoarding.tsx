import { useParams } from "react-router-dom";
import { EditableProfileCard } from "@/features/EditableProfileCard";
import { Text } from "@/shared/ui/Text/Text.tsx";

interface AuthenticationWidgetProps {
	className?: string;
}

export const OnBoarding = ({ className }: AuthenticationWidgetProps) => {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <Text text={"Профиль не найден"} />;
	}

	return (
		<>
			<EditableProfileCard id={id} />
		</>
	);
};
