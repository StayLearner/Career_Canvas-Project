import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  }

  return (
    <div className='p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-100 h-full'>
      <div className='flex items-center justify-between'>
        <p className='text-xs sm:text-sm text-gray-500 ml-auto'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className="p-5 sm:p-6 shrink-0" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div className='min-w-0'>
          <h1 className='font-medium text-base sm:text-lg truncate'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-base sm:text-lg my-2 line-clamp-1'>{job?.title}</h1>
        <p className='text-sm text-gray-600 line-clamp-3'>{job?.description}</p>
      </div>
      <div className='flex flex-wrap items-center gap-2 mt-4'>
    <Badge className='bg-blue-100 text-[#ff006e] font-bold py-1 px-2 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out' variant="ghost">
        {job?.position} Positions
    </Badge>
    <Badge className='bg-blue-100 text-[#fb5607] font-bold py-1 px-2 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out' variant="ghost">
        {job?.jobType}
    </Badge>
    <Badge className='bg-blue-100 text-[#3a86ff] font-bold py-1 px-2 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out' variant="ghost">
        {job?.salary} LPA
    </Badge>
</div>

      

      <div className='flex items-center justify-center gap-4 mt-4'>
    <Button 
        onClick={() => navigate(`/description/${job?._id}`)} 
        variant="outline" 
        className="transition duration-300 ease-in-out transform hover:bg-[#ffb703] hover:text-white border-[#ffb703] hover:border-transparent py-3 px-8 w-full max-w-xs rounded-lg shadow-md text-center"
    >
        Details
    </Button>
</div>



    </div>
  )
}

export default Job