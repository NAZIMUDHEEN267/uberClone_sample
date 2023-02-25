import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null
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
        }
    }
});

export default reducer;
export const { setOrigin, setDestination, setTravelTimeInformation } = actions;

// selectors
export const selectOrigin = (origin) => origin;
export const selectDestination = (state) => state.nav.destination; 
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation; 