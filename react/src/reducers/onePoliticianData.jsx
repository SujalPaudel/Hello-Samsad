const initialState = {};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'POPULATE_POLITICIAN':
            return {...payload};
        default:
            return state;
    }
};
