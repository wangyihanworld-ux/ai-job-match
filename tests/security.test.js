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

const vm = require('node:vm');
test('skill extraction preserves punctuation and avoids substring false positives', () => {
  const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
  const body=html.slice(html.indexOf('function extractSkills('),html.indexOf('function generateSkillTags('));
  const context=vm.createContext({});
  vm.runInContext(body,context);
  const skills=vm.runInContext("extractSkills('JavaScript Three.js Node.js C++').hard",context);
  for (const name of ['JavaScript','Three.js','Node.js','C++']) assert.ok(skills.includes(name));
  assert.ok(!skills.includes('Java'));
});
test('exported HTML has all runtime dependencies inline', () => {
  const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
  assert.doesNotMatch(html,/<script[^>]+src=/);
  for(const file of ['security.js','scoring.js']) {
    assert.ok(html.includes(fs.readFileSync(path.join(__dirname,'..',file),'utf8').trim()));
  }
});
