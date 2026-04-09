"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="min-h-screen bg-[oklch(37%_0.013_285.805_/_0.6)] text-white">
      <Header />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-orange-400/90">
              Maki Restaurant
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">
              {currentCategory === "all"
                ? "Menü"
                : currentCategory.replace("-", " ")}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-gray-400">
              Taze ve lezzetli seçenekleri kategoriye göre filtreleyip hızlıca
              inceleyin.
            </p>
          </div>

          <div className="sticky top-16 z-20 -mx-2 mb-8 border-y border-white/10 bg-[#0f0f10]/65 px-2 py-3 backdrop-blur-md">
            <div className="flex gap-2 overflow-x-auto">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  currentCategory === "all"
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                Hepsi
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    currentCategory === cat.slug
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-64 rounded-2xl bg-white/8"
                />
              ))}
            </div>
          ) : (
            <div
              key={currentCategory}
              className="grid grid-cols-2 gap-5 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-300 md:grid-cols-3"
            >
              {products.map((item) => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#18181b]/80 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/40"
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      sizes="(max-width:768px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  <div className="space-y-2 p-4">
                    <h3 className="line-clamp-1 text-sm font-semibold text-white">
                      {item.name}
                    </h3>

                    <p className="line-clamp-2 text-xs text-gray-400">
                      {item.description}
                    </p>

                    <div className="pt-2">
                      <span className="font-semibold text-orange-400">
                        {item.price} ₺
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="py-20 text-center text-gray-400">Ürün yok.</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <MenuContent />
    </Suspense>
  );
}
