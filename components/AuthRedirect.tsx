"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";



export default function AuthRedirect() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (!hash) return;

    const params = new URLSearchParams(hash.replace("#", ""));
    const type = params.get("type");
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (!accessToken || !refreshToken) return;
    if (type !== "invite" && type !== "recovery") return;

    // Exchange the tokens for a real session — this sets the auth cookies
    // so the confirm page can call updateUser() without needing the hash
    supabase.auth
      .setSession({ access_token: accessToken, refresh_token: refreshToken })
      .then(({ error }) => {
        if (error) {
          console.error("Session exchange failed:", error.message);
          return;
        }
        // Session is now set — safe to navigate without the hash
        router.replace("/auth/confirm");
      });
  }, [router, supabase]);

  return null;
}