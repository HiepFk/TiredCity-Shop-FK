import React, { useState, useEffect } from "react";
import styled from "styled-components";
function ProductImage({ imgs, type }) {
  console.log(type);
  const [main, setMain] = useState(0);
  const [images, setImages] = useState(imgs);

  const tee = [
    "https://res.cloudinary.com/hieptlu/image/upload/v1655365573/Ao_FK/mau.1_wz2cqb.webp",
    "https://res.cloudinary.com/hieptlu/image/upload/v1655365572/Ao_FK/mau.2_ualogc.webp",
  ];
  const sweater = [
    "https://res.cloudinary.com/hieptlu/image/upload/v1655365588/Ao_FK/mau.1_vxhjyt.webp",
    "https://res.cloudinary.com/hieptlu/image/upload/v1655365587/Ao_FK/mau.2_unfy8o.webp",
  ];
  const hoodie = [
    "https://res.cloudinary.com/hieptlu/image/upload/v1655365553/Ao_FK/mau.1_fw3hzi.webp",
    "https://res.cloudinary.com/hieptlu/image/upload/v1655365552/Ao_FK/mau.2_pmjmj5.webp",
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
`;

export default ProductImage;
