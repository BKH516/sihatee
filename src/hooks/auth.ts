export const getToken = () => {
    const userDataString = localStorage.getItem("loggedInUser");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    return userData?.jwt;
  };
  