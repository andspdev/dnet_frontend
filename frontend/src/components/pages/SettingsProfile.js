import { useContext, useEffect, useState } from 'react'
import { Context } from "../includes/GlobalState";
import { Header } from '../includes/Header'
import { Link, useNavigate } from 'react-router-dom';
import ImageUserIcon from '../../assets/images/user-icon.svg'
import ImageLoader from '../../assets/images/loader.svg'
import axios from 'axios'
import { getCookie, getCurrentDateTime } from '../includes/Functions';

const SettingsProfile = () =>
{
    const navigate = useNavigate()
    const [ stateLocal, setStateLocal ] = useState({
        is_load_profil: true,
        fetch_profil: ''
    })

    const [ stateGlobal ] = useContext(Context)
    
    useEffect(() =>
    {
        document.title = 'Profil Saya | ' + stateGlobal.title_web
        const get_user = getCookie('user_login')

        if (get_user === '')
        {
            navigate('/login')
        }
        else
        {
            axios({
                url: `${stateGlobal.url_api}/pengguna/${get_user}`,
                method: 'GET'
            })
            .then(data => {
                const response = data.data

                setStateLocal(prevState => ({
                    ...prevState,
                    is_load_profil: false,
                    fetch_profil: response
                }))
            })
            .catch(error => {
                alert(`Terjadi kesalahan saat mengambil data pengguna. (Error: ${error.message})`)
                console.log('Error Fetch Pengguna: ', error)
            })
        }
    }, [navigate, stateGlobal.url_api, stateGlobal.title_web]);

    return (
        <>
            <Header/>
        </>
    )
}

export default SettingsProfile