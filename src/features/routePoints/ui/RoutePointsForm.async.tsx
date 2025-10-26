import type { FC } from "react";
import { lazy } from "react";
import type { RoutePointsFormProps } from "./RoutePointsForm";

export const RoutePointsFormAsync = lazy<FC<RoutePointsFormProps>>(() => import("./RoutePointsForm"));
