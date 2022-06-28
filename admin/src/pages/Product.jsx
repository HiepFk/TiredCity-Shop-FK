import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/product";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import Detail from "../components/Product/Detail";
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
  return <Detail product={product} />;
}

export default Product;
