import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from '../../app/constants'
import axios from "axios";

const namespace = 'dashboard'

export const fetchDashboardData = createAsyncThunk(
  `${namespace}/fetchDashboardData`,
  async () => {
    const { data } = await axios.get(`${API_URL}/${namespace}`)
    console.log(data)
    return data 
  }
)


const dashboardSlice = createSlice({
  name: namespace,
  initialState: {
    data: null,
    loading: null,
    error: null
  },
  reducers: {},
  extraReducers: {
    [fetchDashboardData.pending](state){
      state.loading = HTTP_STATUS.PENDING
    },
    [fetchDashboardData.fulfilled]: (state, {payload}) => {
      state.loading = HTTP_STATUS.FULFILLED
      state.data = payload
    },
    [fetchDashboardData.rejected](state, {error}){
      state.loading = HTTP_STATUS.REJECTED
      state.error = error.message
    }
  }
})


export default dashboardSlice.reducer