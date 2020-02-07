import cookie from "js-cookie";

//set in cookie

export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 1
    });
  }
};

//remove from cookie
export const removeCookie = key => {
  if (window !== "undefined") {
    cookie.remove(key);
  }
};

//get from cookie such as stored token
//useful when we need to make request to server with token
export const getCookie = key => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

//set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
//remove from localstorage
export const removeLocalStorage = key => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

//authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  //console.log("Authenticate helpers signin response:", response);
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

//access user from localstorage

export const isAuth = () => {
  if (window !== "undefined") {
    const cookieCheck = getCookie("token");
    if (cookieCheck) {
      if (localStorage.getItem("user")) {
        // console.log(
        //   "Authenticate helpers signin response:",
        //   localStorage.getItem("user")
        // );
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

//signout user
//remove info from cookie and localstorage
export const signout = () => {
  removeCookie("token");
  removeLocalStorage("user");
};
//Update user during profile update action
export const updateUser = (response, next) => {
  if (window !== "undefined") {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = response.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};
