class AuthService {

  getCacheMode() {
    let item = undefined;

    try {
      
      item = JSON.parse(localStorage.getItem('mode'))
      return item === 'dark' ? 'dark' : 'light'

    } catch (e) {
      return 'light'
    }
  }

  setCacheMode(mode){
    localStorage.setItem('mode', JSON.stringify(mode))
  }

  getCacheLocale() {    
    let item = undefined;

    try {
      item = JSON.parse(localStorage.getItem('locale'))

      return ['en-gb','fr','ar-ma'].includes(item) ? item : 'en-gb'

    } catch (e) {
      return 'en-gb'
    }
  }

  setCacheLocale(locale){
    localStorage.setItem('locale', JSON.stringify(locale))
  }

  getCacheToken() {    
    let item = undefined;

    try {
      item = JSON.parse(localStorage.getItem('token'))

      return typeof item === "string" && item.length > 32 ? item : undefined

    } catch (e) {
      return undefined
    }
  }

  setCacheToken(token){
    localStorage.setItem('token', JSON.stringify(token))
  }

  getCacheUser() {
    let item = undefined;

    try {
      item = JSON.parse(localStorage.getItem('user'))

      return typeof item === "object" && Object.keys(item).length ? item : undefined

    } catch (e) {
      return undefined
    }
  }

  setCacheUser(user){
    localStorage.setItem('user', JSON.stringify(user))
  }

  removeCacheUser(){
    localStorage.removeItem('user')
    localStorage.removeItem('contractor')
    localStorage.removeItem('staff')
    localStorage.removeItem('contexts')
    localStorage.removeItem('token')
    localStorage.removeItem('menu')
    localStorage.removeItem('contracts')

    window.location.reload(false);
    // window.location.href('/login');
  }
  
  getCacheContractor() {    
    let item = undefined;

    try {
      item = JSON.parse(localStorage.getItem('contractor'))

      return typeof item === "object" && Object.keys(item).length ? item : undefined

    } catch (e) {
      return undefined
    }
  }

  setCacheContractor(contractor){
    localStorage.setItem('contractor', JSON.stringify(contractor))
  }

  
  getCacheStaff() {
    let item = undefined;

    try {
      item = JSON.parse(localStorage.getItem('staff'))

      return typeof item === "object" && Object.keys(item).length ? item : undefined

    } catch (e) {
      return undefined
    }
  }

  setCacheStaff(staff){
    localStorage.setItem('staff', JSON.stringify(staff))
  }

  getCacheContexts() {
    let item = undefined;

    try {
      item = JSON.parse(localStorage.getItem('contexts'))

      return Array.isArray(item) && typeof item[0] === "object" && Object.keys(item[0]).length ? item : []

    } catch (e) {
      return []
    }
  }

  setCacheContexts(contexts){
    localStorage.setItem('contexts', JSON.stringify(contexts))
  }

  getCacheMenu() {
    let item = undefined;

    try {
      item = JSON.parse(localStorage.getItem('menu'))

      return Array.isArray(item) && typeof item[0] === "object" && Object.keys(item[0]).length ? item : []

    } catch (e) {
      return []
    }
  }

  setCacheMenu(contexts){
    localStorage.setItem('menu', JSON.stringify(contexts))
  }

  getCacheContracts() {
    let item = undefined;

    try {
      item = JSON.parse(localStorage.getItem('contracts'))

      return Array.isArray(item) && item.length > 0 && item.every(_item => typeof _item === "string") ? item : []

    } catch (e) {
      return []
    }
  }

  setCacheContracts(contracts){
    localStorage.setItem('contracts', JSON.stringify(contracts))
  }

}

export default new AuthService();
