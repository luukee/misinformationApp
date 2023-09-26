export default class CommonDataManager {
  static myInstance = null;
  user = null;

  static getInstance() {
    if (CommonDataManager.myInstance == null) {
      CommonDataManager.myInstance = new CommonDataManager();
    }
    return this.myInstance;
  }
  getUser() {
    return this.user;
  }
  setUser(res) {
    this.user = res;
  }
}
