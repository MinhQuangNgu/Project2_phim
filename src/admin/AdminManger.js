import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isFailing, isLoading, isLogout, isSuccess } from "~/redux/slice/auth";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminManger = () => {
    const dispatch = useDispatch();

    const kindRef = useRef(null);
    const countryRef = useRef(null);
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [isKind, setIsKind] = useState(false);
    const [isCountry, setIsCountry] = useState(false);
    const [kinds, setKinds] = useState([]);
    const [countries, setCountries] = useState([]);
    const [deKind, setDeKind] = useState("");
    const [deCountry, setDeCountry] = useState("");
    const [updateTime, setUpdateTime] = useState(false);

    const handleSignOut = () => {
        toast.success("Đăng xuất thành công.");
        dispatch(isLogout());
    };

    const handleCreateKind = async () => {
        dispatch(isLoading());
        try {
            if (kindRef.current.value === "") {
                return toast.error("Vui lòng điền đủ thông tin");
            }
            const data = await axios.post(
                "/kind/create",
                {
                    title: kindRef.current.value,
                },
                {
                    headers: {
                        token: `Bearer ${auth.user?.accessToken}`,
                    },
                }
            );
            dispatch(isSuccess());
            setUpdateTime(!updateTime);
            toast.success(data?.data?.msg);
            kindRef.current.value = "";
        } catch (err) {
            dispatch(isFailing());
            toast.error(err?.response?.data?.msg);
        }
    };

    const handleDeleteKind = async () => {
        try {
            const data = await axios.delete(`/kind/delete/${deKind?._id}`, {
                headers: {
                    token: `Bearer ${auth?.user?.accessToken}`,
                },
            });
            dispatch(isSuccess());
            setDeKind("");
            setUpdateTime(!updateTime);
            toast.success(data?.data?.msg);
        } catch (err) {
            dispatch(isLoading());
            toast.error(err?.response?.data?.msg);
        }
    };

    const handleCreateCountry = async () => {
        dispatch(isLoading());
        try {
            if (countryRef.current.value === "") {
                return toast.error("Vui lòng điền đủ thông tin");
            }
            const data = await axios.post(
                "/country/create",
                {
                    name: countryRef.current.value,
                },
                {
                    headers: {
                        token: `Bearer ${auth.user?.accessToken}`,
                    },
                }
            );
            dispatch(isSuccess());
            toast.success(data?.data?.msg);
            setUpdateTime(!updateTime);
            countryRef.current.value = "";
        } catch (err) {
            dispatch(isFailing());
            toast.error(err?.response?.data?.msg);
        }
    };

    const handleDeleteCountry = async () => {
        try {
            const data = await axios.delete(
                `/country/delete/${deCountry?._id}`,
                {
                    headers: {
                        token: `Bearer ${auth?.user?.accessToken}`,
                    },
                }
            );
            dispatch(isSuccess());
            setUpdateTime(!updateTime);
            setDeCountry("");
            toast.success(data?.data?.msg);
        } catch (err) {
            dispatch(isLoading());
            toast.error(err?.response?.data?.msg);
        }
    };

    useEffect(() => {
        let here = true;
        dispatch(isLoading());
        if (here) {
            axios
                .get("/kind")
                .then((res) => {
                    dispatch(isSuccess());
                    setKinds(res.data?.kinds);
                })
                .catch((err) => {
                    dispatch(isFailing());
                    toast.error(err.message);
                });
        }
        return () => {
            here = false;
        };
    }, [updateTime]);

    useEffect(() => {
        let here = true;
        dispatch(isLoading());
        if (here) {
            axios
                .get("/country")
                .then((res) => {
                    dispatch(isSuccess());
                    setCountries(res.data?.countries);
                })
                .catch((err) => {
                    dispatch(isFailing());
                    toast.error(err.message);
                });
        }
        return () => {
            here = false;
        };
    }, [updateTime]);

    return (
        <div className="grid wide">
            <div className="admin_manager_container">
                <div
                    onClick={() => {
                        navigate("/admin/manager");
                    }}
                    className="admin_manager_button"
                    title="Tạo phim"
                >
                    Quản lí phim
                </div>
                <div
                    onClick={() => {
                        setIsCountry(true);
                    }}
                    className="admin_manager_button"
                    title="Tạo quốc gia"
                >
                    Tạo quốc gia
                </div>
                <div
                    onClick={() => {
                        setIsKind(true);
                    }}
                    className="admin_manager_button"
                    title="Tạo thể loại"
                >
                    Tạo thể loại
                </div>
                <div
                    onClick={handleSignOut}
                    className="admin_manager_button"
                    title="Đăng xuất"
                >
                    Đăng xuất
                </div>
            </div>
            {isKind && (
                <div className="kind_container">
                    <div className="kind_wrap">
                        <div className="kind_wrap_times">
                            <div>
                                <i
                                    onClick={() => {
                                        setIsKind(false);
                                        kindRef.current.value = "";
                                    }}
                                    style={{ cursor: "pointer" }}
                                    className="fa-regular fa-circle-xmark"
                                ></i>
                            </div>
                        </div>
                        <div className="kind_title">
                            <h1>Tạo Thể Loại</h1>
                        </div>
                        {deKind && (
                            <div className="delete_confirm">
                                <span>
                                    Bạn có thực sự muốn xóa {deKind?.title}?
                                </span>
                                <button onClick={handleDeleteKind}>Xóa</button>
                                <button
                                    onClick={() => {
                                        setDeKind("");
                                    }}
                                >
                                    Hủy
                                </button>
                            </div>
                        )}
                        <ul className="kind_items">
                            {kinds?.map((item) => (
                                <li key={item?._id}>
                                    {item.title}
                                    <div className="kind_items-delete">
                                        <div
                                            onClick={() => {
                                                setDeKind(item);
                                            }}
                                            className="kind_items-delete-button"
                                        >
                                            Xóa
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="kind_create_form">
                            <input
                                ref={kindRef}
                                type="text"
                                placeholder="Tên của thể loại"
                            />
                        </div>
                        <div className="kind_create_button">
                            <button
                                onClick={handleCreateKind}
                                className="kind_create-create"
                            >
                                Tạo Mới
                            </button>
                            <button
                                onClick={() => {
                                    setIsKind(false);
                                    kindRef.current.value = "";
                                }}
                                className="kind_create-cancel"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isCountry && (
                <div className="kind_container">
                    <div className="kind_wrap">
                        <div className="kind_wrap_times">
                            <div>
                                <i
                                    onClick={() => {
                                        setIsCountry(false);
                                        countryRef.current.value = "";
                                    }}
                                    style={{ cursor: "pointer" }}
                                    className="fa-regular fa-circle-xmark"
                                ></i>
                            </div>
                        </div>
                        <div className="kind_title">
                            <h1>Tạo quốc gia</h1>
                        </div>
                        {deCountry && (
                            <div className="delete_confirm">
                                <span>
                                    Bạn có thực sự muốn xóa {deCountry?.name}?
                                </span>
                                <button onClick={handleDeleteCountry}>
                                    Xóa
                                </button>
                                <button
                                    onClick={() => {
                                        setDeKind("");
                                    }}
                                >
                                    Hủy
                                </button>
                            </div>
                        )}
                        <ul className="kind_items">
                            {countries?.map((item) => (
                                <li key={item?._id}>
                                    {item?.name}
                                    <div className="kind_items-delete">
                                        <div
                                            onClick={() => {
                                                setDeCountry(item);
                                            }}
                                            className="kind_items-delete-button"
                                        >
                                            Xóa
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="kind_create_form">
                            <input
                                ref={countryRef}
                                type="text"
                                placeholder="Tên của quốc gia"
                            />
                        </div>
                        <div className="kind_create_button">
                            <button
                                onClick={handleCreateCountry}
                                className="kind_create-create"
                            >
                                Tạo Mới
                            </button>
                            <button
                                onClick={() => {
                                    setIsCountry(false);
                                    countryRef.current.value = "";
                                }}
                                className="kind_create-cancel"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminManger;
