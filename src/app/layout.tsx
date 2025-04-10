import localFont from 'next/font/local';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./app.css";
import Header from "@/components/Header";
import ViewCanvas from "@/components/ViewCanvas";
import Footer from "@/components/Footer";

const alpino = localFont({
    src: '../../public/fonts/Alpino-Variable.woff2',
    display: 'swap',
    weight: "100 900",
    variable: "--font-alpino",
});

export const metadata = {
    title: "SoftDrink",
    description: "Your ultimate guide to your favorite drinks.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={alpino.variable}>
        <head>
            {/* ✅ Font Awesome CDN fallback for safety */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
                integrity="sha512-papov88n8oN0Y+5NnZmQUbQYzI+ntI46Q6zjzHY9VV7H3ntF5MNZLfRcU/KEkOKDkk4+j0fj8P5RzXM2pYaX4w=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
            />
        </head>
        <body className="overflow-x-hidden bg-yellow-300">
        <Header />
        <main>
            {children}
            <ViewCanvas />
        </main>
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
        </body>
        </html>
    );
}
