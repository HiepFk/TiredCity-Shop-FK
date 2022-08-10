import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct } from "../api/product";
import Loading from "../components/Loading";
import GridView from "../components/GridView";
import Input from "../components/Product/Input";

function Products() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product?.loading);
  const products = useSelector(
    (state) => state.product?.products?.data?.products
  );

  useEffect(() => {
    getAllProduct(dispatch);
  }, [dispatch]);

  if (loading || !products) {
    return <Loading />;
  }
  return (
    <div className="left">
      <Input />
      <GridView products={products} />;
    </div>
  );
}

export default Products;
