import React from "react";
import Title from "../components/Title/Title";
import Product from "../components/ProductMini/Product";
import Quality from "../components/Quality/Quality";
import Form from "../components/Form/Form";
function Home() {
  return (
    <div>
      <Title />
      <Product />
      <Quality />
      <Form />
    </div>
  );
}

export default Home;
