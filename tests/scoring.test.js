const test = require('node:test');
const assert = require('node:assert/strict');
const { scoreJobs } = require('../scoring.js');
const jobs = [
 {id: 2, location: '中国香港', requirements: 'Python、SQL'},
 {id: 1, location: '中国香港/深圳', requirements: 'React/Vue、SQL'},
 {id: 3, location: '上海', requirements: 'Python'}
];
test('no recognized skill produces zero, not an inflated baseline', () => {
  assert.ok(scoreJobs(jobs, {hard:[],soft:[]}, 'hongkong').every(j => j.score === 0));
});
test('same inputs yield the same ranking and scores', () => {
  const skills = {hard:['SQL','Python'],soft:[]};
  assert.deepEqual(scoreJobs(jobs,skills,'hongkong'),scoreJobs(jobs,skills,'hongkong'));
  assert.deepEqual(scoreJobs(jobs,skills,'hongkong').map(j => [j.id,j.score]),[[2,100],[1,50]]);
});
test('city filtering and exact alternatives avoid fuzzy double counting', () => {
  assert.deepEqual(scoreJobs(jobs,{hard:['Vue','Vue'],soft:[]},'shenzhen').map(j => [j.id,j.score]),[[1,50]]);
  assert.deepEqual(scoreJobs(jobs,{hard:['Python'],soft:[]},'beijing'),[]);
});
test('ties are stable and matching does not mutate source records', () => {
  const before=JSON.stringify(jobs);
  assert.deepEqual(scoreJobs(jobs,{hard:[],soft:[]},'hongkong').map(j=>j.id),[1,2]);
  assert.equal(JSON.stringify(jobs),before);
});
