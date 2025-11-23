"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

type Project = {
  id: string;
  name: string;
  description: string | null;
  start_date: string | null;
  due_date: string | null;
  status: string | null;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  // 初回レンダリング時に Supabase から projects を読み込む
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("due_date", { ascending: true });

      if (error) {
        console.error(error);
        setError(error.message);
      } else {
        setProjects(data ?? []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  // ダミープロジェクトを1件追加するボタン
  const handleAddDummyProject = async () => {
    try {
      setAdding(true);
      const { data, error } = await supabase
        .from("projects")
        .insert({
          name: "テストプロジェクト",
          description: "接続確認用に追加したダミーデータです",
          start_date: new Date().toISOString().slice(0, 10),
          due_date: null,
          status: "進行中"
        })
        .select()
        .single();

      if (error) {
        console.error(error);
        alert("プロジェクト追加に失敗しました: " + error.message);
        return;
      }

      setProjects((prev) => [...prev, data as Project]);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div
      style={{
        padding: "32px",
        fontFamily: "sans-serif",
        color: "#f5f5f5",
        background: "#050505",
        minHeight: "100vh"
      }}
    >
      <header
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>プロジェクト一覧</h1>
          <p style={{ fontSize: "14px", color: "#999" }}>
            Supabase の projects テーブルからデータを取得して表示しています。
          </p>
        </div>

        <nav style={{ display: "flex", gap: "12px" }}>
          <Link href="/" style={navButtonStyle}>
            ホーム
          </Link>
          <Link href="/completed" style={navButtonStyle}>
            完了一覧
          </Link>
          <Link href="/staff" style={navButtonStyle}>
            人員カレンダー
          </Link>
        </nav>
      </header>

      <div style={{ marginBottom: "20px", display: "flex", gap: "12px" }}>
        <button
          onClick={handleAddDummyProject}
          disabled={adding}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #555",
            background: adding ? "#444" : "#222",
            color: "#fff",
            cursor: adding ? "not-allowed" : "pointer",
            fontSize: "14px"
          }}
        >
          {adding ? "追加中..." : "ダミープロジェクトを1件追加"}
        </button>
      </div>

      {loading && <p>読み込み中です...</p>}
      {error && (
        <p style={{ color: "#ff6b6b", marginBottom: "16px" }}>
          データ取得中にエラーが発生しました：{error}
        </p>
      )}

      {!loading && projects.length === 0 && !error && (
        <p>まだプロジェクトが登録されていません。</p>
      )}

      {!loading && projects.length > 0 && (
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid #333",
            overflow: "hidden",
            background: "#111"
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#181818" }}>
                <th style={thStyle}>プロジェクト名</th>
                <th style={thStyle}>着工日</th>
                <th style={thStyle}>製作期限</th>
                <th style={thStyle}>ステータス</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} style={{ borderTop: "1px solid #222" }}>
                  <td style={tdStyle}>{p.name}</td>
                  <td style={tdStyle}>{p.start_date ?? "-"}</td>
                  <td style={tdStyle}>{p.due_date ?? "-"}</td>
                  <td style={tdStyle}>{p.status ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const navButtonStyle = {
  padding: "8px 14px",
  background: "#111",
  color: "#f5f5f5",
  borderRadius: "999px",
  border: "1px solid #444",
  textDecoration: "none",
  fontSize: "13px"
};

const thStyle = {
  padding: "10px 12px",
  textAlign: "left",
  fontSize: "13px",
  color: "#ccc",
  borderBottom: "1px solid #222"
};

const tdStyle = {
  padding: "10px 12px",
  fontSize: "13px",
  color: "#f5f5f5"
};
