"use client"

import { useState, useRef } from "react"
import { Plus, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SoundEffect {
  id: string
  name: string
  url: string
  emoji: string
}

const initialSounds: SoundEffect[] = [
  {
    id: "1",
    name: "Palmas",
    url: "https://cdn.freesound.org/previews/397/397354_5121236-lq.mp3",
    emoji: "👏"
  },
  {
    id: "2",
    name: "Risada do Peludinho",
    url: "https://cdn.freesound.org/previews/387/387232_6406119-lq.mp3",
    emoji: "🐻"
  },
  {
    id: "3",
    name: "Dedicatória Romântica",
    url: "https://cdn.freesound.org/previews/415/415683_7193358-lq.mp3",
    emoji: "💕"
  },
  {
    id: "4",
    name: "Música de Casamento",
    url: "https://cdn.freesound.org/previews/521/521570_11167183-lq.mp3",
    emoji: "💒"
  },
  {
    id: "5",
    name: "Rapaiz do Ratinho",
    url: "https://cdn.freesound.org/previews/397/397354_5121236-lq.mp3",
    emoji: "🐭"
  },
  {
    id: "6",
    name: "Tempo Correndo",
    url: "https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3",
    emoji: "⏰"
  },
  {
    id: "7",
    name: "Tempo Acabando",
    url: "https://cdn.freesound.org/previews/156/156859_2538033-lq.mp3",
    emoji: "⏱️"
  }
]

export default function SamplerApp() {
  const [sounds, setSounds] = useState<SoundEffect[]>(initialSounds)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [newSound, setNewSound] = useState({ name: "", url: "", emoji: "" })
  const [dialogOpen, setDialogOpen] = useState(false)
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})

  const handlePlayPause = (soundId: string, soundUrl: string) => {
    // Se já está tocando este som, parar
    if (playingId === soundId) {
      const audio = audioRefs.current[soundId]
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
      setPlayingId(null)
      return
    }

    // Parar qualquer som que esteja tocando
    if (playingId) {
      const currentAudio = audioRefs.current[playingId]
      if (currentAudio) {
        currentAudio.pause()
        currentAudio.currentTime = 0
      }
    }

    // Criar ou reutilizar elemento de áudio
    if (!audioRefs.current[soundId]) {
      const audio = new Audio(soundUrl)
      audio.addEventListener("ended", () => {
        setPlayingId(null)
      })
      audioRefs.current[soundId] = audio
    }

    // Tocar o novo som
    const audio = audioRefs.current[soundId]
    audio.currentTime = 0
    audio.play()
    setPlayingId(soundId)
  }

  const handleAddSound = () => {
    if (newSound.name && newSound.url) {
      const newSoundEffect: SoundEffect = {
        id: Date.now().toString(),
        name: newSound.name,
        url: newSound.url,
        emoji: newSound.emoji || "🔊"
      }
      setSounds([...sounds, newSoundEffect])
      setNewSound({ name: "", url: "", emoji: "" })
      setDialogOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Logo BELLUX */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="text-center">
            {/* Círculos coloridos */}
            <div className="flex justify-center gap-1 mb-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#00AEEF]"></div>
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#EC008C]"></div>
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#FFF200]"></div>
            </div>
            {/* Texto BELLUX */}
            <div className="text-white drop-shadow-2xl">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                BELLUX
              </div>
              <div className="text-xs sm:text-sm md:text-base font-light tracking-widest opacity-90">
                ENTERTAINMENT
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-3 drop-shadow-2xl">
            🎵 Sampler de Sons
          </h1>
          <p className="text-lg sm:text-xl text-white/90 drop-shadow-lg">
            Clique nos botões para tocar os efeitos sonoros
          </p>
        </div>

        {/* Grid de Sons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {sounds.map((sound) => (
            <button
              key={sound.id}
              onClick={() => handlePlayPause(sound.id, sound.url)}
              className={`
                aspect-square rounded-2xl p-4 sm:p-6
                flex flex-col items-center justify-center gap-2 sm:gap-3
                transition-all duration-300 ease-in-out
                hover:scale-105 hover:shadow-2xl
                ${
                  playingId === sound.id
                    ? "bg-white text-purple-600 shadow-2xl scale-105"
                    : "bg-white/90 text-gray-800 shadow-xl"
                }
              `}
            >
              <span className="text-4xl sm:text-5xl">{sound.emoji}</span>
              <span className="text-sm sm:text-base font-semibold text-center line-clamp-2">
                {sound.name}
              </span>
              {playingId === sound.id ? (
                <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
              ) : (
                <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 opacity-50" />
              )}
            </button>
          ))}

          {/* Botão Adicionar Novo Som */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button
                className="
                  aspect-square rounded-2xl p-4 sm:p-6
                  flex flex-col items-center justify-center gap-2 sm:gap-3
                  bg-white/30 backdrop-blur-sm border-2 border-dashed border-white/50
                  text-white transition-all duration-300 ease-in-out
                  hover:scale-105 hover:bg-white/40 hover:shadow-2xl
                "
              >
                <Plus className="w-10 h-10 sm:w-12 sm:h-12" />
                <span className="text-sm sm:text-base font-semibold text-center">
                  Adicionar Som
                </span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Efeito Sonoro</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Som</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Aplausos"
                    value={newSound.name}
                    onChange={(e) => setNewSound({ ...newSound, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">URL do Áudio</Label>
                  <Input
                    id="url"
                    placeholder="https://exemplo.com/som.mp3"
                    value={newSound.url}
                    onChange={(e) => setNewSound({ ...newSound, url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emoji">Emoji (opcional)</Label>
                  <Input
                    id="emoji"
                    placeholder="🎵"
                    value={newSound.emoji}
                    onChange={(e) => setNewSound({ ...newSound, emoji: e.target.value })}
                    maxLength={2}
                  />
                </div>
                <Button onClick={handleAddSound} className="w-full">
                  Adicionar Som
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Instruções */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-white text-center">
          <p className="text-sm sm:text-base">
            💡 <strong>Dica:</strong> Clique em um som para tocar. Clique novamente para parar!
          </p>
        </div>
      </div>
    </div>
  )
}
