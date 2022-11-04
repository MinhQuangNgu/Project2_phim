import React from 'react'
import Categary from '~/categary/Categary'
import Recommend from './Recommend'
import './style.css'

function Home() {
  return (
        <div className='home_container'>
            <div className='grid wide'>
                <Recommend />
                <Categary name="Phim Top"/>
                <Categary name="Phim lẻ"/>
                <Categary name="Phim bộ"/>
                <Categary name="Anime"/>
            </div>
        </div>
  )
}

export default Home
