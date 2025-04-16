export default function authHeader() { 
  
    const token = JSON.parse(localStorage.getItem('token'));
  
    if (token) {
      return  {
        // //method: Method, // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        // headers: {
          "Content-Type": "application/json", // 'application/x-www-form-urlencoded',
          'x-access-token': token
        // },
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      };
    } else {
      return {};
    }
  }


  