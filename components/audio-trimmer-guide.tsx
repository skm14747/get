export function AudioTrimmerGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What is an in-browser audio trimmer?</h2>
        <p className="mt-2">
          An audio trimmer cuts, slices, and extracts specific timing intervals from sound files. Executed in-browser using the Web Audio API and HTML5 canvas, it edits voice memos, song clips, ringtones, and podcast segments without uploading personal recordings to remote cloud servers.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Upload any audio file (MP3, WAV, OGG, AAC, or M4A up to 50 MB). The tool decodes the audio stream and renders an interactive visual waveform. Drag the Start and End time markers to pinpoint your desired sound segment, click Play Selection to audit the preview, and download the lossless trimmed audio in standard 16-bit PCM WAV format.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Sample rates, bit depth, and WAV encoding</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>Lossless PCM Encoding:</strong> Sliced audio buffers are compiled using pure client-side 16-bit signed integer pulse-code modulation (PCM) within standard RIFF WAV containers, preserving pristine acoustic fidelity.
          </li>
          <li>
            <strong>Sample Rate Retention:</strong> The tool preserves the source recording sample rate (typically CD-quality 44.1 kHz or broadcast-quality 48 kHz) without artificial down-sampling or distortion.
          </li>
          <li>
            <strong>Stereo Interleaving:</strong> Multi-channel audio files maintain channel separation with interleaved left/right sample blocks.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Ringtone creation:</strong> Trim your favorite song to a 30-second clip for a custom phone ringtone.</li>
          <li><strong>Podcast editing:</strong> Cut out intros, outros, or dead air from recorded podcast segments before publishing.</li>
          <li><strong>Voice memo cleanup:</strong> Extract the relevant portion of a long voice recording and discard the silence before and after.</li>
          <li><strong>Sound effects:</strong> Isolate specific sound effects from a longer audio recording for use in video editing or presentations.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Waveform amplitude extraction</h2>
        <p className="mt-2">
          The visual waveform represents raw decibel peak amplitudes sampled across the audio track. The highlighted blue segment shows the active trim region, giving you immediate visual confirmation of musical intros, quiet pauses, and vocal phrases.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Use the waveform to visually identify silent gaps — trim just before the audio starts and just after it ends for a clean cut.</li>
          <li>Always preview your selection before downloading to ensure the trim points sound natural without abrupt cuts.</li>
          <li>The output WAV file may be larger than the original MP3 because WAV is uncompressed. Use an external converter if you need MP3 output.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee for voice memos and podcasts</h2>
        <p className="mt-2">
          Voice memos, confidential client interviews, unreleased music tracks, and personal recordings contain private data. GoEasyTools performs all audio decoding, waveform rendering, and WAV serialization directly within your browser runtime. Zero sound bytes are ever sent to an external server.
        </p>
      </section>
    </div>
  );
}
