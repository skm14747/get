// QR code generation guide
export function QrCodeGeneratorGuide() {
  return (

    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Choose a QR code type (Website URL, Plain Text, or Wi-Fi Network). Enter your payload details, preview the generated QR code matrix in real time, and click Download PNG to save the image to your device. The QR code is rendered using a client-side encoder that builds the binary matrix and draws it onto an HTML5 canvas element.
        </p>
        <p className="mt-2">
          The encoder automatically selects the optimal error correction level and version (matrix size) based on the length of your data, ensuring the most compact code possible while remaining scannable from a distance.
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
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Business cards and flyers:</strong> Print a QR code linking to your website, portfolio, or contact vCard so recipients can connect instantly.</li>
          <li><strong>Restaurant menus:</strong> Generate a QR code that links to a digital menu PDF or web page — customers scan from the table.</li>
          <li><strong>Wi-Fi guest access:</strong> Create a Wi-Fi QR code for your office or home so visitors can join the network without typing the password manually.</li>
          <li><strong>Event check-in:</strong> Encode ticket IDs or registration links as QR codes for fast scanning at conference and concert entrances.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Keep URLs short — shorter data produces a smaller, more easily scannable QR code matrix.</li>
          <li>Print QR codes at a minimum of 2 cm × 2 cm for reliable scanning at arm&apos;s length.</li>
          <li>Test-scan your code with multiple devices before distributing printed materials.</li>
          <li>Use high contrast (dark modules on a light background) for the best scan reliability.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Error correction levels</h2>
        <p className="mt-2">
          QR codes include built-in error correction using Reed-Solomon encoding. Even if part of the code is damaged, obscured, or printed at low quality, the data can still be recovered. The four levels are: L (7% recovery), M (15%), Q (25%), and H (30%). Higher error correction produces denser codes but tolerates more damage — useful for QR codes printed on packaging that may get scuffed or partially covered.
        </p>
        <p className="mt-2">
          Level H is recommended when you plan to place a logo or icon in the center of the QR code, since the logo obscures part of the data matrix and the error correction must compensate. For standard use without logos, Level M provides a good balance between data density and damage tolerance.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy and local rendering</h2>
        <p className="mt-2">
          QR codes are rendered client-side using browser canvas rasterization. Your URLs, confidential Wi-Fi network credentials, and text payloads are never transmitted to a server. The generated PNG exists only in your browser until you download it. Unlike many online QR generators that route data through their servers (and may track your URLs), GoEasyTools processes everything locally with zero backend requests.
        </p>
      </section>
    </div>

  );
}
