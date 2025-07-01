"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

interface Drink {
    name: string;
    price: number;
    flavor: string;
    ingredients: string[];
    image: string;
    color?: string;
}

export default function FlavoursPage() {
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const [recent, setRecent] = useState<Drink[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        name: "",
        price: "",
        flavor: "",
        ingredients: "",
        image: "",
    });

    const gridRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchDrinks = async () => {
            const querySnapshot = await getDocs(collection(db, "drinks"));
            const data: Drink[] = querySnapshot.docs.map((doc) => doc.data() as Drink);
            setDrinks(data);
            setRecent(data.slice(0, 3));
        };
        fetchDrinks();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newDrink: Drink = {
            name: form.name,
            price: parseFloat(form.price),
            flavor: form.flavor,
            ingredients: form.ingredients.split(",").map((i) => i.trim()),
            image: form.image,
            color: "bg-gradient-to-r from-yellow-100 to-orange-100"
        };

        await addDoc(collection(db, "drinks"), newDrink);

        setDrinks((prev) => [newDrink, ...prev]);
        setRecent((prev) => [newDrink, ...prev.slice(0, 2)]);
        setForm({ name: "", price: "", flavor: "", ingredients: "", image: "" });
        setShowForm(false);

        setTimeout(() => {
            gridRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#9E1B32] via-[#C8102E] to-[#FFCC00] text-white font-bold p-6">
            <header className="text-center py-10 bg-gradient-to-b from-yellow-200 to-yellow-100 text-[#9E1B32] font-extrabold text-5xl tracking-wide shadow-inner rounded-b-3xl mb-10">
                SoftDrink
            </header>

            <h1 className="text-center text-5xl uppercase tracking-widest drop-shadow-lg mb-12 animate-fadeIn">
                Indian Flavoured Drinks
            </h1>

            {recent.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-3xl mb-6 text-center">Recently Added Recipes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {recent.map((drink, index) => (
                            <div
                                key={index}
                                className="bg-black/30 backdrop-blur-md rounded-xl p-4 text-center shadow-xl animate-cardFade"
                            >
                                <Image
                                    src={drink.image}
                                    alt={drink.name}
                                    width={120}
                                    height={120}
                                    className="mx-auto rounded-lg border border-white"
                                />
                                <h3 className="text-xl mt-2 uppercase">{drink.name}</h3>
                                <p className="text-lg">₹{drink.price}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {drinks.map((drink, index) => (
                    <div
                        key={index}
                        className="bg-black/20 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:scale-105 transition duration-300 shadow-lg animate-cardFade"
                    >
                        <Image
                            src={drink.image}
                            alt={drink.name}
                            width={150}
                            height={150}
                            className="mx-auto rounded-xl"
                        />
                        <h2 className="text-2xl mt-3 uppercase">{drink.name}</h2>
                        <p className="text-lg">₹{drink.price}</p>
                        <p className="text-sm italic">{drink.flavor}</p>
                        <ul className="mt-2 space-y-1">
                            {drink.ingredients.map((item, i) => (
                                <li key={i} className="text-sm">• {item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="fixed bottom-6 right-6 animate-bounce z-50">
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-yellow-400 text-black px-6 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition"
                >
                    + Add New Recipe
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white text-black w-full max-w-xl p-6 rounded-xl">
                        <h2 className="text-2xl font-bold text-center mb-4">Submit Your Drink Recipe</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" name="name" placeholder="Drink Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />
                            <input type="number" name="price" placeholder="Price (₹)" value={form.price} onChange={handleChange} className="w-full border p-2 rounded" required />
                            <input type="text" name="flavor" placeholder="Flavor" value={form.flavor} onChange={handleChange} className="w-full border p-2 rounded" required />
                            <textarea name="ingredients" placeholder="Ingredients (comma-separated)" value={form.ingredients} onChange={handleChange} className="w-full border p-2 rounded" required />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setForm((prev) => ({
                                                ...prev,
                                                image: reader.result as string,
                                            }));
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <div className="flex justify-between">
                                <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Submit</button>
                                <button type="button" onClick={() => setShowForm(false)} className="text-gray-600 underline">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                .animate-fadeIn {
                    animation: fadeIn 1s ease-in-out;
                }
                .animate-cardFade {
                    animation: cardFade 0.6s ease-in-out;
                }
                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                @keyframes cardFade {
                    0% { opacity: 0; transform: scale(0.95); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </main>
    );
}
