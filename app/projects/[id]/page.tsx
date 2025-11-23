"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Link from "next/link";
import { useParams } from "next/navigation";

// projects テーブルの型
type Project = {
  id: number | string;
  name: string;
  description: string | null;
  start_date: string | null;
  due_date: string | null;
  status: string | null;
};

export default function ProjectDetailPage() {
  const { id } = useParams(); 
  // useParams(Next.jsのURLパラメータ取得フック：/projects/123 の 123 の部分を読み取れる。DBに問い合わせる時のキーになる)

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      setLoading(true);

      // id で1件取得（eq：一致検索）
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single(); 
        // .single()（1件だけ返すことを保証するメソッド。複数件返された時にエラー扱いにして不整合を防ぐために必要）

      if (error) {
        console.error("Error loading project:", error);
        alert("プロジェクトの読み込みに失敗：" + error.message);
      } else {
        setProject(data as Project);
      }

      setLoading(false);
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "20px", color: "#fff" }}>
        読み込み中…
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ padding: "20px", color: "#fff" }}>
        プロジェクトが見つかりません。
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#0f0f0f",
        minHeight: "100vh",
        color: "white",
        padding: "30px",
      }}
    >
      <h1 style={{ fontSize: "26px", marginBottom: "20px" }}>
        プロジェクト詳細
      </h1>

      <div
        style={{
          background: "#181818",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #333",
          maxWidth: "500px",
        }}
      >
        <p><strong>ID:</strong> {project.id}</p>
        <p><strong>プロジェクト名:</strong> {project.name}</p>
        <p><strong>説明:</strong> {project.description ?? "-"}</p>
        <p><strong>着工日:</strong> {project.start_date ?? "-"}</p>
        <p><strong>製作期限:</strong> {project.due_date ?? "-"}</p>
        <p><strong>ステータス:</strong> {project.status ?? "-"}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link href="/projects" style={{ color: "#ccc", textDecoration: "underline" }}>
          ← プロジェクト一覧へ戻る
        </Link>
      </div>
    </div>
  );
}
