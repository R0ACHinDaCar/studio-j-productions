"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (!hash) return;

    // Parse the hash into key-value pairs
    const params = new URLSearchParams(hash.replace("#", ""));
    const type = params.get("type");
    const accessToken = params.get("access_token");

    // Only intercept invite and password recovery flows
    if (accessToken && (type === "invite" || type === "recovery")) {
      // Redirect to confirm page, keeping the full hash intact
      // so the confirm page can pick up the token
      router.replace(`/auth/confirm${window.location.hash}`);
    }
  }, [router]);

  // Renders nothing — purely a side-effect component
  return null;
}