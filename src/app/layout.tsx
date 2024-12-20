import type { Metadata } from "next";
import 'tailwindcss/tailwind.css';
import {Toaster} from "sonner"
import "./globals.css";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors/>
      </body>
    </html>
  );
}
