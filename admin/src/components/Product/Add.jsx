import React, { useState } from "react";
import styled from "styled-components";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebase";
import { v4 } from "uuid";
import { addProduct } from "../../api/product";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../api/createInstance";
import { LoginSuccess } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Add() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  let axiosJWT = createAxios(user, dispatch, LoginSuccess);
  const uploadFile = (e) => {
    e.preventDefault();
    if (imageCover == null) return;
    const imageRef = ref(storage, `${imageCover.name + v4()}`);
    uploadBytes(imageRef, imageCover).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImages((prev) => [...prev, url]);
      });
    });
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageCover, setImageCover] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [priceDiscount, sePriceDiscount] = useState("");
  const [type, setType] = useState("");
  const [shipping, setShipping] = useState("");

  const handeAddProduct = (e) => {
    e.preventDefault();
    const product = {
      name,
      description,
      images,
      price,
      shipping,
      priceDiscount,
      type,
    };
    addProduct(product, navigate, axiosJWT, user?.accessToken);
  };
  return (
    <Wrapper className="left">
      <div className="name">Điền các trường để thêm sản phẩm</div>

      <form action="" className="form">
        <div className="container">
          <label htmlFor="" className="title">
            Tên sản phẩm
          </label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="container">
          <label htmlFor="" className="title">
            Mô tả
          </label>
          <textarea
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="container">
          <label htmlFor="" className="title">
            Giá thành
          </label>
          <input
            type="text"
            className="input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="container">
          <label htmlFor="" className="title">
            Giảm giá
          </label>
          <input
            type="text"
            className="input"
            value={priceDiscount}
            onChange={(e) => sePriceDiscount(e.target.value)}
          />
        </div>
        <div className="container">
          <label htmlFor="" className="title">
            Loại sản phẩm
          </label>
          <input
            type="text"
            className="input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="container">
          <label htmlFor="" className="title">
            Vận chuyển
          </label>
          <p>
            <input
              type="radio"
              id="test1"
              name="radio-group"
              className="radio"
              onClick={() => setShipping(true)}
            />
            <label for="test1">Free</label>
          </p>
          <p>
            <input
              type="radio"
              id="test2"
              name="radio-group"
              className="radio"
              onClick={() => setShipping(false)}
            />
            <label for="test2">Not Free</label>
          </p>
        </div>
        <div className="container">
          <label htmlFor="" className="title">
            Thêm lần lượt ảnh của sản phẩm
          </label>
          {/* <img src={imageCover} alt="" className="img" /> */}
          <input
            type="file"
            className="input"
            onChange={(e) => {
              setImageCover(e.target.files[0]);
            }}
          />
          <button type="submit" className="btn" onClick={uploadFile}>
            Thêm ảnh
          </button>
        </div>
      </form>
      <div className="btn_wrapper">
        <button type="submit" className="btn" onClick={handeAddProduct}>
          Thêm sản phẩm
        </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 5rem;
  width: 100%;
  padding-top: 2rem;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  /* .radio {
    margin-right: 1.5rem;
  } */
  .name {
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 3rem;
  }
  span {
    font-size: 2rem;
    color: rgba(255, 0, 0, 0.7);
    margin-left: 1rem;
  }
  .form {
    display: flex;
    flex-wrap: wrap;
  }
  .container {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    margin-left: 2.5rem;
    margin-right: 3.5rem;
  }
  label {
    font-size: 1.25rem;
    font-weight: 600;
    margin-right: 1rem;
    width: 10rem;
  }
  textarea {
    min-width: 50rem;
    min-height: 10rem;
  }
  .input {
    font-family: inherit;
    font-size: 1.25rem;
    color: inherit;
    padding: 0.5rem 1rem;
    border: none;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    transition: all 0.3s;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #eee;
    margin-right: 1rem;
    :focus {
      outline: none;
      border-bottom: 3px solid #55c57a;
    }
  }
  .img {
    width: 10rem;
    height: 10rem;
  }
  .btn {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border: 0;
    border-radius: 0.3rem;
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    margin: 0 auto;
    margin-left: 8.5rem;
    box-shadow: 0 10px 10px 0px rgba(255, 0, 0, 0.5);
  }
`;

export default Add;
