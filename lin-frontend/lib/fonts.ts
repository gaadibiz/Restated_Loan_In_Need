import { Outfit, Urbanist } from "next/font/google";

export const urbanist = Urbanist({
    variable: "--font-urbanist",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});