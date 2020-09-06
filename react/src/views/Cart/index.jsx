import React from "react";
import { useSelector } from "react-redux";
import { removeCartElement } from '../../actions/cartAction'
import { checkOut } from '../../actions/checkOutAction'
import { useDispatch } from "react-redux";


function CartItem() {

    const { item } = useSelector((state) => state.cartData)

    const dispatch = useDispatch()

    if (!item) {
        return <></>;
    }


    return (
        <div>
            {item.map((each) => (
                <p>
                    {each.item.product_name} : {each.item.users_pin_qty} | {each.item.pinct_price} = {each.item.users_pin_qty * each.item.pinct_price}
                    <button onClick={() => dispatch(removeCartElement(each.item.product_name))}>&times;</button>
                </p>

            ))}
            <button onClick={() => dispatch(checkOut())}>CheckOut</button>
        </div>
    );
}

export default CartItem;

