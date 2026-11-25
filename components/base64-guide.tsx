// Base64 encoding and decoding guide
export function Base64Guide() {
  return (

    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Enter text into the input field. Click Encode to convert standard UTF-8 text into Base64 ASCII format, or click Decode to transform a valid Base64 string back into readable plain text. Click Copy to place the result onto your clipboard.
        </p>
        <p className="mt-2">
          Under the hood, the tool first converts your text into a UTF-8 byte sequence using the browser&apos;s native <code className="rounded bg-line px-1 py-0.5 text-xs">TextEncoder</code>, then maps every group of three bytes into four Base64 characters. Decoding reverses the process with <code className="rounded bg-line px-1 py-0.5 text-xs">TextDecoder</code> to faithfully reconstruct the original string.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Encoding rules and UTF-8 handling</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>UTF-8 multi-byte support:</strong> Uses standard <code className="rounded bg-line px-1 py-0.5 text-xs">TextEncoder</code> and <code className="rounded bg-line px-1 py-0.5 text-xs">TextDecoder</code> with chunked binary conversions, ensuring full support for accents, emojis, and non-Latin character sets without corruption.</li>
          <li><strong>Base64 specification:</strong> Encodes arbitrary binary data using 64 safe ASCII characters: uppercase letters A–Z, lowercase a–z, digits 0–9, and symbols + and /. Padding is indicated with trailing = characters.</li>
          <li><strong>Encoding vs. encryption:</strong> Base64 is an encoding format designed for transmitting binary data across text-only protocols (e.g. email attachments, HTTP data URLs). It provides zero cryptographic security and anyone can decode it.</li>
          <li><strong>Invalid decode detection:</strong> If the input string is not a valid Base64 sequence or represents malformed UTF-8 byte sequences, the tool flags an invalid decode error without clearing your input.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Data URLs:</strong> Embed small images or fonts directly in HTML or CSS as <code className="rounded bg-line px-1 py-0.5 text-xs">data:image/png;base64,...</code> strings to reduce HTTP requests.</li>
          <li><strong>API authentication:</strong> HTTP Basic Auth headers require credentials in <code className="rounded bg-line px-1 py-0.5 text-xs">username:password</code> format encoded as Base64.</li>
          <li><strong>Email attachments:</strong> MIME-encoded email attachments use Base64 to safely transport binary files through text-only SMTP channels.</li>
          <li><strong>JWT inspection:</strong> JSON Web Tokens use Base64URL encoding for the header and payload segments — decode them here to quickly read claims.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Base64 increases data size by approximately 33% — a 3 KB file becomes roughly 4 KB when encoded.</li>
          <li>For URL-safe contexts (like JWTs), replace <code className="rounded bg-line px-1 py-0.5 text-xs">+</code> with <code className="rounded bg-line px-1 py-0.5 text-xs">-</code> and <code className="rounded bg-line px-1 py-0.5 text-xs">/</code> with <code className="rounded bg-line px-1 py-0.5 text-xs">_</code> in the output.</li>
          <li>If decoding fails, check for accidental whitespace or line breaks — many systems wrap Base64 at 76 characters per line.</li>
          <li>Never use Base64 encoding as a security measure. It is trivially reversible and provides no confidentiality.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">How Base64 encoding works under the hood</h2>
        <p className="mt-2">
          Base64 encoding takes groups of three bytes (24 bits) and splits them into four 6-bit values. Each 6-bit value maps to one of 64 printable ASCII characters (A-Z, a-z, 0-9, +, /). If the input length is not a multiple of three, the output is padded with one or two <code className="rounded bg-line px-1 py-0.5 text-xs">=</code> characters to signal the decoder how many bytes to discard. This is why Base64 output is always a multiple of 4 characters long.
        </p>
        <p className="mt-2">
          For example, the three-byte ASCII string &ldquo;ABC&rdquo; (hex: 41 42 43) encodes to the four-character Base64 string &ldquo;QUJD&rdquo;. The two-byte string &ldquo;AB&rdquo; encodes to &ldquo;QUI=&rdquo; with one padding character, and the single byte &ldquo;A&rdquo; encodes to &ldquo;QQ==&rdquo; with two padding characters.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee for credentials and tokens</h2>
        <p className="mt-2">
          Base64 conversions execute entirely inside your browser. Your sensitive API keys, authorization tokens, configuration secrets, and strings are never transmitted across network sockets or saved in server logs. The page does not store, cache, or log any input. Unlike many online Base64 tools that process requests on their servers, GoEasyTools has zero backend — encoding and decoding happen purely in your browser&apos;s JavaScript engine.
        </p>
      </section>
    </div>

  );
}
