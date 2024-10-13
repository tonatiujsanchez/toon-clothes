
import { AuthStatus, IUserRol } from '@/interfaces'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface AuthenticatedUser {
    name  : string,
    email : string,
    photo?: string,
    role  : IUserRol
}

interface InitialState {
    status: AuthStatus,
    user?: AuthenticatedUser
}

const initialState:InitialState = {
    status: 'checking',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthenticatedUser>)=> {
            state.status = 'authenticated',
            state.user = action.payload
        },
        logout: ( state ) => {
            state.user = undefined
            state.status = 'not_authenticated'
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer