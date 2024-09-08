import { Sidebar } from "@/components/organisms/Sidebar";

export default function DashBoardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
