import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Sparkles } from 'lucide-react'

const category = [
  "Frontend Developer", 
  "Backend Developer",
  "Software Developer",
  "Data Science Engineer",
  "Content Writer",
  "Marketing Executive",
  "HR Manager",
  "FullStack Developer", 
  "Devops Engineer",
  "UI-UX Designer"
]

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <div className="py-16 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
            <Sparkles className="h-3 w-3" /> Explore Niches
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Find Roles by Category
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Click on any category card to instantly search matching jobs in your area of expertise.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-10">
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {category.map((cat, index) => (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="flex justify-center p-1">
                    <Button 
                      onClick={() => searchJobHandler(cat)} 
                      className="w-full bg-[#0d1220]/60 hover:bg-[#151c30]/80 text-slate-300 hover:text-white border border-white/5 hover:border-cyan-500/30 rounded-2xl transition-all duration-300 h-14 text-sm sm:text-base font-semibold shadow-lg backdrop-blur-sm relative overflow-hidden group flex items-center justify-center gap-2 select-none"
                    >
                      <span className="relative z-10">{cat}</span>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 transition-transform duration-500 -z-0" />
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom styled navigation buttons */}
            <CarouselPrevious className="hidden sm:flex -left-4 bg-[#0d1220]/80 border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-white h-10 w-10 rounded-xl transition duration-300 backdrop-blur-sm" />
            <CarouselNext className="hidden sm:flex -right-4 bg-[#0d1220]/80 border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-white h-10 w-10 rounded-xl transition duration-300 backdrop-blur-sm" />
          </Carousel>
        </div>

      </div>
    </div>
  )
}

export default CategoryCarousel