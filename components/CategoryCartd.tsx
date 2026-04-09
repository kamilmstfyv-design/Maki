"use client";

import { hasSupabaseEnv, supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CategorySection = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("maki_categories")
          .select("*");

        if (!error && data) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Xəta:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories(); // FUNKSİYANI ÇAĞIRMAQ LAZIMDIR
  }, []);

  // Skeleton və ya sadə yüklənmə halı
  if (loading) {
    return (
      <section className="my-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-white/5 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!hasSupabaseEnv) {
    return null;
  }

  return (
    <section className="my-container py-12">
      {/* ÜST BAŞLIQ */}
      <div className="mb-8 px-4 md:px-0">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Kategoriler
        </h2>
        <div className="h-1 w-20 bg-orange-500 mt-2" />
      </div>

      {/* KATEQORİYA KARTLARI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            href={`/menu?category=${cat.slug}`}
            scroll={false}
            key={cat.id}
            className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-lg"
          >
            {/* FOTOQRAF */}
            <Image
              src={cat.image_url} // Bazadakı sütun adının 'image' olduğundan əmin ol
              alt={cat.name || "categories"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* QARALTMA */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* İÇİNDƏKİ YAZI */}
            <div className="absolute inset-0 flex items-end justify-center p-6">
              <h3 className="text-white text-xl md:text-2xl font-bold text-center drop-shadow-md">
                {cat.name}
              </h3>
            </div>

            {/* HOVER KƏNARLIĞI */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-300" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
