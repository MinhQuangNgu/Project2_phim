import React from "react";
import "./style.css";

const HeaderSliceD = ({ turnSlide, setTurnSlide }) => {
    return (
        <div
            onClick={() => {
                setTurnSlide(false);
            }}
            className={
                turnSlide
                    ? "header_slice_hidden_container"
                    : "header_slice_hidden_container header_slice_hidden_change"
            }
        ></div>
    );
};

export default HeaderSliceD;
