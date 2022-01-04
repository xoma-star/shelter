const getUrlParam = (key) => {
    let url = new URL(window.location.href);
    return url.searchParams.get(key)
}

export default getUrlParam