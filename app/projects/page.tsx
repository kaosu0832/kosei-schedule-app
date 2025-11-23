"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Project = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  due_date: string;
  status: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // テーブルヘッダー用スタイル
  const thStyle: React.CSSProperties = {
    padding: "10px",
    textAlign: "left",
    fontSize: "14px",
    color: "#f0f0f0",
    borderBottom: "1px solid #333",
  };

  // テーブルデータ用スタイル
  const tdStyle: React.CSSProperties = {
    padding: "10px",
    textAlign: "left",
    fontSize: "13px",
    color: "#e0e0e0",
    borderBottom: "1px solid #333",
  };

  // プロジェクト取得
  const loadProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("読み込みエラー:", error);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  // 初回ロード
  useEffect(() => {
    loadProjects();
  }, []);

  // ダミーデータ追加
  const addDummyProject = async () => {
    const { error } = await supabase.from("projects").insert({
      name: "ダミープロジェクト",
      description: "テスト用です",
      start_date: "2025-01-01",
      due_date: "2025-01-15",
      status: "進行中",
    });

    if (error) {
      console.error(error);
      return;
    }
    loadProjects();
  };

  return (
    <div style={{ padding: "30px", color: "#f0f0f0" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>プロジェクト一覧</h1>

      {/* ダミー追加ボタン */}
      <button
        onClick={addDummyProject}
        style={{
          padding: "10px 16px",
          background: "#333",
          border: "1px solid #444",
          borderRadius: "6px",
          marginBottom: "20px",
        }}
      >
        ダミープロジェクトを1件追加
      </button>

      {loading ? (
        <p>読み込み中...</p>
      ) : projects.length === 0 ? (
        <p>登録されたプロジェクトはありません。</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr style={{ background: "#181818" }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>プロジェクト名</th>
              <th style={thStyle}>着工日</th>
              <th style={thStyle}>製作期限</th>
              <th style={thStyle}>ステータス</th>
              <th style={thStyle}>詳細</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #333" }}>
                {/* IDクリック → 詳細 */}
                <td style={tdStyle}>
                  <Link href={`/projects/${p.id}`}>{p.id}</Link>
                </td>

                {/* 名称クリック → 詳細 */}
                <td style={tdStyle}>
                  <Link href={`/projects/${p.id}`}>{p.name}</Link>
                </td>

                <td style={tdStyle}>{p.start_date}</td>
                <td style={tdStyle}>{p.due_date}</td>
                <td style={tdStyle}>{p.status}</td>

                {/* 詳細ボタン */}
                <td style={tdStyle}>
                  <Link
                    href={`/projects/${p.id}`}
                    style={{
                      padding: "6px 12px",
                      background: "#2a2a2a",
                      borderRadius: "6px",
                      border: "1px solid #444",
                    }}
                  >
                    詳細
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
