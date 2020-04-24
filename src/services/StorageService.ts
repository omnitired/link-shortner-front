class StorageService {

  private storage : any;

  constructor () {
    this.storage = window.localStorage;
  }

  getToken () {
    return this.storage.getItem("token") || false;
  }

  setToken (token: string) {
    if (token) {
      this.storage.setItem("token", token);
    }
  }

  setUser (user: any) {
    this.storage.setItem("user", JSON.stringify(user));
  }

  removeToken () {
      this.storage.removeItem("token");
  }

  getUser () {
    return JSON.parse(this.storage.getItem("user"));
  }

}

export default new StorageService()