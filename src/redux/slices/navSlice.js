import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    searchHistory: [],
    distance: [], 
    mapViewed: false
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
        setHistory(state, action){
            state.searchHistory.push(action.payload);
        },
        setDistance(state, action){
            state.distance = action.payload;
        },
        setView(state, action) {
            state.mapViewed = action.payload;
        }
    }
});

export default reducer;
export const { setOrigin, setDestination, setTravelTimeInformation, setHistory, setDistance, setView } = actions;

// selectors
export const selectOrigin = (state) => state;
export const selectDestination = (state) => state; 
export const selectTravelTimeInformation = (state) => state; 