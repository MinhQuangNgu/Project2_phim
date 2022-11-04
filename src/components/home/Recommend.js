import React from 'react'
import './style.css'
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCard from '~/card/SwiperCard';
function Recommend() {
  return (
        <div className='recommend_container'>
            <div className='recommend_title'>
                <h1>Phim Đề Cử</h1>
            </div>
            <div className='recommend_swipper'>
            <Swiper
                modules={[Navigation, Scrollbar,Autoplay]}
                spaceBetween={10}
                slidesPerView={5}
                navigation
                scrollbar={{ draggable: true }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                loop
                >
                <SwiperSlide>
                    <SwiperCard />
                </SwiperSlide>
                <SwiperSlide>
                    <SwiperCard />
                </SwiperSlide>
                <SwiperSlide>
                    <SwiperCard />
                </SwiperSlide>
                <SwiperSlide>
                    <SwiperCard />
                </SwiperSlide>
                <SwiperSlide>
                    <SwiperCard />
                </SwiperSlide>
                <SwiperSlide>
                    <SwiperCard />
                </SwiperSlide>
                <SwiperSlide>
                    <SwiperCard />
                </SwiperSlide>
                <SwiperSlide>
                    <SwiperCard />
                </SwiperSlide>
                <SwiperSlide>
                    <SwiperCard />
                </SwiperSlide>
            </Swiper>
            </div>
        </div>
  )
}

export default Recommend