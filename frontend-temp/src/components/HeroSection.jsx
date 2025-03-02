
          
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  // Array of phrases with their respective background colors
  const phrases = [
    { text: "Join a Thriving Community", color: "bg-blue-600" },
    { text: "Find Your Dream Job", color: "bg-[#4cc9f0]" },
    { text: "Achieve Work-Life Balance", color: "bg-red-600" },
    { text: "Explore New Opportunities", color: "bg-yellow-500" },
    { text: "Get Hired Faster", color: "bg-purple-500" },
    { text: "Work Good, Pay Good", color: "bg-pink-500" },
    { text: "Elevate Your Professional Journey", color: "bg-teal-500" },
    { text: "Transform Your Dreams into Reality", color: "bg-orange-500" },
    { text: "Empower Your Career Path", color: "bg-indigo-500" },
    { text: "Join a Network of Professionals", color: "bg-[#f28482]" },
    { text: "Discover Opportunities That Inspire", color: "bg-cyan-500" },
    { text: "Start Your Career with Confidence", color: "bg-lime-500" },
    { text: "Redefine Your Work Experience", color: "bg-amber-500" },
    { text: "Make Your Mark in the Industry", color: "bg-fuchsia-500" },
    { text: "Dream Big, Achieve More", color: "bg-rose-500" }
  ];

  // State to manage the current phrase index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change the index every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(phrases.length / 3)); // Change to groups of 3
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <div className='overflow-hidden relative'>
          <div className='flex animate-slide' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {phrases.map((phrase, index) => (
              <span key={index} className={`min-w-[33.33%] px-4 py-4 rounded-full ${phrase.color} text-white font-medium transition duration-300 hover:bg-green-600 hover:text-white mx-2`}>
                "{phrase.text}"
              </span>
            ))}
          </div>
        </div>

        <h1 className='text-5xl font-bold'>Seek, Apply &  <br /> Build Your <span className='text-[#ff9e00]'> Future Today</span></h1>

        {/* Fancy p tag */}
        <p className='fancy-paragraph'>
          "Navigate your career path with confidence—discover, apply, and thrive in your dream job. The future is yours!"
        </p>

        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
          <input
            type="text"
            placeholder='Find your dream jobs'
            onChange={(e) => setQuery(e.target.value)}
            className='outline-none border-none w-full bg'
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#3492f8]">
            <Search className='h-5 w-5 bg' />
          </Button>
        </div>
      </div>
      <style>
        {`
          .animate-slide {
            display: flex;
            transition: transform 1s ease; /* Smooth transition for sliding */
          }

          .fancy-paragraph {
            font-size: 18px; /* Font size */
            color: #333; /* Text color */
            margin: 20px 0; /* Margin for spacing */
            padding: 15px 20px; /* Padding for better visual */
            background: rgba(255, 255, 255, 0.9); /* Semi-transparent background */
            border: 2px solid #ff9e00; /* Border color */
            border-radius: 10px; /* Rounded corners */
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Shadow effect */
            text-align: center; /* Center align text */
            transition: transform 0.3s, background-color 0.3s; /* Animation effects */
          }

          .fancy-paragraph:hover {
            transform: scale(1.02); /* Slightly enlarge on hover */
            background-color: rgba(255, 255, 255, 1); /* Change background on hover */
          }
        `}
      </style>
    </div>
  );
};

export default HeroSection;
