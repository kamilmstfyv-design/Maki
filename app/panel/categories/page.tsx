"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import {
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineCollection,
} from "react-icons/hi";

const CategoryPanel = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newName, setNewName] = useState("");

  // 1. Kategorileri Getir
  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("maki_categories")
      .select("*")
      .order("id", { ascending: false });
    if (!error) setCategories(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Slug Oluşturma Fonksiyonu (Türkçe karakter desteği ile)
  const createSlug = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Boşlukları - yap
      .replace(/[ğ]/g, "g")
      .replace(/[ü]/g, "u")
      .replace(/[ş]/g, "s")
      .replace(/[ı]/g, "i")
      .replace(/[ö]/g, "o")
      .replace(/[ç]/g, "c")
      .replace(/[^\w-]+/g, "") // Alfanümerik olmayanları sil
      .replace(/--+/g, "-"); // Çift -- leri tek yap
  };

  // 2. Kategori Ekle (Fotoğraf + DB)
  const handleAddCategory = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!newName.trim()) {
        alert("Lütfen önce kategori adını yazın!");
        return;
      }
      if (!e.target.files || e.target.files.length === 0) return;

      setUploading(true);
      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = fileName;

      // A. Storage'a Yükle (maki_category_imgs)
      const { error: uploadError } = await supabase.storage
        .from("maki_category_imgs")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // B. Public URL Al
      const { data: urlData } = supabase.storage
        .from("maki_category_imgs")
        .getPublicUrl(filePath);

      // C. Veritabanına Kaydet
      const { error: dbError } = await supabase.from("maki_categories").insert([
        {
          name: newName,
          slug: createSlug(newName),
          image_url: urlData.publicUrl,
        },
      ]);

      if (dbError) throw dbError;

      setNewName("");
      fetchCategories();
      e.target.value = "";
    } catch (error: any) {
      alert("Hata: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // 3. Kategori Sil
  const handleDelete = async (id: number, imageUrl: string) => {
    if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return;

    try {
      // Storage'dan silme işlemi (URL'den dosya adını ayıklama)
      const fileName = imageUrl.split("/").pop();
      if (fileName) {
        await supabase.storage.from("maki_category_imgs").remove([fileName]);
      }

      const { error } = await supabase
        .from("maki_categories")
        .delete()
        .eq("id", id);
      if (error) throw error;

      setCategories(categories.filter((c) => c.id !== id));
    } catch (error: any) {
      alert("Silme hatası: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold">Kategori Yönetimi</h1>
            <p className="text-gray-500 mt-1">
              Menü gruplarını buradan düzenleyin.
            </p>
          </div>

          {/* EKLEME FORMU */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Kategori Adı (Örn: Kahvaltı)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-500 transition-all flex-1 md:w-64"
            />
            <label
              className={`flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl cursor-pointer transition-all font-semibold ${uploading ? "opacity-50" : ""}`}
            >
              {uploading ? "..." : <HiOutlinePlus size={20} />}
              <input
                type="file"
                accept="image/*"
                onChange={handleAddCategory}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        {/* KATEGORİ LİSTESİ */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 bg-white/5 animate-pulse rounded-3xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="group relative h-48 rounded-3xl overflow-hidden border border-white/5 bg-white/5"
              >
                <Image
                  src={cat.image_url}
                  alt={cat.name}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                  <p className="text-gray-400 text-xs mt-1 italic">
                    Slug: {cat.slug}
                  </p>
                </div>

                {/* SİLME BUTONU */}
                <button
                  onClick={() => handleDelete(cat.id, cat.image_url)}
                  className="absolute top-4 right-4 p-3 bg-red-500/20 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                >
                  <HiOutlineTrash size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPanel;
