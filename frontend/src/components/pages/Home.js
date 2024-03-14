import { useContext, useState } from "react";
import { Header } from "../includes/Header";
import ImageMobileBrowser from '../../assets/images/mobile-browsers.svg'
import ImageLoader from '../../assets/images/loader.svg'
import { nomorHPOperator, formatUang } from '../includes/Functions'
import { Context } from "../includes/GlobalState";
import axios from 'axios'
import { Link } from "react-router-dom";

const Home = () =>
{
    const [stateGlobal] = useContext(Context)
    const [stateLocal, setStateLocal] = useState({
        nomor_telepon: '',
        data_paketan: [],
        load_data_paketan: true,
        is_submit_paketan: false
    })

    document.title = stateGlobal.title_web

    const cekPaketData = (e) =>
    {
        e.preventDefault();

        const cek_operator = nomorHPOperator(stateLocal.nomor_telepon)

        setStateLocal(prevState => ({
            ...prevState,
            is_submit_paketan: true,
            load_data_paketan: true
        }))


        axios({
            url: `${stateGlobal.url_api}/paket_data`,
            method: 'GET'
        })
        .then(data => 
        {
            const response = data.data

            let get_data_operator = [];
            response.forEach(value =>
            {
                if (value.kategori_kartu === cek_operator)
                    get_data_operator.push(value)
            });

            setStateLocal(prevState => ({
                ...prevState,
                is_submit_paketan: true,
                load_data_paketan: false,
                data_paketan: get_data_operator
            }))
        })
        .catch(error => {
            alert(`Terjadi kesalahan saat mengambil data. (Error: ${error.message})`)
            console.log('Error Paket Data: ', error)

            setStateLocal(prevState => ({
                ...prevState,
                is_submit_paketan: false,
                load_data_paketan: false
            }))
        })
    }


    const getDataPaketanLayout = () =>
    {
        const get_data = stateLocal.data_paketan

        return (
            <>
                <div className="row">
                    {
                        get_data.map((value, _) => (
                            <>
                                <div className="col-lg-2 mb-3">
                                    <div className="item-paket">
                                        <div className="title">
                                            <b title={value.nama_paket}>{value.nama_paket}</b>
                                        </div>
                                        <p>{formatUang(value.harga)}</p>

                                        <div className="mt-5">
                                            <Link to={'/paket-data/'+value.id} state={{nomor_telepon: stateLocal.nomor_telepon}} className="btn btn-primary btn-sm btn-beli-skrg">Beli Sekarang</Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
            </>
        )
    }

    const inputNoHp = (e) =>
    {
        const value = e.target.value

        if (value === '')
        {
            setStateLocal(prevState => ({
                ...prevState,
                data_paketan: [],
                is_submit_paketan: false
            }))            
        }

        setStateLocal(prevState => ({
            ...prevState,
            nomor_telepon: value
        }))
    }


    return(
        <>
            <Header/>

            <div className="jumbotron-section">
                <div className="description">
                    <div className="row align-items-center">
                        <div className="col-md-4 mb-5 text-center text-md-start">
                            <img src={ImageMobileBrowser} alt="Mobile Browser" className="me-2" />
                        </div>
                        <div className="col-md-8 text-center text-md-start">
                            <div className="mb-4">
                                <h2>Paket Data Internet All Operator</h2>
                                <p>Isi ulang dengan mudah, nggak pakai ribet dan paling murah. Ayo beli paket data kamu disini!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mb-5">
                <div className="form-nomor-telepon">
                    <form method="post" onSubmit={(e) => cekPaketData(e)}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="input_nomor_hp">Ayo isi paket datamu di sini</label>
                            <input type="text" placeholder="Nomor telepon (08xxx)" className="form-control" onChange={(e) => inputNoHp(e)} />
                        </div>

                        <div className="text-center">
                            <button className="btn btn-primary">Lihat Paket Data</button>
                        </div>
                    </form>


                    {!stateLocal.is_submit_paketan ? '' : 
                    
                    stateLocal.load_data_paketan ? (
                        <div className="list-paket my-5">
                            <hr/>
                            <div className="mt-4">
                                Pilih Paket

                                <div className="loader mt-4">
                                    <img src={ImageLoader} alt="Loader" />
                                </div>
                            </div>
                        </div>
                    ) : stateLocal.data_paketan.length === 0 ? (
                        <div className="list-paket my-5">
                            <hr/>
                            <div className="mt-4">
                                Pilih Paket
                                
                                <div className="text-center mt-4">
                                    <p>Tidak ada data paketan dari Operator Anda.</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="list-paket my-5">
                            <hr/>
                            <div className="mt-4">
                                Pilih Paket     

                                <div className="mt-4">
                                    {getDataPaketanLayout()}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home