import React from "react";
import "./app.scss";
export default function Form() {
  return (
    <div className="form_letter">
      <div className="form_left">
        <div className="left_title">Newsletter</div>
        <div className="left_desc">
          Subscribe to our newsletter and get 20% off your first purchase
        </div>
      </div>
      <form className="form_right">
        <input
          type="email"
          required
          className="form_input"
          placeholder="Your email"
        />
        <button className="form_btn">Send</button>
      </form>
    </div>
  );
}
