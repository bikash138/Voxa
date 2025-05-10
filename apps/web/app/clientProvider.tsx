'use client';
import React , {ReactNode} from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store"

const ClientProvider = ({children}: {children: ReactNode}) => {
  return <Provider store={store}> {children} </Provider>
}

export default  ClientProvider