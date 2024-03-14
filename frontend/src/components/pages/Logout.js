import ImageLoader from '../../assets/images/loader.svg'
import { deleteCookie } from "../includes/Functions"

const Logout = () =>
{
    setTimeout(() =>
    {
        deleteCookie('user_login')
        window.location.href='/'
    }, 1000);

    return (
        <>
            <div className="loader-full">
                <img src={ImageLoader} alt="Loader"/>
            </div>
        </>
    )
}

export default Logout