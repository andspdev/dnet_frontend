import { deleteCookie } from "../includes/Functions"

const Logout = () =>
{
    deleteCookie('user_login')
    window.location.href='/'
}

export default Logout