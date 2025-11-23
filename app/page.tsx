"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [inProgress, setInProgress] = useState<number>(0);
  const [completed, setCompleted] = useState<number>(0);

  // データ取得
  useEffect(() => {
    const fetchCounts = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("status");

      if (!error && data) {
        const inProg = data.filter((p) => p.status === "進行中").length;
        const done = data.filter((p) => p.status === "完了").length;

        setInProgress(inProg);
        setCompleted(done);
      }
    };

    fetchCounts();
  }, []);

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

      {/* カウント表示 */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#181818",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #333",
            minWidth: "150px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "14px", marginBottom: "8px" }}>
            進行中プロジェクト
          </div>
          <div style={{ fontSize: "26px", fontWeight: "bold" }}>
            {inProgress}
          </div>
        </div>

        <div
          style={{
            background: "#181818",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #333",
            minWidth: "150px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "14px", marginBottom: "8px" }}>
            完了プロジェクト
          </div>
          <div style={{ fontSize: "26px", fontWeight: "bold", color: "#0f0" }}>
            {completed}
          </div>
        </div>
      </div>

      {/* リンク一覧 */}
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
          新規プロジェクトを作成する
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
