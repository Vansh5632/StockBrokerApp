import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  return session ? (
    <button className="bg-red-500 px-4 py-2 text-white rounded" onClick={() => signOut()}>
      Sign Out
    </button>
  ) : (
    <button className="bg-blue-500 px-4 py-2 text-white rounded" onClick={() => signIn("google")}>
      Sign In with Google
    </button>
  );
}
