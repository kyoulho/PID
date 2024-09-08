import { Sidebar } from "@/components/organisms/Sidebar";
import "../../styles/globals.css";

export default function Layout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
