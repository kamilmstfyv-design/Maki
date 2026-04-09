"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { hasSupabaseEnv, supabase } from "@/lib/supabase";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";

const MainSlider = () => {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.from("my_slider").select("*");
      if (!error && data) {
        setSlides(data);
      }
      setLoading(false);
    };

    fetchSlides();
  }, []);

  if (loading) return <SliderSkeleton />; // Yüklənərkən boşluq qalmasın
  if (!hasSupabaseEnv) return null;

  return (
    <section className="my- relative w-full h-[500px] md:h-[650px] overflow-hidden">
      <Swiper
        spaceBetween={0}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        modules={[Pagination, Autoplay]}
        className="h-full w-full mx-auto max-w-7xl rounded"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Şəkil mütləq fill və object-cover olmalıdır */}
              <Image
                src={slide.image_url} // Supabase-dən gələn sütun adı
                alt={slide.title || "Slider Image"}
                fill
                priority // İlk yüklənmə sürəti üçün
                className="object-cover"
              />

              {/* Şəkil üzərində yazı (opsional) */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

// MainSlider komponentinin xaricində, aşağıda:
export const SliderSkeleton = () => (
  <div className="mx-auto max-w-7xl rounded bg-gray-800 animate-pulse h-[500px] md:h-[650px] w-full" />
);

export default MainSlider;
