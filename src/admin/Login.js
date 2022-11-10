import React from "react";
import "./style.css";
import FacebookLogin from "react-facebook-login";
import { useDispatch } from "react-redux";
import { isFailing, isLogin } from "~/redux/slice/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const responseFacebook = async (response) => {
        try {
            const data = await axios.post("/user/login", {
                token: response.accessToken,
                userId: response.userID,
            });
            dispatch(isLogin(data.data));
            toast.success(data.data.msg);
            navigate("/");
        } catch (err) {
            dispatch(isFailing());
            toast.error(err?.response?.data?.msg);
        }
    };
    return (
        <div className="login_container">
            <FacebookLogin
                appId="491580756073694"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
            />
        </div>
    );
};

export default Login;
