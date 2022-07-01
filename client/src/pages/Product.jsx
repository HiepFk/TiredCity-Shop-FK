import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../Api/product";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../Api/cart";
import ProductImage from "../components/Product/ProductImage";
import ProductStar from "../components/Product/ProductStar";
import ProductAdd from "../components/Product/ProductAdd";
import Review from "../components/Product/Review";
import Loading from "../components/Loading";

import styled from "styled-components";

function Product() {
  const item = {
    color: ["white", "black"],
    inStock: true,
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product?.loading);
  const product = useSelector((state) => state.product?.product?.data?.product);

  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("white");

  useEffect(() => {
    getProduct(dispatch, id);
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Link to={"/products"} className="product_back btn">
        Back to products
      </Link>
      <div className="product_info">
        <ProductImage imgs={product?.images} type={product?.type} />
        <div>
          <div className="product_title">{product?.name}</div>
          <ProductStar
            stars={product?.ratingsAverage}
            reviews={
              product?.ratingsQuantity > 0 ? product?.ratingsQuantity : 10
            }
          />
          <div className="product_price">{item.price}</div>
          <div className="product_desc">{product?.description}</div>
          <p className="info">
            <span>Active :</span>
            {item.inStock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <p className="info">
            <span>Sku :</span>
            {product?.id}
          </p>
          <ProductAdd
            setAmount={setAmount}
            amount={amount}
            setSize={setSize}
            size={size}
            setColor={setColor}
            color={color}
          />
          <button
            type="button"
            className="product_add btn"
            onClick={() => {
              const data = {
                id: product.id + size + color,
                image: product.imageCover,
                name: product.name,
                price: product.price,
                size,
                amount,
                color,
              };
              addProduct(dispatch, data);
            }}
          >
            Add to cart
          </button>
          <hr />
        </div>
      </div>
      <Review id={product?.id} />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  @media (max-width: 768px) {
    .product_info {
      flex-direction: column;
    }
    .btn {
      font-size: 1rem !important;
    }
  }
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  hr {
    margin-top: 2rem;
  }

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
    height: 3rem;
    background-color: brown;
    color: white;
    font-size: 1.25rem;
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
    max-width: 12.5rem;
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
    border: none;
    padding: 0.5rem;
  }
`;
export default Product;
