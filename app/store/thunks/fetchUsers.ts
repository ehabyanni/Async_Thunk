import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//action base type : pending -> users/fetch/pending

const fetchUsers = createAsyncThunk("users/fetch", async () => {
    const response = await axios.get("http://localhost:3005/users");
        // DEV ONLY !!
        await pause(5000);
    return response.data;

});

// DEV ONLY !!
const pause = (duration : number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}



export { fetchUsers };