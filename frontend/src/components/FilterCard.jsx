import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Button } from './ui/button'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi", "Bengaluru", "Hyderabad", "Pune", "Mumbai", "Kolkata", "Indore", "Chennai", "Nagpur", "Noida"]
    },
    {
        fitlerType: "Job Role",
        array: ["Frontend Developer", "AI/ML Engineer",  "Software Engineer","Data Science Engineer", "Content Writer","Marketing Executive","HR Manager","Full Stack Developer", "Devops Engineer","UI/UX Designer"]
    },
    {
        fitlerType: "Job Type",
        array: ["Full Time","Part Time","Internship","Remote Work","on-site", "Shift Work","Commission-Based"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    const clearFilterHandler = () => {
        setSelectedValue("");
        dispatch(setSearchedQuery(""));
    }

    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue, dispatch]);

    return (
        <div className='w-full bg-white p-3 rounded-md shadow-sm border border-gray-100'>
            <div className='flex items-center justify-between gap-3'>
                <h1 className='font-bold text-lg'>Filter Jobs</h1>
                {
                    selectedValue && (
                        <Button
                            onClick={clearFilterHandler}
                            variant="outline"
                            className="h-8 px-3 text-xs"
                        >
                            Clear
                        </Button>
                    )
                }
            </div>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-4 mt-4">
            
                {
                    fitlerData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-base sm:text-lg'>{data.fitlerType}</h1>
                            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-x-3'>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={itemId} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId} className="text-sm cursor-pointer">{item}</Label>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard