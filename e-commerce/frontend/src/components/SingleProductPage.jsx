import React, { memo, useContext, useState } from "react";
import "../style/SingleProductPage.css";
import QuantityInput from "./QuantityInput";
import { useParams } from "react-router-dom";
import useData from "../hooks/useDate";
import Loader from "../Common/Loader";
import { cartContext } from "../context/cartCotext";
import { userContext } from "../context/userContext";

function SingleProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(cartContext);
  const user = useContext(userContext);

  const { data: product, error, isLoading } = useData(`/products/${id}`);
  return (
    <section className="align_center single_product">
      {error && <em className="form_error">{error}</em>}
      {isLoading && <Loader />}
      {product && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => {
                return (
                  <img
                    src={`http://localhost:3000/products/${image}`}
                    alt={product.title}
                    key={index}
                    onClick={() => {
                      setSelectedImage(index);
                    }}
                    className={selectedImage === index ? "selected_image" : ""}
                  />
                );
              })}
            </div>
            <img
              src={`http://localhost:3000/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>
          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">${product.price.toFixed(2)}</p>
            {user && (
              <>
                <h2 className="quantity_title">Quantity</h2>
                <div className="align_center quantity_input">
                  <QuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                    stock={product.stock}
                  />
                </div>

                <button
                  className="search_button add_cart"
                  onClick={() => addToCart(product, quantity)}
                >
                  Add To Cart
                </button>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default memo(SingleProductPage);
