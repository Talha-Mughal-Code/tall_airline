import "./globals.css";

export const metadata = {
  title: "Flight Search",
  description: "Search flights powered by FastAPI + Amadeus",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
