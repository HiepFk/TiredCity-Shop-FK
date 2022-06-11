import React from "react";
import { Link } from "react-router-dom";
import "./app.scss";
function Title() {
  return (
    <div className="title">
      <div className="title_right">
        <div className="title_title">Design Your Comfort Zone</div>
        <div className="title_desc">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at
          sed omnis corporis doloremque possimus velit! Repudiandae nisi odit,
          aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis
          alias?
        </div>
        <Link to={"/products"} className="title_btn">
          Shop now
        </Link>
      </div>
      <div className="title_right">
        <div className="title_mo"></div>
        <img src="/image/about/4.webp" alt="" className="title_img small" />
        <img src="/image/about/5.webp" alt="" className="title_img big" />
      </div>
    </div>
  );
}

export default Title;
