"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("projects").insert([
      {
        name,
        description,
        start_date: startDate,
        due_date: dueDate,
        status: "進行中",
      },
    ]);

    setLoading(false);

    if (error) {
      setMessage("エラーが発生しました：" + error.message);
    } else {
      setMessage("プロジェクトを作成しました！");
      setTimeout(() => router.push("/projects"), 800);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    background: "#222",
    color: "white",
    border: "1px solid #555",
    borderRadius: "6px",
    marginBottom: "15px",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    background: "#00aaff",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    border: "none",
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "20px" }}>
        新規プロジェクト作成
      </h1>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>プロジェクト名</label>
        <input
          style={inputStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label style={labelStyle}>説明</label>
        <input
          style={inputStyle}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label style={labelStyle}>着工日</label>
        <input
          type="date"
          style={inputStyle}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label style={labelStyle}>製作期限</label>
        <input
          type="date"
          style={inputStyle}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "作成中..." : "作成する"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "15px", fontSize: "16px", color: "#0f0" }}>
          {message}
        </p>
      )}
    </div>
  );
}
