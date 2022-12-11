import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Comment from "~/comment/Comment";
import NotFound from "~/notfound/NotFound";
import { isFailing, isLoading, isSuccess } from "~/redux/slice/auth";
import "./style.css";

const MovieDetail = ({ cache }) => {
    const { slug } = useParams();

    const dispatch = useDispatch();

    const stars = Array(10).fill(0);

    const [currentStar, setCurrentStar] = useState(10);
    const [hoverStar, setHoverStar] = useState(undefined);

    const handleClickStar = (e) => {
        setCurrentStar(e);
    };

    const kindRef = useRef("");

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
        if (cache.current[url]) {
            setMovie(cache.current[url]);
            if (!kindRef.current) {
                cache.current[url]?.kinds?.forEach((item, index) => {
                    if (index !== cache.current[url]?.kinds.length - 1) {
                        kindRef.current = kindRef.current + item?.title + " - ";
                    } else {
                        kindRef.current = kindRef.current + item?.title;
                    }
                });
            }
            return;
        }
        dispatch(isLoading());
        if (here) {
            axios
                .get(url)
                .then((res) => {
                    if (!here) {
                        return;
                    }
                    if (!res.data?.movie) {
                        setCheck(true);
                    }
                    dispatch(isSuccess());
                    setMovie(res.data?.movie);
                    cache.current[url] = res.data?.movie;
                    if (!kindRef.current) {
                        res.data.movie?.kinds?.forEach((item, index) => {
                            if (index !== res.data.movie?.kinds.length - 1) {
                                kindRef.current =
                                    kindRef.current + item?.title + " - ";
                            } else {
                                kindRef.current = kindRef.current + item?.title;
                            }
                        });
                    }
                })
                .catch((err) => {
                    setCheck(true);
                    dispatch(isFailing());
                    toast.error(err?.response?.data?.msg);
                });
        }
        return () => {
            here = false;
        };
    }, [slug]);
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{movie ? movie?.title : "Thế Giới Phim"}</title>
                    <link
                        rel="canonical"
                        href={`https://sttruyen.xyz/phim/${slug}`}
                    />
                    <meta
                        content={
                            movie?.content ||
                            "Sttruyen là web xem phim mọi thể loại."
                        }
                    />
                </Helmet>
            </HelmetProvider>
            {!check ? (
                <div className="movie_detail_container">
                    <div className="grid wideS">
                        <div className="movie_detail_wrap">
                            <div className="movie_infor_container">
                                <img
                                    className="movie_infor-image"
                                    src={movie?.image}
                                />
                                <div className="movie_infor_detail_container">
                                    <div className="movie_infor_detail_image_container">
                                        <img src={movie?.image} />
                                    </div>
                                    <div className="movie_infor_detail-clearly">
                                        <div className="movie_infor_detail_title">
                                            <h1>{movie?.title}</h1>
                                        </div>
                                        <div className="movie_infor_detail_enTitle">
                                            <h2>{movie?.engTitle}</h2>
                                        </div>
                                        <div className="movie_infor_detail_button_container">
                                            <button
                                                onClick={handleScroll}
                                                className="movie_infor_detail_button_trailer"
                                            >
                                                Trailer
                                            </button>
                                            <Link
                                                to={`/xem-phim/${movie?.slug}`}
                                            >
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
                                        {stars.map((_, index) => {
                                            return hoverStar ? (
                                                hoverStar >= index + 1 ? (
                                                    <i
                                                        key={index + "asds"}
                                                        onClick={() => {
                                                            handleClickStar(
                                                                index + 1
                                                            );
                                                        }}
                                                        onMouseOver={() => {
                                                            setHoverStar(
                                                                index + 1
                                                            );
                                                        }}
                                                        onMouseLeave={() => {
                                                            setHoverStar(
                                                                undefined
                                                            );
                                                        }}
                                                        className="fa-solid fa-star"
                                                    ></i>
                                                ) : (
                                                    <i
                                                        key={index + "asdss"}
                                                        onClick={() => {
                                                            handleClickStar(
                                                                index + 1
                                                            );
                                                        }}
                                                        onMouseOver={() => {
                                                            setHoverStar(
                                                                index + 1
                                                            );
                                                        }}
                                                        onMouseLeave={() => {
                                                            setHoverStar(
                                                                undefined
                                                            );
                                                        }}
                                                        className="fa-regular fa-star"
                                                    ></i>
                                                )
                                            ) : currentStar >= index + 1 ? (
                                                <i
                                                    key={index + "asdsz"}
                                                    onClick={() => {
                                                        handleClickStar(
                                                            index + 1
                                                        );
                                                    }}
                                                    onMouseOver={() => {
                                                        setHoverStar(index + 1);
                                                    }}
                                                    onMouseLeave={() => {
                                                        setHoverStar(undefined);
                                                    }}
                                                    className="fa-solid fa-star"
                                                ></i>
                                            ) : (
                                                <i
                                                    key={index + "asdsa"}
                                                    onClick={() => {
                                                        handleClickStar(
                                                            index + 1
                                                        );
                                                    }}
                                                    onMouseOver={() => {
                                                        setHoverStar(index + 1);
                                                    }}
                                                    onMouseLeave={() => {
                                                        setHoverStar(undefined);
                                                    }}
                                                    className="fa-regular fa-star"
                                                ></i>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="movie_infor-more_detail_container">
                                    <ul className="movie_infor-more-detail-wrap">
                                        <li>Trạng thái: {movie?.status}</li>
                                        <li>Thời lượng: {movie?.times}</li>
                                        <li>Tình trạng: Phim đang chiếu</li>
                                        <li>Ngôn ngữ: {movie?.languageF}</li>
                                        <li>Năm sản xuất: {movie?.year}</li>
                                        <li>
                                            Quốc gia: {movie?.country?.name}
                                        </li>
                                        <li>Thể loại: {kindRef.current}</li>
                                        <li>Lượt xem: {movie?.watching}</li>
                                    </ul>
                                    <div className="movie_content-container">
                                        <h3>Nội dung phim</h3>
                                        <p>{movie?.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div ref={trailerRef} className="trailer_container">
                                <iframe
                                    className="trailer_container_detail"
                                    width="100%"
                                    src={movie?.trailer}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="movie_comment-container">
                                <Comment />
                            </div>
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
