import type { Metadata } from "next";
import { contactEmail } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "How to reach GoEasyTools. A public contact address is shown only when one has been configured.",
  path: "/contact",
});

export default function ContactPage() {
  const email = contactEmail();
  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-10 text-[15px] leading-7">
      <h1 className="text-3xl font-medium">Contact</h1>
      {email ? (
        <p>
          Email <a className="text-[var(--accent)] underline" href={`mailto:${email}`}>{email}</a>.
        </p>
      ) : (
        <p>
          A public contact address is not configured. Set <code>NEXT_PUBLIC_CONTACT_EMAIL</code> before applying to an advertising network. This page does not invent an inbox.
        </p>
      )}
      <p>There is no support form because the site has no server that stores messages.</p>
    </article>
  );
}
