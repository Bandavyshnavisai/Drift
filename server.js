const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const ACTIVITIES = {
  Energetic: {
    10: "Do a quick HIIT workout ",
    20: "Go for a brisk walk or jog ",
    30: "Dance to your favorite playlist",
    40: " Tidy up a space with music on",
    50: "Try a new sport or fitness routine",
    60: "Attend a local fitness or yoga class"
  },
  Tired: {
    10: "Do a breathing or mindfulness exercise",
    20: "Take a power nap",
    30: "Listen to calming music or a guided meditation",
    40: "Stretch your body slowly ",
    50: "Watch a peaceful nature video or slow TV",
    60: " Do a gentle yoga session"
  },
  Bored: {
    10: "Try a random Did you know? fact generator",
    20: " Solve a few puzzles (Sudoku, crossword)",
    30: "Explore a virtual museum or map ",
    40: "Start a short YouTube learning series",
    50: "Read interesting Wikipedia articles at random",
    60: "Start a DIY or craft project from scratch"
  },
  Creative: {
    10: "Sketch something you see",
    20: "Write a short poem or story intro",
    30: "Doodle with a creativity prompt",
    40: "Try a photo challenge with your phone ",
    50: "Work on a digital art or design project",
    60: "Build something with craft/recycled items"
  },
  Happy: {
    10: "Send a kind message to a friend",
    20: "Make a gratitude list",
    30: "Bake or cook something fun",
    40: "Create a playlist of your favorite songs",
    50: "Capture happy moments with journaling or photos",
    60: "Plan something nice for someone else"
  },
  Neutral: {
    10: "Do a 3-min journal, then stretch",
    20: "Watch a TED-Ed video",
    30: "Try a hobby you haven’t done in a while",
    40: "Clean a small part of your space",
    50: "Read a short story or article",
    60: "Try a simple online course module"
  },
  Stressed: {
    10: "Deep breathing with relaxing music",
    20: "Go for a solo walk",
    30: "Use a stress-relief coloring app or notebook",
    40: "Journal your thoughts freely",
    50: "Listen to a calming podcast or nature sounds",
    60: "Do a full-body progressive muscle relaxation session"
  },

  Lonely: {
    10: "Call or message a friend or relative",
    20: "Watch a comforting video or memory slideshow",
    30: "Join an online chat or community space",
    40: "Write a letter to someone you care about",
    50: "Visit a nearby community center or garden",
    60: "Join a hobby group or start a virtual meetup"
  },

  // ... other activities ...
  default: {
    5: "Take a short break",
    15: "Go for a walk",
    45: "Explore a new hobby"
  }
};

app.post('/api/activity', (req, res) => {
  console.log("Received body:", req.body); // Debug log
  
  // Proper destructuring with defaults
  const { mood = '', time = 0 } = req.body || {};
  
  // Convert time to number and capitalize first letter of mood
  const processedTime = Number(time);
  const processedMood = mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();
  
  console.log(`Processed: ${processedMood}, ${processedTime}`); // Debug log

  // Find suggestion
  const suggestion = ACTIVITIES[processedMood]?.[processedTime] 
                   || ACTIVITIES.default[processedTime]
                   || "Take a short break";

  console.log("Sending:", suggestion); // Debug log
  res.json({ suggestion });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


