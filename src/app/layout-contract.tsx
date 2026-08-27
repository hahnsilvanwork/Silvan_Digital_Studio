import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "SILVAN Digital Studio",
  description:
    "Digitale Lösungen für mehr Sichtbarkeit und weniger wiederkehrende Arbeit.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export function DocumentShell({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className: string;
}>) {
  return (
    <html lang="de">
      <body className={className}>{children}</body>
    </html>
  );
}
