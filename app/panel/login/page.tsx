"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PanelLoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nextPath = searchParams.get("next") || "/panel";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/panel/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.message || "Giriş başarısız.");
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } catch {
      setError("Beklenmedik bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090909] p-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-7 shadow-2xl shadow-black/40">
        <p className="text-xs uppercase tracking-[0.25em] text-orange-400/90">
          Maki Panel
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Sign In</h1>
        <p className="mt-2 text-sm text-gray-400">
          Yönetim paneline erişmek için bilgilerinizi girin.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Kullanıcı adı"
              required
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Şifre"
            required
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-400"
          />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Giriş kontrol ediliyor..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
};

const PanelLoginPage = () => {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#090909] p-4 text-white">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-7 shadow-2xl shadow-black/40">
            <p className="text-sm text-gray-300">Yukleniyor...</p>
          </div>
        </main>
      }
    >
      <PanelLoginContent />
    </Suspense>
  );
};

export default PanelLoginPage;

