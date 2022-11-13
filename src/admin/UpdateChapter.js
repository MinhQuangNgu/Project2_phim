import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";
const UpdateChapter = () => {
    const { id } = useParams();

    const [movie, setMovie] = useState({});
    const [deleteMovie, setDeleteMovie] = useState("");
    const [updateMovie, setUpdateMovie] = useState("");
    const [reRender, setReRender] = useState(false);

    const auth = useSelector((state) => state.auth);

    const movieLinkRef = useRef();
    const updateRef = useRef();

    useEffect(() => {
        const url = `/movie/getone/${id}`;
        axios
            .get(url)
            .then((res) => {
                setMovie(res.data?.movie);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.msg);
            });
    }, [reRender]);

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
        setReRender(!reRender);
        movieLinkRef.current.value = "";
    };

    const handleDeleteChapter = async () => {
        const confirm = window.confirm("Bạn thực sự muốn xóa nó?");
        if (confirm) {
            try {
                const data = await axios.delete(
                    `/chapter/delete/${deleteMovie?.item?._id}`,
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
        }
        setDeleteMovie("");
        setReRender(!reRender);
    };
    const handleUpdateChapter = async () => {
        const confirm = window.confirm("Bạn thực sự muốn cập nhật nó?");
        if (confirm) {
            try {
                const data = await axios.post(
                    `/chapter/update/${updateMovie?.item?._id}`,
                    {
                        movieLink: updateRef.current?.value,
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
        }
        setUpdateMovie("");
        setReRender(!reRender);
    };
    return (
        <div className="grid wide">
            <div className="update_chapter_container">
                <div className="update_chapter_wrap">
                    <div className="update_chapter_title">
                        <h1>Cập nhật tập phim</h1>
                    </div>
                    {deleteMovie && (
                        <div className="delete_chapter_container">
                            <span>
                                Bạn có thực sự muốn xóa tập {deleteMovie?.tap}?
                            </span>
                            <button
                                onClick={handleDeleteChapter}
                                className="delete_chapter_button-confirm"
                            >
                                Xóa
                            </button>
                            <button
                                onClick={() => {
                                    setDeleteMovie("");
                                }}
                                className="delete_chapter_button-cancel"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                    {updateMovie && (
                        <div className="update_chapter_detail_container">
                            <label>Tập {updateMovie?.tap}:</label>
                            <input
                                ref={updateRef}
                                type="text"
                                defaultValue={updateMovie?.item?.movieLink}
                            />
                            <button
                                onClick={handleUpdateChapter}
                                style={{ backgroundColor: "green" }}
                            >
                                Cập Nhật
                            </button>
                            <button
                                onClick={() => {
                                    setUpdateMovie("");
                                }}
                                style={{ backgroundColor: "grey" }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
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
                                    <button
                                        onClick={() => {
                                            setDeleteMovie({
                                                item,
                                                tap: index + 2,
                                            });
                                        }}
                                        className="update_chapter_button-delete"
                                    >
                                        Xóa
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (updateRef.current) {
                                                updateRef.current.value =
                                                    item?.movieLink;
                                            }
                                            setUpdateMovie({
                                                item,
                                                tap: index + 2,
                                            });
                                        }}
                                        className="update_chapter_button-update"
                                    >
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
