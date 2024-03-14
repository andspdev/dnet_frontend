import { useNavigate } from 'react-router-dom';
import { useContext } from "react"
import { Context } from "./GlobalState"
import { getCookie, getCurrentDateTime } from "../includes/Functions";
import axios from 'axios'

const ItemTerakhir = () =>
{
    const [ stateGlobal, setStateGlobal ] = useContext(Context)
    const fetch_data = stateGlobal.terakhir_pilih_item
    const navigate = useNavigate();

    if (fetch_data !== '')
    {
        const batalkanItem = () =>
        {
            setStateGlobal(prevState => ({
                ...prevState,
                terakhir_pilih_item: ''
            }))
        }

        const lanjutkanPembayaran = () =>
        {
            const get_user = getCookie('user_login')

            const data_kirim = {
                paket_id: fetch_data.items.id,
                pengguna_id: get_user,
                created_at: getCurrentDateTime(),
                status: "PENDING",
                transaksi_id: `PK${new Date().getTime()}`,
                paid_at: '-',
                keterangan: `Nomor telepon: ${fetch_data.nomor_telepon}`
            }

            axios({
                url: `${stateGlobal.url_api}/transaksi_user`,
                method: 'POST',
                data: data_kirim
            })
            .then(data =>
            {
                const response = data.data

                navigate('/transaksi/'+response.id)
                batalkanItem()
            })
            .catch(error => {
                alert(`Terjadi kesalahaan saat transaksi. (Error: ${error.message}`)
                console.log('Error Transaksi: ', error)
            })
        }

        return (
            <>
                <div className="last-item-beli">
                    <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                            <div className="desc">
                                <b>{fetch_data.items.nama_paket}</b>
                            </div>

                            <div className="desc">
                                <p className="m-0">{fetch_data.items.kategori_kartu.toUpperCase()} - {fetch_data.nomor_telepon}</p>
                            </div>
                        </div>                        

                        <div className="ms-auto text-end">
                            <button className="btn btn-danger mb-2 mx-2 d-inline-block" onClick={() => batalkanItem()}>Batalkan</button>
                            <button className="btn btn-primary mb-2" onClick={() => lanjutkanPembayaran()}>Lanjutkan</button>
                        </div>
                    </div>
                </div>
            </>    
        )
    }
}

export default ItemTerakhir