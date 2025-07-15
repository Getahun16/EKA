"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LoadingSpinner from "./LoadingSpinner";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
}

const AUTO_SLIDE_INTERVAL = 5000;
const DEFAULT_SLIDES: Slide[] = [
  {
    id: 1,
    title: "Default Slide 1",
    description: "This is a default slide description",
    image: "/default-image1.jpg",
  },
  {
    id: 2,
    title: "Default Slide 2",
    description: "Another default slide description",
    image: "/default-image2.jpg",
  },
];

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("/api/slide");
        const data = await res.json();
        if (data?.length > 0) setSlides(data);
      } catch (error) {
        console.error("Error fetching slides:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const goToPrevious = useCallback(() => {
    setDirection("left");
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setDirection("right");
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(goToNext, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [slides.length, goToNext]);

  const slideVariants = {
    enter: (dir: "left" | "right") => ({
      x: dir === "right" ? "100%" : "-100%",
      opacity: 0.5,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8 },
    },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? "-100%" : "100%",
      opacity: 0.5,
      transition: { duration: 0.8 },
    }),
  };

  const backgroundStyle = {
    backgroundColor: "#000",
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl">No slides available</div>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      style={backgroundStyle}
    >
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentSlide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-black/30" />
          <Image
            src={currentSlide.image}
            alt={currentSlide.title || "Slide image"}
            className="object-cover"
            fill
            priority
            sizes="100vw"
            quality={100}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`text-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[80%] lg:w-[65%] xl:w-[50%] z-10"
        >
          <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 md:p-8 lg:p-10 text-center border border-white/10 shadow-xl">
            <motion.h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-sky-500 mb-4">
              {currentSlide.title}
            </motion.h2>
            <motion.p className="text-lg md:text-xl text-gray-200">
              {currentSlide.description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full bg-sky-500 text-white opacity-80 hover:opacity-100 hover:bg-sky-600 transition-all duration-300 z-10 cursor-pointer shadow-lg"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-sky-500 text-white opacity-80 hover:opacity-100 hover:bg-sky-600 transition-all duration-300 z-10 cursor-pointer shadow-lg"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? "bg-sky-500 scale-125"
                : "bg-sky-200/70 hover:bg-sky-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
