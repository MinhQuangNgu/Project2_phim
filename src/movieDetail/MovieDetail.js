import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NotFound from "~/notfound/NotFound";
import "./style.css";

const MovieDetail = () => {
    const { slug } = useParams();

    const trailerRef = useRef();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    const handleScroll = () => {
        if (trailerRef) {
            trailerRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const [movie, setMovie] = useState({});
    const [check, setCheck] = useState(false);

    useEffect(() => {
        let here = true;
        let url = `/movie/getone/${slug}`;
        if (here) {
            axios
                .get(url)
                .then((res) => {
                    if (!res.data?.movie) {
                        setCheck(true);
                    }
                    setMovie(res.data?.movie);
                })
                .catch((err) => {
                    setCheck(true);
                    toast.error(err?.response?.data?.msg);
                });
        }
        return () => {
            here = false;
        };
    }, [slug]);
    return (
        <>
            {!check ? (
                <div className="movie_detail_container">
                    <div className="grid wideS">
                        <div className="movie_detail_wrap">
                            <div className="movie_infor_container">
                                <img
                                    className="movie_infor-image"
                                    src="https://congluan-cdn.congluan.vn/files/content/2022/07/06/%E2%80%98minions-su-troi-day-cua-gru%E2%80%99-pha-vo-ky-luc-phong-ve-tai-viet-nam-020737208.jpg"
                                />
                                <div className="movie_infor_detail_container">
                                    <div className="movie_infor_detail_image_container">
                                        <img src="https://kenh14cdn.com/203336854389633024/2022/7/5/photo-1-1657007086287434920948.jpg" />
                                    </div>
                                    <div className="movie_infor_detail-clearly">
                                        <div className="movie_infor_detail_title">
                                            <h1>
                                                Cho Kẹo Hay Bị Ghẹo Scooby Doo
                                            </h1>
                                        </div>
                                        <div className="movie_infor_detail_enTitle">
                                            <h2>
                                                Cho Kẹo Hay Bị Ghẹo Scooby Doo
                                            </h2>
                                        </div>
                                        <div className="movie_infor_detail_button_container">
                                            <button
                                                onClick={handleScroll}
                                                className="movie_infor_detail_button_trailer"
                                            >
                                                Trailer
                                            </button>
                                            <Link to="/xem-phim/asds">
                                                <button className="movie_infor_detail_button_watch">
                                                    Xem Phim
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="movie_infor-more_container">
                                <div className="movie_infor-more_rating_container">
                                    <div className="movie_infor-more_rating_wrap">
                                        <i className="fa-regular fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                        <div className="movie_infor-more-rating_star">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="movie_infor-more_detail_container">
                                    <ul className="movie_infor-more-detail-wrap">
                                        <li>Trạng thái: HD Vietsub</li>
                                        <li>Thời lượng: 130 phút</li>
                                        <li>Tình trạng: Phim đang chiếu</li>
                                        <li>Ngôn ngữ: Phụ đề Việt</li>
                                        <li>Năm sản xuất: 2022</li>
                                        <li>Quốc gia: Âu - Mỹ</li>
                                        <li>
                                            Thể loại:
                                            <Link className="movie_type" to="">
                                                {" "}
                                                Phiêu lưu{" "}
                                            </Link>
                                            -
                                            <Link className="movie_type" to="">
                                                {" "}
                                                Hành Động{" "}
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="movie_content-container">
                                        <h3>Nội dung phim</h3>
                                        <p>
                                            Phi Công Siêu Đẳng Maverick kể về
                                            sau hơn ba mươi năm phục vụ, Pete
                                            “Maverick” Mitchell từng nổi danh là
                                            một phi công thử nghiệm quả cảm hàng
                                            đầu của Hải quân, né tránh cơ hội
                                            thăng chức, điều khiến anh cảm thấy
                                            bị bó buộc, để trở về làm chính
                                            mình.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div ref={trailerRef} className="trailer_container">
                                <iframe
                                    className="trailer_container_detail"
                                    width="100%"
                                    src="https://www.youtube.com/embed/giXco2jaZ_4"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="movie_comment-container"></div>
                        </div>
                    </div>
                </div>
            ) : (
                <NotFound />
            )}
        </>
    );
};

export default MovieDetail;
