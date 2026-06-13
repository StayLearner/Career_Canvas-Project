import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'



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
    <div className='px-4 sm:px-6 lg:px-8'>
<div>
    <Carousel className="w-full max-w-5xl mx-auto my-10 sm:my-16 md:my-20">
        <CarouselContent>
            {
                category.map((cat, index) => (
                    <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3">
                        <div className='flex justify-center px-2'>
                            <Button 
                                onClick={() => searchJobHandler(cat)} 
                                variant="outline" 
                                className="w-full sm:w-auto bg-sky-500 text-white border-sky-500 hover:bg-sky-600 hover:border-sky-600 rounded-full transition duration-300 ease-in-out shadow-lg px-6 py-2 text-sm sm:text-base whitespace-nowrap"
                            >
                                {cat}
                            </Button>
                        </div>
                    </CarouselItem>
                ))
            }
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex text-sky-500 hover:text-sky-600 transition duration-300" />
        <CarouselNext className="hidden sm:flex text-sky-500 hover:text-sky-600 transition duration-300" />
    </Carousel>
</div>

    </div>

    
  )
}

export default CategoryCarousel