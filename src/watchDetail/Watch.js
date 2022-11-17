import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import Comment from "~/comment/Comment";
import NotFound from "~/notfound/NotFound";
import { isFailing, isLoading, isSuccess } from "~/redux/slice/auth";
import "./style.css";
import { url } from "~/url/Url";

const Watch = ({ cache }) => {
    const { slug } = useParams();

    const dispatch = useDispatch();

    const [movie, setMovie] = useState({});
    const [check, setCheck] = useState(false);
    const [socket, setSocket] = useState();

    const [chap, setChap] = useState(1);

    const chapRef = useRef(1);

    const { search } = useLocation();

    useEffect(() => {
        const chapter = new URLSearchParams(search).get("tap") || 1;
        chapRef.current = chapter;
        setChap(chapter);
    }, [search]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug, search]);

    useEffect(() => {
        const socket = io(url);
        setSocket(socket);
        return () => {
            socket.close();
        };
    }, []);

    useEffect(() => {
        let here = true;
        let url = `/movie/getone/${slug}`;
        if (cache.current[url]) {
            return setMovie(cache.current[url]);
        }
        dispatch(isLoading());
        if (here) {
            axios
                .get(url)
                .then((res) => {
                    if (!res.data?.movie) {
                        setCheck(true);
                    }
                    setMovie(res.data?.movie);
                    dispatch(isSuccess());
                    cache.current[url] = res.data?.movie;
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

    useEffect(() => {
        if (socket) {
            setTimeout(() => {
                socket.emit("watching", {
                    slug,
                });
            }, 60000);
        }
    }, [socket]);
    return (
        <>
            {!check ? (
                <div className="watch_container">
                    <div className="grid wideS">
                        <div className="watch_wrap">
                            <ul className="watch_top_content">
                                <Link className="watch_top-items" to="/">
                                    <li>Home /</li>
                                </Link>
                                <Link
                                    className="watch_top-items"
                                    to={`/phim/${movie?.slug}`}
                                >
                                    <li>{movie?.title} /</li>
                                </Link>
                                <Link
                                    className="watch_top-items"
                                    to={`/xem-phim/${movie?.slug}`}
                                >
                                    <li>Tập full</li>
                                </Link>
                            </ul>
                            <div className="watcher_container">
                                <iframe
                                    className="movie_iframe"
                                    width="100%"
                                    src={
                                        chapRef.current === 1
                                            ? movie?.moviesLink
                                            : movie?.chapters &&
                                              movie?.chapters[
                                                  chapRef.current - 2
                                              ]?.movieLink
                                    }
                                    frameBorder="0"
                                    scrolling="0"
                                    allowFullScreen
                                ></iframe>
                                <div className="watcher_name_wrap">
                                    <h3>Phi Cơ Siêu Đẳng (Mavel Rick 2022)</h3>
                                </div>
                                {movie?.type === "phim-le" ? (
                                    <div className="episode_container">
                                        <Link className="link_episode" to="?">
                                            <div className="episode_items active">
                                                Full
                                            </div>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="episode_container">
                                        <Link className="link_episode" to="?">
                                            <div
                                                className={`${
                                                    chapRef.current == 1
                                                        ? "episode_items active"
                                                        : "episode_items"
                                                }`}
                                            >
                                                Tập 1
                                            </div>
                                        </Link>
                                        {movie?.chapters?.map((item, index) => (
                                            <Link
                                                key={item?._id + "asd"}
                                                className="link_episode"
                                                to={`?tap=${index + 2}`}
                                            >
                                                <div
                                                    className={`${
                                                        chapRef.current ==
                                                        index + 2
                                                            ? "episode_items active"
                                                            : "episode_items"
                                                    }`}
                                                >
                                                    Tập {index + 2}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="comment_container">
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

export default Watch;
