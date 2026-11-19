export function Base64Guide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Enter text into the input field. Click Encode to convert standard UTF-8 text into Base64 ASCII format, or click Decode to transform a valid Base64 string back into readable plain text. Click Copy to place the result onto your clipboard.
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
        <h2 className="text-xl font-semibold">Privacy guarantee for credentials and tokens</h2>
        <p className="mt-2">
          Base64 conversions execute entirely inside your browser. Your sensitive API keys, authorization tokens, configuration secrets, and strings are never transmitted across network sockets or saved in server logs.
        </p>
      </section>
    </div>
  );
}
