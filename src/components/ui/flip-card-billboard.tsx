"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
    id: number
    title: string
    subtitle: string
    description: string
    frontColor: string
    backColor: string
    textColor: string
    image?: string
}

const slides: Slide[] = [
    {
        id: 1,
        title: "РЕКЛАМНЫЙ",
        subtitle: "БИЛБОРД",
        description: "Эффектная анимация перелистывания",
        frontColor: "bg-blue-500",
        backColor: "bg-orange-500",
        textColor: "text-white",
        image: "/1.png",
    },
    {
        id: 2,
        title: "НОВЫЙ",
        subtitle: "ПРОДУКТ",
        description: "Уже в продаже!",
        frontColor: "bg-orange-500",
        backColor: "bg-green-500",
        textColor: "text-white",
        image: "/2.png",
    },
    {
        id: 3,
        title: "СПЕЦИАЛЬНОЕ",
        subtitle: "ПРЕДЛОЖЕНИЕ",
        description: "Скидка до 50%",
        frontColor: "bg-green-500",
        backColor: "bg-purple-500",
        textColor: "text-white",
        image: "/3.png",
    },
    {
        id: 4,
        title: "ПРЕМИУМ",
        subtitle: "КАЧЕСТВО",
        description: "Лучший выбор года",
        frontColor: "bg-purple-500",
        backColor: "bg-yellow-500",
        textColor: "text-white",
        image: "/4.png",
    },
    {
        id: 5,
        title: "ОГРАНИЧЕННАЯ",
        subtitle: "СЕРИЯ",
        description: "Только до конца месяца",
        frontColor: "bg-yellow-500",
        backColor: "bg-blue-500",
        textColor: "text-white",
        image: "/5.png",
    },
]

export default function Component() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [nextSlide, setNextSlide] = useState(1)
    const [isFlipping, setIsFlipping] = useState(false)
    const [direction, setDirection] = useState<"left" | "right">("right")

    const handleSlideChange = (newIndex: number, slideDirection: "left" | "right") => {
        if (isFlipping) return

        setDirection(slideDirection)
        setNextSlide(newIndex)
        setIsFlipping(true)

        setTimeout(() => {
            setCurrentSlide(newIndex)
            setIsFlipping(false)
        }, 800)
    }

    const goToPrevious = () => {
        const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1
        handleSlideChange(newIndex, "left")
    }

    const goToNext = () => {
        const newIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1
        handleSlideChange(newIndex, "right")
    }

    const goToSlide = (index: number) => {
        if (index === currentSlide || isFlipping) return
        const slideDirection = index > currentSlide ? "right" : "left"
        handleSlideChange(index, slideDirection)
    }

    const current = slides[currentSlide]
    const next = slides[nextSlide]

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 p-8">
            {/* Навигационные кнопки */}
            <div className="flex items-center gap-8 mb-8">
                <Button
                    onClick={goToPrevious}
                    disabled={isFlipping}
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Назад
                </Button>

                <div className="text-white text-center">
                    <div className="text-sm opacity-70">Слайд</div>
                    <div className="text-lg font-bold">
                        {currentSlide + 1} / {slides.length}
                    </div>
                </div>

                <Button
                    onClick={goToNext}
                    disabled={isFlipping}
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                    Вперед
                    <ChevronRight className="w-5 h-5" />
                </Button>
            </div>

            {/* Карточка с анимацией */}
            <div className="relative w-[800px] h-[600px]">
                <Card className="w-full h-full relative overflow-hidden rounded-xl shadow-2xl">
                    {/* Основной контейнер для 3D эффекта */}
                    <div className="w-full h-full relative" style={{ perspective: "1200px" }}>
                        {/* Контейнер для секций */}
                        <div className="flex h-full relative">
                            {Array.from({ length: 16 }, (_, index) => {
                                const delay = direction === "right" ? index * 30 : (15 - index) * 30
                                const width = 100 / 16 // Ширина каждой секции в процентах

                                return (
                                    <div
                                        key={`${currentSlide}-${index}`}
                                        className={`h-full relative transform-style-preserve-3d ${isFlipping ? "animate-flip" : ""}`}
                                        style={{
                                            animationDelay: `${delay}ms`,
                                            width: `${width}%`,
                                        }}
                                    >
                                        {/* Лицевая сторона - текущий слайд */}
                                        <div
                                            className={`absolute inset-0 backface-hidden ${current.frontColor} overflow-hidden`}
                                            style={{
                                                transform: "rotateY(0deg)",
                                                backgroundImage: current.image ? `url(${current.image})` : "none",
                                                backgroundSize: "800px 100%",
                                                backgroundPosition: `${-index * (800 / 16)}px 0`,
                                            }}
                                        >
                                        </div>

                                        {/* Обратная сторона - следующий слайд */}
                                        <div
                                            className={`absolute inset-0 backface-hidden ${next.frontColor} overflow-hidden`}
                                            style={{
                                                transform: "rotateY(180deg)",
                                                backgroundImage: next.image ? `url(${next.image})` : "none",
                                                backgroundSize: "800px 100%",
                                                backgroundPosition: `${-index * (800 / 16)}px 0`,
                                            }}
                                        >
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Индикаторы слайдов */}
            <div className="flex gap-2 mt-8">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        disabled={isFlipping}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
                        }`}
                    />
                ))}
            </div>


            <style jsx global>{`
                .transform-style-preserve-3d {
                    transform-style: preserve-3d;
                }

                .backface-hidden {
                    backface-visibility: hidden;
                }

                @keyframes flip {
                    0% {
                        transform: rotateY(0deg);
                    }
                    50% {
                        transform: rotateY(90deg);
                    }
                    100% {
                        transform: rotateY(180deg);
                    }
                }

                .animate-flip {
                    animation: flip 0.6s ease-in-out forwards;
                }
            `}</style>
        </div>
    )
}