import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id)
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  // ฟังก์ชันนับจำนวนสินค้าทั้งหมดในตะกร้า
  const getCartCount = () => cart.reduce((total, item) => total + item.quantity, 0)

  // ฟังก์ชันลบสินค้าจากตะกร้า
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }
  // ฟังก์ชันจำลองจำนวนสินค้าทั้งหมด (ใช้สำหรับแสดงจำนวนสินค้าใน Products)
  const getProductCount = () => 50 // Total products available

  const isInCart = (productId) => cart.some(item => item.id === productId)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartCount, getProductCount, isInCart }}>
      {children}
    </CartContext.Provider>
  )
}
