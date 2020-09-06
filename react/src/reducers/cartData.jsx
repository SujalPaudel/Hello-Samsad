const initialState = {
    item: localStorage.getItem('item') ? JSON.parse(localStorage.getItem('item')) : ""
}

export default (state = initialState, action) => {
    var items = JSON.parse(localStorage.getItem("item") || "[]");
    switch (action.type) {
        case "ADD_CART_DATA":
            var item = {
                item: action.payload
            };

            console.log(item)

            items.length > 0 ? console.log(items) : console.log(null)
            if (items.length > 0) {
                items.map((each) => {

                    each.item.product_name === item.item.product_name ? each.item.users_pin_qty += item.item.users_pin_qty : items.push(item)

                })
            }
            else {
                items.push(item)
            }

            localStorage.setItem("item", JSON.stringify(items));
            return {
                ...state,
                item: JSON.parse(localStorage.getItem('item'))
            };

        case "REMOVE_CART_ELEMENT":

            var product_name = action.payload

            items.map((each) => {
                if (each.item.product_name === product_name) {
                    items.splice(items.indexOf(each), 1);
                }
            })
            localStorage.setItem("item", JSON.stringify(items));

            return {
                ...state,
                item: JSON.parse(localStorage.getItem('item'))
            };

        case "REMOVE_COMPLETE_CART_ELEMENT":
            localStorage.removeItem("item");
            return {
                ...state,
                item: JSON.parse(localStorage.getItem('item'))
            };

        default:
            return state;
    }
};

