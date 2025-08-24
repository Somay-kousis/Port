"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Linkedin, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

// Define interfaces for better type safety
interface MediaItem {
  type: "image" | "video"
  src: string
  alt?: string
}

interface Project {
  id: number
  title: string
  description: string
  media: MediaItem[]
  tech: string[]
  details: string
}

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentMediaIndex, setCurrentMediaIndex] = useState<Record<number, number>>({})
  const [isVideoPlaying, setIsVideoPlaying] = useState<Record<string, boolean>>({})
  const heroRef = useRef<HTMLDivElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    const timer = setTimeout(() => setIsVisible(true), 100)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const projects: Project[] = [
    {
      id: 1,
      title: "Prosk",
      description:
        "An interactive platform experience crafted to highlight collaboration, growth, and community-driven ideas in a modern, minimal design.",
      media: [
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755976021/m1_dfr0ek.png", alt: "Prosk project screenshot 1" },
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755976022/m2_ceunzl.png", alt: "Prosk project screenshot 2" },
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755976025/m6_es32sr.png", alt: "Prosk project screenshot 3" },
      ],
      tech: ["React.js","Next.js", "Tailwind","Framer", "Motion"],
      details: "Emphasizes modular design, smooth UI animations, and accessibility-first principles, ensuring a balanced experience across web and mobile.",
    },
    {
      id: 2,
      title: "Zuuush",
      description:
        "A sleek landing and onboarding experience designed to showcase speed and simplicity in product launches.",
      media: [
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755975978/z1_twujux.png", alt: "Zuuush project screenshot 1" },
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755975980/z2_qmqmmr.png", alt: "Zuuush project screenshot 2" },
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755975978/z4_iglzxv.png", alt: "Zuuush project screenshot 3" },
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755975978/z5_mgjh6g.png", alt: "Zuuush project screenshot 4" },
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755975978/z6_qmy1hr.png", alt: "Zuuush project screenshot 5" },
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755975978/z7_p37rge.png", alt: "Zuuush project screenshot 6" },
      ],
      tech: ["React.js", "CSS", "Motion"],
      details: "Focused on clean component architecture, fluid transitions, and mobile-first responsiveness using React and vanilla animations.",
    },
    {
      id: 3,
      title: "MuggleProof Luggage",
      description:
        "Harry Potter–themed luggage site with interactive elements like a Sorting Hat theme selector and suitcase quiz.",
      media: [
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755976016/h3_u0y5zp.png", alt: "CodeCanvas project screenshot 1" },
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755976017/h6_olfjt6.png", alt: "CodeCanvas project screenshot 2" },
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755976015/h1_ps3qg6.png", alt: "CodeCanvas project screenshot 3" },
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755976019/h10_rr7tr5.png", alt: "CodeCanvas project screenshot 4" },
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755976015/h2_jjkgla.png", alt: "CodeCanvas project screenshot 5" },
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755976015/h4_mhb9vw.png", alt: "CodeCanvas project screenshot 6" },
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755976016/h7_rpd6ug.png", alt: "CodeCanvas project screenshot 7" },
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755976016/h8_eldx2z.png", alt: "CodeCanvas project screenshot 8" },
        { type: "image", src: "https://res.cloudinary.com/dyfjyhuyp/image/upload/v1755976017/h5_rnbtvh.png", alt: "CodeCanvas project screenshot 9" },
        { type: "image", src: "/h10.png", alt: "CodeCanvas project screenshot 10" },
      ],
      tech: ["HTML", "CSS", "Javascript"],
      details: "Created entirely with HTML, CSS, and vanilla JS. Designed multi-page layouts, responsive breakpoints, and playful UI interactions to mimic a full product feel.",
    },
  ]

  const nextMedia = (projectId: number) => {
    const project = projects.find((p) => p.id === projectId)
    if (!project) return

    setCurrentMediaIndex((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % project.media.length,
    }))
  }

  const prevMedia = (projectId: number) => {
    const project = projects.find((p) => p.id === projectId)
    if (!project) return

    setCurrentMediaIndex((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + project.media.length) % project.media.length,
    }))
  }

  const toggleVideo = (videoKey: string) => {
    const video = videoRefs.current[videoKey]
    if (!video) return

    if (video.paused) {
      video.play().catch((error: Error) => {
        console.error("Error playing video:", error)
      })
      setIsVideoPlaying((prev) => ({ ...prev, [videoKey]: true }))
    } else {
      video.pause()
      setIsVideoPlaying((prev) => ({ ...prev, [videoKey]: false }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-neutral-900 to-stone-900 text-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
        </div>

        <div className="text-center max-w-5xl mx-auto px-8 relative z-10">
          <h1
            className={`text-8xl md:text-[10rem] font-extralight mb-12 tracking-[-0.02em] text-white transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
          >
            Somay Kousis
          </h1>

          <p
            className={`text-2xl md:text-3xl font-light mb-16 text-stone-300 max-w-3xl mx-auto leading-relaxed tracking-wide transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Building @ Mutiny | Frontend Developer | Human-first UI/UX
          </p>

          <Button
            onClick={scrollToProjects}
            size="lg"
            className={`bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-6 rounded-full font-medium text-lg shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 delay-800 hover:scale-105 border-0 backdrop-blur-sm ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            View My Work
            <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300" />
          </Button>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-40 px-8 bg-gradient-to-b from-neutral-900 to-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-32 text-center opacity-0 animate-fade-in-up">
            <h2 className="text-6xl md:text-7xl font-extralight mb-8 tracking-[-0.02em] text-white">Featured Work</h2>
            <p className="text-2xl text-stone-300 font-light max-w-3xl mx-auto leading-relaxed">
              A curated selection of projects that showcase innovation, craftsmanship, and attention to detail.
            </p>
          </div>

          <div className="space-y-40">
            {projects.map((project, index) => {
              const currentIndex = currentMediaIndex[project.id] || 0
              const currentMedia = project.media[currentIndex]
              const videoKey = `${project.id}-${currentIndex}`

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    projectRefs.current[index] = el
                  }}
                  className="group opacity-0"
                >
                  <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className={`${index % 2 === 1 ? "lg:order-2" : ""} relative`}>
                      <div className="aspect-[16/10] bg-gradient-to-br from-zinc-800 to-neutral-800 rounded-3xl overflow-hidden relative group/media shadow-2xl hover:shadow-emerald-500/10 transition-all duration-700 border border-zinc-700/50">
                        {currentMedia.type === "image" ? (
                          <Image
                            src={currentMedia.src}
                            alt={currentMedia.alt || `${project.title} screenshot`}
                            fill
                            className="object-cover transition-all duration-700 ease-out hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="relative w-full h-full">
                            <video
                              ref={(el) => {
                                videoRefs.current[videoKey] = el
                              }}
                              src={currentMedia.src}
                              className="w-full h-full object-cover transition-all duration-700 ease-out"
                              loop
                              muted
                              playsInline
                            />
                            <button
                              onClick={() => toggleVideo(videoKey)}
                              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover/media:opacity-100 transition-opacity duration-300"
                              type="button"
                            >
                              <div className="bg-white/95 backdrop-blur-sm rounded-full p-6 hover:bg-white transition-all duration-200 shadow-2xl">
                                {isVideoPlaying[videoKey] ? (
                                  <Pause className="h-8 w-8 text-zinc-900" />
                                ) : (
                                  <Play className="h-8 w-8 text-zinc-900 ml-1" />
                                )}
                              </div>
                            </button>
                          </div>
                        )}

                        {project.media.length > 1 && (
                          <>
                            <button
                              onClick={() => prevMedia(project.id)}
                              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-xl"
                              type="button"
                            >
                              <ChevronLeft className="h-6 w-6 text-zinc-900" />
                            </button>
                            <button
                              onClick={() => nextMedia(project.id)}
                              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-xl"
                              type="button"
                            >
                              <ChevronRight className="h-6 w-6 text-zinc-900" />
                            </button>

                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                              {project.media.map((_, mediaIndex) => (
                                <button
                                  key={mediaIndex}
                                  onClick={() =>
                                    setCurrentMediaIndex((prev) => ({ ...prev, [project.id]: mediaIndex }))
                                  }
                                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    mediaIndex === currentIndex
                                      ? "bg-emerald-500 scale-125 shadow-lg"
                                      : "bg-white/70 hover:bg-white"
                                  }`}
                                  type="button"
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className={`${index % 2 === 1 ? "lg:order-1" : ""} space-y-8`}>
                      <div>
                        <h3 className="text-5xl md:text-6xl font-extralight mb-6 tracking-[-0.02em] text-white transition-transform duration-500 group-hover:text-emerald-200">
                          {project.title}
                        </h3>
                        <p className="text-xl text-stone-300 font-light leading-relaxed mb-6 max-w-lg">
                          {project.description}
                        </p>
                        <p className="text-lg text-stone-400 font-light leading-relaxed max-w-lg">{project.details}</p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {project.tech.map((tech, techIndex) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="border-zinc-600 bg-zinc-800/50 text-stone-300 font-medium px-4 py-2 rounded-full hover:border-emerald-500 hover:bg-emerald-900/30 hover:text-emerald-200 transition-all duration-300 backdrop-blur-sm"
                            style={{ transitionDelay: `${techIndex * 50}ms` }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-zinc-700/50">
                        <p className="text-sm text-stone-500 font-medium tracking-wide uppercase">
                          {project.media.length} Media Files • {currentMedia.type === "video" ? "Video" : "Image"}{" "}
                          {currentIndex + 1} of {project.media.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-40 px-8 bg-gradient-to-b from-zinc-900 to-neutral-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-extralight mb-12 tracking-[-0.02em] text-white">
            Let&apos;s Create Together
          </h2>

          <p className="text-2xl text-stone-300 font-light mb-20 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your vision to life? I&apos;m passionate about collaborating on projects that make a difference.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-6 rounded-full font-medium text-lg shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 group border-0 backdrop-blur-sm"
              asChild
            >
              <a href="mailto:Somaykaush@gmail.com">
                <Mail className="mr-3 h-5 w-5 transition-transform duration-300" />
                Somaykaush@gmail.com
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-zinc-600 text-stone-300 hover:border-emerald-500 hover:text-emerald-200 px-12 py-6 rounded-full font-medium text-lg bg-zinc-800/50 hover:bg-emerald-900/20 transition-all duration-300 hover:scale-105 group backdrop-blur-sm"
              asChild
            >
              <a href="https://www.linkedin.com/in/somay-kousis-630ab1313/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-3 h-5 w-5 transition-transform duration-300" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}