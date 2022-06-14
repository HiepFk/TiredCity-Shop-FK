import React from "react";
import { Link } from "react-router-dom";
import ProductImage from "../components/Product/ProductImage";
import ProductStar from "../components/Product/ProductStar";
import ProductAdd from "../components/Product/ProductAdd";
import ProductAd from "../components/Home/ProductAd";
import styled from "styled-components";

function Product() {
  const item = {
    title: "Áo Đẹp ",
    imgs: [
      "/image/tee/1/1.1.webp",
      "/image/tee/1/1.2.webp",
      "/image/tee/mau.1.webp",
      "/image/tee/mau.2.webp",
    ],
    stars: 4.5,
    reviews: 10,
    price: "$25",
    color: ["white", "black"],
    inStock: true,
  };

  return (
    <Wrapper>
      <Link to={"/products"} className="product_back btn">
        Back to products
      </Link>
      <div className="product_info">
        <ProductImage imgs={item.imgs} />
        <div>
          <div className="product_title">{item.title}</div>
          <ProductStar stars={item.stars} reviews={item.reviews} />
          <div className="product_price">{item.price}</div>
          <div className="product_desc">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
            tempore consequuntur optio architecto quis expedita, velit nulla
            nesciunt animi blanditiis similique quidem cumque ab voluptatem
            ullam aliquid labore ratione voluptatum.
          </div>
          <p className="info">
            <span>Active :</span>
            {item.inStock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <p className="info">
            <span>Sku :</span>
            fdvsdgs6363gsbsb
          </p>
          <ProductAdd color={item.color} />
          <div className="product_add btn">Add to cart</div>
        </div>
      </div>
      <ProductAd />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;

  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    margin-bottom: 1rem;
    span {
      font-weight: 700;
    }
  }
  .btn {
    width: 10rem;
    height: 3rem;
    background-color: brown;
    color: white;
    font-size: 1, 25rem;
    letter-spacing: 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.2rem;
    cursor: pointer;
    transition: opacity 0.25s linear;
    :hover {
      opacity: 0.6;
    }
  }
  .product_title {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .product_back {
    margin-bottom: 2rem;
  }
  .product_info {
    display: flex;
  }
  .product_price {
    margin-top: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
    margin-bottom: 0.5rem;
  }
  .product_desc {
    opacity: 0.8;
    letter-spacing: 0.1rem;
    line-height: 2;
    margin-bottom: 1rem;
  }
  .product_stock {
    opacity: 0.8;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  .product_add {
    margin-top: 1rem;
  }
`;
export default Product;
