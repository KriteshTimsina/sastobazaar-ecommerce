import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
// import "./styles.css";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <Swiper
        loop={true}
        autoplay={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="">
            <Link to="/product">
              <img
                src="https://itti.com.np/pub/media/wysiwyg/Apple-M1-MacBook-Pro-copy.jpg"
                alt="SastoBazaar"
                className="w-full h-[250px] sm:h-full object-fill"
              />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-screen">
            <Link to="/product">
              <img
                src="https://itti.com.np/pub/media/wysiwyg/Asus-ROG-Strix-Scar-15-2021-G533WS_1.jpg"
                alt="SastoBazaar"
                className="w-full h-[250px] sm:h-full object-fill"
              />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-screen">
            <Link to="/product">
              <img
                src="https://itti.com.np/pub/media/wysiwyg/MSI-GE76-Raider-10UH_1.jpg"
                alt="SastoBazaar"
                className="w-full h-[250px] sm:h-full object-fill"
              />
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
