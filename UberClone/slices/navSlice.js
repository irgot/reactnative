import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,

}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrign: (state, action) => {
            state.origin = action.payload
        },
        setDestination: (state, action) => {
            state.destination = action.payload
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload
        }

    }
})


export const { setOrign, setDestination, setTravelTimeInformation } = navSlice.actions

//Selectors
export const selectOrign = (state) => state.nav.orign
export const selectDestination = (state) => state.nav.destination
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation


export default navSlice.reducer