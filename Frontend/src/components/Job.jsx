


import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobId = "lsekdhjgdsnfvsdkjf";

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  }

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500 ml-auto'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        {/* <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button> */}
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
            {/* <AvatarImage src="data:image/png;base64,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" /> */}
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
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
    {/* <Button className="bg-[#7209b7]">Save For Later</Button> */}
</div>



    </div>
  )
}

export default Job