export class LocalStorageAPI {
  static getLocalStorageTokens() {
    return JSON.parse(localStorage.getItem("authTokens"));
  }

  static setLocalStorageTokens(tokens) {
    localStorage.setItem("authTokens", JSON.stringify(tokens));
  }

  static delLocalStorageTokens() {
    localStorage.removeItem("authTokens");
  }

  static getLocalStorageUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  static setLocalStorageUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  static delLocalStorageUser() {
    localStorage.removeItem("user");
  }

  static getLocalStorageWatchlist() {
    return JSON.parse(localStorage.getItem("watchlist"));
  }

  static setLocalStorageWatchlist(watchlist) {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }

  static addToLocalStorageWatchlist(currencyId) {
    const watchlist = this.getLocalStorageWatchlist();
    watchlist.push(currencyId);
    this.setLocalStorageWatchlist(watchlist);
    window.dispatchEvent(new Event("watchlistUpdate"));
  }

  static removeFromLocalStorageWatchlist(currencyId) {
    let watchlist = this.getLocalStorageWatchlist();
    watchlist = watchlist.filter((currency) => currency !== currencyId);
    this.setLocalStorageWatchlist(watchlist);
    window.dispatchEvent(new Event("watchlistUpdate"));
  }

  static delLocalStorageWatchlist() {
    localStorage.removeItem("watchlist");
  }

  static getLocalStorageTheme() {
    return JSON.parse(localStorage.getItem("theme"));
  }

  static setLocalStorageTheme(mode) {
    localStorage.setItem("theme", JSON.stringify(mode));
  }
}
