"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/admin/auth/logout", { method: "POST" });
        router.replace("/admin/login");
        router.refresh();
      }}
      className="text-sm text-stone-500 hover:text-ink transition-colors cursor-pointer"
    >
      Sign out
    </button>
  );
}
