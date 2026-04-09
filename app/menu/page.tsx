"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

const MenuContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentCategory = searchParams.get("category") || "all";

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      const { data } = await supabase.from("maki_categories").select("*");
      if (data) setCategories(data);
    };
    fetchCats();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let query = supabase.from("maki_products").select("*");

      if (currentCategory !== "all") {
        query = query.eq("category_slug", currentCategory);
      }

      const { data } = await query;
      if (data) setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [currentCategory]);

  const handleCategoryChange = (slug: string) => {
    router.push(`/menu?category=${slug}`, { scroll: false });
  };

  return (
    <main className="min-h-screen bg-[#0f0f10] text-white pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight">
            {currentCategory === "all"
              ? "Menü"
              : currentCategory.replace("-", " ")}
          </h1>
        </div>

        {/* CATEGORY */}
        <div className="flex gap-2 overflow-x-auto pb-8">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-4 py-2 rounded-full text-sm transition ${
              currentCategory === "all"
                ? "bg-orange-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            Hepsi
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                currentCategory === cat.slug
                  ? "bg-orange-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-white/5 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-[#18181b] rounded-xl overflow-hidden border border-white/5 hover:border-orange-400/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* IMAGE */}
                <div className="relative w-full h-40">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-semibold text-white line-clamp-1">
                    {item.name}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-orange-400 font-semibold">
                      {item.price} ₺
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-20 text-gray-500">Ürün yok.</div>
        )}
      </div>
    </main>
  );
};

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <MenuContent />
    </Suspense>
  );
}
