import { createContext } from "react";

export const GlobalState = {
    title_web: "E-Commerce Paket Data",
    url_api: "http://localhost:3000",
    user_detail: '',
    terakhir_pilih_item: ''
}
export const Context = createContext();