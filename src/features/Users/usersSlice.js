import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL, HTTP_STATUS } from '../../app/constants'
import axios from 'axios'

const namespace = 'users'

export const fetchUsersData = createAsyncThunk(
  `${namespace}/fetchDashboardData`,
  async (_, { dispatch, getState, signal }) => {
    const source = axios.CancelToken.source()

    signal.addEventListener('abort', () => {
      source.cancel()
    })
    const { data } = await axios.get(`${API_URL}/users-group`, {
      cancelToken: source.token
    })
    return data
  },
  {
  condition: (_, {getState, extra}) => {
    console.log({extra})
    const { users } = getState()
    if(users.loading === HTTP_STATUS.PENDING){
      return false
    }
  },
  dispatchConditionRejection: true

}  )

const usersSlice = createSlice({
  name: namespace,
  initialState: {
    loading: null,
    data: null,
    error: null
  },
  reducers: {},
  extraReducers: {
    [fetchUsersData.pending](state) {
      state.loading = HTTP_STATUS.PENDING
    },
    [fetchUsersData.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED
      state.data = payload
    },
    [fetchUsersData.rejected](state, { error }) {
      state.loading = HTTP_STATUS.REJECTED
      state.error = error.message
    },
  },
})

export default usersSlice.reducer
