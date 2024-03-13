import { Component } from "react";
import ImageLoader from '../../assets/images/loader.svg'
import axios from "axios";
import { Context } from "../includes/GlobalState";
import { formatUang, getCookie } from "../includes/Functions";

import { Header } from "../includes/Header";
import { Link } from 'react-router-dom'

class DetailPaket extends Component
{
    static contextType = Context

    constructor(props)
    {
        super(props)

        this.state = {
            load_detail: true,
            response_detail: ''
        }
    }

    componentDidMount()
    {
        const get_user = getCookie('user_login');

        if (get_user === '')
        {
            window.location.href = './login';
        }
        else
        {
            const { id } = this.props;
            const [ getState ] = this.context

            document.title = 'Detail Paket Data | ' + getState.title_web

            axios({
                url: `${getState.url_api}/paket_data/${id}`,
                method: 'GET'
            })
            .then(data => {
                const response = data.data

                this.setState({
                    load_detail: false,
                    response_detail: response
                })

            })
            .catch(error => {
                alert(`Terjadi kesalahan saat mengambil data. (Error: ${error.message}`)
                console.log('Error detail: ', error)
            });
        }
    }

    render()
    {
        const fetch_data = this.state.response_detail

        return(
            <>     
                {this.state.load_detail ? (
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
                                <p>{fetch_data.kategori_kartu.toUpperCase()} - </p>

                                <b>Keterangan</b>
                                <p>{fetch_data.keterangan}</p>

                                <b>Total</b>
                                <h3 style={{color: 'var(--color-harga)'}}>{formatUang(fetch_data.harga)}</h3>

                                <div className="d-grid mt-4">
                                    <button className="btn btn-primary mb-2">BELI SEKARANG</button>
                                    <Link to="/" className="btn btn-secondary">BATALKAN</Link><br/>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </>
        )
    }
}

export default DetailPaket