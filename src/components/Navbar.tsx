"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const homeRef = useRef<HTMLAnchorElement | null>(null);
    const pathname = usePathname();
    const lastScrollY = useRef(0);

    useEffect(() => {
        const el = homeRef.current;
        if (!el) return;

        const tween = gsap.to(el, {
            backgroundPositionX: "200%",
            yoyo: true,
            repeat: -1,
            duration: 3,
            ease: "sine.inOut",
        });

        return () => {
            tween.kill(); // Clean up GSAP animation on unmount
        };
    }, []);

    useEffect(() => {
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

    const baseLinkClass = "block p-3 transition-all duration-300";
    const activeHomeClass =
        "text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-white to-green-500";
    const activeClass = "text-3xl font-bold text-orange-500";
    const inactiveClass = "text-2xl text-orange-500 hover:text-orange-600";

    const navItems = ["Home", "About", "Drinks", "Flavours", "Contact"];

    return (
        <nav
            className={`fixed top-0 left-0 w-full p-6 z-50 transition-all duration-500 bg-transparent ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
            }`}
        >
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo / Branding */}
                <div className="text-3xl font-bold text-orange-500">
                    <Link href="/">Fizz</Link>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-orange-500"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X size={36} /> : <Menu size={36} />}
                </button>

                {/* Navigation Links */}
                <ul
                    className={`md:flex space-x-10 text-2xl font-extrabold transition-all duration-300 
                        ${menuOpen ? "block" : "hidden"} md:block 
                        absolute md:static bg-transparent w-full md:w-auto 
                        left-0 top-20 md:top-0 md:bg-none p-6 md:p-0`}
                >
                    {navItems.map((text, index) => {
                        const isActive =
                            pathname === `/${text.toLowerCase()}` || (pathname === "/" && text === "Home");

                        const linkClasses = `${baseLinkClass} ${
                            isActive && text === "Home"
                                ? activeHomeClass
                                : isActive
                                    ? activeClass
                                    : inactiveClass
                        }`;

                        return (
                            <li key={text}>
                                <Link
                                    href={`/${text.toLowerCase() === "home" ? "" : text.toLowerCase()}`}
                                    onClick={() => setMenuOpen(false)} // Close mobile menu on click
                                    ref={(el) => {
                                        navLinksRef.current[index] = el;
                                        if (text === "Home") homeRef.current = el;
                                    }}
                                    className={linkClasses}
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



