

import { createSlice } from "@reduxjs/toolkit";


import authService from "@services/auth.service";


const contexts   = authService.getCacheContexts()
const menu       = authService.getCacheMenu()
const token      = authService.getCacheToken()
const user       = authService.getCacheUser()
const contractor = authService.getCacheContractor()
const staff      = authService.getCacheStaff()
const contracts  = authService.getCacheContracts()




const initialState = {

//   contexts:   contexts        ? contexts    : [],
//   menu:       menu            ? menu        : [],
  contracts:  contracts       ? contracts   : [],
  token:      token           ? token       : undefined,
  user:       user            ? user        : {
    userEmail: undefined,
    userFirstName: undefined,
    userLastName: undefined,
    userStatus: undefined,
    userPack: undefined,
  },
  contractor: contractor      ? contractor  : {
    id: undefined,
    type: undefined,
    status: undefined,
  },
  staff:      staff           ? staff       : {
    id: undefined,
    type: undefined,
    status: undefined,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStateContexts: (state, contexts) => {
      state.contexts = contexts.payload
      authService.setCacheContexts(contexts.payload)
    },
    setStateToken: (state, token) => {
      state.token = token.payload
      authService.setCacheToken(token.payload)
    },
    setStateUser(state, user){
      state.user = user.payload
      authService.setCacheUser(user.payload)
    },
    setStateContractor(state, contractor){
      state.contractor = contractor.payload
      authService.setCacheContractor(contractor.payload)
    },
    setStateStaff(state, staff){
      state.staff = staff.payload
      authService.setCacheStaff(staff.payload)
    },
    setStateMenu(state, menu){
      state.menu = menu.payload
      authService.setCacheMenu(menu.payload)
    },
    setStateContracts(state, contracts){
      state.contracts = contracts.payload
      authService.setCacheContracts(contracts.payload)
    }
  },
});

export const { 
  setStateUser, 
  setStateContractor, 
  setStateStaff, 
  setStateContexts,
  setStateMenu,
  setStateToken,
  setStateContracts,
} = authSlice.actions;

export default authSlice.reducer;