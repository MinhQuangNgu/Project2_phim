import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Comment from "~/comment/Comment";
import NotFound from "~/notfound/NotFound";
import "./style.css";

const Watch = () => {
    const { slug } = useParams();

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
                        console.log(res.data?.movie);
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
                <div className="watch_container">
                    <div className="grid wideS">
                        <div className="watch_wrap">
                            <ul className="watch_top_content">
                                <Link className="watch_top-items" to="/">
                                    <li>Home /</li>
                                </Link>
                                <Link className="watch_top-items" to="/">
                                    <li>Hành động /</li>
                                </Link>
                                <Link className="watch_top-items" to="/">
                                    <li>Phi Cơ Siêu Đẳng /</li>
                                </Link>
                                <Link className="watch_top-items" to="/">
                                    <li>Tập full</li>
                                </Link>
                            </ul>
                            <div className="watcher_container">
                                <iframe
                                    className="movie_iframe"
                                    width="100%"
                                    src={movie?.moviesLink}
                                    frameBorder="0"
                                    scrolling="0"
                                    allowFullScreen
                                ></iframe>
                                <div className="watcher_name_wrap">
                                    <h3>Phi Cơ Siêu Đẳng (Mavel Rick 2022)</h3>
                                </div>
                                <div className="episode_container">
                                    {!movie?.isSeries && (
                                        <Link className="link_episode" to="/">
                                            <div className="episode_items active">
                                                Full
                                            </div>
                                        </Link>
                                    )}
                                </div>
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
