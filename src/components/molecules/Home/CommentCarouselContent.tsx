import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay  } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-fade';
import './CommentCarouselContent.css'

function CommentCarouselContent() {
  return (
    <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
    spaceBetween={50}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    loop={true}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    className="custom-swiper"
  >
    <SwiperSlide>
      <div className="swiper-slide-container">
        <p className="content-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem sunt esse voluptatum veritatis, est praesentium inventore minima vero odio.
        </p>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="swiper-slide-container">
        <p className="content-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem sunt esse voluptatum veritatis, est praesentium inventore minima vero odio.
        </p>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="swiper-slide-container">
        <p className="content-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem sunt esse voluptatum veritatis, est praesentium inventore minima vero odio.
        </p>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="swiper-slide-container">
        <p className="content-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem sunt esse voluptatum veritatis, est praesentium inventore minima vero odio.
        </p>
      </div>
    </SwiperSlide>
    <SwiperSlide>
      <div className="swiper-slide-container">
        <p className="content-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem sunt esse voluptatum veritatis, est praesentium inventore minima vero odio.
        </p>
      </div>
    </SwiperSlide>
  </Swiper>
  )
}

export default CommentCarouselContent