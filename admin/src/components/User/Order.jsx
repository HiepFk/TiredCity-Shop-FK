import React from "react";
import styled from "styled-components";
function Order({ orders = [] }) {
  if (orders.length === 0) {
    return <Wrapper>Nguời dùng chưa đặt hàng</Wrapper>;
  }
  return (
    <Wrapper>
      <div className="title">All Order :</div>
      {orders?.map((itemL) => {
        return (
          <div className="container" key={itemL.id}>
            <div className="time">{new Date(itemL?.time).toLocaleString()}</div>
            <table>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
              {itemL?.products.map((item) => {
                const { id, image, name, color, price, amount, size } = item;
                return (
                  <tr key={id} className="tr">
                    <td>
                      <div className="cart_item">
                        <img src={image} alt="" className="cart_img" />
                        <div className="cart_desc">
                          <div>{name}</div>
                          <div>Color : {color}</div>
                          <div>Size : {size}</div>
                        </div>
                      </div>
                    </td>
                    <td>${price}</td>
                    <td>{amount}</td>
                    <td>${price * amount}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        );
      })}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin-top: 2rem;
  .title {
    font-weight: bold;
    font-size: 1.25rem;
    opacity: 0.6;
  }
  .time {
    margin-top: 1rem;
    font-size: 1rem;
    opacity: 0.8;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin: 0 auto;
    border: 1px dotted black;
  }
  td,
  th {
    text-align: left;
    padding: 8px;
  }
  tr {
    border: 1px solid #ddd;
  }
  td {
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }
  th {
    border-right: 1px solid #ddd;
  }
  .cart_item {
    display: flex;
    align-items: center;
    .cart_img {
      width: 5rem;
      margin-right: 2rem;
    }
  }
`;
export default Order;
