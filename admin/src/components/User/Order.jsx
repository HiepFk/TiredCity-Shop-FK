import React from "react";
import styled from "styled-components";
function Order({ orders = [] }) {
  console.log(orders);
  if (orders.length === 0) {
    return <div>Nguời dùng chưa đặt hàng</div>;
  }
  return (
    <Wrapper>
      <div className="title">All Order :</div>
      {orders.map((item) => {})}
    </Wrapper>
  );
}
const Wrapper = styled.div``;
export default Order;
