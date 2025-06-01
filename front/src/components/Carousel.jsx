import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from "swiper/modules"

export const Carousel = () => {

    return (
      <div style={{ position: 'relative', padding: '0 15px' }}>
      <Swiper 
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}  
      modules={[Navigation]} 
      className="mySwiper"
      style={{
        '--swiper-navigation-size': '24px',
        '--swiper-navigation-color': '#000000',
      }}
      >
      <SwiperSlide>
        <img 
            src="images/lamp_swiper-1.jpg" 
            alt="Slide 1" 
            style={{ width: '100%', height: '400px', padding: '0 5px'  }}
          />
          </SwiperSlide>
      <SwiperSlide>
      <img 
            src="images/lamp_swiper-2.jpg" 
            alt="Slide 2" 
            style={{ width: '100%', height: '400px', padding: '0 5px'  }}
          />
      </SwiperSlide>
      <SwiperSlide>
      <img 
            src="images/lamp_swiper-3.avif" 
            alt="Slide 3" 
            style={{ width: '100%', height: '400px', padding: '0 5px'  }}
          />
      </SwiperSlide>
    </Swiper>
    <div 
          className="swiper-button-prev" 
          style={{
            left: 'clamp(10px, calc(-155.7px + 21.58vw), 155px)',
            color: '#212121',
          }}
        />
        <div 
          className="swiper-button-next" 
          style={{
            right: 'clamp(10px, calc(-155.7px + 21.58vw), 155px)',
            color: '#212121',
          }}
        />
    </div>
    )
}