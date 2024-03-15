import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from './GlobalState'
import ItemTerakhir from './ItemTerakhir'
import { NProgressLoader, isMobileDevice } from './Functions'

const Footer = () =>
{
    const [ stateGlobal ] = useContext(Context)

    useEffect(() => NProgressLoader(), [])

    return(
        <>
            <div style={{paddingTop: '5em', paddingBottom: '4em'}} className="text-center px-3">
                Copyright &copy; 2024 <Link to="/">{stateGlobal.title_web}</Link><br/>
                Oleh <a href="https://www.andsp.id" target="_blank" rel="noreferrer">Andreas Pandu</a>. 
                All Rights Reserved.
            </div>

            {stateGlobal.terakhir_pilih_item !== '' ? (
                <>
                    <div style={{paddingBottom: isMobileDevice() ? '8em' : '4em'}}></div>
                    <ItemTerakhir />
                </>
            ) : ''}
        </>
    )
}

export default Footer