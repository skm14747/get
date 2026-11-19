"use client";

import { useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { textPayload, urlPayload, wifiPayload } from "@/lib/qr-payload";

const modes = [
  { id: "url", label: "URL" },
  { id: "text", label: "Text" },
  { id: "wifi", label: "📶 Wi-Fi" },
] as const;

type Mode = (typeof modes)[number]["id"];

export function QrTool() {
  const session = useToolSession("qr-code-generator");
  const [mode, setMode] = useState<Mode>("url");
  const [text, setText] = useState("");
  const [ssid, setSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  async function generate() {
    const payload = mode === "url" ? urlPayload(text) : mode === "text" ? textPayload(text) : wifiPayload(ssid, wifiPassword, wifiPassword ? "WPA" : "nopass");
    if (!payload.ok) {
      setImage("");
      setMessage(payload.reason === "url" ? "Enter an http or https URL." : "Fill in the required field.");
      session.markError(payload.reason);
      return;
    }
    const qr = await import("qrcode");
    const url = await qr.toDataURL(payload.value, { margin: 2, width: 280 });
    setImage(url);
    setMessage("The code was created in this browser.");
    session.markSuccess(mode);
  }

  function download() {
    const link = document.createElement("a");
    link.href = image;
    link.download = "qr-code.png";
    link.click();
    session.markDownload(mode);
  }

  return (
    <form className="grid gap-5 lg:grid-cols-2" onSubmit={(e) => { e.preventDefault(); void generate(); }}>
      {/* ── Input panel ── */}
      <div className="grid gap-4">
        <fieldset>
          <legend className="text-sm font-medium text-ink">Content type</legend>
          <div className="mt-2 flex gap-1.5">
            {modes.map((item) => (
              <label key={item.id} className={`flex min-h-9 flex-1 cursor-pointer items-center justify-center rounded-md border text-[0.8125rem] font-medium transition-colors ${mode === item.id ? "border-action bg-action-soft text-action" : "border-line text-muted hover:border-line-strong"}`}>
                <input type="radio" className="sr-only" checked={mode === item.id} onChange={() => setMode(item.id)} />
                {item.label}
              </label>
            ))}
          </div>
          {mode !== "wifi" ? <p className="mt-1.5 text-xs text-muted">💡 Try <button type="button" className="font-medium text-action underline underline-offset-2" onClick={() => setMode("wifi")}>Wi-Fi mode</button> — guests scan the code to connect without typing the password.</p> : null}
        </fieldset>

        {mode === "wifi" ? (
          <>
            <div className="rounded-lg border border-action/20 bg-action/5 px-3.5 py-2.5 text-[0.8125rem] leading-relaxed text-muted">
              <strong className="text-ink">Scan-to-connect:</strong> Guests point their phone camera at the QR code and join your Wi-Fi automatically — no password typing needed.
            </div>
            <label className="text-sm font-medium">Network name (SSID)<input className="field-control mt-1" value={ssid} onChange={(e) => setSsid(e.target.value)} /></label>
            <label className="text-sm font-medium">Password<input className="field-control mt-1" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} type="password" autoComplete="off" /></label>
          </>
        ) : (
          <label className="text-sm font-medium">
            {mode === "url" ? "URL" : "Text"}
            <textarea className="field-control mt-1 min-h-28" value={text} onChange={(e) => { setText(e.target.value); session.markInput(); }} />
          </label>
        )}

        <button type="submit" className="btn btn-primary">Generate QR code</button>
        {message ? <p className="text-sm text-muted">{message}</p> : null}
      </div>

      {/* ── Preview panel ── */}
      <div className="flex flex-col items-center justify-center rounded-lg bg-canvas p-6">
        {image ? (
          <>
            {/* The source is a data URL from the QR library. next/image does not apply. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="Generated QR code" width={220} height={220} className="rounded" />
            <button type="button" className="btn btn-secondary mt-4" onClick={download}>Download PNG</button>
          </>
        ) : (
          <p className="text-sm text-muted">The QR code appears here after you generate it.</p>
        )}
      </div>
    </form>
  );
}
