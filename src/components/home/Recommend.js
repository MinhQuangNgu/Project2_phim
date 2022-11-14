import React, { useEffect, useState } from "react";
import "./style.css";
import { Navigation, Scrollbar, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCard from "~/card/SwiperCard";
import axios from "axios";
import { toast } from "react-toastify";
function Recommend({ cache }) {
    const [infor, setInfor] = useState([]);
    useEffect(() => {
        let here = true;
        const url = "/movie?limit=8";
        if (cache.current[url]) {
            return setInfor(cache.current[url]);
        }
        if (here) {
            axios
                .get(url)
                .then((res) => {
                    if (!here) {
                        return;
                    }
                    setInfor(res.data?.movies);
                    cache.current[url] = res.data?.movies;
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.msg);
                });
        }

        return () => {
            here = false;
        };
    }, []);
    return (
        <div className="recommend_container">
            <div className="recommend_title">
                <h1>Phim Đề Cử</h1>
            </div>
            <div className="recommend_swipper">
                <div className="row">
                    <div className="col c-12 m-0 l-0">
                        <Swiper
                            modules={[Navigation, Scrollbar, Autoplay]}
                            spaceBetween={10}
                            slidesPerView={3}
                            navigation
                            scrollbar={{ draggable: true }}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            loop
                        >
                            {infor?.map((item) => (
                                <SwiperSlide key={item?._id + "asd"}>
                                    <SwiperCard item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="col c-0 m-12 l-0">
                        <Swiper
                            modules={[Navigation, Scrollbar, Autoplay]}
                            spaceBetween={10}
                            slidesPerView={4}
                            navigation
                            scrollbar={{ draggable: true }}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            loop
                        >
                            {infor?.map((item) => (
                                <SwiperSlide key={item?._id + "asd"}>
                                    <SwiperCard item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="col c-0 m-0 l-12">
                        <Swiper
                            modules={[Navigation, Scrollbar, Autoplay]}
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
                            {infor?.map((item) => (
                                <SwiperSlide key={item?._id + "asd"}>
                                    <SwiperCard item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recommend;
