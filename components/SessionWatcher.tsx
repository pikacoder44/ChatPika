"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import SignInReq from "./SignInReq";

export default function SessionWatcher({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      setShowModal(true); // session ended or never signed in
    } else {
      setShowModal(false);
    }
  }, [isSignedIn]);

  return (
    <>
      {children}
      {showModal && <SignInReq onClose={() => setShowModal(false)} />}
    </>
  );
}
