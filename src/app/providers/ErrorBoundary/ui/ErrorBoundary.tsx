import type { ErrorInfo } from "react";
import React, { Suspense } from "react";
import { PageError } from "@/widgets/PageError/ui/PageError";

interface ErrorBoundaryProps {
	children: React.ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		console.log("Ошибка", error);
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.log(error, errorInfo);
	}

	render() {
		const { hasError } = this.state;
		const { children } = this.props;
		if (hasError) {
			return (
				<Suspense fallback="">
					<PageError />
				</Suspense>
			);
		}

		return children;
	}
}

export default ErrorBoundary;
