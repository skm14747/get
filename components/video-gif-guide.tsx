export function VideoGifGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What is a video to GIF converter?</h2>
        <p className="mt-2">
          A video to GIF converter extracts temporal frames from video files (MP4, WebM, MOV) and encodes them into an animated Graphics Interchange Format (GIF89a) loop. It transforms video clips, screen captures, and social highlights into lightweight animated loops suitable for GitHub pull requests, Discord, and messaging apps.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Upload any MP4, WebM, or MOV video clip (up to 50 MB). Use the video scrubber to choose your Start and End timestamps (up to 15 seconds). Select your target resolution (320p or 480p) and frame rate (5, 8, 10, or 12 FPS), click Convert to GIF, and download the animated GIF once frame extraction completes.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">GIF89a color palette limitations</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>256-Color Palette:</strong> Unlike 24-bit TrueColor video (which supports 16.7 million colors), the GIF89a format restricts each frame to an indexed 8-bit palette of 256 colors.
          </li>
          <li>
            <strong>Infinite Looping:</strong> The generated GIF embeds standard Netscape 2.0 application extension blocks, ensuring the animation loops continuously across all web browsers and social platforms.
          </li>
          <li>
            <strong>Balancing FPS and File Size:</strong> Higher frame rates (e.g. 10 or 12 FPS) produce fluid animation but increase file size proportionally. Lower frame rates (5 or 8 FPS) dramatically reduce byte weight for fast web page loading.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">In-browser canvas frame extraction</h2>
        <p className="mt-2">
          Rather than relying on heavy server-side transcoding queues or multi-megabyte FFmpeg binaries, GoEasyTools samples video frames directly into an HTML5 2D canvas context and compiles GIF byte streams using native client-side memory.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee for private recordings</h2>
        <p className="mt-2">
          Screen captures, software demos, and personal family recordings remain strictly inside your local device memory. Video files are never uploaded to cloud buckets or processed on remote server infrastructure.
        </p>
      </section>
    </div>
  );
}
