import type { FC } from "react";
import { lazy } from "react";
import type { AuthFormProps } from "./AuthForm";

export const AuthFormAsync = lazy<FC<AuthFormProps>>(() => import("./AuthForm"));
