import type { ReactNode } from "react";
import {
  FaBolt,
  FaCompressAlt,
  FaFan,
  FaSteamSymbol,
  FaWater,
} from "react-icons/fa";

export const CATEGORY_ICONS: Record<string, ReactNode> = {
  "gas-turbine-parts": <FaFan aria-hidden />,
  "steam-turbine-parts": <FaSteamSymbol aria-hidden />,
  "compressor-parts": <FaCompressAlt aria-hidden />,
  "generator-parts": <FaBolt aria-hidden />,
  "mud-pump-parts": <FaWater aria-hidden />,
};

export const CATEGORY_MEDIA: Record<
  string,
  { icon: ReactNode; image: string }
> = {
  "gas-turbine-parts": {
    icon: <FaFan aria-hidden />,
    image: "/images/products/gas-turbine-parts.webp",
  },
  "steam-turbine-parts": {
    icon: <FaSteamSymbol aria-hidden />,
    image: "/images/products/steam-turbine-parts.webp",
  },
  "compressor-parts": {
    icon: <FaCompressAlt aria-hidden />,
    image: "/images/products/compressor-parts.webp",
  },
  "generator-parts": {
    icon: <FaBolt aria-hidden />,
    image: "/images/products/generator-parts.webp",
  },
  "mud-pump-parts": {
    icon: <FaWater aria-hidden />,
    image: "/images/products/mud-pump-parts.webp",
  },
};
