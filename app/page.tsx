"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [projectCount, setProjectCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  // 本番では Supabase から件数を取得する
  // 今はダミーデータ
  useEffect(() => {
    setProjectCount(5); // 進行中プロジェクト数（仮）
    setCompletedCount(12); // 完了プロジェクト数（仮）
  }, []);

  return (
    <div style={{ padding: "32px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>
        工期管理ダッシュボード
      </h1>

      <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
        <div
          style={{
            flex: 1,
            padding: "20px",
            background: "#1e1e1e",
            color: "white",
            borderRadius: "12px"
          }}
        >
          <h2 style={{ fontSize: "18px" }}>進行中プロジェクト</h2>
          <p style={{ fontSize: "32px", marginTop: "8px" }}>{projectCount}</p>
        </div>

        <div
          style={{
            flex: 1,
            padding: "20px",
            background: "#004488",
            color: "white",
            borderRadius: "12px"
          }}
        >
          <h2 style={{ fontSize: "18px" }}>完了プロジェクト</h2>
          <p style={{ fontSize: "32px", marginTop: "8px" }}>{completedCount}</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link href="/projects" style={buttonStyle}>
          プロジェクト一覧へ
        </Link>

        <Link href="/completed" style={buttonStyle}>
          完了プロジェクト一覧へ
        </Link>

        <Link href="/staff" style={buttonStyle}>
          人員カレンダーへ
        </Link>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "16px 24px",
  background: "#333",
  color: "white",
  borderRadius: "10px",
  textDecoration: "none",
  fontSize: "16px",
  border: "1px solid #666"
};
