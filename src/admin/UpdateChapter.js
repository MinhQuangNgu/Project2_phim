import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";
const UpdateChapter = () => {
    const { id } = useParams();

    const [movie, setMovie] = useState({});

    const auth = useSelector((state) => state.auth);

    const movieLinkRef = useRef();

    useEffect(() => {
        let here = true;
        if (here) {
            const url = `/movie/getone/${id}`;
            axios
                .get(url)
                .then((res) => {
                    if (!here) {
                        return;
                    }
                    setMovie(res.data?.movie);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.msg);
                });
        }
        return () => {
            here = false;
        };
    }, []);

    const handleCreateChapter = async () => {
        if (!movieLinkRef.current.value) {
            return toast.error("Vui lòng điền đủ thông tin");
        }
        const movieLink = movieLinkRef.current.value;
        try {
            const data = await axios.post(
                `/chapter/create/${id}`,
                {
                    movieLink,
                },
                {
                    headers: {
                        token: `Bearer ${auth?.user?.accessToken}`,
                    },
                }
            );
            toast.success(data?.data?.msg);
        } catch (err) {
            toast.error(err?.response?.data?.msg);
        }
    };
    return (
        <div className="grid wide">
            <div className="update_chapter_container">
                <div className="update_chapter_wrap">
                    <div className="update_chapter_title">
                        <h1>Cập nhật tập phim</h1>
                    </div>
                    <div className="create_chapter_container">
                        <input ref={movieLinkRef} type="text" />
                        <button onClick={handleCreateChapter}>
                            Tạo tập mới
                        </button>
                    </div>
                    <ul className="update_chapter_list_container">
                        {movie?.chapters?.map((item, index) => (
                            <li key={item?._id + "items"}>
                                Tập {index + 2}: {item?.movieLink}
                                <div className="update_chapter_button">
                                    <button className="update_chapter_button-delete">
                                        Xóa
                                    </button>
                                    <button className="update_chapter_button-update">
                                        Cập nhật
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UpdateChapter;
