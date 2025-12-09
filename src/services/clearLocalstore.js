const clearLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    localStorage.removeItem("communityStore");
}

export default clearLocalStorage;
