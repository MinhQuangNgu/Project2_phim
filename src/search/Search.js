import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "~/card/Card";
import { isFailing, isLoading, isSuccess } from "~/redux/slice/auth";
import "./style.css";
const Search = () => {
    const { search } = useLocation();
    const [movies, setMovies] = useState({});
    const dispatch = useDispatch();
    const [kinds, setKinds] = useState([]);
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();

    const sortRef = useRef();
    const kindRef = useRef();
    const countryRef = useRef();
    const typeRef = useRef();

    const handleSearching = () => {
        const searchingI = new URLSearchParams(search).get("searching") || "";
        const searchForm = {
            sort: sortRef.current.value,
            kind: kindRef.current.value,
            country: countryRef.current.value,
            type: typeRef.current.value,
            searching: searchingI,
        };

        const excludesFields = ["sort", "kind", "country", "type", "searching"];
        excludesFields.forEach((item) => {
            if (!searchForm[item]) {
                delete searchForm[item];
            }
        });

        const searching = new URLSearchParams(searchForm).toString();
        navigate(`?${searching}`);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [search]);

    useEffect(() => {
        let here = true;
        if (here) {
            const url = "/kind";
            axios
                .get(url)
                .then((res) => {
                    setKinds(res.data.kinds);
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
        if (here) {
            const url = "/country";
            axios
                .get(url)
                .then((res) => {
                    setCountries(res.data.countries);
                })
                .catch((err) => {
                    dispatch(isFailing());
                    toast.error(err?.response?.data?.msg);
                });
        }
        return () => {
            here = false;
        };
    }, []);

    useEffect(() => {
        console.log("herer");
        const url = `/movie${search}`;
        dispatch(isLoading());
        axios
            .get(url)
            .then((res) => {
                dispatch(isSuccess());
                setMovies(res.data);
            })
            .catch(() => {
                dispatch(isFailing());
            });
    }, [search]);

    return (
        <div className="search_container">
            <div className="grid wide">
                <div className="search_filter_container">
                    <select
                        ref={sortRef}
                        name="sort"
                        className="search_filter-select"
                    >
                        <option value="">Phim mới</option>
                        <option value="createdAt">Phim cũ</option>
                        <option value="-watching">Xem nhiều nhất</option>
                        <option value="watching">Xem ít nhất</option>
                    </select>
                    <select
                        ref={kindRef}
                        name="the-loai"
                        className="search_filter-select"
                    >
                        <option value="">Thể Loại</option>
                        {kinds?.map((item) => (
                            <option
                                value={item?.slug}
                                key={item?._id + "kinds"}
                            >
                                {item?.title}
                            </option>
                        ))}
                    </select>
                    <select
                        ref={countryRef}
                        name="quoc-gia"
                        className="search_filter-select"
                    >
                        <option value="">Quốc gia</option>
                        {countries?.map((item) => (
                            <option
                                value={item?.slug}
                                key={item?._id + "kinds"}
                            >
                                {item?.name}
                            </option>
                        ))}
                    </select>
                    <select
                        ref={typeRef}
                        name="type"
                        className="search_filter-select"
                    >
                        <option value="">Tất cả</option>
                        <option value="phim-le">Phim lẻ</option>
                        <option value="phim-bo">Phim bộ</option>
                        <option value="anime">Anime</option>
                    </select>
                    <button onClick={handleSearching} className="search_button">
                        Tìm Kiếm
                    </button>
                </div>
                <div className="search_items_container">
                    {movies?.movies?.length == 0 ? (
                        <div className="warning_movies">
                            Không có phim bạn muốn tìm.
                        </div>
                    ) : (
                        <div className="row">
                            {movies?.movies?.map((item) => (
                                <div
                                    key={item?._id + "Searching"}
                                    className="col c-6 m-4 l-3"
                                >
                                    <Card item={item} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
