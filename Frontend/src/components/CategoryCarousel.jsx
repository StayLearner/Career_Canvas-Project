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
    <div>
            {/* <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/2 lg-basis-1/3">
                                <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel> */}

<div>
    <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
            {
                category.map((cat, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <Button 
                            onClick={() => searchJobHandler(cat)} 
                            variant="outline" 
                            className="bg-sky-500 text-white border-sky-500 hover:bg-sky-600 hover:border-sky-600 rounded-full transition duration-300 ease-in-out shadow-lg px-6 py-2"
                        >
                            {cat}
                        </Button>
                    </CarouselItem>
                ))
            }
        </CarouselContent>
        <CarouselPrevious className="text-sky-500 hover:text-sky-600 transition duration-300" />
        <CarouselNext className="text-sky-500 hover:text-sky-600 transition duration-300" />
    </Carousel>
</div>

    </div>

    
  )
}

export default CategoryCarousel