import GetPrefix from './get-prefix.jsx';

let userSelectStyle = ';user-select: none;',
  browserPrefix = GetPrefix();

if (browserPrefix) {
  userSelectStyle += '-' + browserPrefix.toLowerCase() + '-user-select: none;';
}

export default function uxHacks() {
  return {

    addUserSelectStyles : function() {
      let styl = document.body.getAttribute('style') || '';
      document.body.setAttribute('style', styl + userSelectStyle);
    },

    removeUserSelectStyles : function() {
      let styl = document.body.getAttribute('style') || '';
      document.body.setAttribute('style', styl.replace(userSelectStyle, ''));
    }

  }
};