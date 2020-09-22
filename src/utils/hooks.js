import { useLocation } from "react-router-dom";
import { getCartFromLocation } from "#utils/utils";

export const useURLCart = () => getCartFromLocation(useLocation());
