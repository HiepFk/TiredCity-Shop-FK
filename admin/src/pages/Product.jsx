import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/product";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import Detail from "../components/Product/Detail";
import Review from "../components/Product/Review";
import styled from "styled-components";

function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product?.loading);
  const product = useSelector((state) => state.product?.product?.data?.product);
  useEffect(() => {
    getProduct(dispatch, id);
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (!product) {
    return <div>Ko có sản phẩm này</div>;
  }
  return (
    <Wrapper>
      <Detail product={product} />
      <div className="review">
        <Review reviews={product?.reviews} />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  padding: 2rem 5rem;
  width: 100%;
  display: flex;
  .review {
    margin-left: 5rem;
  }
`;
export default Product;
