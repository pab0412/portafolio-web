import React from 'react'

export const Header=  () => {
    return (
        <>
            <div className='flex flex-col sm:flex-row gap-6 sm:gap-12'>
                <div className='self-center sm:self-start'></div>
                <img src={}
                     alt="Foto"
                     className='size-36 sm:size-48 object-cover rounded-full shadow-lg'
                />
            </div>
        </>
    )
}