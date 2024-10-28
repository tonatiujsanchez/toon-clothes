'use client'
import { Provider } from "react-redux"
import { Toaster } from 'sonner'
import { store } from "./"
import { InitializerState } from "./initializer-state"

interface Props {
    children: React.ReactNode
}
export const Providers = ({ children }:Props) => {
    return (
        <Provider store={store}>
            { children }
            <InitializerState />
            <Toaster richColors />
        </Provider>
    )
}
