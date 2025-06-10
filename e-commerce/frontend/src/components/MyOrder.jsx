import React from "react";
import "../style/MyOrder.css";
import Table from "./Table";
import useDate from "../hooks/useDate";
import Loader from "../Common/Loader";

function MyOrder() {
  const { data: orders, error, isLoading } = useDate("/order");

  const getProductString = (order) => {
    const productStringArr = order.products.map(
      (p) => `${p.product.title} x${p.quantity}`
    );
    return productStringArr.join(", ");
  };

  return (
    <section className="align/-center myOrder_page">
      {isLoading && <Loader />}
      {error && <em className="form_error">{error}</em>}
      {orders && (
        <Table headings={["Order", "Products", "Total", "Status"]}>
          <tbody>
            {orders.map((order, index) => {
              return (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{getProductString(order)}</td>
                  <td>${order.total}</td>
                  <td>{order.status}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </section>
  );
}

export default MyOrder;
