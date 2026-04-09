"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import {
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineX,
} from "react-icons/hi";

const ProductPanel = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Redaktə rejimi üçün state
  const [editingId, setEditingId] = useState<number | null>(null);

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    category_slug: "",
    image_url: "",
  });

  const fetchData = async () => {
    setLoading(true);
    const { data: cats } = await supabase
      .from("maki_categories")
      .select("name, slug");
    if (cats) setCategories(cats);
    const { data: prods } = await supabase
      .from("maki_products")
      .select("*")
      .order("id", { ascending: false });
    if (prods) setProducts(prods);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Redaktə rejiminə keçid (Məlumatları forma doldurur)
  const startEdit = (product: any) => {
    setEditingId(product.id);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category_slug: product.category_slug,
      image_url: product.image_url,
    });
    window.scrollTo({ top: 0, behavior: "smooth" }); // Formu görmək üçün yuxarı sürüşdür
  };

  // Formu sıfırla
  const resetForm = () => {
    setEditingId(null);
    setProductForm({
      name: "",
      description: "",
      price: "",
      category_slug: "",
      image_url: "",
    });
  };

  // Əlavə etmə və ya Yeniləmə (Save or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.image_url) return alert("Lütfen bir görsel seçin!");

    try {
      setUploading(true);

      if (editingId) {
        // UPDATE İŞLEMİ
        const { error } = await supabase
          .from("maki_products")
          .update({
            name: productForm.name,
            description: productForm.description,
            price: parseFloat(productForm.price),
            category_slug: productForm.category_slug,
            image_url: productForm.image_url,
          })
          .eq("id", editingId);

        if (error) throw error;
        alert("Ürün başarıyla güncellendi!");
      } else {
        // INSERT İŞLEMİ
        const { error } = await supabase
          .from("maki_products")
          .insert([
            {
              ...productForm,
              price: parseFloat(productForm.price),
              is_active: true,
            },
          ]);
        if (error) throw error;
        alert("Yeni ürün eklendi!");
      }

      resetForm();
      fetchData();
    } catch (error: any) {
      alert("İşlem hatası: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Şəkil Yükləmə (Eyni qalır)
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      setUploading(true);
      const file = e.target.files[0];
      const filePath = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("maki_products_image")
        .upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data } = supabase.storage
        .from("maki_products_image")
        .getPublicUrl(filePath);
      setProductForm({ ...productForm, image_url: data.publicUrl });
    } catch (error: any) {
      alert("Resim yükleme hatası: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const toggleStatus = async (id: number, currentStatus: boolean) => {
    await supabase
      .from("maki_products")
      .update({ is_active: !currentStatus })
      .eq("id", id);
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, is_active: !currentStatus } : p,
      ),
    );
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    await supabase.from("maki_products").delete().eq("id", id);
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-10">
          {editingId ? "Ürünü Düzenle" : "Ürün Yönetimi"}
        </h1>

        {/* FORM (Həm Add, həm Edit üçün ortaq) */}
        <form
          onSubmit={handleSubmit}
          className="bg-[oklch(37%_0.013_285.805_/_0.2)] p-8 rounded-3xl border border-white/5 mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 relative"
        >
          {editingId && (
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-white flex items-center gap-1 text-sm"
            >
              <HiOutlineX size={20} /> İptal Et
            </button>
          )}

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Ürün Adı"
              required
              value={productForm.name}
              onChange={(e) =>
                setProductForm({ ...productForm, name: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-orange-500 outline-none text-white"
            />
            <textarea
              placeholder="Ürün Açıklaması"
              value={productForm.description}
              onChange={(e) =>
                setProductForm({ ...productForm, description: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 p-3 rounded-xl h-24 focus:border-orange-500 outline-none text-white"
            />
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Fiyat (₼)"
                required
                value={productForm.price}
                onChange={(e) =>
                  setProductForm({ ...productForm, price: e.target.value })
                }
                className="w-1/2 bg-white/5 border border-white/10 p-3 rounded-xl focus:border-orange-500 outline-none text-white"
              />
              <select
                required
                value={productForm.category_slug}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    category_slug: e.target.value,
                  })
                }
                className="w-1/2 bg-white/5 border border-white/10 p-3 rounded-xl focus:border-orange-500 outline-none text-white"
              >
                <option value="">Kategori Seç</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative h-24 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
              {productForm.image_url ? (
                <>
                  <Image
                    src={productForm.image_url}
                    alt="preview"
                    fill
                    className="object-cover"
                  />
                  <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition cursor-pointer text-xs">
                    Değiştir
                    <input
                      type="file"
                      onChange={uploadImage}
                      className="hidden"
                    />
                  </label>
                </>
              ) : (
                <label className="cursor-pointer text-gray-500 hover:text-white text-sm">
                  {uploading ? "Yükleniyor..." : "Görsel Seç"}
                  <input
                    type="file"
                    onChange={uploadImage}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <button
              type="submit"
              disabled={uploading}
              className={`w-full py-3 rounded-xl font-bold transition ${editingId ? "bg-blue-600 hover:bg-blue-700" : "bg-orange-500 hover:bg-orange-600"}`}
            >
              {editingId ? "Değişiklikleri Kaydet" : "Ürünü Kaydet"}
            </button>
          </div>
        </form>

        {/* TABLO */}
        <div className="overflow-x-auto bg-white/5 rounded-3xl border border-white/5">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5">
              <tr>
                <th className="p-4 text-gray-400 font-medium">Görsel</th>
                <th className="p-4 text-gray-400 font-medium">Ürün</th>
                <th className="p-4 text-gray-400 font-medium">Fiyat</th>
                <th className="p-4 text-gray-400 font-medium text-right">
                  İşlem
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-white/5 hover:bg-white/10 transition"
                >
                  <td className="p-4">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="rounded-lg object-cover h-12 w-12"
                    />
                  </td>
                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4 text-orange-500 font-bold">
                    {item.price} ₼
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition"
                      title="Düzenle"
                    >
                      <HiOutlinePencil size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition"
                      title="Sil"
                    >
                      <HiOutlineTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductPanel;
