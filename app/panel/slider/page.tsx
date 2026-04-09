"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import {
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlinePhotograph,
} from "react-icons/hi";

const SliderPanel = () => {
  const [slides, setSlides] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Verileri Getir (Stabil Sorgu)
  const fetchSlides = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("my_slider")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;
      setSlides(data || []);
    } catch (err) {
      console.error("Veri çekme hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // 2. Fotoğraf Yükleme (Hata Kontrollü)
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];

      // Dosya adını temizleyelim ve benzersiz yapalım
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = fileName;

      // A. Storage'a Yükle
      const { error: uploadError } = await supabase.storage
        .from("Menu_slider_photo")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // B. Public URL Al
      const { data: urlData } = supabase.storage
        .from("Menu_slider_photo")
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      // C. Veritabanına Kaydet (Sütun adlarını tam kontrol et)
      const { error: dbError } = await supabase.from("my_slider").insert([
        {
          image_url: publicUrl,
          storage_path: filePath,
        },
      ]);

      if (dbError) {
        // Eğer DB'ye yazılamazsa, storage'daki dosyayı da sil ki çöp kalmasın
        await supabase.storage.from("Menu_slider_photo").remove([filePath]);
        throw dbError;
      }

      await fetchSlides(); // Listeyi güncelle
      e.target.value = ""; // Inputu temizle
    } catch (error: any) {
      console.error("Detaylı Yükleme Hatası:", error.message);
      alert(`Yükleme hatası: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  // 3. Silme İşlemi (ID tipi Number olarak ayarlandı)
  const handleDelete = async (id: number, storagePath: string) => {
    const confirmDelete = confirm(
      "Bu görseli silmek istediğinize emin misiniz?",
    );
    if (!confirmDelete) return;

    try {
      // A. Storage'dan Sil
      if (storagePath) {
        const { error: storageError } = await supabase.storage
          .from("Menu_slider_photo")
          .remove([storagePath]);
        if (storageError)
          console.warn("Storage silme uyarısı:", storageError.message);
      }

      // B. Tablodan Sil
      const { error: dbError } = await supabase
        .from("my_slider")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      setSlides((prev) => prev.filter((s) => s.id !== id));
    } catch (error: any) {
      alert(`Silme hatası: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Slider Yönetimi</h1>
            <p className="text-gray-500 mt-1 text-sm">
              Hızlı ve sorunsuz görsel yönetimi.
            </p>
          </div>

          <label
            className={`flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl cursor-pointer transition-all font-semibold shadow-lg shadow-orange-500/20 ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {uploading ? (
              "Yükleniyor..."
            ) : (
              <>
                <HiOutlinePlus size={20} /> Fotoğraf Ekle
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-video bg-white/5 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="group relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-white/5"
              >
                <Image
                  src={slide.image_url}
                  alt="Slider"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <button
                    onClick={() => handleDelete(slide.id, slide.storage_path)}
                    className="p-4 bg-red-500 text-white rounded-full hover:scale-110 active:scale-95 transition-all"
                  >
                    <HiOutlineTrash size={28} />
                  </button>
                </div>

                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md p-2 rounded-lg text-[10px] text-gray-300">
                  <HiOutlinePhotograph className="inline mr-1" />
                  ID: {slide.id}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && slides.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
            <p className="text-gray-500 italic">
              Henüz hiç fotoğraf eklenmemiş.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderPanel;
