import { useState } from "react";
import "./Slider.css";
import CardSong from "../CardSong/CardSong";

interface SliderProps {
   items: any[];
}

const Slider = ({ items }: SliderProps) => {
   const [currentSlide, setCurrentSlide] = useState(0);
   const itemsCount = items.length;
   const slideWidth = 180; // задаем ширину слайда
   const screenWidth = window.innerWidth; // получаем ширину экрана
   let visibleSlides = 5; // задаем количество видимых слайдов по умолчанию

   // Вычисляем количество видимых слайдов в зависимости от ширины экрана
   if (screenWidth >= 1300) {
      visibleSlides = 5;
   } else if (screenWidth >= 1024) {
      visibleSlides = 4;
   } else if (screenWidth >= 768) {
      visibleSlides = 3;
   } else if (screenWidth >= 480) {
      visibleSlides = 2;
   } else {
      visibleSlides = 1;
   }

   const sliderWidth = slideWidth * itemsCount; // задаем ширину слайдера
   const sliderWrapperWidth = slideWidth * visibleSlides; // задаем ширину обертки слайдера
   const endSlide = itemsCount - visibleSlides; // определяем конечный слайд

   const handlePrevClick = () => {
      if (currentSlide > 0) {
         setCurrentSlide(currentSlide - 1);
      }
   };

   const handleNextClick = () => {
      if (currentSlide < endSlide) {
         setCurrentSlide(currentSlide + 1);
      }
   };

   const translateX = currentSlide * slideWidth * -1;

   return (
      <div className="slider">
         <div className="slider-controls">
            <button className="slider-prev" onClick={handlePrevClick}>
               {"<"}
            </button>
            <button className="slider-next" onClick={handleNextClick}>
               {">"}
            </button>
         </div>
         <div
            className="slider-content"
            style={{
               transform: `translateX(${translateX}px)`,
               width: `${sliderWidth}px`,
               maxWidth: `${sliderWrapperWidth}px`, // задаем максимальную ширину обертки слайдера
            }}
         >
            {items.map((item, index) => (
               <div className="card-song-wrapper" key={index}>
                  <CardSong item={item} songs_array={items} />
               </div>
            ))}
         </div>
      </div>
   );
};

export default Slider;
