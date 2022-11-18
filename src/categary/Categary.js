import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "~/card/Card";
import { isFailing, isLoading, isSuccess } from "~/redux/slice/auth";
import "./style.css";

function Categary({ name, url, urlAl, cache }) {
    const [infor, setInfor] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        let here = true;
        if (cache.current[url]) {
            return setInfor(cache.current[url]);
        }
        dispatch(isLoading());
        if (here) {
            axios
                .get(url)
                .then((res) => {
                    if (!here) {
                        return;
                    }
                    setInfor(res.data?.movies);
                    cache.current[url] = res.data?.movies;
                    res.data?.movies?.forEach((item) => {
                        let urlChapter = `/movie/getone/${item?.slug}`;
                        if (!cache.current[urlChapter]) {
                            cache.current[urlChapter] = item;
                        }
                    });
                    dispatch(isSuccess());
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.msg);
                    dispatch(isFailing());
                });
        }

        return () => {
            here = false;
        };
    }, []);
    return (
        <div className="categary_container">
            <div className="categary_title">
                <Link className="categary_title-link" to={urlAl}>
                    <h1>{name}</h1>
                </Link>
                <Link to={urlAl} className="categary_watchAll-container">
                    <div className="categary_watchAll-wrap">
                        <p style={{ margin: 0 }}>Xem tất cả</p>
                    </div>
                </Link>
            </div>
            <div className="categary_card-container">
                <div className="row">
                    {infor?.map((item) => (
                        <div key={item?._id} className="col c-6 m-4 l-3">
                            <Card item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Categary;
