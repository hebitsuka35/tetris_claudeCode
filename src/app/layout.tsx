'use client';

import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <title>Tetris</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
