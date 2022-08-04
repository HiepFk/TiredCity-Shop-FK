import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Review from "./Review";
import { deleteProduct, updateProduct } from "../../api/product";
import { useNavigate } from "react-router-dom";
function Detail({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState(product?.name);
  const [description, setDescription] = useState(product?.description);
  // eslint-disable-next-line no-unused-vars
  const [imageCover, setImageCover] = useState(product?.imageCover);
  // eslint-disable-next-line no-unused-vars
  const [images, setImages] = useState(product?.images);
  const [price, setPrice] = useState(product?.price);
  const [priceDiscount, sePriceDiscount] = useState(product?.priceDiscount);
  const [slug, setSlug] = useState(product?.slug);
  const [type, setType] = useState(product?.type);
  const [shipping, setShipping] = useState(product?.shipping);

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const data = {
      description,
      price,
      priceDiscount,
      shipping,
    };
    updateProduct(dispatch, product.id, data);
  };

  return (
    <div className="left">
      <Wrapper>
        <div className="name">
          Thông tin sản phẩm <span>{name}</span>
        </div>
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
              // type="area"
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
              Slug
            </label>
            <input
              type="text"
              className="input"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
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
              Rating Average
            </label>
            <input
              type="text"
              className="input"
              value={
                product?.ratingsQuantity ? product?.ratingsAverage : "None"
              }
            />
          </div>
          <div className="container">
            <label htmlFor="" className="title">
              Rating Quality
            </label>
            <input
              type="text"
              className="input"
              value={product?.ratingsQuantity}
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
                checked={shipping === true ? true : false}
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
                checked={shipping === false ? true : false}
                onClick={() => setShipping(false)}
              />
              <label for="test2">Not Free</label>
            </p>
          </div>
          <div className="container">
            <label htmlFor="" className="title">
              Ảnh cover
            </label>
            <img src={imageCover} alt="" className="img" />
          </div>
          {images.map((item, i) => {
            return (
              <div className="container" key={i}>
                <label htmlFor="" className="title">
                  Ảnh thứ {i + 1}
                </label>
                {/* <input
                type="file"
                className="input"
                // value={type}
                // onChange={(e) => setType(e.target.value)}
              /> */}
                <img src={item} alt="" className="img" />
              </div>
            );
          })}
        </form>
        <div className="btn_wrapper">
          <button type="submit" className="btn" onClick={handleUpdateProduct}>
            Cập nhật
          </button>
          <button
            type="submit"
            className="btn"
            onClick={() => deleteProduct(product.id, navigate)}
          >
            Xóa
          </button>
        </div>
      </Wrapper>
      <Review reviews={product?.reviews} />
    </div>
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
    width: 50rem;
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

export default Detail;
