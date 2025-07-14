"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Send } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const translations = {
  fr: {
    title: "Signaler une Violation",
    subtitle: "Signalez les violations du code du travail de manière confidentielle",
    name: "Nom (optionnel)",
    email: "Email (optionnel)",
    violationType: "Type de violation",
    description: "Description détaillée",
    descriptionPlaceholder: "Décrivez la violation en détail...",
    submit: "Envoyer le signalement",
    success: "Signalement envoyé avec succès",
    violations: {
      unpaidSalary: "Salaire non payé",
      abusiveDismissal: "Licenciement abusif",
      overtime: "Heures supplémentaires non payées",
      harassment: "Harcèlement au travail",
      safety: "Conditions de sécurité",
      discrimination: "Discrimination",
      other: "Autre",
    },
  },
  ar: {
    title: "الإبلاغ عن انتهاك",
    subtitle: "أبلغ عن انتهاكات قانون الشغل بسرية تامة",
    name: "الاسم (اختياري)",
    email: "البريد الإلكتروني (اختياري)",
    violationType: "نوع الانتهاك",
    description: "وصف مفصل",
    descriptionPlaceholder: "صف الانتهاك بالتفصيل...",
    submit: "إرسال البلاغ",
    success: "تم إرسال البلاغ بنجاح",
    violations: {
      unpaidSalary: "أجر غير مدفوع",
      abusiveDismissal: "فصل تعسفي",
      overtime: "ساعات إضافية غير مدفوعة",
      harassment: "تحرش في العمل",
      safety: "ظروف السلامة",
      discrimination: "تمييز",
      other: "أخرى",
    },
  },
  en: {
    title: "Report a Violation",
    subtitle: "Report labor code violations confidentially",
    name: "Name (optional)",
    email: "Email (optional)",
    violationType: "Violation type",
    description: "Detailed description",
    descriptionPlaceholder: "Describe the violation in detail...",
    submit: "Submit Report",
    success: "Report submitted successfully",
    violations: {
      unpaidSalary: "Unpaid salary",
      abusiveDismissal: "Abusive dismissal",
      overtime: "Unpaid overtime",
      harassment: "Workplace harassment",
      safety: "Safety conditions",
      discrimination: "Discrimination",
      other: "Other",
    },
  },
}

export default function ReportViolationPage() {
  const [currentLang, setCurrentLang] = useState<"fr" | "ar" | "en">("fr")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    violationType: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const t = translations[currentLang]
  const isRTL = currentLang === "ar"
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: t.success,
      description:
        currentLang === "fr"
          ? "Votre signalement a été reçu et sera traité dans les plus brefs délais."
          : currentLang === "ar"
            ? "تم استلام بلاغكم وسيتم معالجته في أقرب وقت ممكن."
            : "Your report has been received and will be processed as soon as possible.",
    })

    setIsSubmitting(false)

    // Reset form
    setFormData({
      name: "",
      email: "",
      violationType: "",
      description: "",
    })

    // Redirect to home after 2 seconds
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navbar currentLang={currentLang} setCurrentLang={setCurrentLang} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">{t.name}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={t.name}
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder={t.email}
                  />
                </div>

                {/* Violation Type */}
                <div className="space-y-2">
                  <Label htmlFor="violationType">{t.violationType}</Label>
                  <Select
                    value={formData.violationType}
                    onValueChange={(value) => handleInputChange("violationType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.violationType} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unpaidSalary">{t.violations.unpaidSalary}</SelectItem>
                      <SelectItem value="abusiveDismissal">{t.violations.abusiveDismissal}</SelectItem>
                      <SelectItem value="overtime">{t.violations.overtime}</SelectItem>
                      <SelectItem value="harassment">{t.violations.harassment}</SelectItem>
                      <SelectItem value="safety">{t.violations.safety}</SelectItem>
                      <SelectItem value="discrimination">{t.violations.discrimination}</SelectItem>
                      <SelectItem value="other">{t.violations.other}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">{t.description}</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder={t.descriptionPlaceholder}
                    rows={6}
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={isSubmitting || !formData.description || !formData.violationType}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {currentLang === "fr" ? "Envoi..." : currentLang === "ar" ? "جاري الإرسال..." : "Sending..."}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      {t.submit}
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-800">
                {currentLang === "fr" &&
                  "🔒 Vos informations sont traitées de manière confidentielle et sécurisée. Vous pouvez signaler anonymement."}
                {currentLang === "ar" && "🔒 يتم التعامل مع معلوماتكم بسرية وأمان تام. يمكنكم الإبلاغ بشكل مجهول."}
                {currentLang === "en" &&
                  "🔒 Your information is handled confidentially and securely. You can report anonymously."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer currentLang={currentLang} />
    </div>
  )
}
