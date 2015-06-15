export default function getPrefix() {
  if (typeof window === 'undefined') return '';
  let styles = window.getComputedStyle(document.documentElement, ''),
    pre = (
      Array.prototype.slice
        .call(styles)
        .join('')
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1];
  if ( pre === 'ms' ) return pre;
  return pre.slice(0, 1).toUpperCase() + pre.slice(1);
};