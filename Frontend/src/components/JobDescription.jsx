import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            // console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                // console.log(error);
            }
        }


        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);







    return (
//         <div className='max-w-7xl mx-auto my-10'>
//             <div className='flex items-center justify-between'>
//                 <div>
//                     <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
//                     <div className='flex items-center gap-2 mt-4'>
//     <Badge className='bg-blue-100 text-[#ff006e] font-bold py-1 px-2 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out' variant="ghost">
//         {singleJob?.position} Positions
//     </Badge>
//     <Badge className='bg-blue-100 text-[#fb5607] font-bold py-1 px-2 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out' variant="ghost">
//         {singleJob?.jobType}
//     </Badge>
//     <Badge className='bg-blue-100 text-[#3a86ff] font-bold py-1 px-2 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out' variant="ghost">
//         {singleJob?.salary} LPA
//     </Badge>
// </div>
//                 </div>
//                 <Button
//                 onClick={isApplied ? null : applyJobHandler}
//                     disabled={isApplied}
//                     className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#ff9e00] hover:bg-[#ff8500]'}`}>
//                     {isApplied ? 'Already Applied' : 'Apply Now'}
//                 </Button>




//             </div>
//             <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Details</h1>
//             <div className='my-4'>
//                 <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
//                 <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
//                 <h1 className='font-bold my-1'>Job Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
//                 <h1 className='font-bold my-1'>Job Type: <span className='pl-4 font-normal text-gray-800'>{singleJob?.jobType}</span></h1>
               
                



//                 <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
//                 <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
//                 <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
//                 <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
//             </div>
//         </div>
//     )
// }




<div className='max-w-7xl mx-auto my-10 bg-gradient-to-r from-[#f0f4ff] to-[#e3f2fd] p-8 rounded-lg shadow-lg'>
  <div className='flex items-center justify-between'>
    <div>
      <h1 className='font-bold text-3xl text-[#3a86ff]'>{singleJob?.title}</h1>
      <div className='flex items-center gap-4 mt-4'>
        <Badge className='bg-[#ffb3c1] text-[#ff006e] font-bold py-2 px-3 rounded-full shadow-lg hover:scale-105 transition duration-300 ease-in-out' variant="ghost">
          {singleJob?.position} Positions
        </Badge>
        <Badge className='bg-[#ffd7ba] text-[#fb5607] font-bold py-2 px-3 rounded-full shadow-lg hover:scale-105 transition duration-300 ease-in-out' variant="ghost">
          {singleJob?.jobType}
        </Badge>
        <Badge className='bg-[#a0c4ff] text-[#3a86ff] font-bold py-2 px-3 rounded-full shadow-lg hover:scale-105 transition duration-300 ease-in-out' variant="ghost">
          {singleJob?.salary} LPA
        </Badge>
      </div>
    </div>
    <Button
      onClick={isApplied ? null : applyJobHandler}
      disabled={isApplied}
      className={`rounded-full px-6 py-3 font-semibold tracking-wide ${isApplied ? 'bg-gray-500 cursor-not-allowed text-white' : 'bg-[#ff9e00] text-white hover:scale-105 transform transition-all duration-300 ease-in-out shadow-lg'}`}
    >
      {isApplied ? 'Already Applied' : 'Apply Now'}
    </Button>
  </div>

  <h1 className='border-b-2 border-b-gray-300 font-medium py-4 text-2xl text-[#3a86ff] mt-8'>Job Details</h1>
  
  <div className='my-6 text-lg'>
    <h1 className='font-bold my-2'>Role: <span className='pl-4 font-normal text-gray-700'>{singleJob?.title}</span></h1>
    <h1 className='font-bold my-2'>Location: <span className='pl-4 font-normal text-gray-700'>{singleJob?.location}</span></h1>
    <h1 className='font-bold my-2'>Job Description: <span className='pl-4 font-normal text-gray-700'>{singleJob?.description}</span></h1>
    <h1 className='font-bold my-2'>Job Type: <span className='pl-4 font-normal text-gray-700'>{singleJob?.jobType}</span></h1>
    <h1 className='font-bold my-2'>Experience: <span className='pl-4 font-normal text-gray-700'>{singleJob?.experience} yrs</span></h1>
    <h1 className='font-bold my-2'>Salary: <span className='pl-4 font-normal text-gray-700'>{singleJob?.salary} LPA</span></h1>
    <h1 className='font-bold my-2'>Total Applicants: <span className='pl-4 font-normal text-gray-700'>{singleJob?.applications?.length}</span></h1>
    <h1 className='font-bold my-2'>Posted Date: <span className='pl-4 font-normal text-gray-700'>{singleJob?.createdAt.split("T")[0]}</span></h1>
  </div>
</div>

    )
}

export default JobDescription