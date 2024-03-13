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