import React from "react";

type Props = {};

export default function Footer({}: Props) {
    return (
        <footer className="bg-[#FEE832] text-[#FE6334]">
            <div className="relative mx-auto flex w-full max-w-4xl justify-center px-4 py-10">
                {/* Content removed as per your request */}
            </div>
            <div className="mt-1 text-center text-lg">
                © {new Date().getFullYear()}. All rights reserved.
            </div>
        </footer>
    );
}
