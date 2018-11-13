/**
 * @const {Array} URLS - Generated endpoints address.
 */
const URLS = (() => {
  const indexes = Array.from(Array(100).keys());
  const template = 'http://jsonplaceholder.typicode.com/posts';

  return indexes.map(val => `${template}/${val + 1}`);
})();

/**
 * @function load data from endpoints by chain.
 * @param {Array} urls - Endpoints list.
 * @return {Promise}
 */
function chain (urls) {
  const copy = urls.slice();
  const url = copy.shift();

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      render(data.id);

      if (copy.length > 0) {
        chain(copy);
      }
    })
    .catch(() => console.error('Error'));
}

/**
 * @function render ID list.
 * @param {int} id - ID value.
 */
function render (id) {
  const $app = document.getElementById('app');
  const $li = document.createElement('li');

  $li.innerHTML = `<b>ID:</b> ${id}`;
  $app.appendChild($li);
}

chain(URLS);
