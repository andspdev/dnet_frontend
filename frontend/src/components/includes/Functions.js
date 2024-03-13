export const setCookie = (name, value, daysToExpire, path, domain, secure) => {
	let cookieString = name + "=" + encodeURIComponent(value);

	if (daysToExpire) {
		const expirationDate = new Date();
		expirationDate.setTime(
			expirationDate.getTime() + daysToExpire * 24 * 60 * 60 * 1000
		);
		cookieString += "; expires=" + expirationDate.toUTCString();
	}

	if (path) cookieString += "; path=" + path;

	if (domain) cookieString += "; domain=" + domain;

	if (secure) cookieString += "; secure";

	document.cookie = cookieString;
}

export const getCookie = (cookieName) => {
	const name = cookieName + "=";
	const decodedCookie = decodeURIComponent(document.cookie);
	const cookieArray = decodedCookie.split(";");

	for (let i = 0; i < cookieArray.length; i++) {
		let cookie = cookieArray[i];
		while (cookie.charAt(0) == " ") {
			cookie = cookie.substring(1);
		}
		if (cookie.indexOf(name) == 0) {
			return cookie.substring(name.length, cookie.length);
		}
	}
	return "";
}

export const fetchUser = (response, id) =>
{
    return response.find(function(value)
    {
        return (value.id === id)
    });
}

export const nomorHPOperator = (nomor_hp) =>
{
	const potong_depan = nomor_hp.substring(0, 4)

	const arr_telkomsmel = [
		"0852", "0853", "0811", "0812", "0813", "0821", "0822", "0851"
	]

	const arr_axis = [
		"0832", "0833", "0838"
	]

	const arr_smartfren = [
		"0881", "0882", "0883", "0884", "0885",
		"0886", "0887", "0888", "0889"
	]

	if (arr_telkomsmel.includes(potong_depan))
		return "telkomsel"

	if (arr_axis.includes(potong_depan))
		return "axis"

	if (arr_smartfren.includes(potong_depan))
		return "smartfren"

	return "none"
}

export const formatUang = (angka) => 
{
    var parts = angka.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    if (parts.length === 2) {
        parts[1] = parts[1].substring(0, 2);

        return "Rp" + parts.join(",");
    }
	
	return "Rp" + parts[0];
}