/**
 * A compact trust signal shown on tools that handle sensitive data
 * (signatures, passwords, locked PDFs, form fields).
 */
export function PrivacyBadge({ message }: { message?: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-green-500/20 bg-green-500/5 px-3.5 py-2.5 text-[0.8125rem] leading-relaxed text-green-700 dark:border-green-400/20 dark:bg-green-400/5 dark:text-green-300">
      <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1.5a2.5 2.5 0 0 0-2.5 2.5v2h5V4A2.5 2.5 0 0 0 8 1.5Z" stroke="currentColor" strokeWidth="1.3" />
        <rect x="3" y="6" width="10" height="8" rx="1.5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="8" cy="10" r="1" fill="currentColor" />
      </svg>
      <span>{message ?? "Processed entirely in your browser. Your file never leaves this device."}</span>
    </div>
  );
}
