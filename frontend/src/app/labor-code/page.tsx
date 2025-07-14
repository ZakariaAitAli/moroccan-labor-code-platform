"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Search, ChevronDown, BookOpen } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const translations = {
  fr: {
    title: "Code du Travail Marocain",
    searchPlaceholder: "Rechercher dans le code...",
    selectTitle: "Sélectionner un titre",
    titles: {
      contract: "Contrat de travail",
      salary: "Salaire et rémunération",
      leave: "Congés et repos",
      termination: "Licenciement et fin de contrat",
    },
  },
  ar: {
    title: "قانون الشغل المغربي",
    searchPlaceholder: "البحث في القانون...",
    selectTitle: "اختر عنواناً",
    titles: {
      contract: "عقد الشغل",
      salary: "الأجر والتعويض",
      leave: "العطل والراحة",
      termination: "الفصل وانتهاء العقد",
    },
  },
  en: {
    title: "Moroccan Labor Code",
    searchPlaceholder: "Search in the code...",
    selectTitle: "Select a title",
    titles: {
      contract: "Employment Contract",
      salary: "Salary and Compensation",
      leave: "Leave and Rest",
      termination: "Termination and Contract End",
    },
  },
}

const mockArticles = [
  {
    id: 1,
    number: "Article 15",
    title: {
      fr: "Durée du contrat de travail",
      ar: "مدة عقد الشغل",
      en: "Duration of employment contract",
    },
    content: {
      fr: "Le contrat de travail peut être conclu pour une durée indéterminée ou pour une durée déterminée. Le contrat à durée déterminée ne peut excéder une année renouvelable une seule fois.",
      ar: "يمكن إبرام عقد الشغل لمدة غير محددة أو لمدة محددة. لا يمكن أن يتجاوز العقد محدد المدة سنة واحدة قابلة للتجديد مرة واحدة فقط.",
      en: "The employment contract may be concluded for an indefinite period or for a fixed term. The fixed-term contract cannot exceed one year renewable only once.",
    },
    category: "contract",
  },
  {
    id: 2,
    number: "Article 345",
    title: {
      fr: "Salaire minimum légal",
      ar: "الحد الأدنى القانوني للأجر",
      en: "Legal minimum wage",
    },
    content: {
      fr: "Le salaire minimum légal est fixé par voie réglementaire après consultation des organisations professionnelles d'employeurs et de salariés les plus représentatives.",
      ar: "يحدد الحد الأدنى القانوني للأجر بطريق تنظيمي بعد استشارة المنظمات المهنية للمشغلين والأجراء الأكثر تمثيلاً.",
      en: "The legal minimum wage is set by regulation after consultation with the most representative professional organizations of employers and employees.",
    },
    category: "salary",
  },
  {
    id: 3,
    number: "Article 231",
    title: {
      fr: "Congé annuel payé",
      ar: "العطلة السنوية المدفوعة الأجر",
      en: "Annual paid leave",
    },
    content: {
      fr: "Tout salarié a droit, après six mois de service continu dans la même entreprise, à un congé annuel payé dont la durée est fixée à un jour et demi de travail effectif par mois de service.",
      ar: "لكل أجير الحق، بعد ستة أشهر من الخدمة المستمرة في نفس المؤسسة، في عطلة سنوية مدفوعة الأجر تحدد مدتها في يوم ونصف من العمل الفعلي عن كل شهر خدمة.",
      en: "Every employee has the right, after six months of continuous service in the same company, to annual paid leave whose duration is set at one and a half days of actual work per month of service.",
    },
    category: "leave",
  },
]

export default function LaborCodePage() {
  const [currentLang, setCurrentLang] = useState<"fr" | "ar" | "en">("fr")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [expandedArticles, setExpandedArticles] = useState<number[]>([])

  const t = translations[currentLang]
  const isRTL = currentLang === "ar"

  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch =
      searchTerm === "" ||
      article.title[currentLang].toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content[currentLang].toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.number.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const toggleArticle = (articleId: number) => {
    setExpandedArticles((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId],
    )
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Navbar currentLang={currentLang} setCurrentLang={setCurrentLang} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  {currentLang === "fr" && "Filtres"}
                  {currentLang === "ar" && "المرشحات"}
                  {currentLang === "en" && "Filters"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className={`absolute top-3 w-4 h-4 text-gray-400 ${isRTL ? "right-3" : "left-3"}`} />
                  <Input
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={isRTL ? "pr-10" : "pl-10"}
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectTitle} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {currentLang === "fr" ? "Tous" : currentLang === "ar" ? "الكل" : "All"}
                    </SelectItem>
                    <SelectItem value="contract">{t.titles.contract}</SelectItem>
                    <SelectItem value="salary">{t.titles.salary}</SelectItem>
                    <SelectItem value="leave">{t.titles.leave}</SelectItem>
                    <SelectItem value="termination">{t.titles.termination}</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
              <p className="text-gray-600">
                {filteredArticles.length}{" "}
                {currentLang === "fr" ? "articles trouvés" : currentLang === "ar" ? "مقال موجود" : "articles found"}
              </p>
            </div>

            {/* Articles List */}
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow">
                  <Collapsible
                    open={expandedArticles.includes(article.id)}
                    onOpenChange={() => toggleArticle(article.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg text-blue-600">{article.number}</CardTitle>
                            <p className="text-gray-700 mt-1">{article.title[currentLang]}</p>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-400 transition-transform ${
                              expandedArticles.includes(article.id) ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent>
                        <Tabs defaultValue={currentLang} className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="fr" className="flex items-center gap-2">
                              🇫🇷 Français
                            </TabsTrigger>
                            <TabsTrigger value="ar" className="flex items-center gap-2">
                              🇲🇦 العربية
                            </TabsTrigger>
                            <TabsTrigger value="en" className="flex items-center gap-2">
                              🇬🇧 English
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="fr" className="mt-4">
                            <p className="text-gray-700 leading-relaxed">{article.content.fr}</p>
                          </TabsContent>
                          <TabsContent value="ar" className="mt-4" dir="rtl">
                            <p className="text-gray-700 leading-relaxed">{article.content.ar}</p>
                          </TabsContent>
                          <TabsContent value="en" className="mt-4">
                            <p className="text-gray-700 leading-relaxed">{article.content.en}</p>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-gray-500 text-lg">
                    {currentLang === "fr" && "Aucun article trouvé"}
                    {currentLang === "ar" && "لم يتم العثور على أي مقال"}
                    {currentLang === "en" && "No articles found"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer currentLang={currentLang} />
    </div>
  )
}
