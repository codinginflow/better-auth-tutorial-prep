import { UserDropdown } from "@/components/user-dropdown";
import { getServerSession } from "@/lib/get-session";
import Link from "next/link";

export async function Navbar() {
  // `cache` deduping important here, otherwise we fetch the session +1 times per page
  const session = await getServerSession();
  const user = session?.user;

  if (!user) return null;

  return (
    <header className="border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="font-semibold">
          Better-Auth Tutorial
        </Link>
        <div>
          {/* TODO: Add theme toggle */}
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
}
