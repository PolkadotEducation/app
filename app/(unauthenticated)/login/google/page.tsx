"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { serverGoogleOAuthURL, serverGoogleOAuthPayload, GoogleOAuthPayload } from "@/api/actions/google";
import { useAuth } from "@/hooks/useAuth";
import { LoaderCircle } from "lucide-react";

function LoginWithGoogleInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { loginWithGoogle } = useAuth();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      (async () => {
        const payload: GoogleOAuthPayload = await serverGoogleOAuthPayload(code);
        if (payload.email) {
          const success = await loginWithGoogle(payload);
          if (success) router.push("/");
        } else {
          router.push("/login");
        }
      })();
    } else {
      (async () => {
        const url = await serverGoogleOAuthURL();
        router.push(url);
      })();
    }
  }, [searchParams, router]);

  return (
    <div className="text-primary">
      <LoaderCircle width={120} height={120} className="animate-spin" />
    </div>
  );
}
export default function LoginWithGoogle() {
  return (
    <Suspense>
      <LoginWithGoogleInner />
    </Suspense>
  );
}
