import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 実行時にURLやキーがないと困るので、ない場合はエラーにする
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "SupabaseのURLまたはAnon Keyが設定されていません。Vercelの環境変数を確認してください。"
  );
}

// アプリ全体で使い回すSupabaseクライアント
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
