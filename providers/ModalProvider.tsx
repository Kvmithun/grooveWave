
"use client";

import React, { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";

const ModalProvider: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensure this runs only after the component is mounted
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent rendering during server-side rendering
  }

  return (
    <>
    <AuthModal />
    <UploadModal />
    </>
  )
 
};

export default ModalProvider;
