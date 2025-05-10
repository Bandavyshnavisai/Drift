const suggestions = {
    tired: {
      clear: ["Take a light walk outside", "Do a short meditation", "Listen to calming music"],
      rain: ["Drink warm tea", "Watch a cozy movie", "Stretch indoors"],
      default: ["Read a short story", "Close your eyes and breathe", "Light yoga"]
    },
    bored: {
      clear: ["Try cloud watching", "Sketch something outdoors", "Join a local event"],
      rain: ["Write in a journal", "Explore a new podcast", "Do a DIY project"],
      default: ["Read a fun article", "Organize your photos", "Call a friend"]
    },
    // Add more moods...
  };
  
  function getSuggestions(mood, weather) {
    const moodLower = mood.toLowerCase();
    const moodSuggestions = suggestions[moodLower];
  
    if (!moodSuggestions) return "No suggestions available for this mood.";
  
    const activities = moodSuggestions[weather] || moodSuggestions["default"];
    const randomIndex = Math.floor(Math.random() * activities.length);
  
    return activities[randomIndex];
  }
  
  module.exports = getSuggestions;
  