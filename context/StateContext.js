import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ( {children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    // Function for add to cart, it willl take two params, the product we are on, and the quantity
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item.id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price + quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if(checkProductInCart) {
            
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct.id === product.id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems); 
            
        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart`); //this toast will come up for either stance
    }



// Function to inrease the value of quantity
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty -1 < 1) return 1;
            // else
            return prevQty - 1;
        });
    }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);