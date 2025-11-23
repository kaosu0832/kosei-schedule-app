"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import type React from "react";

// プロジェクト型
type Project = {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  status: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // 初回ロードで Supabase からデータ取得
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  // ダミープロジェクト追加
  const addDummyProject = async () => {
    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          name: "テストプロジェクト",
          start_date: "2025-01-01",
          end_date: "2025-01-31",
          status: "未着手",
        },
      ])
      .select();

    if (error) {
      console.error("Error adding project:", error);
    } else if (data) {
      setProjects((prev) => [...prev, ...data]);
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
    fontSize: "13px",
  };

  const thStyle: React.CSSProperties = {
    padding: "10px 12px",
    textAlign: "left",
    fontSize: "13px",
    color: "#ccc",
    borderBottom: "1px solid #222",
  };

  const tdStyle: React.CSSProperties = {
    padding: "10px 12px",
    fontSize: "13px",
    color: "#f5f5f5",
  };

  return (
    <div
      style={{
        background: "#0f0f0f",
        minHeight: "100vh",
        color: "#f5f5f5",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        プロジェクト一覧
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <Link href="/" style={navButtonStyle}>
          ホームに戻る
        </Link>
        <button
          onClick={addDummyProject}
          style={{
            marginLeft: "10px",
            padding: "8px 14px",
            background: "#222",
            color: "#fff",
            border: "1px solid #444",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          ダミープロジェクトを1件追加
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
            overflow: "hidden",
          }}
        >
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
              <tr key={p.id} style={{ borderBottom: "1px solid #222" }}>
                <td style={tdStyle}>{p.name}</td>
                <td style={tdStyle}>{p.start_date}</td>
                <td style={tdStyle}>{p.end_date}</td>
                <td style={tdStyle}>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
