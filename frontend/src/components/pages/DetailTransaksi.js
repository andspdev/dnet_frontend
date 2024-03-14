import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ImageLoader from '../../assets/images/loader.svg'
import axios from "axios"
import { Context } from "../includes/GlobalState"
import { getCookie } from "../includes/Functions"

const DetailTransaksi = () =>
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
                    is_load_detail: false
                }))
            }
        })
    }, [])


    return(
        <>
            {stateLocal.is_load_detail ? (
                <div className="loader-full">
                    <img src={ImageLoader} alt="Loader"/>
                </div>
            ) : (
                <>

                </>
            )}
        </>
    )
}

export default DetailTransaksi