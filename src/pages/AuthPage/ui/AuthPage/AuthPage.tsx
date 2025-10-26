import { memo } from "react";
import { useTranslation } from "react-i18next";
import { AuthenticationWidget } from "@/widgets/AuthenticationWidget/AuthenticationWidget";
import { Navbar } from "@/widgets/Navbar";

interface AuthPageProps {
	className?: string;
}

const AuthPage = ({ className }: AuthPageProps) => {
	const { t } = useTranslation();

	return (
		<>
			<Navbar />
			<AuthenticationWidget />
		</>
	);
};

export default memo(AuthPage);
