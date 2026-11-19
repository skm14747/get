import { PASSWORD_MAX, PASSWORD_MIN } from "@/lib/password";

export function PasswordGeneratorGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Adjust the password length slider (from {PASSWORD_MIN} to {PASSWORD_MAX} characters) and select which character sets to include: lowercase, uppercase, digits, or symbols. Click Generate or Copy to immediately create and use a new random password.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Security rules and character sets</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Cryptographic randomness:</strong> Random numbers are generated via <code className="rounded bg-line px-1 py-0.5 text-xs">crypto.getRandomValues()</code> (Web Crypto API), avoiding pseudo-random bias from standard Math.random.</li>
          <li><strong>Ambiguous character removal:</strong> The character pools deliberately exclude confusing glyphs: lowercase l, uppercase I, digit 1, digit 0, and uppercase O. This ensures passwords can be read and retyped without ambiguity.</li>
          <li><strong>Guaranteed entropy:</strong> When multiple sets are enabled, the generator ensures at least one character from each selected set is placed into the password.</li>
          <li><strong>Recommended length:</strong> Industry security benchmarks recommend at least 16 characters with mixed character sets for master passwords and sensitive accounts.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee</h2>
        <p className="mt-2">
          Passwords are generated strictly inside this browser tab and never leave your device. GoEasyTools does not log generated secrets, transmit them over network sockets, or store them in cookies.
        </p>
      </section>
    </div>
  );
}
