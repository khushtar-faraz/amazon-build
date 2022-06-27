import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/01/adlp/builder/BFF-V1-01-Hero-D-6bababd9-ff42-407e-8e71-b6b0012e8def._CB417386616_QL85_V1_.jpg"
          alt=""
          className="home__image"
        />

        <div className="home__row">
          <Product
            id="43353435"
            title="Kenwood KMM021 7QT Chef Titanium Kitchen Machine"
            price={528.99}
            rating={4}
            image="https://m.media-amazon.com/images/I/71hIoWhVckL._AC_SX679_.jpg"
          />
          <Product
            id="43353436"
            title="The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses"
            price={14.55}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/51T-sMqSMiL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            id="43353437"
            title="Echo (4th Gen) | Spherical design with rich sound, smart home hub, and Alexa | Twilight Blue"
            price={20.45}
            rating={3}
            image="https://m.media-amazon.com/images/I/619lHcLuj9L._AC_SX679_.jpg"
          />
          <Product
            id="43353438"
            title="2021 Apple 11-inch iPad Pro Wi-Fi + Cellular 256GB - Space Gray"
            price={150.55}
            rating={4}
            image="https://m.media-amazon.com/images/I/81a-rN2A3DS._AC_SX466_.jpg"
          />
          <Product
            id="43353439"
            title="Apple Watch Series 7 GPS, 45mm Midnight Aluminum Case with Midnight Sport Band - Regular"
            price={100.11}
            rating={2}
            image="https://m.media-amazon.com/images/I/71fxj9HPLPL._AC_SX466_.jpg"
          />
        </div>
        <div className="home__row">
          <Product
            id="43353440"
            title="SAMSUNG 34-Inch Odyssey G5 Ultra-Wide Gaming Monitor with 1000R Curved Screen, 165Hz, 1ms, FreeSync Premium, WQHD (LC34G55TWWNXZA, 2020 Model), Black"
            price={95.66}
            rating={5}
            image="https://m.media-amazon.com/images/I/61XDeaOrrKL._AC_SX679_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
