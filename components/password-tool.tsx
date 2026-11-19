"use client";

import { useState } from "react";
import { PrivacyBadge } from "@/components/ui/privacy-badge";
import { useToolSession } from "@/components/use-tool-session";
import { generatePassword, PASSWORD_MAX, PASSWORD_MIN, type PasswordOptions } from "@/lib/password";

const initial: PasswordOptions = { length: 16, lower: true, upper: true, digits: true, symbols: false };

export function PasswordTool() {
  const session = useToolSession("password-generator");
  const [options, setOptions] = useState<PasswordOptions>(initial);
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(false);
  const [message, setMessage] = useState("Choose the sets to include, then generate. The password is not sent anywhere.");

  function generate() {
    const bytes = new Uint8Array(1);
    const result = generatePassword(options, () => {
      crypto.getRandomValues(bytes);
      return bytes[0] ?? 0;
    });
    if (!result.ok) {
      setPassword("");
      setMessage(result.reason === "no_set" ? "Select at least one character set." : "Use a length from 8 to 128 that can fit every selected set.");
      session.markError(result.reason);
      return;
    }
    setPassword(result.password);
    setMessage(`Included sets: ${result.sets.join(", ")}. Ambiguous characters such as 0, O, 1, and l are left out.`);
    session.markSuccess("generate");
  }

  return (
    <form className="mx-auto max-w-xl" onSubmit={(e) => e.preventDefault()}>
      <PrivacyBadge message="Generated with your browser's cryptographic random generator. The password never leaves this page." />
      {/* ── Result ── */}
      <div className="mt-4 rounded-lg bg-canvas p-5">
        <p className={`min-h-[2.5rem] break-all font-mono text-xl leading-relaxed ${hidden ? "tracking-[0.2em]" : ""}`} aria-live="polite">
          {password ? (hidden ? "•".repeat(password.length) : password) : <span className="text-muted">No password yet.</span>}
        </p>
      </div>

      {/* ── Actions ── */}
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary" onClick={generate}>Generate</button>
        <button type="button" className="btn btn-secondary" disabled={!password} onClick={() => { void navigator.clipboard.writeText(password).then(() => setMessage("Password copied. It was not sent anywhere.")).catch(() => setMessage("Clipboard writing was blocked.")); session.markCopy("password"); }}>Copy password</button>
        <button type="button" className="btn btn-tertiary" onClick={() => setHidden((v) => !v)}>{hidden ? "Show" : "Hide"}</button>
      </div>

      {/* ── Settings ── */}
      <div className="mt-6 grid gap-4">
        <label className="text-sm font-medium">
          <span className="flex items-baseline justify-between">
            <span>Length</span>
            <span className="tabular-nums text-muted">{options.length}</span>
          </span>
          <input type="range" className="mt-2 w-full" min={PASSWORD_MIN} max={PASSWORD_MAX} value={options.length} onChange={(e) => setOptions({ ...options, length: Number(e.target.value) })} />
          <span className="flex justify-between text-xs text-faint"><span>{PASSWORD_MIN}</span><span>{PASSWORD_MAX}</span></span>
        </label>

        <fieldset>
          <legend className="text-sm font-medium">Character sets</legend>
          <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {(["lower", "upper", "digits", "symbols"] as const).map((key) => (
              <label key={key} className={`flex min-h-10 cursor-pointer items-center gap-2.5 rounded-md border px-3 text-sm transition-colors ${options[key] ? "border-action bg-action-soft" : "border-line"}`}>
                <input type="checkbox" checked={options[key]} onChange={(e) => setOptions({ ...options, [key]: e.target.checked })} />
                <span className="capitalize">{key}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">{message}</p>
    </form>
  );
}
