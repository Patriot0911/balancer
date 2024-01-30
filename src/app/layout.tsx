import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

type TRootLayoutProps = Readonly<{
    children: React.ReactNode;
}>;

export const metadata: Metadata = {
    title: "Overwatch Balancer",
};

const RootLayout = ({ children }: TRootLayoutProps) => {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}

export default RootLayout;
