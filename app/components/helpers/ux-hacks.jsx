const userSelectStyle = ';user-select: none;-webkit-user-select:none;-moz-user-select:none;' +
  '-o-user-select:none;-ms-user-select:none;';

let ux = {

  addUserSelectStyles : function() {
    let styl = document.body.getAttribute('style') || '';
    document.body.setAttribute('style', styl + userSelectStyle);
  },

  removeUserSelectStyles : function() {
    let styl = document.body.getAttribute('style') || '';
    document.body.setAttribute('style', styl.replace(userSelectStyle));
  }

};

module.exports = ux;