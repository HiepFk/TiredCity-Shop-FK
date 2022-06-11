import React from "react";
import styled from "styled-components";

import { FaShippingFast } from "react-icons/fa";
import { Ri24HoursFill } from "react-icons/ri";
import { GiReturnArrow } from "react-icons/gi";
import { AiOutlineCreditCard } from "react-icons/ai";
import "./app.scss";
function Quality() {
  const icons = [
    {
      id: 1,
      title: "Free Shipping",
      desc: "Free Shipping for orders over $100",
      icon: <FaShippingFast className="quality_icon" />,
    },
    {
      id: 2,
      title: "Returns",
      desc: "Within 30 days for an exchange",
      icon: <GiReturnArrow className="quality_icon" />,
    },
    {
      id: 3,
      title: "Online Support",
      desc: "24 hours a day, 7 days a week",
      icon: <Ri24HoursFill className="quality_icon" />,
    },
    {
      id: 4,
      title: "Flexible Payment",
      desc: "Pay with Multiple Credit Cards",
      icon: <AiOutlineCreditCard className="quality_icon" />,
    },
  ];

  const img = [
    {
      id: 1,
      src: "/image/about/6.webp",
    },
    {
      id: 2,
      src: "/image/about/7.webp",
    },
    {
      id: 3,
      src: "/image/about/8.webp",
    },
    {
      id: 4,
      src: "/image/about/9.webp",
    },
  ];

  return (
    <Wrapper>
      <div className="quality">
        {icons.map((item) => {
          return (
            <div className="quality_wrapper" key={item.id}>
              {item.icon}
              <div className="quality_title">{item.title}</div>
              <div className="quality_desc">{item.desc}</div>
            </div>
          );
        })}
      </div>
      <div className="quality_title title_big">Our images</div>
      <hr className="quality_hr" />
      <div className="quality_container">
        {img.map((item) => {
          return (
            <div className="img_wapper">
              <img
                src={item.src}
                alt=""
                className="quality_img"
                key={item.id}
              />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Quality;
