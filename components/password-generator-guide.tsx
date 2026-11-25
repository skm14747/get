import { PASSWORD_MAX, PASSWORD_MIN } from "@/lib/password";

export function PasswordGeneratorGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Adjust the password length slider (from {PASSWORD_MIN} to {PASSWORD_MAX} characters) and select which character sets to include: lowercase, uppercase, digits, or symbols. Click Generate or Copy to immediately create and use a new random password.
        </p>
        <p className="mt-2">
          Each password is built by drawing random bytes from the browser&apos;s cryptographic random number generator, then mapping those bytes to characters from your selected pools. This guarantees that every generated password is statistically unpredictable.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Security rules and character sets</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Cryptographic randomness:</strong> Random numbers are generated via <code className="rounded bg-line px-1 py-0.5 text-xs">crypto.getRandomValues()</code> (Web Crypto API), avoiding pseudo-random bias from standard Math.random.</li>
          <li><strong>Ambiguous character removal:</strong> The character pools deliberately exclude confusing glyphs: lowercase l, uppercase I, digit 1, digit 0, and uppercase O. This ensures passwords can be read and retyped without ambiguity.</li>
          <li><strong>Guaranteed entropy:</strong> When multiple sets are enabled, the generator ensures at least one character from each selected set is placed into the password, preventing edge cases where a required class is missing.</li>
          <li><strong>Recommended length:</strong> Industry security benchmarks recommend at least 16 characters with mixed character sets for master passwords and sensitive accounts.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Account registration:</strong> Generate a unique, strong password for each new service to avoid credential reuse across websites.</li>
          <li><strong>Password manager seeding:</strong> Create high-entropy master passwords or vault entries for tools like Bitwarden, 1Password, or KeePass.</li>
          <li><strong>API keys and secrets:</strong> Generate random tokens for environment variables, webhook secrets, and development test credentials.</li>
          <li><strong>Wi-Fi and device passwords:</strong> Create memorable-length but cryptographically strong passphrases for home routers and IoT devices.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Use at least 16 characters with all four character sets enabled for maximum entropy against brute-force attacks.</li>
          <li>Never reuse the same password across multiple accounts — generate a unique one for each service.</li>
          <li>Store generated passwords in a dedicated password manager rather than writing them down or saving them in plain text files.</li>
          <li>If a service restricts symbols, disable the symbols toggle and compensate by increasing password length.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Understanding password entropy</h2>
        <p className="mt-2">
          Password entropy measures the number of possible combinations an attacker must try in a brute-force attack. A 16-character password using all four character sets (lowercase, uppercase, digits, symbols) provides approximately 95 bits of entropy — far beyond what current computing hardware can crack. Each additional character roughly doubles the attack difficulty, which is why length is more important than complexity alone.
        </p>
        <p className="mt-2">
          For comparison, an 8-character password with only lowercase letters has about 38 bits of entropy and can be cracked in seconds by modern hardware. Enabling all character sets and increasing to 16+ characters makes brute-force attacks computationally infeasible for the foreseeable future.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee</h2>
        <p className="mt-2">
          Passwords are generated strictly inside this browser tab and never leave your device. GoEasyTools does not log generated secrets, transmit them over network sockets, or store them in cookies. The cryptographic random seed is discarded immediately after each generation. Unlike many online generators that may log requests on their servers, this tool has zero backend — everything runs in your browser&apos;s JavaScript engine.
        </p>
      </section>
    </div>

  );
}
