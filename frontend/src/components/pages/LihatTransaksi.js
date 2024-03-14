import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ImageLoader from '../../assets/images/loader.svg'
import axios from "axios"
import { Context } from "../includes/GlobalState"
import { getCookie } from "../includes/Functions"
import { Header } from '../includes/Header'
import Footer from '../includes/Footer'

const LihatTransaksi = () =>
{
    const { id } = useParams()
    const [ stateGlobal ] = useContext(Context)
    const [stateLocal, setStateLocal] = useState({
        is_load_detail: true,
        detail_transaksi: ''
    })

    useEffect(() =>
    {
        const user_id = getCookie('user_login')

        console.log(user_id)

        axios({
            url: `${stateGlobal.url_api}/transaksi_user/${id}`,
            method: 'GET'
        })
        .then(data =>
        {
            const response = data.data

            if (response.pengguna_id !== user_id)
                window.location.href = '/transaksi'
            else
            {
                setStateLocal(prevState => ({
                    ...prevState,
                    is_load_detail: true
                }))
            }
            console.log('masuk disni')
        })
        .catch(error =>
        {
            alert(`Terjadi kesalahan saat mengambil data. (Error: ${error.message})`)
            console.log('Error Detail Transaksi: ', error)            
        })
    }, [id, stateGlobal.url_api])


    return(
        <>
            
        </>
    )
}

export default LihatTransaksi