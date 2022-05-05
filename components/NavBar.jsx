import React from 'react'
import Link from 'next/link'
import { AiOutlineShoppingPage } from 'react-icons'

function NavBar() {
  return (
    <div className="navbar-container">
        <p className="logo">
            <Link href="/">Headphones Hub</Link>
        </p>
        <button type="button" className="cart-icon" onClick="">
            <AiOutlineShoppingPage />
            <span className="cart-item-qty">1</span>
        </button>
    </div>
  )
}

export default NavBar