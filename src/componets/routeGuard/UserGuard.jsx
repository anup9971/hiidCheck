"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function UserGuard({ children }) {
  const router = useRouter();

  useEffect(() => {
    const role = Cookies.get("role");
    if (role !== "User") {
      router.replace("/not-authorized");
    }
  }, []);

  return <>{children}</>;
}
