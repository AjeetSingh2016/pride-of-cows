"use client";
import React, { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Premium Milk Bottle", price: 50, thumbnail: "milk.png" },
  { id: 2, name: "Paneer", price: 80, thumbnail: "paneer.png" },
  { id: 3, name: "Curd", price: 60, thumbnail: "curd.png" },
  { id: 4, name: "Butter", price: 100, thumbnail: "butter.png" },
];

const subscriptions = [
  {
    id: 5,
    name: "Weekly Subscription",
    price: 300,
    thumbnail: "weekly.jpg",
  },
  {
    id: 6,
    name: "Monthly Subscription",
    price: 1000,
    thumbnail: "monthly.jpg",
  },
];

function App() {
  const [cart, setCart] = useState(
    products.map((product) => ({ ...product, quantity: 0 }))
  );
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [coupon, setCoupon] = useState("");
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const updateQuantity = (id, delta) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 0) }
          : item
      )
    );
  };

  const calculateSubtotal = () => {
    return (
      cart.reduce((total, item) => total + item.price * item.quantity, 0) +
      (selectedSubscription ? selectedSubscription.price : 0)
    );
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.05; // 5% tax, adjust if needed
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Order Summary: \n${cart
        .map((item) =>
          item.quantity > 0 ? `${item.name}: ${item.quantity}` : ""
        )
        .join("\n")}\nSubtotal: $${calculateSubtotal()}\nTax: $${calculateTax(
        calculateSubtotal()
      )}\nTotal: $${calculateTotal()}\nCoupon Applied: ${coupon}`
    );
  };

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const applyCoupon = () => {
    alert(`Coupon applied: ${coupon}`);
  };

  const handleSubscriptionChange = (subscription) => {
    setSelectedSubscription(
      selectedSubscription?.id === subscription.id ? null : subscription
    );
  };

  const isAnyProductSelected = cart.some((item) => item.quantity > 0);

  return (
    <div className="app">
      <main className="main">
        {/* Summary Section */}
        <section className="summary">
          <div>
            <h2>Products</h2>
            <div className="product-list">
              {cart.map((item) => (
                <div className="product" key={item.id}>
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="product-thumbnail"
                  />
                  <div className="product-details">
                    <h3>{item.name}</h3>
                    <p className="product-price">${item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="subscription-checkboxes">
            {subscriptions.map((item) => (
              <div key={item.id} className="subscription-checkbox">
                <label
                  title={!isAnyProductSelected ? "Select a product first" : ""}
                >
                  <input
                    type="checkbox"
                    checked={selectedSubscription?.id === item.id}
                    onChange={() => handleSubscriptionChange(item)}
                    disabled={!isAnyProductSelected}
                  />
                  {item.name} (${item.price})
                </label>
              </div>
            ))}
          </div>

        {/* Totals Section */}
          <div>
          <div className="subtotal">
            <span>Subtotal:</span> <span>${calculateSubtotal()}</span>
          </div>
          <div className="tax">
            <span>Tax (5%):</span>{" "}
            <span>${calculateTax(calculateSubtotal())}</span>
          </div>
          <div className="total">
            <span>Total:</span> <span>${calculateTotal()}</span>
          </div>
          </div>

       

        </section>

        {/* Contact Form Section */}
        <section className="contact-form">

          <form className="form" onSubmit={handleSubmit}>
          <h2>Delivery Information</h2>
            <div className="form-info-section">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="address"
                placeholder="Delivery Address"
                value={form.address}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            {/* Coupon Input */}
            <div className="form-button-section">
              <div className="coupon-input-container">
                <input
                  type="text"
                  value={coupon}
                  onChange={handleCouponChange}
                  placeholder="Enter Coupon Code"
                  className="coupon-input"
                />
                <button
                  type="button"
                  className="coupon-button"
                  onClick={applyCoupon}
                  disabled={!isAnyProductSelected}
                >
                  Apply
                </button>
              </div>
              <button
                type="submit"
                className="checkout-button"
                disabled={!isAnyProductSelected}
              >
                Checkout
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
