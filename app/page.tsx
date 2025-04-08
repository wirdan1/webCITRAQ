"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Users, Phone, Settings, Info, Edit, Check, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [editMode, setEditMode] = useState(false)

  // Sample data
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Selamat datang di halaman informasi grup kami. Di sini Anda dapat menemukan link grup WhatsApp dan informasi kontak admin.",
  )

  const [groups, setGroups] = useState([
    {
      name: "Grup Utama",
      description: "Grup diskusi umum untuk semua anggota.",
      link: "https://chat.whatsapp.com/JuWvfrWp7bY45c9psBkWH2",
    },
    {
      name: "Grup Seleksi",
      description: "Hanya untuk info seleksi member baru",
      link: "https://chat.whatsapp.com/example2",
    },
    {
      name: "Grup Bot",
      description: "Grup bantuan bot marga",
      link: "https://chat.whatsapp.com/F4IhXuFnmpX1N7dHdgKH2d",
    },
  ])

  const [admins, setAdmins] = useState([
    {
      name: "Owner",
      phone: "+62 882-0061-05725",
      bio: "menyediakan bahan jj,event,hadiah event,serta patner dalam grup.",
    },
    {
      name: "Wanner",
      phone: "+6011-58818757",
      bio: "membantu pemasaran dan  kelancaran event dalam grup.",
    },
    {
      name: "Admin AMV",
      phone: "+62 852-8283-7155",
      bio: "Pen desain Handal dalam grup.",
    },
    {
      name: "Admin Teknis",
      phone: "+62 895-3231-95263",
      bio: "Menangani masalah teknis dan memastikan grup berjalan dengan lancar. Ahli dalam bidang IT dan media sosial.",
    },
  ])

  // Add new group
  const addGroup = () => {
    setGroups([...groups, { name: "", description: "", link: "" }])
  }

  // Remove group
  const removeGroup = (index) => {
    const newGroups = [...groups]
    newGroups.splice(index, 1)
    setGroups(newGroups)
  }

  // Update group
  const updateGroup = (index, field, value) => {
    const newGroups = [...groups]
    newGroups[index][field] = value
    setGroups(newGroups)
  }

  // Add new admin
  const addAdmin = () => {
    setAdmins([...admins, { name: "", phone: "", bio: "" }])
  }

  // Remove admin
  const removeAdmin = (index) => {
    const newAdmins = [...admins]
    newAdmins.splice(index, 1)
    setAdmins(newAdmins)
  }

  // Update admin
  const updateAdmin = (index, field, value) => {
    const newAdmins = [...admins]
    newAdmins[index][field] = value
    setAdmins(newAdmins)
  }

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  // Save changes
  const saveChanges = () => {
    setEditMode(false)
    // In a real app, you would save to a database or local storage here
  }

  // Cancel changes
  const cancelChanges = () => {
    setEditMode(false)
    // In a real app, you would revert changes here
  }

  // Ensure theme is only accessed on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Edit Controls */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">CITRAQ</h1>
          <div className="flex items-center gap-2">
            <Link href="/settings">
              <Button variant="outline" size="sm" className="text-primary hover:bg-primary/20">
                <Settings className="h-4 w-4 mr-1" />
                Pengaturan
              </Button>
            </Link>

            {editMode ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={cancelChanges}
                  className="text-destructive hover:bg-destructive/20"
                >
                  <X className="h-4 w-4 mr-1" />
                  Batal
                </Button>
                <Button variant="default" size="sm" onClick={saveChanges} className="bg-primary hover:bg-primary/90">
                  <Check className="h-4 w-4 mr-1" />
                  Simpan
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={toggleEditMode} className="text-primary hover:bg-primary/20">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </div>

        {/* Welcome Banner with Circular Image */}
        <div className="mb-8 rounded-lg bg-card p-6 shadow-md text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary">
              <Image src="/images/group-image1.jpg" alt="Group Image" fill className="object-cover" />
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-primary">Selamat Datang!</h1>
          {editMode ? (
            <Textarea
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              className="mt-2"
              rows={3}
            />
          ) : (
            <p className="text-muted-foreground">{welcomeMessage}</p>
          )}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="groups">
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="groups">Grup WhatsApp</TabsTrigger>
            <TabsTrigger value="admins">Admin</TabsTrigger>
            <TabsTrigger value="about">Tentang</TabsTrigger>
          </TabsList>

          <TabsContent value="groups">
            <Card>
              <CardHeader className="bg-primary/10">
                <CardTitle className="flex items-center text-primary">
                  <Users className="mr-2 h-5 w-5" />
                  Grup WhatsApp
                </CardTitle>
                <CardDescription>Klik link untuk bergabung dengan grup</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {editMode ? (
                  <div className="space-y-6">
                    {groups.map((group, index) => (
                      <div key={index} className="rounded-md border p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-lg font-medium">Grup {index + 1}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeGroup(index)}
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`group-name-${index}`}>Nama Grup</Label>
                            <Input
                              id={`group-name-${index}`}
                              value={group.name}
                              onChange={(e) => updateGroup(index, "name", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`group-desc-${index}`}>Deskripsi</Label>
                            <Input
                              id={`group-desc-${index}`}
                              value={group.description}
                              onChange={(e) => updateGroup(index, "description", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`group-link-${index}`}>Link WhatsApp</Label>
                            <Input
                              id={`group-link-${index}`}
                              value={group.link}
                              onChange={(e) => updateGroup(index, "link", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button onClick={addGroup} variant="outline" className="w-full">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Tambah Grup Baru
                    </Button>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {groups.map((group, index) => (
                      <li key={index} className="rounded-md border p-4 transition-colors hover:bg-accent">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-primary">{group.name}</h3>
                            <p className="text-sm text-muted-foreground">{group.description}</p>
                          </div>
                          <a href={group.link} target="_blank" rel="noopener noreferrer">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-primary hover:bg-primary/20 hover:text-primary"
                            >
                              Gabung
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admins">
            <Card>
              <CardHeader className="bg-primary/10">
                <CardTitle className="flex items-center text-primary">
                  <Phone className="mr-2 h-5 w-5" />
                  Kontak Admin
                </CardTitle>
                <CardDescription>Hubungi admin jika ada pertanyaan</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {editMode ? (
                  <div className="space-y-6">
                    {admins.map((admin, index) => (
                      <div key={index} className="rounded-md border p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-lg font-medium">Admin {index + 1}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAdmin(index)}
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`admin-name-${index}`}>Nama Admin</Label>
                            <Input
                              id={`admin-name-${index}`}
                              value={admin.name}
                              onChange={(e) => updateAdmin(index, "name", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`admin-phone-${index}`}>Nomor Telepon</Label>
                            <Input
                              id={`admin-phone-${index}`}
                              value={admin.phone}
                              onChange={(e) => updateAdmin(index, "phone", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`admin-bio-${index}`}>Biografi</Label>
                            <Textarea
                              id={`admin-bio-${index}`}
                              value={admin.bio}
                              onChange={(e) => updateAdmin(index, "bio", e.target.value)}
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button onClick={addAdmin} variant="outline" className="w-full">
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Tambah Admin Baru
                    </Button>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {admins.map((admin, index) => (
                      <li key={index} className="rounded-md border p-4 transition-colors hover:bg-accent">
                        <div className="flex items-start">
                          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary shrink-0">
                            {admin.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium text-primary">{admin.name}</h3>
                            <p className="text-sm text-muted-foreground">{admin.phone}</p>
                            <p className="text-sm text-muted-foreground mt-2">{admin.bio}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader className="bg-primary/10">
                <CardTitle className="flex items-center text-primary">
                  <Info className="mr-2 h-5 w-5" />
                  Tentang Grup
                </CardTitle>
                <CardDescription>Informasi tentang grup kami</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Grup ini dibuat untuk memfasilitasi komunikasi antar anggota. Kami memiliki beberapa grup WhatsApp
                  dengan tujuan yang berbeda-beda. Silakan bergabung dengan grup yang sesuai dengan kebutuhan Anda. Jika
                  Anda memiliki pertanyaan, jangan ragu untuk menghubungi admin.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  <div className="rounded-md bg-primary/10 p-4 text-center">
                    <div className="text-2xl font-bold text-primary">20+</div>
                    <div className="text-xs text-muted-foreground">Anggota Aktif</div>
                  </div>
                  <div className="rounded-md bg-primary/10 p-4 text-center">
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-xs text-muted-foreground">Grup WhatsApp</div>
                  </div>
                  <div className="rounded-md bg-primary/10 p-4 text-center">
                    <div className="text-2xl font-bold text-primary">2025</div>
                    <div className="text-xs text-muted-foreground">Tahun Berdiri</div>
                  </div>
                  <div className="rounded-md bg-primary/10 p-4 text-center">
                    <div className="text-2xl font-bold text-primary">100+</div>
                    <div className="text-xs text-muted-foreground">Pesan per Hari</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

