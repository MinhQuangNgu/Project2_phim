import React from "react";
import { Link } from "react-router-dom";

const SlideSideMobile = ({ typeCheck, items, type, setTurnSlide }) => {
    return (
        <ul
            className={
                typeCheck
                    ? "type_mobile_container"
                    : "type_mobile_container type_mobile_container-hidden"
            }
        >
            {type !== "kinds"
                ? items?.map((item) => (
                      <Link
                          key={item?._id + "abd"}
                          className="type_mobile-itemstype"
                          to={`/tim-kiem?${type}=${item?.slug}`}
                      >
                          <li
                              onClick={() => {
                                  setTurnSlide(false);
                              }}
                              className="type_mobile-item_type"
                          >
                              {item?.name}
                          </li>
                      </Link>
                  ))
                : items?.map((item) => (
                      <Link
                          key={item?._id + "acd"}
                          className="type_mobile-itemstype"
                          to={`/tim-kiem?${type}=${item?.slug}`}
                      >
                          <li
                              onClick={() => {
                                  setTurnSlide(false);
                              }}
                              className="type_mobile-item_type"
                          >
                              {item?.title}
                          </li>
                      </Link>
                  ))}
        </ul>
    );
};

export default SlideSideMobile;
