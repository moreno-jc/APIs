
import "./globals.css";


export const metadata = {
  title: "APIs Connection",
  description: "Connection to APIs",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
          </main>
      </body>
    </html>
  )
}
