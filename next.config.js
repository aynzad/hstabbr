/**
 * @type {import('next').NextConfig}
 */

const prod = process.env.NODE_ENV === "production";

if (!process.env.NEXTAUTH_URL) {
  console.warn(
    "\x1b[33mwarn",
    "\x1b[0m",
    "NEXTAUTH_URL environment variable is not set."
  );
  if (process.env.URL) {
    process.env.NEXTAUTH_URL = process.env.VERCEL_URL || process.env.URL;
    console.warn(
      "\x1b[33mwarn",
      "\x1b[0m",
      `NEXTAUTH_URL environment variable is not set. Using Vercel or Netlify URL ${
        process.env.VERCEL_URL || process.env.URL
      }.`
    );
  }
}

const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
