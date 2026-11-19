/**
 * Minimal uncompressed ZIP builder (STORE method).
 * Good for already-compressed files like JPEGs.
 * No external dependencies.
 */

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function write16(view: DataView, offset: number, value: number) {
  view.setUint16(offset, value, true);
}
function write32(view: DataView, offset: number, value: number) {
  view.setUint32(offset, value, true);
}

export function createZip(files: { name: string; bytes: Uint8Array }[]): Uint8Array {
  const encoder = new TextEncoder();
  const entries: { nameBytes: Uint8Array; data: Uint8Array; crc: number; offset: number }[] = [];
  let offset = 0;

  // Calculate total size
  let totalSize = 0;
  const namesBuf = files.map((f) => encoder.encode(f.name));
  for (let i = 0; i < files.length; i++) {
    const headerSize = 30 + namesBuf[i].length;
    totalSize += headerSize + files[i].bytes.length;
  }
  // Central directory
  let cdSize = 0;
  for (let i = 0; i < files.length; i++) {
    cdSize += 46 + namesBuf[i].length;
  }
  totalSize += cdSize + 22; // end of central directory

  const buffer = new Uint8Array(totalSize);
  const view = new DataView(buffer.buffer);

  // Local file headers + data
  for (let i = 0; i < files.length; i++) {
    const name = namesBuf[i];
    const data = files[i].bytes;
    const crc = crc32(data);
    const entryOffset = offset;

    write32(view, offset, 0x04034b50); // local file header signature
    write16(view, offset + 4, 20); // version needed
    write16(view, offset + 6, 0); // flags
    write16(view, offset + 8, 0); // compression: STORE
    write16(view, offset + 10, 0); // mod time
    write16(view, offset + 12, 0); // mod date
    write32(view, offset + 14, crc);
    write32(view, offset + 18, data.length); // compressed size
    write32(view, offset + 22, data.length); // uncompressed size
    write16(view, offset + 26, name.length);
    write16(view, offset + 28, 0); // extra field length
    offset += 30;
    buffer.set(name, offset);
    offset += name.length;
    buffer.set(data, offset);
    offset += data.length;

    entries.push({ nameBytes: name, data, crc, offset: entryOffset });
  }

  // Central directory
  const cdOffset = offset;
  for (const entry of entries) {
    write32(view, offset, 0x02014b50); // central directory header signature
    write16(view, offset + 4, 20); // version made by
    write16(view, offset + 6, 20); // version needed
    write16(view, offset + 8, 0); // flags
    write16(view, offset + 10, 0); // compression: STORE
    write16(view, offset + 12, 0); // mod time
    write16(view, offset + 14, 0); // mod date
    write32(view, offset + 16, entry.crc);
    write32(view, offset + 20, entry.data.length);
    write32(view, offset + 24, entry.data.length);
    write16(view, offset + 28, entry.nameBytes.length);
    write16(view, offset + 30, 0); // extra field length
    write16(view, offset + 32, 0); // comment length
    write16(view, offset + 34, 0); // disk number start
    write16(view, offset + 36, 0); // internal attributes
    write32(view, offset + 38, 0); // external attributes
    write32(view, offset + 42, entry.offset);
    offset += 46;
    buffer.set(entry.nameBytes, offset);
    offset += entry.nameBytes.length;
  }

  // End of central directory
  write32(view, offset, 0x06054b50);
  write16(view, offset + 4, 0); // disk number
  write16(view, offset + 6, 0); // disk with central dir
  write16(view, offset + 8, entries.length);
  write16(view, offset + 10, entries.length);
  write32(view, offset + 12, cdSize);
  write32(view, offset + 16, cdOffset);
  write16(view, offset + 20, 0); // comment length

  return buffer;
}
