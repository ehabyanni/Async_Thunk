'use client'
import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUsers";
import { removeUser } from "../thunks/removeUser";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        data: ['sdfdsfsd'],
        isLoading: false,
        error: null as SerializedError | null,
    },
    reducers: {},
    extraReducers(builder) {
        //get the users list
        builder.addCase(fetchUsers.pending , (state , action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled , (state , action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUsers.rejected , (state , action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        //addding new user
        builder.addCase(addUser.pending , (state , action) => {
            state.isLoading = true;
        });
        builder.addCase(addUser.fulfilled , (state , action) => {
            state.isLoading = false;
            state.data.push(action.payload);
        });
        builder.addCase(addUser.rejected , (state , action) => {
            state.isLoading = false;
            state.error = action.error;
        });

         //deleting a user
         builder.addCase(removeUser.pending , (state , action) => {
            state.isLoading = true;
        });
        builder.addCase(removeUser.fulfilled , (state , action) => {
            state.isLoading = false;
            state.data = state.data.filter((user: any) => {
                return user.id !== action.payload.id;
            });
            
        });
        builder.addCase(removeUser.rejected , (state , action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

//pending (loading)
//fulfilled (success)
//rejected (error)




export const usersReducer = usersSlice.reducer;