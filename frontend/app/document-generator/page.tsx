"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileText, Download, Eye } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const translations = {
  fr: {
    title: "Générateur de Documents Juridiques",
    subtitle: "Créez des documents juridiques personnalisés",
    name: "Votre nom complet",
    employerName: "Nom de l'employeur",
    date: "Date",
    documentType: "Type de document",
    language: "Langue du document",
    generate: "Générer le document",
    preview: "Aperçu",
    download: "Télécharger PDF",
    documents: {
      complaint: "Plainte",
      claim: "Lettre de réclamation",
      certificate: "Attestation",
    },
    languages: {
      fr: "Français",
      ar: "العربية",
      en: "English",
    },
  },
  ar: {
    title: "مولد الوثائق القانونية",
    subtitle: "أنشئ وثائق قانونية مخصصة",
    name: "اسمكم الكامل",
    employerName: "اسم المشغل",
    date: "التاريخ",
    documentType: "نوع الوثيقة",
    language: "لغة الوثيقة",
    generate: "إنتاج الوثيقة",
    preview: "معاينة",
    download: "تحميل PDF",
    documents: {
      complaint: "شكوى",
      claim: "رسالة مطالبة",
      certificate: "شهادة",
    },
    languages: {
      fr: "Français",
      ar: "العربية",
      en: "English",
    },
  },
  en: {
    title: "Legal Document Generator",
    subtitle: "Create personalized legal documents",
    name: "Your full name",
    employerName: "Employer name",
    date: "Date",
    documentType: "Document type",
    language: "Document language",
    generate: "Generate document",
    preview: "Preview",
    download: "Download PDF",
    documents: {
      complaint: "Complaint",
      claim: "Claim letter",
      certificate: "Certificate",
    },
    languages: {
      fr: "Français",
      ar: "العربية",
      en: "English",
    },
  },
}

const documentTemplates = {
  complaint: {
    fr: `PLAINTE POUR VIOLATION DU CODE DU TRAVAIL

Date: {date}

Objet: Plainte concernant une violation du code du travail

Monsieur/Madame,

Je soussigné(e) {name}, employé(e) chez {employerName}, porte à votre connaissance une violation du code du travail.

[Détails de la violation à compléter]

Je vous prie d'agréer, Monsieur/Madame, l'expression de mes salutations distinguées.

{name}`,
    ar: `شكوى بخصوص انتهاك قانون الشغل

التاريخ: {date}

الموضوع: شكوى بخصوص انتهاك قانون الشغل

السيد/السيدة المحترم/ة،

أنا الموقع أدناه {name}، الموظف لدى {employerName}، أحيطكم علماً بانتهاك قانون الشغل.

[تفاصيل الانتهاك للإكمال]

وتقبلوا، السيد/السيدة، فائق الاحترام والتقدير.

{name}`,
    en: `COMPLAINT FOR LABOR CODE VIOLATION

Date: {date}

Subject: Complaint regarding labor code violation

Dear Sir/Madam,

I, the undersigned {name}, employee at {employerName}, bring to your attention a violation of the labor code.

[Details of the violation to be completed]

Please accept, Sir/Madam, the expression of my distinguished greetings.

{name}`,
  },
}

export default function DocumentGeneratorPage() {
  const [currentLang, setCurrentLang] = useState<"fr" | "ar" | "en">("fr")
  const [formData, setFormData] = useState({
    name: "",
    employerName: "",
    date: new Date().toISOString().split("T")[0],
    documentType: "",
    documentLanguage: "fr",
  })
  const [generatedDocument, setGeneratedDocument] = useState("")
  const [showPreview, setShowPreview] = useState(false)

  const t = translations[currentLang]
  const isRTL = currentLang === "ar"

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const generateDocument = () => {
    if (!formData.documentType || !formData.name) return

    const template = documentTemplates[formData.documentType as keyof typeof documentTemplates]
    if (!template) return

    const documentText = template[formData.documentLanguage as keyof typeof template]
      .replace(/{name}/g, formData.name)
      .replace(/{employerName}/g, formData.employerName || "[Nom de l'employeur]")
      .replace(/{date}/g, formData.date)

    setGeneratedDocument(documentText)
    setShowPreview(true)
  }

  const downloadPDF = () => {
    // In a real application, you would generate a proper PDF
    const element = document.createElement("a")
    const file = new Blob([generatedDocument], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `document-${formData.documentType}-${formData.date}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navbar currentLang={currentLang} setCurrentLang={setCurrentLang} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <FileText className="w-8 h-8 text-green-600" />
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
              <div className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">{t.name}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={t.name}
                    required
                  />
                </div>

                {/* Employer Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="employerName">{t.employerName}</Label>
                  <Input
                    id="employerName"
                    value={formData.employerName}
                    onChange={(e) => handleInputChange("employerName", e.target.value)}
                    placeholder={t.employerName}
                  />
                </div>

                {/* Date Field */}
                <div className="space-y-2">
                  <Label htmlFor="date">{t.date}</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>

                {/* Document Type */}
                <div className="space-y-2">
                  <Label htmlFor="documentType">{t.documentType}</Label>
                  <Select
                    value={formData.documentType}
                    onValueChange={(value) => handleInputChange("documentType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.documentType} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="complaint">{t.documents.complaint}</SelectItem>
                      <SelectItem value="claim">{t.documents.claim}</SelectItem>
                      <SelectItem value="certificate">{t.documents.certificate}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Document Language */}
                <div className="space-y-2">
                  <Label htmlFor="documentLanguage">{t.language}</Label>
                  <Select
                    value={formData.documentLanguage}
                    onValueChange={(value) => handleInputChange("documentLanguage", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.language} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">🇫🇷 {t.languages.fr}</SelectItem>
                      <SelectItem value="ar">🇲🇦 {t.languages.ar}</SelectItem>
                      <SelectItem value="en">🇬🇧 {t.languages.en}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generateDocument}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!formData.name || !formData.documentType}
                >
                  <FileText className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t.generate}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview Modal */}
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  {t.preview}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-white p-6 border rounded-lg">
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{generatedDocument}</pre>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowPreview(false)}>
                    {currentLang === "fr" ? "Fermer" : currentLang === "ar" ? "إغلاق" : "Close"}
                  </Button>
                  <Button onClick={downloadPDF} className="bg-blue-600 hover:bg-blue-700">
                    <Download className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t.download}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Footer currentLang={currentLang} />
    </div>
  )
}
