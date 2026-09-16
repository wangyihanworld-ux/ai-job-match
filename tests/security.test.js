const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { escapeHTML } = require('../security.js');

test('escapeHTML neutralizes executable markup', () => {
  assert.equal(escapeHTML('<img src=x onerror="alert(1)">'), '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
  assert.equal(escapeHTML("A&B's"), 'A&amp;B&#39;s');
});

test('profile rendering escapes every user-derived display field', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /escapeHTML\(t\.name\)/);
  assert.match(html, /escapeHTML\(s\)/);
  assert.match(html, /escapeHTML\(e\)/);
});
