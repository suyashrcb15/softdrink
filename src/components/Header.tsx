"use client";

import React from "react";

export default function FlavoursPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 p-6 font-sans">
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-widest text-orange-700 drop-shadow-lg animate-fadeIn uppercase">
                SoftDrink
            </h1>

            <style jsx>{`
                .animate-fadeIn {
                    animation: fadeIn 1.5s ease-in-out;
                }
                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </main>
    );
}

