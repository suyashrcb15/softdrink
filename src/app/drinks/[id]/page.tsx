"use client"; // Add this line to mark the component as a client component

import { useRouter } from "next/navigation";

// Assuming that dummyData is imported correctly
const dummyData = require("../../../../public/dummy.json");

export default function DrinkHistoryPage({ params }: { params: { id: string } }) {
    // Convert params.id to a number if the dummy data ids are numbers
    const drink = dummyData.find((d: any) => d.id === Number(params.id));

    if (!drink) {
        return <div className="p-10 text-center text-red-600">Drink not found.</div>;
    }

    return (
        <div className="p-10 min-h-screen bg-yellow-50">
            <h1 className="text-4xl font-bold mb-6 text-yellow-800">{drink.name} History</h1>
            <p className="mb-4 text-gray-700 italic">{drink.description}</p>
            <h3 className="text-xl font-semibold mb-2 text-yellow-700">Ingredients</h3>
            <ul className="mb-6 list-disc list-inside text-gray-800">
                {drink.ingredients?.map((ing: string, i: number) => (
                    <li key={i}>{ing}</li>
                ))}
            </ul>
            <h3 className="text-xl font-semibold mb-2 text-yellow-700">History</h3>
            <p className="text-gray-800">
                {drink.history ??
                    "This drink has a long tradition of refreshment and joy among people from different regions."}
            </p>
        </div>
    );
}
