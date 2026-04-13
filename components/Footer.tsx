import {
  RiInstagramLine,
  RiWhatsappLine,
} from "react-icons/ri";
import { FiMapPin, FiPhone } from "react-icons/fi";
import Link from "next/link";

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
              <Link
                href="https://www.instagram.com/maki_cesme?igsh=MWw3dXB4cXVmZnpqcg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <RiInstagramLine
                  size={24}
                  className="text-white hover:text-orange-500 cursor-pointer transition"
                />
              </Link>
              <Link
                href="https://wa.me/905428459464"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <RiWhatsappLine
                  size={24}
                  className="text-white hover:text-orange-500 cursor-pointer transition"
                />
              </Link>
            </div>
          </div>

          {/* ORTA: İLETİŞİM BİLGİLERİ */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-semibold text-white">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 hover:text-white transition cursor-pointer">
                <FiMapPin size={20} className="text-orange-500 shrink-0" />
                <span className="text-sm">
                  Çeşme İzmir. Ildır mah.37202sk no11
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-white transition cursor-pointer">
                <FiPhone size={20} className="text-orange-500 shrink-0" />
                <a className="text-sm" href="tel:+905428459464">
                  +90 542 845 94 64
                </a>
              </li>
            </ul>
          </div>

          {/* SAĞ: ÇALIŞMA SAATLERİ */}
          {/* <div className="flex flex-col gap-6">
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
          </div> */}
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
