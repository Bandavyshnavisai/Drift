const activities = require('./activities');

function getTimeCategory(time) {
  if (time < 15) return 'short';
  if (time < 30) return 'medium';
  return 'long';
}

function getSuggestion(mood, weather, time) {
  const moodData = activities[mood.toLowerCase()];
  if (!moodData) return "We don't have suggestions for that mood yet.";

  const weatherData = moodData[weather] || moodData['default'];
  const timeCategory = getTimeCategory(time);
  const timeData = weatherData[timeCategory];

  if (!timeData || timeData.length === 0) return "Try taking a mindful pause.";

  const randomIndex = Math.floor(Math.random() * timeData.length);
  return timeData[randomIndex];
}

module.exports = getSuggestion;
