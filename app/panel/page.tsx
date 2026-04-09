"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlinePhotograph,
  HiOutlineCollection,
  HiOutlineShoppingBag,
  HiOutlineChartBar,
  HiOutlineLogout,
} from "react-icons/hi";

const PanelPage = () => {
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
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-10 pb-20 px-4 md:px-0">
      <div className="max-w-5xl mx-auto">
        {/* ÜST BAŞLIK VE ÇIKIŞ */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Maki Yönetim Paneli
            </h1>
            <p className="text-gray-500 mt-1">
              Hoş geldin, Admin. Bugün neyi değiştirmek istersin?
            </p>
          </div>
          <button className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all border border-white/5">
            <HiOutlineLogout size={24} />
          </button>
        </div>

        {/* KONTROL KARTLARI - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className="group relative p-8 rounded-3xl bg-[oklch(37%_0.013_285.805_/_0.3)] border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              {/* Arka plan süsü (Hover'da canlanır) */}
              <div
                className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${item.color.split(" ")[0]}`}
              />

              <div className="relative flex items-start gap-6">
                {/* İkon Kutusu */}
                <div className={`p-4 rounded-2xl ${item.color}`}>
                  {item.icon}
                </div>

                {/* Yazılar */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Alt Ok İşareti */}
              <div className="mt-6 flex justify-end">
                <span className="text-xs font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                  Yönetmeye Başla →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* ALT BİLGİ */}
        <div className="mt-16 p-6 rounded-2xl border border-dashed border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            Tüm değişiklikler anında Maki Restaurant web sitesinde canlıya
            alınır. Lütfen görsellerin kalitesine dikkat edin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PanelPage;
