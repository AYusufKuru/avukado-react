// src/App.jsx
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

// layout
import Navbar from "./components/Layout/Navbar.jsx";
import Footer from "./components/Layout/Footer.jsx";

// public pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Lawyers from "./pages/Lawyers";

// listings (ilanlar)
import Ilanlar from "./pages/Ilanlar";
import IlanOlustur from "./pages/IlanOlustur";

// dashboards & guard
import ClientDashboard from "./pages/ClientDashboard";
import LawyerDashboard from "./pages/LawyerDashboard";
import ProtectedRoute from "./router/ProtectedRoute";

// kurumsal / yasal
import Hakkimizda from "./pages/site/Hakkimizda";
import Gizlilik from "./pages/legal/Gizlilik";
import MesafeliSatis from "./pages/legal/MesafeliSatis";
import IadeSozlesmesi from "./pages/legal/IadeSozlesmesi";
import Ceza from "./pages/IlanAlt/Ceza.jsx";
import Ticaret from "./pages/IlanAlt/Ticaret.jsx";
import Miras from "./pages/IlanAlt/Miras.jsx";
import IsHukuku from "./pages/IlanAlt/IsHukuku.jsx";
import IcraIflas from "./pages/IlanAlt/IcraIflas.jsx";
import Gayrimenkul from "./pages/IlanAlt/Gayrimenkul.jsx";
import Bilisim from "./pages/IlanAlt/Bilisim.jsx";
import Tuketici from "./pages/IlanAlt/Tuketici.jsx";
import Vergi from "./pages/IlanAlt/Vergi.jsx";

function Shell() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="container flex-1 px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        {/* PUBLIC */}
        <Route index element={<Home />} />
        <Route path="/giris" element={<Login />} />
        <Route path="/kayit" element={<Register />} />

        {/* Kurumsal / Yasal (PUBLIC) */}
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/yasal" element={<Navigate to="/yasal/gizlilik" replace />} />
        <Route path="/yasal/gizlilik" element={<Gizlilik />} />
        <Route path="/yasal/mesafeli-satis" element={<MesafeliSatis />} />
        <Route path="/yasal/iade-sozlesmesi" element={<IadeSozlesmesi />} />
        {/* Eski /legal yollarını yönlendir */}
        <Route path="/legal" element={<Navigate to="/yasal/gizlilik" replace />} />
        <Route path="/legal/:rest" element={<Navigate to="/yasal/gizlilik" replace />} />

        {/* İlanlar (PUBLIC) */}
        <Route path="/ilanlar" element={<Ilanlar />} />
        <Route path="/ilanlar/ceza" element={<Ceza />} />
        <Route path="/ilanlar/ticaret" element={<Ticaret />} />
        <Route path="/ilanlar/miras" element={<Miras />} />
        <Route path="/ilanlar/is-hukuku" element={<IsHukuku />} />
        <Route path="/ilanlar/icra-iflas" element={<IcraIflas />} />
        <Route path="/ilanlar/gayrimenkul" element={<Gayrimenkul />} />
        <Route path="/ilanlar/bilisim" element={<Bilisim />} />
        <Route path="/ilanlar/tuketici" element={<Tuketici />} />
        <Route path="/ilanlar/vergi" element={<Vergi />} />


        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route path="/ilan/ac" element={<IlanOlustur />} />
          <Route path="/panel/muvekkil" element={<ClientDashboard />} />
          <Route path="/panel/avukat" element={<LawyerDashboard />} />
          <Route path="/avukatlar" element={<Lawyers />} />
        </Route>

        {/* 404 -> home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
