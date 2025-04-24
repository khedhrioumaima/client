import React from 'react'
import Hero from '../../components/hero/Hero'
import BestSeller from '../../components/Lastestcollection/BestSeller'
import HomeCollection from '../../components/HomeCollection/HomeCollection'

const Home = () => {
  return (
    <div>
      <Hero/>
      <BestSeller/>
      <HomeCollection/>
    </div>
  )
}

export default Home
