"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Palette, Moon, Sun, Save } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState("black")

  // Apply theme color
  const applyThemeColor = (color) => {
    setSelectedTheme(color)
    const root = document.documentElement
    root.style.setProperty("--theme-color", getThemeColor(color))
  }

  // Get theme color based on selection
  const getThemeColor = (theme) => {
    switch (theme) {
      case "green":
        return "#10b981"
      case "blue":
        return "#3b82f6"
      case "purple":
        return "#8b5cf6"
      case "red":
        return "#ef4444"
      case "orange":
        return "#f97316"
      case "black":
        return "#000000"
      default:
        return "#10b981"
    }
  }

  // Save settings
  const saveSettings = () => {
    // In a real application, this would save to a database or local storage
    alert("Pengaturan berhasil disimpan!")
    // For demonstration purposes, we're just using state
    // In a real app, you would implement actual data persistence here
  }

  // Ensure theme is only accessed on client side
  useEffect(() => {
    setMounted(true)
    // Apply default theme color
    const root = document.documentElement
    root.style.setProperty("--theme-color", getThemeColor(selectedTheme))
  }, [selectedTheme])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" className="flex items-center text-primary hover:bg-primary/20 hover:text-primary">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Kembali ke Dashboard
            </Button>
          </Link>
          <Button onClick={saveSettings} className="bg-primary hover:bg-primary/90">
            <Save className="mr-2 h-4 w-4" />
            Simpan Pengaturan
          </Button>
        </div>

        <Card>
          <CardHeader className="bg-primary/10">
            <CardTitle className="flex items-center text-primary">
              <Palette className="mr-2 h-5 w-5" />
              Pengaturan Tema
            </CardTitle>
            <CardDescription>Ubah warna dan tampilan website</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Pilih Warna Tema</Label>
                <RadioGroup value={selectedTheme} onValueChange={applyThemeColor} className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="green" id="theme-green" className="border-emerald-500" />
                    <Label htmlFor="theme-green" className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 mr-2"></div>
                      Hijau
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="blue" id="theme-blue" className="border-blue-500" />
                    <Label htmlFor="theme-blue" className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-500 mr-2"></div>
                      Biru
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="purple" id="theme-purple" className="border-purple-500" />
                    <Label htmlFor="theme-purple" className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-purple-500 mr-2"></div>
                      Ungu
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="red" id="theme-red" className="border-red-500" />
                    <Label htmlFor="theme-red" className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-red-500 mr-2"></div>
                      Merah
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="orange" id="theme-orange" className="border-orange-500" />
                    <Label htmlFor="theme-orange" className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-orange-500 mr-2"></div>
                      Oranye
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="black" id="theme-black" className="border-black" />
                    <Label htmlFor="theme-black" className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-black mr-2"></div>
                      Hitam
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Mode Tampilan</Label>
                <div className="flex items-center space-x-4">
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className={theme === "dark" ? "bg-primary" : ""}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Mode Gelap
                  </Button>
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("light")}
                    className={theme === "light" ? "bg-primary" : ""}
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    Mode Terang
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

