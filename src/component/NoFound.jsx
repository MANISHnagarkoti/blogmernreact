import React from 'react'

const NoFound = () => {
    return (
        <div className='m-auto md:w-1/2 p-9'>
            <img src="nofound/nofound.svg" className='w-full h-full object-cover' alt="" />
            <div className='text-center mt-9 font-bold text-4xl text-gray-400'>No blog Found</div>
        </div>
    )
}

export default NoFound