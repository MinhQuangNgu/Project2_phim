import React, { useEffect, useRef } from "react";
import "./style.css";
const KindBox = ({ item, totalKind, pKinds, setPKinds }) => {
    const checkRef = useRef();

    useEffect(() => {
        const checked = totalKind?.some(
            (infor) => infor?._id.toString() === item?._id.toString()
        );
        if (checked) {
            checkRef.current.checked = true;
            setPKinds([...pKinds, item?._id]);
        }
    }, [checkRef, totalKind]);

    const handleChange = () => {
        if (checkRef.current?.checked) {
            setPKinds([...pKinds, item?._id]);
        } else {
            const kinds = pKinds.filter((infor) => infor !== item?._id);
            setPKinds(kinds);
        }
    };
    return (
        <div className="movie_create-form-items-kinds">
            <label htmlFor={item?._id}>{item?.title}:</label>
            <input
                id={item?._id}
                onChange={handleChange}
                ref={checkRef}
                type="checkbox"
            />
        </div>
    );
};

export default KindBox;
