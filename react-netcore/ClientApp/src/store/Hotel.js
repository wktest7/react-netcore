const addHotelType = 'ADD_HOTEL';
const initialState = { hotels: [] };

export const actionCreators = {

    addHotel: (hotel) => async (dispatch) => {
        const baseURL = "/api/hotels";

        const data = JSON.stringify(
            { hotelId: hotel.hotelId, name: hotel.name, description: hotel.description }
        );

        fetch(baseURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data
        })
            .then((data) => {
                dispatch({ type: addHotelType, hotel: data });
            });
    }
}

export const reducer = (state, action) => {

    state = state || initialState;

    if (action.type === addHotelType) {

        return {
            ...state,
            isLoading: false
        };
    }
    return state;
}