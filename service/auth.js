//const sessionIdToUserMap = new Map();

const jwt = require("jsonwebtoken");
const secret = "amit1234";

function setUser( user) {
  //user is being used as payload
  return jwt.sign({
    _id:user._id,
    email:user.email,
  },
  secret);
 // sessionIdToUserMap.set(id, user);
}

function getUser(token) {
  if(!token)return null;
  return jwt.verify(token , secret);
}

module.exports = {
  setUser,
  getUser,
};