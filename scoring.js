(function(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.JobScoring = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  const cityNames = { hongkong: '香港', shenzhen: '深圳', shanghai: '上海', beijing: '北京', singapore: '新加坡', guangzhou: '广州' };
  function scoreJobs(jobs, skills, city) {
    const known = new Set([...(skills.hard || []), ...(skills.soft || [])].map(s => s.trim().toLowerCase()));
    const location = cityNames[city];
    return jobs.filter(job => !location || job.location.includes(location)).map(job => {
      const requirements = job.requirements.split(/[、,，]/).map(s => s.trim()).filter(Boolean);
      const matched = requirements.filter(req => req.split('/').some(part => known.has(part.trim().toLowerCase())));
      const score = requirements.length ? Math.round(100 * matched.length / requirements.length) : 0;
      return { ...job, score, matchReasons: matched.length ? matched.map(req => '已识别关键词：' + req) : ['尚未识别到要求中的关键词，请人工核对'] };
    }).sort((a, b) => b.score - a.score || a.id - b.id);
  }
  return { scoreJobs };
});
