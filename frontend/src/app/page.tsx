"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, FileText, AlertTriangle, Scale, Users, Shield } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const translations = {
  fr: {
    title: "Code Travail Marocain",
    subtitle: "Comprendre vos droits. Protéger votre travail.",
    description:
      "Plateforme complète pour consulter le code du travail marocain, signaler des violations et générer des documents juridiques.",
    viewLaborCode: "Consulter le Code",
    reportViolation: "Signaler une Violation",
    generateDocuments: "Générer des Documents",
    features: {
      title: "Pourquoi choisir notre plateforme ?",
      access: {
        title: "Accès Gratuit",
        description: "Consultez gratuitement tous les articles du code du travail",
      },
      multilingual: {
        title: "Multilingue",
        description: "Disponible en français, arabe et anglais",
      },
      legal: {
        title: "Documents Juridiques",
        description: "Générez des documents légaux personnalisés",
      },
    },
  },
  ar: {
    title: "قانون الشغل المغربي",
    subtitle: "فهم حقوقك. حماية عملك.",
    description: "منصة شاملة لاستشارة قانون الشغل المغربي، الإبلاغ عن الانتهاكات وإنتاج الوثائق القانونية.",
    viewLaborCode: "استشارة القانون",
    reportViolation: "الإبلاغ عن انتهاك",
    generateDocuments: "إنتاج الوثائق",
    features: {
      title: "لماذا تختار منصتنا؟",
      access: {
        title: "وصول مجاني",
        description: "استشر مجاناً جميع مواد قانون الشغل",
      },
      multilingual: {
        title: "متعدد اللغات",
        description: "متوفر بالفرنسية والعربية والإنجليزية",
      },
      legal: {
        title: "وثائق قانونية",
        description: "أنتج وثائق قانونية مخصصة",
      },
    },
  },
  en: {
    title: "Moroccan Labor Code",
    subtitle: "Understand your rights. Protect your work.",
    description:
      "Comprehensive platform to consult the Moroccan labor code, report violations and generate legal documents.",
    viewLaborCode: "View Labor Code",
    reportViolation: "Report Violation",
    generateDocuments: "Generate Documents",
    features: {
      title: "Why choose our platform?",
      access: {
        title: "Free Access",
        description: "Consult all labor code articles for free",
      },
      multilingual: {
        title: "Multilingual",
        description: "Available in French, Arabic and English",
      },
      legal: {
        title: "Legal Documents",
        description: "Generate personalized legal documents",
      },
    },
  },
}

export default function HomePage() {
  const [currentLang, setCurrentLang] = useState<"fr" | "ar" | "en">("fr")
  const t = translations[currentLang]
  const isRTL = currentLang === "ar"

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-green-50 ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Navbar currentLang={currentLang} setCurrentLang={setCurrentLang} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">{t.title}</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">{t.subtitle}</p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">{t.description}</p>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/labor-code">
              <Button size="lg" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                <BookOpen className={`w-5 h-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                {t.viewLaborCode}
              </Button>
            </Link>
            <Link href="/report-violation">
              <Button
                size="lg"
                variant="outline"
                className="w-full md:w-auto border-red-500 text-red-600 hover:bg-red-50 px-8 py-4 text-lg bg-transparent"
              >
                <AlertTriangle className={`w-5 h-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                {t.reportViolation}
              </Button>
            </Link>
            <Link href="/document-generator">
              <Button
                size="lg"
                variant="outline"
                className="w-full md:w-auto border-green-500 text-green-600 hover:bg-green-50 px-8 py-4 text-lg bg-transparent"
              >
                <FileText className={`w-5 h-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                {t.generateDocuments}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t.features.title}</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Scale className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.features.access.title}</h3>
              <p className="text-gray-600">{t.features.access.description}</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.features.multilingual.title}</h3>
              <p className="text-gray-600">{t.features.multilingual.description}</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.features.legal.title}</h3>
              <p className="text-gray-600">{t.features.legal.description}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer currentLang={currentLang} />
    </div>
  )
}
