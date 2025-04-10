"use client";

import React from "react";

export default function Header() {
    return (
        <header className="flex justify-center py-4 -mb-28">
            <h1
                className="h-20 z-10 cursor-pointer text-orange-600 text-5xl font-extrabold transition-all duration-300 hover:scale-110 hover:text-orange-400 animate-fade-in"
            >
                SoftDrink
            </h1>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                }
            `}</style>
        </header>
    );
}
