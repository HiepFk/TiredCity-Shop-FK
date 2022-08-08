import React, { useState, useEffect } from "react";
import styled from "styled-components";
function ProductImage({ imgs = [], type = "" }) {
  const [main, setMain] = useState(0);
  const [images, setImages] = useState(imgs);

  const tee = [
    "https://firebasestorage.googleapis.com/v0/b/tired-city-shop-2d704.appspot.com/o/Tee%2Fmau.1.webp?alt=media&token=36548af6-8b47-4608-ace1-2599e626bc35",
    "https://firebasestorage.googleapis.com/v0/b/tired-city-shop-2d704.appspot.com/o/Tee%2Fmau.2.webp?alt=media&token=6a878e1b-70b0-4c92-8c01-0b403c493f45",
  ];
  const sweater = [
    "https://firebasestorage.googleapis.com/v0/b/tired-city-shop-2d704.appspot.com/o/Sweater%2Fmau.1.webp?alt=media&token=d96fa9fc-64af-4d2c-87db-d62f9a578c2e",
    "https://firebasestorage.googleapis.com/v0/b/tired-city-shop-2d704.appspot.com/o/Sweater%2Fmau.2.webp?alt=media&token=bd0197c5-2700-4e2b-b14a-441cb3c30b3a",
  ];
  const hoodie = [
    "https://firebasestorage.googleapis.com/v0/b/tired-city-shop-2d704.appspot.com/o/Hoodie%2Fmau.1.webp?alt=media&token=2e5f4dd4-bef9-407f-95e8-d441d716079d",
    "https://firebasestorage.googleapis.com/v0/b/tired-city-shop-2d704.appspot.com/o/Hoodie%2Fmau.2.webp?alt=media&token=7e984963-276e-4d30-b3cd-f72ff83b6501",
  ];

  useEffect(() => {
    if (type === "tee" && images.length === 2) {
      setImages(images.concat(tee));
    }
    if (type === "sweater" && images.length === 2) {
      setImages(images.concat(sweater));
    }
    if (type === "hoodie" && images.length === 2) {
      setImages(images.concat(hoodie));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
  return (
    <Wrapper>
      <img src={images[main]} alt="" className="img_main" />
      <div className="img_wrapper">
        {images.map((item, index) => {
          return (
            <img
              src={item}
              alt=""
              className={index === main ? "img_item active" : "img_item"}
              key={index}
              onClick={() => setMain(index)}
            />
          );
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 35rem;
  margin-right: 4rem;
  .img_main {
    border: 3px solid #e0d9d7;
    margin-bottom: 0.5rem;
    border-radius: 5px;
    min-width: 25rem;
  }
  .img_wrapper {
    min-width: 25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .img_item {
    width: 23%;
    border-radius: 5px;
    cursor: pointer;
  }
  .active {
    border: 1px solid black;
  }
  @media (max-width: 992px) {
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    .img_main {
      width: 25rem;
    }
    .img_wrapper {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 0.5rem;
      justify-content: center;
    }
    .img_item {
      width: calc(25rem / 4 - 0.5rem);
    }
  }
`;

export default ProductImage;
