"use client";

import { Suspense } from "react";

function LoginWithGoogleInner() {
  return (
    <div>
      <p>Authenticating...</p>
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
