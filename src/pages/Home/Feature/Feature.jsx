import React, { useEffect } from 'react'
import {useState} from 'react'
import FeatureCard from './FeatureCard'
import Heading from '../../../Components/Heading/Heading'

const Feature = () => {
    const [data, setData] = useState([])
    // console.log(data);

    useEffect(()=>{
        fetch('featurs.json')
        .then(res => res.json())
        .then(features  => {
            // console.log(features );
            setData(features )
            
        })
    },[])
    
  return (
    <section className='my-7'>
      <Heading heading='The Future of Group Study is Here' subHeading='Seamless collaboration, real-time discussions, and smarter learning tools—all in one place!'></Heading>
     <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
     {
        data.map(data => <FeatureCard key={data.id} featureData={data}></FeatureCard>)
      }
     </div>
    </section>
  )
}

export default Feature
