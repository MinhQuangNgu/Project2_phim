import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "~/card/Card";
import Paginating from "~/paginating/Paginating";
import { isFailing, isLoading, isSuccess } from "~/redux/slice/auth";
import "./style.css";
const Search = ({ cache }) => {
    const { search } = useLocation();
    const [movies, setMovies] = useState({});
    const dispatch = useDispatch();
    const [kinds, setKinds] = useState([]);
    const [countries, setCountries] = useState([]);
    const [updatePS, setUpdatePC] = useState(false);
    const navigate = useNavigate();

    const countRef = useRef(1);

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
        setUpdatePC(!updatePS);
        navigate(`?${searching}`);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [search]);

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
                    setCountries(res.data.countries);
                    cache.current[url] = res.data.countries;
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
        const url = search ? `/movie${search}&limit=20` : `/movie?limit=20`;
        if (cache.current[url]) {
            setMovies(cache.current[url]);
            countRef.current = cache.current[url]?.count;
            return;
        }
        dispatch(isLoading());
        axios
            .get(url)
            .then((res) => {
                dispatch(isSuccess());
                setMovies(res.data);
                res.data?.movies?.forEach((item) => {
                    let urlChapter = `/movie/getone/${item?.slug}`;
                    if (!cache.current[urlChapter]) {
                        cache.current[urlChapter] = item;
                    }
                });
                cache.current[url] = res.data;
                countRef.current = res.data?.count;
            })
            .catch(() => {
                dispatch(isFailing());
            });
    }, [search]);

    return (
        <div className="search_container">
            <HelmetProvider>
                <Helmet>
                    <title>Tìm Kiếm Phim</title>
                    <link
                        rel="canonical"
                        href={`https://sttruyen.xyz/tim-kiem`}
                    />
                    <meta content={"Tìm kiếm phim hay."} />
                </Helmet>
            </HelmetProvider>
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
            {movies?.count && (
                <Paginating
                    updatePS={updatePS}
                    count={countRef.current}
                    limit={20}
                />
            )}
        </div>
    );
};

export default Search;
