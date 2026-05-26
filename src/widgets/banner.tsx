import { useEffect, useState } from "react"
import Img1 from "../assets/banner/banner1.svg"
import Img2 from "../assets/banner/banner2.svg"
import Img3 from "../assets/banner/banner3.svg"

const images = [Img1, Img2, Img3]

const Banner = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }} 
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`banner ${i + 1}`}
            className="w-full shrink-0 object-cover"
          />
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-6">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-6 rounded-max transition-all duration-300 ${
              i === current
                ? "w-16 bg-grayscale-10"
                : "w-6 bg-grayscale-10-trans-40"
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default Banner
