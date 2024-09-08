// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // 서버 사이드에서 /login으로 리다이렉트
  redirect("/login");

  // 리다이렉트가 발생하므로 아무것도 렌더링되지 않습니다.
  return null;
}
