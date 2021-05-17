import { useContext, useEffect, useState } from "react"
import { Product } from "../models/Product";
import { useLoadData } from "./useLoadData";
import { toast } from "react-toastify";
import { UserContext } from "contexts/userContext";
import { updateUser } from "services/user.service";
import { getProductsByIdArray } from "services/products.service";
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
    updatingUser: boolean;
}
const localStorageCartKey = "cart";
export function useCart(): CartHook {
    const [favorite, setFavorite] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartProduct[]>([]);
    const [user, setUser] = useContext(UserContext);
    useLoadData(async () => {
        if (user) {
            if (user) {
                const userCart: any[] = JSON.parse(user.cart ?? "[]");
                console.log(user.favorites);
                const favReq = await getProductsByIdArray({
                    ids: user.favorites ?? []
                });


                const req = await getProductsByIdArray({
                    ids: userCart.map(el => el.id)
                })

                setFavorite(favReq.data);
                setCart(req.data.map((prod, i) => ({ ...prod, count: userCart[i].count })))
            } else {
                setFavorite([]);
                setCart([]);
            }
        }
    }, [user?.token]);
    useEffect(() => {
        const cart = localStorage.getItem(localStorageCartKey);
        if (cart) {
            setCart(JSON.parse(cart));
        }
    }, []);
    useEffect(() => {
        if (user) {
            setUser({
                ...user, cart: JSON.stringify(cart.map(el => ({
                    count: el.count,
                    id: el.id
                }))),
                favorites: favorite.map(el => +el.id)
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart, favorite]);
    const { loading: updatingUser } = useLoadData(async () => {
        localStorage.setItem(localStorageCartKey, JSON.stringify(cart));
        if (user && cart.length > 0) {
            const submitValues = {
                firstname: user.firstname,
                lastname: user.lastname,
                adresses: user.adresses ?? "[]",
                cards: user.cards ?? "[]",
                cart: JSON.stringify(cart.map(el => ({
                    count: el.count,
                    id: el.id
                }))),
                favorites: favorite.map(el => el.id)
            }
            await updateUser(submitValues as any);
        }
    }, [cart, favorite])
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
        cart, add, deleteFromCart, addFavorite, removeFavorite, favorite, remove, emptyCart, updatingUser
    }


}