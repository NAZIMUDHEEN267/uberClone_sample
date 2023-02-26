import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    searchHistory: [],
    distance: []
}

const { actions, reducer } = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setOrigin(state, action){
            state.origin = action.payload;
        },
        setDestination(state, action){
            state.destination = action.payload;
        },
        setTravelTimeInformation(state, action){
            state.travelTimeInformation = action.payload;
        },
        setHistory(state, payload){
            state.searchHistory = payload;
        },
        setDistance(state, action){
            state.distance = action.payload;
        }
    }
});

export default reducer;
export const { setOrigin, setDestination, setTravelTimeInformation, setHistory, setDistance } = actions;

// selectors
export const selectOrigin = (state) => state;
export const selectDestination = (state) => state; 
export const selectTravelTimeInformation = (state) => state; 