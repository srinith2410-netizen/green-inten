import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";

function Cart() {
  const { cart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="page">
      <h2>Your Cart</h2>
      {cart.length === 0 && <p>Cart is empty</p>}
      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <h3>Total: ₹{total}</h3>
    </div>
  );
}

export default Cart;
