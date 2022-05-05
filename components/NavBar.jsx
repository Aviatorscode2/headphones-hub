import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

function NavBar() {
  return (
    <div className="navbar-container">
        <p className="logo">
            <Link href="/">Headphones Hub</Link>
        </p>
        <button type="button" className="cart-icon">
            <AiOutlineShopping />
            <span className="cart-item-qty">1</span>
        </button>
    </div>
  )
}

export default NavBar