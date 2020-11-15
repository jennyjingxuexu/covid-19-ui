const urlBase = "http://3.130.191.129:8000/"

// TODO: instead of serving statically, should also serve it in a swerver
// that will allow us to read env var and hence get api key and isProd from server
// and not expose them in the code. Also, right now just gonna assume isProd = false
async function postData(url = '', data = {}, isProd = false) {
    url = urlBase + url
    console.log(url)
    if (!isProd) {
        url += "?" + new URLSearchParams({
            user_session_id: getCookie("user_session_id"),
        })
    }
    const response = await fetch(url, {
        method: 'POST',
        credentials: "include",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    return response; // parses JSON response into native JavaScript objects
}

// TODO: instead of serving statically, should also serve it in a swerver
// that will allow us to read env var and hence get api key and isProd from server
// and not expose them in the code. Also, right now just gonna assume isProd = false
async function getData(url = '', isProd = false) {
    url = urlBase + url
    if (!isProd) {
        url += "?" + new URLSearchParams({
            user_session_id: getCookie("user_session_id"),
        })
    }
    const response = await fetch(url, {
        method: 'GET',
        credentials: "include",
        headers: {
            'content-type': 'application/json'
        }
    })
    return response; // parses JSON response into native JavaScript objects
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
