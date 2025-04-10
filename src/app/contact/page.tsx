"use client";

import { Bubbles } from "@/slices/Hero/Bubbles";

export default function ContactPage() {
    return (
        <div className="min-h-screen p-10 text-orange-500 flex flex-col items-center justify-center bg-yellow-100">
            <h1 className="text-5xl font-bold mb-4 fade-in">Contact Us</h1>
            <p className="text-xl mb-8 fade-in delay-1">
                Reach out to us via email or follow us on social media.
            </p>

            <form
                action="https://formspree.io/f/meoavzvn" // 🔁 Replace with your real Formspree ID
                method="POST"
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg text-left animate-form"
            >
                <input type="hidden" name="_subject" value="New Contact Form Submission!" />
                <div className="mb-4">
                    <label className="block text-orange-600 font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full border border-orange-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-orange-600 font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full border border-orange-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-orange-600 font-semibold mb-2">Message</label>
                    <textarea
                        name="message"
                        rows={4}
                        required
                        className="w-full border border-orange-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600 transition duration-300"
                >
                    Send Message
                </button>
            </form>

            {/* Social Links */}
            <div className="flex space-x-6 mt-10 fade-in delay-2">
                <a
                    href="https://www.linkedin.com/in/suyash-tiwari-r73833/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-800 text-2xl transition-transform transform hover:scale-110"
                >
                    <i className="fab fa-linkedin"></i>
                </a>
                <a
                    href="https://x.com/suyashrcb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-800 text-2xl transition-transform transform hover:scale-110"
                >
                    <i className="fab fa-x-twitter"></i>
                </a>
                <a
                    href="https://github.com/suyashrcb15"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-800 text-2xl transition-transform transform hover:scale-110"
                >
                    <i className="fab fa-github"></i>
                </a>
            </div>

            {/* Animations */}
            <style>{`
                .fade-in {
                    opacity: 0;
                    animation: fadeIn 1.5s ease-out forwards;
                }

                .delay-1 {
                    animation-delay: 0.5s;
                }

                .delay-2 {
                    animation-delay: 1.5s;
                }

                .animate-form {
                    opacity: 0;
                    transform: translateY(50px) scale(0.95);
                    animation: slideFadeIn 1s ease-out forwards;
                    animation-delay: 1s;
                }

                @keyframes fadeIn {
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideFadeIn {
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>
    );
}
