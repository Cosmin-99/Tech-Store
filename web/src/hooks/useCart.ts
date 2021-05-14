import { useContext, useEffect, useState } from "react"
import { Product } from "../models/Product";
import { useLoadData } from "./useLoadData";
import { toast } from "react-toastify";
import { UserContext } from "contexts/userContext";
export type CartProduct = Product & {
    count: number;
}
export interface CartHook {
    favorite: Product[],
    cart: CartProduct[],
    addFavorite: (product: Product) => void,
    add: (product: Product) => void,

    deleteFromCart: (product: Product) => void,
    remove: (product: Product) => void,
    removeFavorite: (product: Product) => void,
    emptyCart: () => void,
}
const localStorageCartKey = "cart";
export function useCart(): CartHook {
    const [favorite, setFavorite] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartProduct[]>([]);
    const [user,] = useContext(UserContext);
    useLoadData(async () => {
        if (user) {
            const favoriteCart: any[] = [];
            const userCart: any[] = [];
            // const userInCollection = await db.collection("users").doc(user.uid).get();
            // const userData = userInCollection.data()!;
            // const userCart = userData.cart;
            // const favoriteCart = userData.favorite;
            if (userCart) {
                setCart(userCart);
            } else {
                setCart([]);
            }
            if (favoriteCart) {
                setFavorite(favoriteCart);
            } else {
                setFavorite([]);
            }
        }
    }, [user]);
    useEffect(() => {
        const cart = localStorage.getItem(localStorageCartKey);
        if (cart) {
            setCart(JSON.parse(cart));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem(localStorageCartKey, JSON.stringify(cart));
        // if (user) {
        //     db.collection("users").doc(user.uid).set({
        //         cart,
        //     }, { merge: true })
        // }
        // eslint-disable-next-line
    }, [cart])
    function emptyCart() {
        setCart([]);
    }
    function add(p: Product) {
        const { ...product } = p;
        const index = cart.findIndex(el => el.id === product.id);
        if (index !== -1) {
            const newCart = cart.map((cart, i) => i === index ? { ...cart, count: cart.count + 1 } : cart);
            setCart(newCart);
        } else {
            toast('Product added to cart', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            const newCart = [...cart, { ...product, count: (product as any).count ?? 1 }];
            setCart(newCart);
        }
    }
    function remove(product: Product) {
        const index = cart.findIndex(el => el.id === product.id);
        if (index !== -1) {
            const newCart = cart.map((cart, i) => i === index ? { ...cart, count: cart.count - 1 } : cart);
            setCart(newCart);
        } else {
            return;
        }
    }
    function deleteFromCart(product: Product) {
        const newCart = cart.filter(o => o !== product)
        setCart(newCart);
    }
    function addFavorite(product: Product) {
        if (!user) {
            return;
        }
        const index = favorite.findIndex(el => el.id === product.id);
        if (index === -1) {
            toast('❤️ Item added to favorites', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            const newFav = [...favorite, product];
            // db.collection("users").doc(user.uid).set({
            //     favorite: newFav,
            // }, { merge: true })

            setFavorite(newFav);
        }
    }
    function removeFavorite(product: Product) {
        if (!user) {
            return;
        }
        toast('💔 Item removed from favorites', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        const newFav = favorite.filter(o => o.id !== product.id);
        setFavorite(newFav);
        // db.collection("users").doc(user.uid).set({
        //     favorite: newFav,
        // }, { merge: true })
    }

    return {
        cart, add, deleteFromCart, addFavorite, removeFavorite, favorite, remove, emptyCart
    }


}