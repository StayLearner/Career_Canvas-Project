// import React from 'react'
// import { Badge } from './ui/badge'
// import { useNavigate } from 'react-router-dom'

// const LatestJobCards = ({job}) => {
//     const navigate = useNavigate();
//     return (
//         <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
//             <div>
//                 <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
//                 <p className='text-sm text-gray-500'>India</p>
//             </div>
//             <div>
//                 <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
//                 <p className='text-sm text-gray-600'>{job?.description}</p>
//             </div>
//             <div className='flex items-center gap-2 mt-4'>
//     <Badge className='bg-blue-100 text-[#ff006e] font-bold py-1 px-2 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out' variant="ghost">
//         {job?.position} Positions
//     </Badge>
//     <Badge className='bg-blue-100 text-[#fb5607] font-bold py-1 px-2 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out' variant="ghost">
//         {job?.jobType}
//     </Badge>
//     <Badge className='bg-blue-100 text-[#3a86ff] font-bold py-1 px-2 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out' variant="ghost">
//         {job?.salary} LPA
//     </Badge>
// </div>
             
//         </div>
//     )
// }

// export default LatestJobCards


import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // For animations

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    
    return (
        <motion.div
        onClick={() => navigate(`/description/${job._id}`)}
        className='p-5 rounded-lg shadow-lg bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-gray-200 cursor-pointer transform transition-transform duration-300 hover:scale-105'
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }} // Scale on hover for animation
    >
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='font-semibold text-lg text-indigo-600'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>Location: India</p>
                </div>
                <div className='text-sm text-gray-500'>{job?.datePosted}</div> {/* Assuming you have a datePosted field */}
            </div>
            <div className='my-2'>
                <h1 className='font-bold text-xl text-gray-800'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-3 mt-4'>
                <Badge className='bg-blue-100 text-[#ff006e] font-bold py-1 px-3 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out'>
                    {job?.position} Positions
                </Badge>
                <Badge className='bg-blue-100 text-[#fb5607] font-bold py-1 px-3 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out'>
                    {job?.jobType}
                </Badge>
                <Badge className='bg-blue-100 text-[#3a86ff] font-bold py-1 px-3 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out'>
                    {job?.salary} LPA
                </Badge>
            </div>
        </motion.div>
    );
};

export default LatestJobCards;
