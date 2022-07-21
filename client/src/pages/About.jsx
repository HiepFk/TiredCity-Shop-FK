import React from "react";
import styled from "styled-components";

import { AboutImage as imgs } from "../utils/data";
function About() {
  return (
    <AboutStyle>
      <div className="about_us">About us</div>
      <div className="about_wrapper">
        <img src={imgs[0].src} alt="" className="about_img" />
        <div className="about_text phai">
          <div className="about_title">{imgs[0].title}</div>
          <div className="about_desc">{imgs[0].desc1}</div>
          <div className="about_desc">{imgs[0].desc2}</div>
        </div>
      </div>
      <div className="about_wrapper">
        <div className="about_text trai">
          <div className="about_title">{imgs[1].title}</div>
          <div className="about_desc">{imgs[1].desc1}</div>
          <div className="about_desc">{imgs[1].desc2}</div>
        </div>
        <img src={imgs[1].src} alt="" className="about_img" />
      </div>
      <div className="about_wrapper">
        <img src={imgs[2].src} alt="" className="about_img" />
        <div className="about_text phai">
          <div className="about_title">{imgs[2].title}</div>
          <div className="about_desc">{imgs[2].desc1}</div>
          <div className="about_desc">{imgs[2].desc2}</div>
        </div>
      </div>
    </AboutStyle>
  );
}

const AboutStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  .about_us {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 3rem;
    font-weight: bold;
  }
  .about_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4rem;
  }
  .about_img {
    width: 25rem;
    height: auto;
  }
  .phai {
    margin-left: 5rem;
  }
  .trai {
    margin-right: 5rem;
  }
  .about_title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 3rem;
    color: #a74939;
  }
  .about_desc {
    margin-bottom: 2rem;
  }
  @media (max-width: 992px) {
    align-items: center;
    justify-content: center;
    .about_wrapper {
      flex-direction: column;
      margin-bottom: 2rem;
      align-items: center;
      justify-content: center;
    }
    .about_title {
      margin-bottom: 0.5rem;
    }
    .about_img {
    width: 100%;
    }
    .phai,
    .trai {
      margin: 0;
    }
  }
`;

export default About;
