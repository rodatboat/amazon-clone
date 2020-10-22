import React from "react";
import "./Checkout.css";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";

export default function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg"
          alt=""
        />
        <div>
          {user ? <h3>Hello, {user.email}</h3> : null}
          <h2 className="checkout__title">Your Shopping Basket</h2>

          {basket.map((i) => (
            <CheckoutProduct
              // key={i.id}
              id={i.id}
              image={i.image}
              title={i.title}
              price={i.price}
              rating={i.rating}
            />
          ))}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}
