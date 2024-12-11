"use client";

import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const AuthModal = useAuthModal();
  const router = useRouter();

  const SupabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await SupabaseClient.auth.signOut();
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out");
    }
  };

  const handleSubscribe = () => {
    if (user) {
      router.push("/subscribe");
    } else {
      AuthModal.onOpen();
    }
  };

  const handleAccount = () => {
    if (user) {
      router.push("/account");
    } else {
      AuthModal.onOpen();
    }
  };

  return (
    <div
      className={twMerge(
        `
        h-fit
        bg-gradient-to-b
        from-emerald-900
        p-6
        `,
        className
      )}
    >
      <div
        className="
          w-full
          mb-4
          flex
          items-center
          justify-between
        "
      >
        <div
          className="
            hidden
            md:flex
            gap-x-2
            items-center
          "
        >
          <button
            onClick={() => router.back()}
            className="
              rounded-full
              bg-black
              flex 
              items-center 
              justify-center 
              hover:opacity-75
              transition
            "
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            onClick={() => router.forward()}
            className="
              rounded-full
              bg-black
              flex 
              items-center 
              justify-center 
              hover:opacity-75
              transition
            "
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            className="
          rounded-full
          p-2
          bg-white
          flex
          items-center
          justify-center
          hover:opacity-75
          transition"
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            className="
          rounded-full
          p-2
          bg-white
          flex
          items-center
          justify-center
          hover:opacity-75
          transition"
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div
          className="
        flex
        justify-center
        items-center
        gap-x-4
        "
        >
          {user ? (
            <div className="flex gap-x-4 items-center">
              <button
                onClick={handleLogout}
                className="bg-white px-6 py-2 text-black rounded-full"
              >
                Logout
              </button>
              <button onClick={handleAccount} className="flex items-center justify-center">
                <FaUserAlt className="text-white" size={20} />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center">
                <Button
                  onClick={AuthModal.onOpen}
                  className="
              bg-transparent
              text-neutral-300
              font-medium
              "
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={AuthModal.onOpen}
                  className="
                bg-white
                px-6
                py-2
              "
                >
                  Log in
                </Button>
              </div>
            </>
          )}

          {/* Subscribe Button Always Visible */}
          <button
            onClick={handleSubscribe}
            className="
              bg-slate-200
              text-black
              px-6
              py-2
              rounded-full
              hover:opacity-75
              transition
            "
          >
            Subscribe
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
