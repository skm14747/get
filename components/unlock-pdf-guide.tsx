export function UnlockPdfGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Upload an encrypted PDF. The tool loads the file with encryption bypassed and re-saves all pages into a new, unrestricted document. This works for PDFs that have owner-only or empty passwords. Strongly encrypted files that block page extraction will fail. The file is limited to 20 MB.
        </p>
        <p className="mt-2">
          PDF encryption comes in two levels: an owner password (which restricts editing, printing, and copying) and a user password (which restricts opening the file entirely). This tool can remove owner-password restrictions but cannot bypass user passwords that prevent the file from being opened.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Printing locked PDFs:</strong> Remove print restrictions from PDFs that you&apos;re authorized to view but not to print — such as your own bank statements or utility bills.</li>
          <li><strong>Copy-paste restrictions:</strong> Unlock PDFs where text selection is disabled so you can copy content you have legitimate access to.</li>
          <li><strong>Editing permissions:</strong> Remove owner restrictions to allow annotation, form filling, or commenting on documents you own.</li>
          <li><strong>Archiving:</strong> Save unrestricted versions of your own documents for long-term storage without worrying about lost passwords.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">What can and cannot be unlocked</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Owner password (permissions only):</strong> Can be removed. The file opens normally but has restrictions on printing, copying, or editing.</li>
          <li><strong>Empty password encryption:</strong> Some PDFs are encrypted with an empty string password. The tool handles these automatically.</li>
          <li><strong>User password (open password):</strong> Cannot be bypassed. If the PDF requires a password to open, you must provide it — this tool does not crack passwords.</li>
          <li><strong>DRM-protected PDFs:</strong> PDFs with Adobe DRM or third-party rights management cannot be unlocked with this tool.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">How PDF encryption works</h2>
        <p className="mt-2">
          PDFs support two encryption levels defined by the PDF specification. The <strong>owner password</strong> controls permissions (printing, copying, editing) but still allows the file to be opened and viewed. The <strong>user password</strong> prevents the file from being opened at all without the correct password. Many PDF creators set only an owner password with an empty user password, which is what this tool can bypass.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Only unlock PDFs you have legitimate access to. Removing restrictions from copyrighted material you don&apos;t own may violate copyright law.</li>
          <li>If the tool fails with an error, the file likely has a user password or strong encryption that prevents page extraction.</li>
          <li>After unlocking, verify that all pages, annotations, and form fields transferred correctly to the new document.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Supported encryption standards</h2>
        <p className="mt-2">
          PDF files can use several encryption standards: 40-bit RC4, 128-bit RC4, 128-bit AES, and 256-bit AES. This tool handles the most common encryption configurations where the owner password restricts permissions (printing, copying, editing) but the file can still be opened for viewing. Files encrypted with 256-bit AES user passwords typically cannot be bypassed without the correct password.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Processing stays entirely in this browser. No password or file content leaves your device. The PDF is decrypted and rebuilt in browser memory, then downloaded locally.
        </p>
      </section>
    </div>

  );
}
