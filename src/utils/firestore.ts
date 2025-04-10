import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const drinksCollection = collection(db, "drinks");

export const addDrink = async (name: string, ingredients: string[]) => {
    await addDoc(drinksCollection, { name: name.toLowerCase(), ingredients });
};

export const getDrinks = async () => {
    const snapshot = await getDocs(drinksCollection);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
};

export const findDrinkByName = async (name: string) => {
    const q = query(drinksCollection, where("name", "==", name.toLowerCase()));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    }
    return null;
};

