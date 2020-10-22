import React from "react";
import "./Home.css";
import Product from "./Product";

export default function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-na.ssl-images-amazon.com/images/G/01/rrrryan/PD20_LO/PD20_GW_Hero_Banner_d_1500x600_US_EN._CB403545871_.jpg"
          alt=""
        />

        <div className="home__row">
          <Product
            id="1"
            title="The lean startup"
            price={29.99}
            image="https://m.media-amazon.com/images/I/51T-sMqSMiL._AC_SL260_.jpg"
            rating={5}
          />
          <Product
            id="2"
            title="Sony a7R III Mirrorless Camera: 42.4MP Full Frame High Resolution Interchangeable Lens Digital Camera"
            price={2298.99}
            image="https://images-na.ssl-images-amazon.com/images/I/81UWYKspnVL._AC_SX679_.jpg"
            rating={4}
          />
        </div>
        <div className="home__row">
          <Product
            id="3"
            title="Fujifilm Instax Mini 11 Instant Camera - Lilac Purple"
            price={59.95}
            image="https://images-na.ssl-images-amazon.com/images/I/71Maj9eHOPL._AC_SX679_.jpg"
            rating={4}
          />
          <Product
            id="4"
            title="Arlo Pro 3 Floodlight Camera | Wire-Free, 2K Video & HDR"
            price={199.99}
            image="https://images-na.ssl-images-amazon.com/images/I/71v95EYv1-L._AC_SX679_.jpg"
            rating={5}
          />
          <Product
            id="5"
            title="Arlo Certified Accessory - Outdoor Magnetic Charging Cable | 25 ft, Weather Resistant Connector"
            price={49.99}
            image="https://images-na.ssl-images-amazon.com/images/I/51eeAt7Wo2L._AC_SX679_.jpg"
            rating={5}
          />
        </div>
        <div className="home__row">
          <Product
            id="5"
            title="New Apple iPad Pro (11-inch, Wi-Fi, 256GB) - Space Gray (2nd Generation)"
            price={899.99}
            image="https://images-na.ssl-images-amazon.com/images/I/815ztYEEwYL._AC_SX679_.jpg"
            rating={3}
          />
        </div>
      </div>
    </div>
  );
}
