"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Scale, Globe, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface NavbarProps {
  currentLang: "fr" | "ar" | "en"
  setCurrentLang: (lang: "fr" | "ar" | "en") => void
}

const navTranslations = {
  fr: {
    home: "Accueil",
    laborCode: "Code du Travail",
    report: "Signaler",
    documents: "Documents",
  },
  ar: {
    home: "الرئيسية",
    laborCode: "قانون الشغل",
    report: "إبلاغ",
    documents: "وثائق",
  },
  en: {
    home: "Home",
    laborCode: "Labor Code",
    report: "Report",
    documents: "Documents",
  },
}

const languages = [
  { code: "fr" as const, name: "Français", flag: "🇫🇷" },
  { code: "ar" as const, name: "العربية", flag: "🇲🇦" },
  { code: "en" as const, name: "English", flag: "🇬🇧" },
]

export function Navbar({ currentLang, setCurrentLang }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = navTranslations[currentLang]
  const isRTL = currentLang === "ar"
  const currentLanguage = languages.find((lang) => lang.code === currentLang)

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Scale className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              {currentLang === "ar" ? "قانون الشغل" : "Code Travail"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.home}
            </Link>
            <Link href="/labor-code" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.laborCode}
            </Link>
            <Link href="/report-violation" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.report}
            </Link>
            <Link href="/document-generator" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.documents}
            </Link>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                  <Globe className="w-4 h-4" />
                  <span>{currentLanguage?.flag}</span>
                  <span className="hidden sm:inline">{currentLanguage?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={`flex items-center space-x-2 ${currentLang === lang.code ? "bg-blue-50" : ""}`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-700 hover:text-blue-600 py-2">
                {t.home}
              </Link>
              <Link href="/labor-code" className="text-gray-700 hover:text-blue-600 py-2">
                {t.laborCode}
              </Link>
              <Link href="/report-violation" className="text-gray-700 hover:text-blue-600 py-2">
                {t.report}
              </Link>
              <Link href="/document-generator" className="text-gray-700 hover:text-blue-600 py-2">
                {t.documents}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
