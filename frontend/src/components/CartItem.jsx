import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function CartItem({ item }) {
  const { removeFromCart, updateQty } = useContext(CartContext);

  return (
    <div className="cart-item">
      <h4>{item.name}</h4>
      <p>₹{item.price}</p>
      <input
        type="number"
        value={item.qty}
        min="1"
        onChange={(e) => updateQty(item.id, Number(e.target.value))}
      />
      <button onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
  );
}

export default CartItem;
