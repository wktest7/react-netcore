const addHotelType = 'ADD_HOTEL';
const deleteHotelType = 'DELETE_HOTEL';
const requestHotelsType = 'REQUEST_HOTELS';
const receiveHotelsType = 'RECEIVE_HOTELS';
const requestHotelType = 'REQUEST_HOTEL';
const receiveHotelType = 'RECEIVE_HOTEL';
const updateHotelType = 'UPDATE_HOTEL';
const initialState = { hotels: [], currId: 0, hotel: {}, isLoading: false };

let allhotels = [];
let currenthotel = {};

export const actionCreators = {
    
    requestHotels: () => async (dispatch, getState) => {
        dispatch({ type: requestHotelsType });

        const url = `api/hotels`;
        const response = await fetch(url);
        const allhotels = await response.json();

        dispatch({ type: receiveHotelsType, allhotels });
    },

    requestHotel: (hotelId) => async (dispatch, getState) => {
        dispatch({ type: requestHotelType });

        const url = `api/Hotels/GetHotel/${hotelId}`;
        const response = await fetch(url);
        const hotel = await response.json();

        dispatch({ type: receiveHotelType, hotel });
    },

    addHotel: (hotel) => async (dispatch) => {
        const baseURL = "/api/hotels";

        const data = JSON.stringify(
            { hotelId: hotel.hotelId, name: hotel.name, description: hotel.description }
        );

        fetch(baseURL + "/", {
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
    },

    updateHotel: (hotel) => async (dispatch, getState) => {
        const baseURL = "/api/hotels";

        const data = JSON.stringify(
            { hotelId: hotel.hotelId, name: hotel.name, description: hotel.description }
        );

        fetch(baseURL, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data
        })
            .then((data) => {
                dispatch({ type: updateHotelType, hotel: data });
            });
    },

    deleteHotel: (hotel) => async (dispatch, getState) => {
        const baseURL = "/api/hotels";

        const data = JSON.stringify(
            { hotelId: hotel.hotelId, name: hotel.name, description: hotel.description }
        );

        fetch(baseURL + "/" + data.hotelId, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
            .then((data) => {
                dispatch({ type: deleteHotelType });
            });
    },
}



export const reducer = (state, action) => {

    state = state || initialState;

    if (action.type === requestHotelsType) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveHotelsType) {
        allhotels = action.allhotels;

        return {
            ...state,
            hotels: allhotels,
            isLoading: false
        };
    }

    if (action.type === requestHotelType) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveHotelType) {
        currenthotel = action.hotel;

        return {
            ...state,
            hotel: currenthotel,
            isLoading: false
        };
    }

    if (action.type === addHotelType) {

        return {
            ...state,
            isLoading: false
        };
    }

    if (action.type === deleteHotelType) {

        return {
            ...state,
            isLoading: false
        };
    }
    return state;
}