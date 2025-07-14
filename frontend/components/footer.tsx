"use client"

import Link from "next/link"
import { Scale } from "lucide-react"

interface FooterProps {
  currentLang: "fr" | "ar" | "en"
}

const footerTranslations = {
  fr: {
    about: "À propos",
    contact: "Contact",
    privacy: "Confidentialité",
    terms: "Conditions",
    copyright: "© 2024 Code Travail Marocain. Tous droits réservés.",
  },
  ar: {
    about: "حول",
    contact: "اتصال",
    privacy: "الخصوصية",
    terms: "الشروط",
    copyright: "© 2024 قانون الشغل المغربي. جميع الحقوق محفوظة.",
  },
  en: {
    about: "About",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",
    copyright: "© 2024 Moroccan Labor Code. All rights reserved.",
  },
}

export function Footer({ currentLang }: FooterProps) {
  const t = footerTranslations[currentLang]
  const isRTL = currentLang === "ar"

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">
                {currentLang === "ar" ? "قانون الشغل المغربي" : "Code Travail Marocain"}
              </span>
            </div>
            <p className="text-gray-400 max-w-md">
              {currentLang === "fr" && "Plateforme dédiée aux droits des travailleurs au Maroc"}
              {currentLang === "ar" && "منصة مخصصة لحقوق العمال في المغرب"}
              {currentLang === "en" && "Platform dedicated to workers' rights in Morocco"}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              {currentLang === "fr" && "Liens utiles"}
              {currentLang === "ar" && "روابط مفيدة"}
              {currentLang === "en" && "Useful Links"}
            </h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">
                {t.about}
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                {t.contact}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              {currentLang === "fr" && "Légal"}
              {currentLang === "ar" && "قانوني"}
              {currentLang === "en" && "Legal"}
            </h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                {t.privacy}
              </Link>
              <Link href="/terms" className="block text-gray-400 hover:text-white transition-colors">
                {t.terms}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">{t.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
