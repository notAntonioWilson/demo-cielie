import type { Metadata } from "next";
import GownsCarousel from "./GownsCarousel";

export const metadata: Metadata = {
  title: "The Gowns | CIÉLIE",
  description:
    "Step into the dressing room. Browse every CIÉLIE gown, made to order in Vienna.",
};

export default function GownsPage() {
  return <GownsCarousel />;
}
