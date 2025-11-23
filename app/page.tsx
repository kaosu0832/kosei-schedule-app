"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        background: "#0f0f0f",
        minHeight: "100vh",
        color: "#f5f5f5",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "30px" }}>
        工期管理アプリ – ホーム
      </h1>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "400px",
        }}
      >
        <Link
          href="/projects"
          style={{
            padding: "14px 20px",
            background: "#181818",
            border: "1px solid #333",
            borderRadius: "8px",
            color: "#f5f5f5",
            textDecoration: "none",
            fontSize: "15px",
          }}
        >
          進行中プロジェクト一覧を見る
        </Link>

        <Link
          href="/completed"
          style={{
            padding: "14px 20px",
            background: "#181818",
            border: "1px solid #333",
            borderRadius: "8px",
            color: "#f5f5f5",
            textDecoration: "none",
            fontSize: "15px",
          }}
        >
          完了したプロジェクト一覧を見る
        </Link>

        <Link
          href="/projects/new"
          style={{
            padding: "14px 20px",
            background: "#181818",
            border: "1px solid #333",
            borderRadius: "8px",
            color: "#f5f5f5",
            textDecoration: "none",
            fontSize: "15px",
          }}
        >
          新規プロジェクトを作成する（未実装）
        </Link>

        <Link
          href="/gantt"
          style={{
            padding: "14px 20px",
            background: "#181818",
            border: "1px solid #333",
            borderRadius: "8px",
            color: "#f5f5f5",
            textDecoration: "none",
            fontSize: "15px",
          }}
        >
          ガントチャートを見る（未実装）
        </Link>
      </section>
    </div>
  );
}
