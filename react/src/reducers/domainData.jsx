const initialState = [];

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'POPULATE_DOMAIN':
            return [...payload];
        default:
            return state;
    }
};