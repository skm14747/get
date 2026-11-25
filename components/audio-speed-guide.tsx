export function AudioSpeedGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What is an audio speed changer?</h2>
        <p className="mt-2">
          An audio speed changer alters the playback tempo and duration of sound files, speeding up or slowing down speech and music. Executed directly in your browser using the Web Audio API, it speeds up podcast episodes and audiobooks or slows down fast lectures without uploading recordings to external cloud servers.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Upload any audio recording (MP3, WAV, OGG, AAC, or M4A up to 50 MB). Choose a quick speed preset (0.5x, 0.75x, 1.25x, 1.5x, 2.0x) or adjust the fine-tuning slider. Click Play Preview to hear the adjusted tempo in real time, compare original vs. adjusted durations, and download the new sound file rendered in lossless 16-bit PCM WAV format.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How tempo adjustment impacts duration</h2>
        <p className="mt-2">
          Playback tempo is inversely proportional to duration: <code className="rounded bg-line px-1 py-0.5 text-xs">New Duration = Original Duration &divide; Speed</code>.
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>1.25x Speed:</strong> Reduces listening time by 20% (a 60-minute audio file finishes in 48 minutes).</li>
          <li><strong>1.5x Speed:</strong> Reduces listening time by 33% (a 60-minute file finishes in 40 minutes).</li>
          <li><strong>2.0x Speed:</strong> Cuts total duration in half (a 60-minute file finishes in 30 minutes).</li>
          <li><strong>0.75x &amp; 0.5x Speed:</strong> Lengthens playback time, ideal for musical instrument transcription, dictation, and language pronunciation learning.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Podcast binge listening:</strong> Speed up podcast episodes to 1.5x or 2x to get through your queue faster without missing content.</li>
          <li><strong>Lecture review:</strong> Slow down fast-paced university lectures to 0.75x for note-taking and comprehension.</li>
          <li><strong>Music practice:</strong> Slow down complex musical passages to 0.5x speed to learn finger positions or rhythm patterns.</li>
          <li><strong>Audiobook efficiency:</strong> Listen at 1.25x speed for a comfortable speedup that saves hours over a full book.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Hardware-accelerated OfflineAudioContext</h2>
        <p className="mt-2">
          Rather than waiting for the entire audio track to play through in real time to re-record it, GoEasyTools uses the browser&apos;s <code className="rounded bg-line px-1 py-0.5 text-xs">OfflineAudioContext</code>. This renders the adjusted audio samples faster than real time using your device&apos;s multi-core CPU before encoding directly to WAV.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Start with 1.25x if you&apos;re new to speed listening — it&apos;s fast enough to save time but slow enough to catch every word.</li>
          <li>The output is always WAV format for maximum quality. Convert to MP3 afterward if you need a smaller file.</li>
          <li>Speed changes also affect pitch — speech will sound higher at faster speeds and lower at slower speeds.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee for lectures and audiobooks</h2>
        <p className="mt-2">
          Personal audio files, recorded lectures, voice messages, and study notes remain 100% inside your local browser memory. Files are never transmitted over the internet or saved to server disks.
        </p>
      </section>
    </div>
  );
}
