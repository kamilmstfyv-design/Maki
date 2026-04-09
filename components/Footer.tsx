import {
  RiInstagramLine,
  RiFacebookCircleLine,
  RiWhatsappLine,
} from "react-icons/ri";
import { FiMapPin, FiPhone, FiClock } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a]/95 border-t border-white/5 pt-16 pb-8">
      <div className="my-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* SOL: LOGO VE HAKKINDA */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-white tracking-widest">
              MAKI RESTAURANT
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Geleneksel lezzetleri modern dokunuşlarla harmanlayarak,
              misafirlerimize unutulmaz bir gastronomi deneyimi sunuyoruz.
            </p>
            <div className="flex gap-4 mt-2">
              <RiInstagramLine
                size={24}
                className="text-white hover:text-orange-500 cursor-pointer transition"
              />
              <RiWhatsappLine
                size={24}
                className="text-white hover:text-orange-500 cursor-pointer transition"
              />
            </div>
          </div>

          {/* ORTA: İLETİŞİM BİLGİLERİ */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-semibold text-white">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 hover:text-white transition cursor-pointer">
                <FiMapPin size={20} className="text-orange-500 shrink-0" />
                <span className="text-sm">
                  Baku, Azerbaijan. 28 May Street, No: 12
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-white transition cursor-pointer">
                <FiPhone size={20} className="text-orange-500 shrink-0" />
                <span className="text-sm">+994 55 512 01 57</span>
              </li>
            </ul>
          </div>

          {/* SAĞ: ÇALIŞMA SAATLERİ */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-semibold text-white">
              Çalışma Saatleri
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-gray-400 flex items-center gap-2">
                  <FiClock size={16} className="text-orange-500" /> Hafta İçi:
                </span>
                <span className="text-white font-medium">09:00 - 23:00</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-400 flex items-center gap-2">
                  <FiClock size={16} className="text-orange-500" /> Hafta Sonu:
                </span>
                <span className="text-white font-medium">10:00 - 00:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ALT ŞERİT: COPYRIGHT */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © 2026 Maki Restaurant. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6">
            <span className="text-gray-500 text-xs hover:text-white cursor-pointer transition">
              Gizlilik Politikası
            </span>
            <span className="text-gray-500 text-xs hover:text-white cursor-pointer transition">
              Kullanım Şartları
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
