import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "~/card/Card";
import "./style.css";

function Categary({ name, url, urlAl, cache }) {
    const [infor, setInfor] = useState([]);
    useEffect(() => {
        let here = true;
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
        <div className="categary_container">
            <div className="categary_title">
                <Link className="categary_title-link" to="/">
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
