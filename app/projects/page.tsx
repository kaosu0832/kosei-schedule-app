"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import type React from "react";

// Supabase の projects テーブルに対応した型
// id: 数値 or 文字列（Supabase 側の型に依存するので広めにとる）
// start_date / due_date / status は null 許容（DB側でNULLの場合に対応するため）
type Project = {
  id: number | string;
  name: string;
  description: string | null;
  start_date: string | null;
  due_date: string | null;
  status: string | null;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // 初回ロード時に Supabase からプロジェクト一覧を取得
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("due_date", { ascending: true });

      if (error) {
        console.error("Error fetching projects:", error);
        alert("プロジェクトの取得に失敗しました: " + error.message);
      } else {
        setProjects((data as Project[]) ?? []);
      }

      setLoading(false);
    };

    fetchProjects();
  }, []);

  // ダミープロジェクト追加
  const addDummyProject = async () => {
    try {
      setAdding(true);

      const today = new Date();
      const startStr = today.toISOString().slice(0, 10); // "YYYY-MM-DD"
      const due = new Date(today);
      due.setDate(due.getDate() + 14); // 2週間後
      const dueStr = due.toISOString().slice(0, 10);

      const { data, error } = await supabase
        .from("projects")
        .insert([
          {
            name: "テストプロジェクト",
            description: "接続確認用に追加したダミーデータです",
            start_date: startStr,
            due_date: dueStr, // ← ここを end_date ではなく due_date にしている
            status: "進行中"
          }
        ])
        .select();

      if (error) {
        console.error("Error adding project:", error);
        alert("プロジェクト追加に失敗しました: " + error.message);
        return;
      }

      if (data && data.length > 0) {
        setProjects((prev) => [...prev, ...(data as Project[])]);
      } else {
        alert("追加は成功しましたが、返却データが取得できませんでした。");
      }
    } finally {
      setAdding(false);
    }
  };

  // スタイル
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
        <h1 style={{ fontSize: "24px" }}>プロジェクト一覧</h1>
        <nav style={{ display: "flex", gap: "12px" }}>
          <Link href="/" style={navButtonStyle}>
            ホーム
          </Link>
        </nav>
      </header>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={addDummyProject}
          disabled={adding}
          style={{
            padding: "8px 14px",
            background: adding ? "#444" : "#222",
            color: "#fff",
            border: "1px solid #444",
            borderRadius: "6px",
            cursor: adding ? "not-allowed" : "pointer",
            fontSize: "13px"
          }}
        >
          {adding ? "追加中..." : "ダミープロジェクトを1件追加"}
        </button>
      </div>

      {loading ? (
        <p>読み込み中...</p>
      ) : projects.length === 0 ? (
        <p>プロジェクトはまだありません。</p>
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
