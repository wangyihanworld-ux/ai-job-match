(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.AppSecurity = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function escapeHTML(value) {
    const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(value).replace(/[&<>"']/g, character => entities[character]);
  }
  return { escapeHTML };
});
