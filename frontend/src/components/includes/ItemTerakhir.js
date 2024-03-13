import { useContext } from "react"
import { Context } from "./GlobalState"

const ItemTerakhir = () =>
{
    const [ stateGlobal, setStateGlobal ] = useContext(Context)
    const fetch_data = stateGlobal.terakhir_pilih_item

    if (fetch_data !== '')
    {
        const batalkanItem = () =>
        {
            setStateGlobal(prevState => ({
                ...prevState,
                terakhir_pilih_item: ''
            }))
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
                            <button className="btn btn-primary mb-2">Lanjutkan</button>
                        </div>
                    </div>
                </div>
            </>    
        )
    }
}

export default ItemTerakhir