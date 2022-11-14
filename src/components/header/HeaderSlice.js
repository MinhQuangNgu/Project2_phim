import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SlideSideMobile from "./SlideSideMobile";
import "./style.css";

const HeaderSlice = ({ turnSlide, setTurnSlide, cache }) => {
    const [typeCheck, setTypeCheck] = useState(false);
    const [countryCheck, setCountryCheck] = useState(false);

    const [kinds, setKinds] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        if (turnSlide == false) {
            setTypeCheck(false);
            setCountryCheck(false);
        }
    }, [turnSlide]);
    useEffect(() => {
        let here = true;
        const url = "/kind";
        if (cache.current[url]) {
            return setKinds(cache.current[url]);
        }
        if (here) {
            axios
                .get(url)
                .then((res) => {
                    if (!here) {
                        return;
                    }
                    setKinds(res.data.kinds);
                    cache.current[url] = res.data.kinds;
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.msg);
                });
        }
        return () => {
            here = false;
        };
    }, []);
    useEffect(() => {
        let here = true;
        const url = "/country";
        if (cache.current[url]) {
            return setCountries(cache.current[url]);
        }
        if (here) {
            axios
                .get(url)
                .then((res) => {
                    if (!here) {
                        return;
                    }
                    setCountries(res.data.countries);
                    cache.current[url] = res.data.countries;
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
        <div
            className={
                turnSlide
                    ? "mobile_slide_container"
                    : "mobile_slide_container header_slice_change"
            }
        >
            <div className="mobile_slide_wrap">
                <div className="times_icons_container">
                    <i
                        onClick={() => {
                            setTurnSlide(false);
                        }}
                        className="fa-regular fa-circle-xmark"
                    ></i>
                </div>
                <ul className="list_mobile_container">
                    <Link
                        onClick={() => {
                            setTurnSlide(false);
                        }}
                        className="list_mobile_items"
                        to={`tim-kiem?type=phim-le`}
                    >
                        <li className="mobile_list_item">Phim lẻ</li>
                    </Link>
                    <Link
                        onClick={() => {
                            setTurnSlide(false);
                        }}
                        className="list_mobile_items"
                        to={`tim-kiem?type=phim-bo`}
                    >
                        <li className="mobile_list_item-bottom">Phim bộ</li>
                    </Link>
                    <Link
                        onClick={() => {
                            setTurnSlide(false);
                        }}
                        className="list_mobile_items"
                        to={`tim-kiem?type=anime`}
                    >
                        <li className="mobile_list_item-bottom">Phim anime</li>
                    </Link>
                    <li
                        onClick={() => {
                            setTypeCheck(!typeCheck);
                        }}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingRight: "2rem",
                            cursor: "pointer",
                            position: "relative",
                        }}
                        className="mobile_list_item-bottom-select"
                    >
                        Thể loại
                        {typeCheck ? (
                            <i
                                style={{
                                    marginLeft: "0.5rem",
                                    marginTop: "0.6rem",
                                    fontSize: "2rem",
                                }}
                                className="fa-solid fa-angle-up"
                            ></i>
                        ) : (
                            <i
                                style={{
                                    marginLeft: "0.5rem",
                                    marginTop: "0.6rem",
                                    fontSize: "2rem",
                                }}
                                className="fa-solid fa-angle-down"
                            ></i>
                        )}
                    </li>
                    <SlideSideMobile
                        setTurnSlide={setTurnSlide}
                        type="kinds"
                        items={kinds}
                        typeCheck={typeCheck}
                    />
                    <li
                        onClick={() => {
                            setCountryCheck(!countryCheck);
                        }}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingRight: "2rem",
                            cursor: "pointer",
                            position: "relative",
                        }}
                        className="mobile_list_item-bottom-select"
                    >
                        Quốc Gia
                        {countryCheck ? (
                            <i
                                style={{
                                    marginLeft: "0.5rem",
                                    marginTop: "0.6rem",
                                    fontSize: "2rem",
                                }}
                                className="fa-solid fa-angle-up"
                            ></i>
                        ) : (
                            <i
                                style={{
                                    marginLeft: "0.5rem",
                                    marginTop: "0.6rem",
                                    fontSize: "2rem",
                                }}
                                className="fa-solid fa-angle-down"
                            ></i>
                        )}
                    </li>
                    <SlideSideMobile
                        setTurnSlide={setTurnSlide}
                        type="country"
                        items={countries}
                        typeCheck={countryCheck}
                    />
                </ul>
            </div>
        </div>
    );
};

export default HeaderSlice;
