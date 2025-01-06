import React, { useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-fade';
import './CommentCarouselContent.css'
import { useDispatch } from 'react-redux';
import { IKDispatch, IKUseSelector } from '../../../store';
import { fetchGetComments } from '../../../store/feature/commentSlice';

function CommentCarouselContent() {

  const commentList = IKUseSelector(state => state.commentSlice.commentList);

  const dispatch = useDispatch<IKDispatch>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchGetComments()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  if (commentList.length === 0) {
    return <div className="no-data">Henüz yorum eklenmemiş.</div>;
  }

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
      {
        commentList.map((comment, index) => {
          return (

            <SwiperSlide key={index}>
              <div className="swiper-slide-container" >
                <div className="x-content-wrapper">
                  <div className="text-section">
                    <h4 className="company-name">{comment.companyName}</h4>
                    <p className="quote">
                      {`"${comment.content}"`}
                    </p>
                    <p className="manager-info">
                      {comment.managerName}
                    </p>
                  </div>
                  <img
                    src={comment.managerPhoto}
                    alt={`${comment.managerName} photo`}
                    className="manager-photo"
                  />
                </div>
              </div>
            </SwiperSlide>

          )
        })
      }


    </Swiper>
  )
}

export default CommentCarouselContent