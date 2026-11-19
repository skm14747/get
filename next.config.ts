import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
  "object-src 'none'",
  "worker-src 'self' blob:",
  "img-src 'self' data: https://pagead2.googlesyndication.com https://www.googletagservices.com https://*.doubleclick.net",
  "font-src 'self' https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://adservice.google.com https://www.googletagservices.com https://partner.googleadservices.com${isDev ? " 'unsafe-eval'" : ""}`,
  `connect-src 'self' https://pagead2.googlesyndication.com https://*.doubleclick.net https://adservice.google.com${isDev ? " ws://localhost:* http://localhost:* http://127.0.0.1:*" : ""}`,
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
