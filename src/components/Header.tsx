import React from "react";
import { SoftDrinkLogo } from "@/components/SoftDrinkLogo";

export default function Header() {
  return (
    <header className="flex justify-center py-4 -mb-28">
      <SoftDrinkLogo className="h-20 z-10 cursor-pointer text-orange-600" />
    </header>
  );
}
