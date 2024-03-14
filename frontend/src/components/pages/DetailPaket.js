import { useContext, useEffect, useState } from "react";
import ImageLoader from '../../assets/images/loader.svg'
import axios from "axios";
import { Context } from "../includes/GlobalState";
import { formatUang, getCookie } from "../includes/Functions";

import { Header } from "../includes/Header";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Footer from "../includes/Footer";
import ItemTerakhir from "../includes/ItemTerakhir";



const DetailPaket = () =>
{
    const navigate = useNavigate()
    const { id } = useParams()
    const { state } = useLocation()
    const [ stateGlobal, setStateGlobal ] = useContext(Context)
    const [ stateLocal, setStateLocal ] = useState({
        load_detail: true,
        response_detail: ''
    })

    useEffect(() =>
    {
        const get_user = getCookie('user_login')

        if (get_user === '')
        {
            navigate('/login');
        }
        else
        {
            if (!state || state.nomor_telepon === '')
                window.location.href = '/'
            else
            {
                document.title = 'Detail Paket Data | ' + stateGlobal.title_web

                axios({
                    url: `${stateGlobal.url_api}/paket_data/${id}`,
                    method: 'GET'
                })
                .then(data => {
                    const response = data.data

                    setStateLocal(prevState => ({
                        ...prevState,
                        load_detail: false,
                        response_detail: response
                    }))

                })
                .catch(error => {
                    alert(`Terjadi kesalahan saat mengambil data. (Error: ${error.message}`)
                    console.log('Error detail: ', error)
                });
            }
        }
    }, [id, state, stateGlobal.url_api, stateGlobal.title_web])

    const fetch_data = stateLocal.response_detail


    const bayarSekarang = (e) =>
    {
        e.preventDefault()

        setStateGlobal((prevState) => ({
            ...prevState,
            terakhir_pilih_item: {
                nomor_telepon: state.nomor_telepon,
                items: stateLocal.response_detail
            }
        }))
        
    }

    return (
        <>
            {stateLocal.load_detail ? (
                <div className="loader-full">
                    <img src={ImageLoader} alt="Loader"/>
                </div>
            ) : (
                <>
                    <Header/>
                    <div className="detail-paket">
                        <div className="title">
                            <h3>Paket Data</h3>
                        </div>

                        <div className="content">
                            <b>{fetch_data.nama_paket}</b>
                            <p>{fetch_data.kategori_kartu.toUpperCase()} - {state.nomor_telepon}</p>

                            <b>Keterangan</b>
                            <p>{fetch_data.keterangan}</p>

                            <b>Total</b>
                            <h3 style={{color: 'var(--color-harga)'}}>{formatUang(fetch_data.harga)}</h3>

                            <form method="post" onSubmit={(e) => bayarSekarang(e)}>
                                <div className="d-grid mt-4">
                                    <button className="btn btn-primary mb-2">BAYAR SEKARANG</button>
                                    <Link to="/" className="btn btn-secondary">BATALKAN</Link><br/>
                                </div>
                            </form>                     
                        </div>
                    </div>
                    
                    <Footer/>
                    <ItemTerakhir />
                </>
            )}
        </>
    )
}

export default DetailPaket