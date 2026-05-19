import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SwiperCarousel.css';

export interface SwiperCarouselProps {
  slide1Title?: string;
  slide1Description?: string;
  slide2Title?: string;
  slide2Description?: string;
  slide3Title?: string;
  slide3Description?: string;
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

export const SwiperCarousel = ({
  slide1Title = 'Slide One',
  slide1Description = 'Add your content for the first slide here.',
  slide2Title = 'Slide Two',
  slide2Description = 'Add your content for the second slide here.',
  slide3Title = 'Slide Three',
  slide3Description = 'Add your content for the third slide here.',
  autoplay = false,
  loop = true,
  showNavigation = true,
  showPagination = true,
}: SwiperCarouselProps) => {
  const slides = [
    { title: slide1Title, description: slide1Description },
    { title: slide2Title, description: slide2Description },
    { title: slide3Title, description: slide3Description },
  ];

  const modules = [
    ...(showNavigation ? [Navigation] : []),
    ...(showPagination ? [Pagination] : []),
    ...(autoplay ? [Autoplay] : []),
  ];

  return (
    <div className="wf-carousel">
      <Swiper
        modules={modules}
        spaceBetween={24}
        slidesPerView={1}
        loop={loop}
        navigation={showNavigation}
        pagination={showPagination ? { clickable: true } : false}
        autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
        className="wf-carousel__swiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="wf-carousel__slide">
              <h3 className="wf-carousel__slide-title">{slide.title}</h3>
              <p className="wf-carousel__slide-desc">{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
