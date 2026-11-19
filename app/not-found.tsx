import Link from "next/link";
import { messages } from "@/locales/en";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-medium">{messages.notFoundTitle}</h1>
      <p className="mt-3 text-[var(--muted)]">{messages.notFoundBody}</p>
      <p className="mt-6">
        <Link href="/" className="text-[var(--accent)] underline-offset-4 hover:underline">
          {messages.notFoundLink}
        </Link>
      </p>
    </div>
  );
}
