import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import ImageLoader from '../../assets/images/loader.svg'
import axios from "axios"
import { Context } from "../includes/GlobalState"
import { getCookie, getCurrentDateTime } from "../includes/Functions"
import { Header } from '../includes/Header'
import { Link } from "react-router-dom"

// import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as bootstrap from 'bootstrap'



const LihatTransaksi = () =>
{
    const modalRef = useRef()
    const { id } = useParams()
    const [ stateGlobal ] = useContext(Context)
    const [stateLocal, setStateLocal] = useState({
        is_load_detail: true,
        detail_transaksi: '',
        fetch_transaksi: '',
        load_fetch: true
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
                    is_load_detail: false,
                    detail_transaksi: response
                }))

                document.title = `Detail Transaksi: ${response.transaksi_id} | ${stateGlobal.title_web}`


                axios({
                    url: `${stateGlobal.url_api}/paket_data/${response.paket_id}`,
                    method: 'GET'
                })
                .then(data =>
                {
                    const response = data.data

                    setStateLocal(prevState =>({
                        ...prevState,
                        load_fetch: false,
                        fetch_transaksi: response
                    }))
                })
                .catch(error =>
                {
                    alert(`Terjadi kesalahan saat fetch data paket. (Error: ${error.message})`)
                    console.log('Error fetch data: ', error)
                })
            }
        })
        .catch(error =>
        {
            alert(`Terjadi kesalahan saat mengambil data. (Error: ${error.message})`)
            console.log('Error Detail Transaksi: ', error)            
        })
    }, [id, stateGlobal.url_api, stateGlobal.title_web])



    const status_pembayaran = () =>
    {
        const data_lama = stateLocal.detail_transaksi
        data_lama.status = "PAID"
        data_lama.paid_at = new Date().getTime();

        axios({
            url: `${stateGlobal.url_api}/transaksi_user/${stateLocal.detail_transaksi.id}`,
            method: 'PUT',
            data: data_lama
        })
        .then(data =>
        {
            const response = data.data

            setStateLocal(prevState =>({
                ...prevState,
                detail_transaksi: response
            }))
        })
        .catch(error =>
        {
            alert(`Terjadi kesalahan saat memperbarui status pembayaran. (Error: ${error.message})`)
            console.log('Error Status Pembayaran: ', error)
        })
    }


    const cara_pembayaran = () =>
    {
        const modal = new bootstrap.Modal(modalRef.current);
        modal.show();
    }


    return(
        <>
        {
            stateLocal.is_load_detail ? (
                <div className="loader-full">
                    <img src={ImageLoader} alt="Loader"/>
                </div>
            ) : (
                <>
                    <Header/>

                    <div className="detail-paket">
                        <div className="title">
                            <h3>Detail Transaksi</h3>
                        </div>

                        <div className="content">
                            {
                                stateLocal.load_fetch ? (
                                    <div className="loader text-center">
                                        <img src={ImageLoader} alt="Loader"/>   
                                    </div>

                                ) : (
                                    <>
                                        <Link to="/transaksi" className="btn btn-secondary mb-4 btn-sm">&laquo; Kembali</Link>

                                        <h5>Transaksi Saya</h5>

                                        <div className="my-4">
                                            <div className="row mb-2">
                                                <div className="col-md-4 mb-2">Transaksi ID</div>
                                                <div className="col-md-8">{stateLocal.detail_transaksi.transaksi_id}</div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-4 mb-2">Dipesan Pada</div>
                                                <div className="col-md-8">{stateLocal.detail_transaksi.created_at}</div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-4 mb-2">Status Transaksi</div>
                                                <div className="col-md-8">
                                                    {stateLocal.detail_transaksi.status === 'PENDING' ? (
                                                        <span className="badge bg-warning text-dark">PENDING</span>
                                                    ) : (
                                                        <span className="badge bg-success">PAID</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-4 mb-2">Dibayar Pada</div>
                                                <div className="col-md-8">{stateLocal.detail_transaksi.paid_at !== '-' ? getCurrentDateTime(stateLocal.detail_transaksi.paid_at) : '-'}</div>
                                            </div>
                                        </div>

                                        <hr/>

                                        <h5>Paket Data</h5>
                                        
                                        <div className="my-4">
                                            <div className="row mb-2">
                                                <div className="col-md-4 mb-2">Nama Paket</div>
                                                <div className="col-md-8">{stateLocal.fetch_transaksi.nama_paket}</div>
                                            </div>

                                            <div className="row mb-2">
                                                <div className="col-md-4 mb-2">Operator</div>
                                                <div className="col-md-8">{stateLocal.fetch_transaksi.kategori_kartu.toUpperCase()}</div>
                                            </div>

                                            <div className="row mb-2">
                                                <div className="col-md-4 mb-2">Keterangan</div>
                                                <div className="col-md-8">{stateLocal.fetch_transaksi.keterangan}</div>
                                            </div>
                                        </div>

                                        {stateLocal.detail_transaksi.status === 'PENDING' ? (
                                            <>
                                                <div className="d-grid mt-5 ">
                                                    <button className="btn btn-primary mb-2" onClick={() => status_pembayaran() }>Cek Status Pembayaran</button>
                                                    <button className="btn btn-outline-secondary" onClick={()=>cara_pembayaran()}>Lihat Petunjuk Pembayaran</button>
                                                </div>

                                                <div className="modal" ref={modalRef} id="modal-cara-pembayaran">
                                                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title">Petunjuk Pembayaran</h5>
                                                            </div>
                                                            <div className="modal-body">
                                                                <p className="m-0">No. Virtual Account</p>
                                                                <h5>8831xxxxxxxx</h5>

                                                                <div  className="mt-4">
                                                                    <b>Petunjuk Pembayaran</b>
                                                                    <ul>
                                                                        <li>Masukkan kartu ATM dan Pin Anda</li>
                                                                        <li>Pilih Menu "TRANSAKSI LAINNYA"</li>
                                                                        <li>Pilih Menu "Transfer"</li>
                                                                        <li>Pilih Menu "KE REK BCA VIRTUAL ACCOUNT"</li>
                                                                        <li>Masukkan Nomor BCA Virtual Account, Pilih "BENAR".</li>
                                                                        <li>Menu ATM akan menampilkan: No. Virtual Account, Nama Pemegang Polis, Nama Perusahaan / Produk, Tagihan.</li>
                                                                        <li>Periksa jumlah premi yang tampil pada layar, jika sudah sesuai, pilih "BENAR".</li>
                                                                        <li>Menu ATM akan menampilkan konfirmasi pembayaran, jika sesuai, pilih "YA".</li>
                                                                        <li>Lanjutkan penyelesaian transaksi sesuai intruksi mesin ATM.</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ):  ''}
                                    </>
                                )
                            }
                        </div>
                    </div>
                </>
            )
        }
        </>
    )
}

export default LihatTransaksi