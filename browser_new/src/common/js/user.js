export default class User {
  constructor ({_id, username}) {
    this._id = _id
    this.username = username
    this.userToken = username + _id
  }
}
