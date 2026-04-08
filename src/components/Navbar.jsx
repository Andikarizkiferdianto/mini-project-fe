import { useState, useEffect } from "react";

function Navbar() {
  const [active, setActive] = useState("Beranda");

  const menus = [
    { name: "Beranda", target: "top" },
    { name: "Tentang", target: "tentang" },
    { name: "Modul", target: "modul" },
    { name: "Harga", target: "harga" },
    { name: "Kerjasama", target: "kerjasama" },
    { name: "Dokumentasi", target: "dokumentasi" },
    { name: "Kontak", target: "kontak" },
  ];

  const scrollToSection = (targetId) => {
  if (targetId === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
};
  useEffect(() => {
    const handleScroll = () => {
      let current = "Beranda";

      menus.forEach((menu) => {
        if (menu.target === "top") return;

        const el = document.getElementById(menu.target);

        if (el) {
          const rect = el.getBoundingClientRect();

          if (rect.top <= 150 && rect.bottom >= 150) {
            current = menu.name;
          }
        }
      });

      if (window.scrollY < 100) {
        current = "Beranda";
      }

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-8 py-4 shadow-sm">
      
      <div className="text-2xl font-bold text-violet-700">SAP</div>

      <ul className="hidden md:flex space-x-6">
        {menus.map((menu) => (
          <li
            key={menu.name}
            onClick={() => {
              setActive(menu.name);

              if (menu.target === "top") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                const el = document.getElementById(menu.target);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
            className="relative cursor-pointer group"
          >
            <span
              className={`text-lg font-bold transition-colors duration-200
              ${active === menu.name ? "text-violet-600" : "text-gray-600"}
              hover:text-violet-600`}
            >
              {menu.name}
            </span>

            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-violet-600 transition-all duration-300
              ${active === menu.name ? "w-full" : "w-0 group-hover:w-full"}`}
            ></span>
          </li>
        ))}
      </ul>

      <button 
      onClick={() => {
        const el = document.getElementById("kontak");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }}
      className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 font-bold rounded-md bg-violet-600 px-6 py-2 text-white hover:bg-violet-700"
      >
        Ajukan Demo
        </button>
        </nav>
        );
      }

export default Navbar;