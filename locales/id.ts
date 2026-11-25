import type { MessageKey } from "@/locales/en";

export const locale = "id" as const;
export const direction = "ltr" as const;

export const messages: Record<MessageKey, string> = {
  skipToContent: "Langsung ke konten",
  home: "Beranda",
  privacy: "Privasi",
  contact: "Kontak",
  toolsNav: "Alat",
  siteNav: "Situs",
  footerNote: "Setiap alat berjalan di browser Anda. Tidak ada data yang keluar dari halaman.",
  consent:
    "Pengukuran opsional mencatat alat mana yang digunakan. Tidak mencatat teks yang Anda ketik atau angka yang Anda hitung. Tidak ada yang dikirim sampai alamat analitik dikonfigurasi.",
  allowMeasurement: "Izinkan pengukuran",
  denyMeasurement: "Jangan izinkan",
  notFoundTitle: "Halaman tidak ditemukan",
  notFoundBody: "Alamat ini tidak sesuai dengan alat apa pun di situs ini.",
  notFoundLink: "Kembali ke alat",
};
