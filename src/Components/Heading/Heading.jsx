import React from 'react'

const Heading = ({heading, subHeading}) => {
  return (
    <div className='my-5 text-center'>
    <h1 className='text-blue-600 uppercase text-5xl mb-2'>{heading} 📖</h1>
    <p className='text-gray-700 text-2xl break-words'>--- {subHeading} ---</p>
    </div>
  )
}

export default Heading
