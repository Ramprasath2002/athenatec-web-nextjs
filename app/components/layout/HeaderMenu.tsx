"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type Props = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

export default function HeaderMenu({ variant = "desktop", onNavigate }: Props) {
  const isMobile = variant === "mobile";

  const [open, setOpen] = useState<string | null>(null);
  const [openMES, setOpenMES] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  /* ---------- DESKTOP (hover) ---------- */
  const openMenu = (menu: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(menu);
  };

  const closeMenuWithDelay = () => {
    closeTimer.current = setTimeout(() => {
      setOpen(null);
      setOpenMES(false);
    }, 180);
  };

  /* ---------- MOBILE (click) ---------- */
  const toggleMenu = (menu: string) => {
    setOpen(open === menu ? null : menu);
  };

  const toggleMES = () => {
    setOpenMES(!openMES);
  };

  /* ================= MOBILE ================= */
  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 items-start">
        {/* PARTNERS */}
        <button
          onClick={() => toggleMenu("partners")}
          className="flex items-center gap-2 font-medium"
        >
          Partners
          <span
            className={`transition-transform duration-300 ${
              open === "partners" ? "rotate-180" : "rotate-0"
            }`}
          >
            ▾
          </span>
        </button>

        {open === "partners" && (
          <div className="ml-4 flex flex-col gap-2 text-sm">
            <Link onClick={onNavigate} href="/partners/siemens-opcenter">
              Siemens Opcenter
            </Link>
            <Link onClick={onNavigate} href="/partners/critical-manufacturing">
              Critical Manufacturing
            </Link>
            <Link onClick={onNavigate} href="/partners/eyelit">
              Eyelit
            </Link>
            {/* <Link
              onClick={onNavigate}
              href="/partners/twinzo"
            >
              Twinzo
            </Link> */}
          </div>
        )}

        {/* SOLUTIONS */}
        <button
          onClick={() => toggleMenu("solutions")}
          className="flex items-center gap-2 font-medium"
        >
          Solutions & Services
          <span
            className={`transition-transform duration-300 ${
              open === "solutions" ? "rotate-180" : "rotate-0"
            }`}
          >
            ▾
          </span>
        </button>

        {open === "solutions" && (
          <div className="ml-4 flex flex-col gap-2 text-sm">
            <button
              onClick={toggleMES}
              className="flex w-full items-center justify-between gap-3.5"
            >
              <span>MES Solutions</span>
              <span
                className={`transition-transform duration-300  text-[20px] ${
                  openMES ? "rotate-90" : "rotate-0"
                }`}
              >
                ›
              </span>
            </button>

            {openMES && (
              <div className="ml-4 flex flex-col gap-2">
                <Link
                  onClick={onNavigate}
                  href="/solutions/mes/siemens-opcenter-mes"
                >
                  Siemens Opcenter MES
                </Link>
                <Link
                  onClick={onNavigate}
                  href="/solutions/mes/critical-manufacturing"
                >
                  Critical Manufacturing
                </Link>
              </div>
            )}

            <Link onClick={onNavigate} href="/solutions/plm-solutions">
              PLM Solutions
            </Link>
            <Link onClick={onNavigate} href="/solutions/enterprise-erp">
              Enterprise ERP
            </Link>
            <Link onClick={onNavigate} href="/solutions/cyber-security">
              Cyber Security
            </Link>
          </div>
        )}

        {/* RESOURCES */}
        <button
          onClick={() => toggleMenu("resources")}
          className="flex items-center gap-2 font-medium"
        >
          Resources
          <span
            className={`transition-transform duration-300 ${
              open === "resources" ? "rotate-180" : "rotate-0"
            }`}
          >
            ▾
          </span>
        </button>

        {open === "resources" && (
          <div className="ml-4 flex flex-col gap-2 text-sm">
            <Link onClick={onNavigate} href="#">
              Blog
            </Link>
            <Link onClick={onNavigate} href="#">
              Case Studies
            </Link>
            <Link onClick={onNavigate} href="#">
              News Room
            </Link>
            <Link onClick={onNavigate} href="#">
              Webinar
            </Link>
          </div>
        )}
      </div>
    );
  }

  /* ================= DESKTOP ================= */
  return (
    <>
      {/* PARTNERS */}
      <div
        className="relative"
        onMouseEnter={() => openMenu("partners")}
        onMouseLeave={closeMenuWithDelay}
      >
        <button className="flex items-center gap-2">
          Partners
          <span
            className={`transition-transform duration-300 ${
              open === "partners" ? "rotate-180" : "rotate-0"
            }`}
          >
            ▾
          </span>
        </button>

        {open === "partners" && (
          <div className="absolute left-0 top-full w-56 rounded-xl bg-white shadow-lg p-4">
            <Link
              className="block py-2 hover:text-[rgb(52,170,220)]"
              href="/partners/siemens-opcenter"
            >
              Siemens Opcenter
            </Link>
            <Link
              className="block py-2 hover:text-[rgb(52,170,220)]"
              href="/partners/critical-manufacturing"
            >
              Critical Manufacturing
            </Link>
            <Link
              className="block py-2 hover:text-[rgb(52,170,220)]"
              href="/partners/eyelit"
            >
              Eyelit
            </Link>
          </div>
        )}
      </div>

      {/* SOLUTIONS */}
      <div
        className="relative"
        onMouseEnter={() => openMenu("solutions")}
        onMouseLeave={closeMenuWithDelay}
      >
        <button className="flex items-center gap-2">
          Solutions & Services
          <span
            className={`transition-transform duration-300 ${
              open === "solutions" ? "rotate-180" : "rotate-0"
            }`}
          >
            ▾
          </span>
        </button>

        {open === "solutions" && (
          <div className="absolute left-1/2 top-full -translate-x-1/2 w-85 rounded-xl bg-white shadow-xl p-2">
            <div
              onMouseEnter={() => setOpenMES(true)}
              onMouseLeave={() => setOpenMES(false)}
              className="relative"
            >
              <div className="flex justify-between p-2 pb-0 hover:bg-gray-100 cursor-pointer">
                <Link
                  href="/solutions/mes"
                  className="hover:text-[rgb(52,170,220)]"
                >
                  MES Solutions
                </Link>
                <span
                  className={`transition-transform duration-200 text-[20px] ${
                    openMES ? "rotate-90" : "rotate-0"
                  }`}
                >
                  ›
                </span>
              </div>

              {openMES && (
                <div className="absolute left-full top-0 w-60 rounded-xl bg-white shadow-lg">
                  <Link
                    className="block px-4 py-3 hover:text-[rgb(52,170,220)] hover:bg-gray-100"
                    href="/solutions/mes/siemens-opcenter-mes"
                  >
                    Siemens Opcenter MES
                  </Link>
                  <Link
                    className="block px-4 py-3 hover:text-[rgb(52,170,220)] hover:bg-gray-100"
                    href="/solutions/mes/critical-manufacturing"
                  >
                    Critical Manufacturing
                  </Link>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 p-2 text-sm">
              <Link
                href="/solutions/plm-solutions"
                className="hover:text-[rgb(52,170,220)]"
              >
                PLM Solutions
              </Link>
              <Link
                href="/solutions/enterprise-erp"
                className="hover:text-[rgb(52,170,220)]"
              >
                Enterprise ERP
              </Link>
              <Link
                href="/solutions/cyber-security"
                className="hover:text-[rgb(52,170,220)]"
              >
                Cyber Security
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* RESOURCES */}
      <div
        className="relative"
        onMouseEnter={() => openMenu("resources")}
        onMouseLeave={closeMenuWithDelay}
      >
        <button className="flex items-center gap-2">
          Resources
          <span
            className={`transition-transform duration-300 ${
              open === "resources" ? "rotate-180" : "rotate-0"
            }`}
          >
            ▾
          </span>
        </button>

        {open === "resources" && (
          <div className="absolute left-0 top-full w-56 rounded-xl bg-white shadow-xl p-4">
            <Link className="block py-2 hover:text-[rgb(52,170,220)]" href="/blog/">
              Blog
            </Link>
            <Link className="block py-2 hover:text-[rgb(52,170,220)]" href="/case-studies">
              Case Studies
            </Link>
            <Link className="block py-2 hover:text-[rgb(52,170,220)]" href="/newsroom">
              News Room
            </Link>
            <Link className="block py-2 hover:text-[rgb(52,170,220)]" href="/webinars">
              Webinars
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
