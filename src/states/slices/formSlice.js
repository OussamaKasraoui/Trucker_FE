import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    sites : {},
    buildings : {},
    apartments : {},
    users : {},
    staff : {},
    contractors : {},
    contracts : {},
    tasks : {},
    paiments : {},
  },
  reducers: {
    updateFormValue: (state, action) => {
      console.log('formSlice.js')
      
      // return {
      //   ...state.form[action.payload.context],
      //   ...action.payload.values //{[action.payload.context] :action.payload.values},
      // };
      const { context, values } = action.payload;

      return {
        ...state,
        [context]: {
          ...state[context],
          ...values,
        },
      };

    },
    selectFormValues: (state, context) => {
      console.log('there')
      return state[context.payload]
    }
  },
});

export const { updateFormValue, selectFormValues } = formSlice.actions;
// export const selectFormValues = (state) => state.form;
export default formSlice.reducer;