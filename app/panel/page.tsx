"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlinePhotograph,
  HiOutlineCollection,
  HiOutlineShoppingBag,
  HiOutlineLogout,
} from "react-icons/hi";

const PanelPage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/panel/logout", { method: "POST" });
    router.replace("/panel/login");
    router.refresh();
  };

  // Panel menyu elementləri
  const menuItems = [
    {
      id: 1,
      title: "Slider Yönetimi",
      description: "Ana sayfadaki büyük görselleri ve yazıları güncelleyin.",
      icon: <HiOutlinePhotograph size={32} />,
      link: "/panel/slider",
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      id: 2,
      title: "Kategoriler",
      description: "Menü kategorilerini ekleyin, silin veya düzenleyin.",
      icon: <HiOutlineCollection size={32} />,
      link: "/panel/categories",
      color: "bg-orange-500/20 text-orange-400",
    },
    {
      id: 3,
      title: "Ürün Yönetimi",
      description: "Yemekleri, fiyatları ve açıklamaları kontrol edin.",
      icon: <HiOutlineShoppingBag size={32} />,
      link: "/panel/products",
      color: "bg-green-500/20 text-green-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 pb-20 pt-8 text-white md:px-0">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-start justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-orange-400/90">
              Yönetim Alanı
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Maki Yönetim Paneli
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Hoş geldin Admin. İçerik yönetimi için aşağıdaki modüllerden birini seç.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:border-red-500/30 hover:bg-red-500/20 hover:text-red-400"
            title="Çıkış Yap"
          >
            <HiOutlineLogout size={24} />
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-gray-400">Modül Sayısı</p>
            <p className="mt-2 text-2xl font-bold">{menuItems.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-gray-400">Durum</p>
            <p className="mt-2 text-2xl font-bold text-emerald-400">Sistem Aktif</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-gray-400">Kullanıcı</p>
            <p className="mt-2 text-2xl font-bold">admin</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {menuItems.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[oklch(37%_0.013_285.805_/_0.3)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
            >
              <div
                className={`absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${item.color.split(" ")[0]}`}
              />

              <div className="relative flex items-start gap-6">
                <div className={`p-4 rounded-2xl ${item.color}`}>
                  {item.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold transition-colors group-hover:text-orange-400">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <span className="translate-x-2 text-xs font-semibold uppercase tracking-widest opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  Yönetmeye Başla →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-dashed border-white/10 p-6 text-center">
          <p className="text-gray-500 text-sm">
            Yapılan değişiklikler canlı sayfaya yansır. Görselleri yüksek kalite
            ve uygun boyutta yüklemeyi unutmayın.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PanelPage;
