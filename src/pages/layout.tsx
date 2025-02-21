import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { ReactNode } from "react";

// Define metadata (optional, but required in root layout for App Router)
export const metadata = {
  title: "My Next.js App",
  description: "A Next.js app with Recoil and NextAuth",
};

// Root layout component
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <RecoilRoot>
            {children}
          </RecoilRoot>
        </SessionProvider>
      </body>
    </html>
  );
}