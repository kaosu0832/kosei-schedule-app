"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Link from "next/link";

// 新規プロジェクト作成ページ
export default function NewProjectPage() {
  // 各フォームの入力状態を保持する useState
  // useState(React の状態管理フック：UI の入力値を保持できる仕組み。これがないと画面が入力に反応しない)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  // 新規プロジェクト登録処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // form のデフォルト動作(ページリロード)を防ぐ

    if (!name || !startDate || !dueDate) {
      alert("必須項目を入力してください。");
      return;
    }

    setLoading(true);

    // Supabase の INSERT（DB に新しい行を追加する処理）
    const { error } = await supabase.from("projects").insert([
      {
        name: name,
        description: description,
        start_date: startDate,
        due_date: dueDate,
        status: "未着手", // 初期ステータス
      },
    ]);

    if (error) {
      alert("プロジェクトの作成に失敗しました：" + error.message);
    } else {
      alert("プロジェクトを登録しました！");
      window.location.href = "/projects"; // 完了後一覧へ戻る
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        background: "#0f0f0f",
        minHeight: "100vh",
        color: "#f5f5f5",
        padding: "30px",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        新規プロジェクト作成
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "360px",
        }}
      >
        <label>
          プロジェクト名（必須）
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              background: "#181818",
              border: "1px solid #333",
              borderRadius: "6px",
              color: "#fff",
            }}
          />
        </label>

        <label>
          説明文
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              height: "80px",
              background: "#181818",
              border: "1px solid #333",
              borderRadius: "6px",
              color: "#fff",
            }}
          />
        </label>

        <label>
          着工日（start_date）
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              background: "#181818",
              border: "1px solid #333",
              borderRadius: "6px",
              color: "#fff",
            }}
          />
        </label>

        <label>
          製作期限（due_date）
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              background: "#181818",
              border: "1px solid #333",
              borderRadius: "6px",
              color: "#fff",
            }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            background: "#444",
            borderRadius: "6px",
            border: "none",
            color: "#fff",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          {loading ? "登録中..." : "登録する"}
        </button>
      </form>

      <Link
        href="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          color: "#ccc",
          textDecoration: "underline",
        }}
      >
        ホームに戻る
      </Link>
    </div>
  );
}
