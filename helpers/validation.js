exports.validateMail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};
exports.validatelength = (number, m) => {
//   console.log(String(number).length);
//   console.log(number)
  return String(number).length === m ? true : false;
};
