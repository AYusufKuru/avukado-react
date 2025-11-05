import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Logo ve Açıklama - 2 kolon */}
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-3">
                        <img src="/img/logo.png" alt="Avukado" className="h-8 w-8" />
                        <span className="font-extrabold text-lg">AVUKADO</span>
                    </div>
                    <p className="text-sm text-slate-600">Hukukun En Doğal Hali.</p>
                </div>

                {/* Site Linkleri - 1 kolon */}
                <div>
                    <h4 className="font-semibold mb-3">Site</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/hakkimizda" className="hover:text-teal-700">Hakkımızda</Link></li>
                        <li><Link to="/avukatlar" className="hover:text-teal-700">Avukatlar</Link></li>
                        <li className="pt-4">
                            <Link to="/giris" className="text-teal-600 hover:text-teal-800 font-medium">Giriş Yap</Link>
                        </li>
                        <li>
                            <Link to="/ilan/ac" className="text-amber-600 hover:text-amber-800 font-medium">
                                İlan Aç
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Yasal Linkler - 1 kolon (sadece burada) */}
                <div>
                    <h4 className="font-semibold mb-3">Yasal</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/yasal/gizlilik" className="hover:text-teal-700">Gizlilik</Link></li>
                        <li><Link to="/yasal/iade-sozlesmesi" className="hover:text-teal-700">İade Şartları</Link></li>
                        <li><Link to="/yasal/mesafeli-satis" className="hover:text-teal-700">Mesafeli Satış</Link></li>
                    </ul>
                </div>

                {/* İletişim Bilgileri - 1 kolon */}
                <div>
                    <h4 className="font-semibold mb-3">İletişim</h4>
                    <ul className="space-y-2 text-sm">
                        <li>destek@avukado.com</li>
                        <li>+90 212 000 00 00</li>
                        <li>Hafta içi 09:00–18:00</li>
                    </ul>
                </div>
            </div>

            {/* Telif Hakkı */}
            <div className="border-t border-slate-200 py-4">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="text-xs text-slate-500">
                        © 2025 Avukado Bilgi Teknolojileri A.Ş. Tüm hakları saklıdır.
                    </div>
                </div>
            </div>
        </footer>
    );
}
