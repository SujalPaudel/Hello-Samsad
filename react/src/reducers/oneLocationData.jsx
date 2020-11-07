const initialState = {};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'POPULATE_LOCATION':
            return {...payload};
        default:
            return state;
    }
};
