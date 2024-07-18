import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: "theme",
    initialState: {lightTheme: true},
    reducers : {
        themeChange: (state)=> {
            state.lightTheme = !state.lightTheme;
        },

    },
});

export const { themeChange } = themeSlice.actions;
export default themeSlice.reducer;