"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const navLinksRef = useRef([]);
    const homeRef = useRef(null);
    const pathname = usePathname();
    const lastScrollY = useRef(0);

    useEffect(() => {
        if (homeRef.current) {
            gsap.to(homeRef.current, {
                backgroundPositionX: "200%",
                yoyo: true,
                repeat: -1,
                duration: 3,
                ease: "sine.inOut",
            });
        }

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                setIsVisible(false); // Hide navbar when scrolling down
            } else {
                setIsVisible(true); // Show navbar when scrolling up
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full p-6 z-50 transition-all duration-500 bg-transparent ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
            }`}
        >
            <div className="container mx-auto flex justify-between items-center">
                <div></div>

                <button
                    className="md:hidden text-orange-500"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={36} /> : <Menu size={36} />}
                </button>

                <ul
                    className={`md:flex space-x-10 text-2xl font-extrabold transition-all duration-300 
                    ${menuOpen ? "block" : "hidden"} md:block 
                    absolute md:static bg-transparent w-full md:w-auto 
                    left-0 top-16 md:top-0 md:bg-none p-6 md:p-0`}
                >
                    {["Home", "About", "Drinks", "Contact"].map((text, index) => {
                        const isActive =
                            pathname === `/${text.toLowerCase()}` || (pathname === "/" && text === "Home");

                        return (
                            <li key={text}>
                                <Link
                                    href={`/${text.toLowerCase() === "home" ? "" : text.toLowerCase()}`}
                                    ref={(el) => {
                                        navLinksRef.current[index] = el;
                                        if (text === "Home") homeRef.current = el;
                                    }}
                                    className={`block p-3 transition-all duration-300 
                                        ${
                                        isActive && text === "Home"
                                            ? "text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-white to-green-500"
                                            : isActive
                                                ? "text-3xl font-bold text-orange-500"
                                                : "text-2xl text-orange-500 hover:text-orange-600"
                                    }`}
                                    style={{
                                        backgroundSize: "300% 100%",
                                        display: "inline-block",
                                    }}
                                >
                                    {text}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}



