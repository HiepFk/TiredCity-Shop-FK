import React from "react";
import styled from "styled-components";

import { FaShippingFast } from "react-icons/fa";
import { Ri24HoursFill } from "react-icons/ri";
import { GiReturnArrow } from "react-icons/gi";
import { AiOutlineCreditCard } from "react-icons/ai";
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
            <div className="img_wapper" key={item.id}>
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
  width: 100%;

  .quality {
    width: 100%;
    padding-top: 5rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-gap: 2rem;
    text-align: center;
  }
  .quality_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
  .quality_icon {
    font-size: 3rem;
    color: rgba(255, 0, 0, 0.6);
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: all 0.25s linear;
    &:hover {
      color: rgba(255, 0, 0, 0.9);
      transform: scale(1.2);
    }
  }
  .quality_title {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .quality_container {
    margin-top: 5rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  }
  .img_wapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .quality_img {
    width: 15rem;
    height: 18rem;
    margin-bottom: 2rem;
  }
  .quality_hr {
    width: 8rem;
    height: 0.3rem;
    background-color: brown;
    margin-top: 1rem;
  }

  .title_big {
    margin-top: 4rem;
    font-size: 3rem;
    text-align: center;
    font-weight: bold;
  }
  @media (max-width: 768px) {
    .quality_desc {
      display: none;
    }
    .quality_title {
      font-size: 1rem;
    }
    .img_wapper,
    .quality_wrapper {
      margin-bottom: 0.5rem;
    }
    .title_big {
      font-size: 1.5rem;
    }
    .quality_container {
      margin-top: 2rem;
    }
  }
`;

export default Quality;
