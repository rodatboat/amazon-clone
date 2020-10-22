import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

export default function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((i) => (
        <CheckoutProduct
          // key={i.id}
          id={i.id}
          image={i.image}
          title={i.title}
          price={i.price}
          rating={i.rating}
          hideButton={true}
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <h3>Order Total: {value}</h3>
          </>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}
