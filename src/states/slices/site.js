import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { Api }              from "./../api";
// import authService from "@services/auth.service";

const initialState = {
    entities: [],
    loading: 'idle' || 'pending' || 'succeeded' || 'failed',

    siteName: '',
    siteDetails: '',
    siteAddress: '',
    siteCity: '',
    siteType: ['Simple', 'Complex'],
    siteStatus: '',
    sitePrefix: ''
};

export const createSite = createAsyncThunk('/site/create', (formikOnSubmit, site) => {
        return formikOnSubmit(site)
    }
)
  

export const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    updateFormValue: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSite.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(createSite.fulfilled, (state, action) => {
        return action.payload
        // const { requestId } = action.meta
        // if (
        //   state.loading === 'pending' &&
        //   state.currentRequestId === requestId
        // ) {
        //   state.loading = 'idle'
        //   state.entities.push(action.payload)
        //   state.currentRequestId = undefined
        // }
      })
      .addCase(createSite.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle'
          state.error = action.error
          state.currentRequestId = undefined
        }
      })
  },
});

export const { updateFormValue } = siteSlice.actions;
export const selectFormValues = (state) => state.form;
export default siteSlice.reducer;