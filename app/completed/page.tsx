"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import type React from "react";

// Supabase の projects テーブル構造に合わせた型
// id は数値 or 文字列として広めにとる（Supabase側の型に依存するため）
type Project = {
  id: number | string;
  name: string;
  description: string | null;
  start_date: string | null;
  due_date: string | null;
  status: string | null;
};

export default function CompletedProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // 初回ロード時に「status = '完了'」だけ取得
  useEffect(() => {
    const fetchCompleted = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("projects") // projectsテーブル(工期管理の案件一覧テーブル。アプリ全体のベースとなる)
        .select("*")
        .eq("status", "完了") // 完了のみ絞り込み(eq: 指定したカラムが特定の値と等しい行だけを抽出するSupabaseのフィルタ関数)
        .order("due_date", { ascending: true });

      if (error) {
        console.error("Error fetching completed projects:", error);
        alert("完了プロジェクトの取得に失敗しました: " + error.message);
      } else {
        setProjects((data as Project[]) ?? []);
      }

      setLoading(false);
    };

    fetchCompleted();
  }, []);

  // スタイル定義（React.CSSProperties: Reactのstyle用オブジェクトの公式型。
  // こうすることで style={...} に渡すプロパティの型エラーを防ぎ、ビルドエラーを回避する）
  const navButtonStyle = {
    padding: "8px 14px",
    background: "#111",
    color: "#f5f5f5",
    borderRadius: "999px",
    border: "1px solid #444",
    textDecoration: "none",
    fontSize: "13px"
  };

  const thStyle: React.CSSProperties = {
    padding: "10px 12px",
    textAlign: "left",
    fontSize: "13px",
    color: "#ccc",
    borderBottom: "1px solid #222"
  };

  const tdStyle: React.CSSProperties = {
    padding: "10px 12px",
    fontSize: "13px",
    color: "#f5f5f5"
  };

  return (
    <div
      style={{
        background: "#0f0f0f",
        minHeight: "100vh",
        color: "#f5f5f5",
        padding: "20px"
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <h1 style={{ fontSize: "24px" }}>完了プロジェクト一覧</h1>
        <nav style={{ display: "flex", gap: "12px" }}>
          <Link href="/" style={navButtonStyle}>
            ホーム
          </Link>
          <Link href="/projects" style={navButtonStyle}>
            全プロジェクト一覧
          </Link>
        </nav>
      </header>

      {loading ? (
        <p>読み込み中...</p>
      ) : projects.length === 0 ? (
        <p>完了したプロジェクトはまだありません。</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#111",
            borderRadius: "6px",
            overflow: "hidden"
          }}
        >
          <thead>
            <tr style={{ background: "#181818" }}>
              <th style={thStyle}>プロジェクト名</th>
              <th style={thStyle}>説明</th>
              <th style={thStyle}>着工日</th>
              <th style={thStyle}>製作期限</th>
              <th style={thStyle}>ステータス</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #222" }}>
                <td style={tdStyle}>{p.name}</td>
                <td style={tdStyle}>{p.description ?? "-"}</td>
                <td style={tdStyle}>{p.start_date ?? "-"}</td>
                <td style={tdStyle}>{p.due_date ?? "-"}</td>
                <td style={tdStyle}>{p.status ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
