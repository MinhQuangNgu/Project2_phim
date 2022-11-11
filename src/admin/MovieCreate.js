import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "~/redux/slice/auth";
import KindBox from "./KindBox";
import "./style.css";
const MovieCreate = () => {
    const [image, setImage] = useState("");
    const [kinds, setKinds] = useState([]);
    const [countries, setCountries] = useState([]);
    const [pKinds, setPKinds] = useState([]);

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const imageRef = useRef();
    const titleRef = useRef();
    const engTitleRef = useRef();
    const statusRef = useRef();
    const yearRef = useRef();
    const timeRef = useRef();
    const languageRef = useRef();
    const contentRef = useRef();
    const trailerRef = useRef();
    const movieRef = useRef();
    const isSerialRef = useRef();
    const countryRef = useRef();

    const onDrop = useCallback((acceptedFiles) => {
        const url = URL.createObjectURL(acceptedFiles[0]);
        if (image) {
            URL.revokeObjectURL(image);
        }
        imageRef.current = acceptedFiles[0];
        setImage(url);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    const handleCreateMovie = async () => {
        const movie = {
            title: titleRef.current.value,
            engTitle: engTitleRef.current.value,
            status: statusRef.current.value,
            image: imageRef.current,
            trailer: trailerRef.current.value,
            times: timeRef.current.value,
            year: yearRef.current.value,
            kinds: pKinds,
            description: contentRef.current.value,
            country: countryRef.current.value,
            languageF: languageRef.current.value,
            moviesLink: movieRef.current.value,
            isSeries: isSerialRef.current.checked,
        };
        if (
            !movie.title ||
            !movie.engTitle ||
            !movie.status ||
            !movie.image ||
            !movie.trailer ||
            !movie.times ||
            !movie.year ||
            !movie.kinds ||
            !movie.description ||
            !movie.country ||
            !movie.languageF ||
            !movie.moviesLink
        ) {
            return toast.error("Vui lòng điền hết thông tin.");
        }
        const formData = new FormData();
        formData.append("file", imageRef.current);
        formData.append("upload_preset", "sttruyenxyz");
        dispatch(isLoading());
        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/sttruyen/image/upload",
                formData
            );
            movie.image = res.data.url;
        } catch (err) {
            return dispatch(isFailing());
        }
        try {
            const res = await axios.post(
                "/movie/create",
                { ...movie },
                {
                    headers: {
                        token: `Bearer ${auth.user.accessToken}`,
                    },
                }
            );
            dispatch(isSuccess());
            toast.success(res?.data?.msg);
        } catch (err) {
            toast.error(err?.response?.data?.msg);
            dispatch(isFailing());
        }
    };

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
                    toast.error(err?.response?.data?.msg);
                });
        }
        return () => {
            here = false;
        };
    }, []);

    return (
        <div className="grid wide">
            <div className="movie_create_container">
                <div className="movie_create_wrap">
                    <div className="movie_create_title">
                        <h1>Tạo phim mới</h1>
                    </div>
                </div>
                <div className="movie_create_main">
                    <div className="movie_drop_zone">
                        <div
                            className="movie_drop_zone_wrap"
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <div className="createMovie_image-detail">
                                <i className="fa-solid fa-image"></i>
                            </div>
                            <div className="image_create-container">
                                <img className="image_items" src={image} />
                            </div>
                        </div>
                        <div className=""></div>
                    </div>
                    <div className="movie_create_form">
                        <div className="movie_create_form-items">
                            <label>Tên phim (tiếng Việt):</label>
                            <input
                                name="title"
                                ref={titleRef}
                                type="text"
                                placeholder="Tên phim tiếng Việt"
                            />
                        </div>
                        <div className="movie_create_form-items">
                            <label>Tên phim (tiếng Anh):</label>
                            <input
                                name="engTitle"
                                ref={engTitleRef}
                                type="text"
                                placeholder="Tên phim tiếng Anh"
                            />
                        </div>
                        <div className="movie_create_form-items">
                            <label>Trạng thái:</label>
                            <input
                                name="status"
                                ref={statusRef}
                                type="text"
                                placeholder="Trạng thái"
                            />
                        </div>
                        <div className="movie_create_form-items">
                            <label>Năm sản xuất:</label>
                            <input
                                name="year"
                                ref={yearRef}
                                type="text"
                                placeholder="Năm sản xuất"
                            />
                        </div>
                        <div className="movie_create_form-items">
                            <label>Thời lượng:</label>
                            <input
                                name="times"
                                ref={timeRef}
                                type="text"
                                placeholder="Thời lượng"
                            />
                        </div>
                        <div className="movie_create_form-items">
                            <label>Ngôn ngữ:</label>
                            <input
                                name="laguage"
                                ref={languageRef}
                                type="text"
                                placeholder="Ngôn ngữ"
                            />
                        </div>
                        <div className="movie_create_form-items">
                            <label>Nội dung:</label>
                            <textarea
                                name="content"
                                ref={contentRef}
                                type="text"
                                placeholder="Nội dung"
                            />
                        </div>
                        <div className="movie_create_form-items">
                            <label>Link trailer:</label>
                            <textarea
                                name="trailer"
                                ref={trailerRef}
                                type="text"
                                placeholder="Link trailer"
                            />
                        </div>
                        <div className="movie_create_form-items">
                            <label>Link phim:</label>
                            <textarea
                                name="movieLink"
                                ref={movieRef}
                                type="text"
                                placeholder="Link phim"
                            />
                        </div>
                        <div className="movie_create_form-items-checkbox">
                            {kinds?.map((item) => (
                                <KindBox
                                    setPKinds={setPKinds}
                                    pKinds={pKinds}
                                    totalKind={[]}
                                    item={item}
                                    key={item?._id}
                                />
                            ))}
                        </div>
                        <div className="movie_create_form-items-select">
                            <select ref={countryRef}>
                                {countries?.map((item) => (
                                    <option value={item?._id} key={item?._id}>
                                        {item?.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="movie_create_form-items-checkbox">
                            <label htmlFor="serial">Phim bộ:</label>
                            <input
                                ref={isSerialRef}
                                id="serial"
                                type="checkbox"
                            />
                        </div>
                        <div className="movie_create-button">
                            <button onClick={handleCreateMovie}>Tạo mới</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCreate;
