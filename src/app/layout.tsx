import type { Metadata } from "next";
import ReduxProvider from "@/redux/provider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"]
});

type TRootLayoutProps = Readonly<{
    children: React.ReactNode;
}>;

export const metadata: Metadata = {
    title: "Overwatch Balancer",
};

const RootLayout = ({ children }: TRootLayoutProps) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReduxProvider>
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}

export default RootLayout;
