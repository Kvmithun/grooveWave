import "./globals.css";
import { Figtree } from "next/font/google";

import Sidebar from "@/components/sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import Player from "@/components/Player";

import ToastProvider from "@/providers/ToasterProvider";
import getSongsByuserId from "@/actions/getSongsByUserId";


const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Groove Wave",
  description: "Listen to music",
};
export const revalidate=0


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const userSongs = await getSongsByuserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar  songs={userSongs}
            >{children}
            
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
