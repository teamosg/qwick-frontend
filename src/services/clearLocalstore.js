const clearLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    localStorage.removeItem("communityStore");
    localStorage.removeItem("signup_email");
    localStorage.removeItem("otp");
}

export default clearLocalStorage;
