export function QrCodeGeneratorGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Choose a QR code type (Website URL, Plain Text, or Wi-Fi Network). Enter your payload details, preview the generated QR code matrix in real time, and click Download PNG to save the image to your device.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Payload formats and standards</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Website links:</strong> Must use standard http:// or https:// web protocols. When scanned with a smartphone camera, the browser immediately offers to open the destination link.</li>
          <li><strong>Plain text:</strong> Encodes arbitrary alphanumeric text, serial numbers, or contact notes directly into the 2D barcode matrix.</li>
          <li><strong>Wi-Fi network setup:</strong> Follows standard <code className="rounded bg-line px-1 py-0.5 text-xs">WIFI:T:WPA;S:MyNetwork;P:MyPassword;;</code> schema. Supported security types are WPA/WPA2, WEP, or open networks (nopass). Scanning allows instant phone network connection.</li>
          <li><strong>Static codes that never expire:</strong> Unlike commercial dynamic QR platforms that redirect through shortlinks requiring paid subscriptions, these QR codes encode data directly. They remain valid permanently with no account required.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy and local rendering</h2>
        <p className="mt-2">
          QR codes are rendered client-side using browser canvas rasterization. Your URLs, confidential Wi-Fi network credentials, and text payloads are never transmitted to a server.
        </p>
      </section>
    </div>
  );
}
