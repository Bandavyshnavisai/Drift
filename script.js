// script.js
/*function generateActivity() {
    // 1. Get all DOM elements
    const generateBtn = document.getElementById('generateBtn');
    const outputDiv = document.getElementById('activity-output');
    const activityOutput = document.getElementById('activityOutput');
    
    // 2. Clear previous output
    outputDiv.innerHTML = '';
    outputDiv.className = '';
    outputDiv.style.display = 'none';
    activityOutput.textContent = '';
    
    // 3. Get selected mood (from buttons)
    const selectedMoodBtn = document.querySelector('.mood-buttons button.active');
    if (!selectedMoodBtn) {
        showOutput('Please select how you are feeling!', 'error', outputDiv);
        return;
    }
    const mood = selectedMoodBtn.dataset.mood;
    
    // 4. Get selected time (from slider)
    const time = document.getElementById('timeSlider').value;
    
    // 5. Show loading state
    generateBtn.disabled = true;
    showOutput('Generating your perfect activity...', 'loading', outputDiv);
    
    // 6. Make API Request
    fetch('http://localhost:3000/api/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            mood: mood, 
            time: parseInt(time) 
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('API request failed');
        return response.json();
    })
    .then(data => {
        if (!data.suggestion) throw new Error('No suggestion received');
        showOutput(data.suggestion, 'success', outputDiv);
        activityOutput.textContent = data.suggestion;
    })
    .catch(error => {
        console.error('Error:', error);
        showOutput('Failed to get suggestion. Please try again.', 'error', outputDiv);
    })
    .finally(() => {
        generateBtn.disabled = false;
    });
}

// Helper function to show output
function showOutput(message, type, outputDiv) {
    outputDiv.innerHTML = message;
    outputDiv.style.display = 'block';
    outputDiv.className = type;
    
    if (type === 'success') {
        outputDiv.innerHTML = `
            <h3>✨ Suggested Activity ✨</h3>
            <p>${message}</p>
        `;
    }
}

// Add click handlers to mood buttons
document.querySelectorAll('.mood-buttons button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.mood-buttons button').forEach(btn => {
            btn.classList.remove('active');
        });
        // Add active class to clicked button
        this.classList.add('active');
    });
});

// Initialize slider labels
document.getElementById('timeSlider').addEventListener('input', function() {
    document.querySelector('.slider-labels span:nth-child(2)').textContent = `${this.value} min`;
});
*/
// Main Functions
document.addEventListener('DOMContentLoaded', function() {
    initializeMoodButtons();
    initializeTimeSlider();
  });
  
  async function generateActivity() {
    // Get DOM elements
    const generateBtn = document.getElementById('generateBtn');
    const outputDiv = document.getElementById('activity-output');
    const activityOutput = document.getElementById('activityOutput');
    
    // Clear previous output
    outputDiv.innerHTML = '';
    outputDiv.className = '';
    outputDiv.style.display = 'none';
    activityOutput.textContent = '';
    
    // Get user inputs
    const selectedMoodBtn = document.querySelector('.mood-buttons button.active');
    if (!selectedMoodBtn) {
      showOutput('Please select how you are feeling!', 'error', outputDiv);
      return;
    }
    
    const mood = selectedMoodBtn.dataset.mood;
    const time = parseInt(document.getElementById('timeSlider').value);
  
    // Show loading state
    generateBtn.disabled = true;
    showOutput('Generating your perfect activity...', 'loading', outputDiv);
  
    try {
      // 1. Make API call to backend
      const response = await fetch('http://localhost:3000/api/activity', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          mood: mood.toLowerCase(), // Standardize case
          time: time               // Ensure number
        })
      });
  
      // 2. Check for HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // 3. Parse JSON response
      const data = await response.json();
      console.log("Backend response:", data); // Debug log
  
      // 4. Verify response format
      if (!data.suggestion) {
        throw new Error("Backend didn't return a suggestion");
      }
  
      // 5. Display the suggestion
      showOutput(data.suggestion, 'success', outputDiv);
      activityOutput.textContent = data.suggestion;
  
      // 6. Update progress tracking
      updateProgress(mood, data.suggestion);
  
    } catch (error) {
      console.error('Error:', error);
      showOutput('Failed to get suggestion. Please try again.', 'error', outputDiv);
    } finally {
      generateBtn.disabled = false;
    }
  }
  
  // Helper function to display output
  function showOutput(message, type, outputDiv) {
    outputDiv.innerHTML = type === 'success' 
      ? `<h3>✨ Suggested Activity ✨</h3><p>${message}</p>`
      : `<p>${message}</p>`;
    outputDiv.style.display = 'block';
    outputDiv.className = type;
  }
  
  // Progress Tracking System
  function updateProgress(mood, activity) {
    // 1. Get existing progress or initialize
    let progress = JSON.parse(localStorage.getItem('driftProgress')) || {
      totalActivities: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
      badgesEarned: [],
      activityHistory: []
    };
  
    // 2. Update counts
    progress.totalActivities += 1;
  
    // 3. Update streak
    const today = new Date().toDateString();
    if (progress.lastActivityDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      progress.currentStreak = (progress.lastActivityDate === yesterday.toDateString()) 
        ? progress.currentStreak + 1 
        : 1;
      progress.lastActivityDate = today;
    }
  
    // 4. Update longest streak
    progress.longestStreak = Math.max(progress.longestStreak, progress.currentStreak);
  
    // 5. Check for badges
    checkBadges(progress);
  
    // 6. Log activity (keep only last 50 entries)
    progress.activityHistory.push({
      date: new Date().toLocaleString(),
      mood: mood,
      activity: activity
    });
    if (progress.activityHistory.length > 50) {
      progress.activityHistory.shift();
    }
  
    // 7. Save to localStorage
    localStorage.setItem('driftProgress', JSON.stringify(progress));
  }
  
  function checkBadges(progress) {
    const badges = progress.badgesEarned;
    
    // Explorer Badge (3 activities)
    if (progress.totalActivities >= 3 && !badges.includes('explorer')) {
      badges.push('explorer');
    }
    
    // Adventurer Badge (10 activities)
    if (progress.totalActivities >= 10 && !badges.includes('adventurer')) {
      badges.push('adventurer');
    }
    
    // Streak Master (7-day streak)
    if (progress.currentStreak >= 7 && !badges.includes('streak-master')) {
      badges.push('streak-master');
    }
  }
  
  // Helper Functions
  function showOutput(message, type, outputDiv) {
    outputDiv.innerHTML = message;
    outputDiv.style.display = 'block';
    outputDiv.className = type;
    
    if (type === 'success') {
      outputDiv.innerHTML = `
        <h3>✨ Suggested Activity ✨</h3>
        <p>${message}</p>
      `;
    }
  }
  
  function initializeMoodButtons() {
    document.querySelectorAll('.mood-buttons button').forEach(button => {
      button.addEventListener('click', function() {
        document.querySelectorAll('.mood-buttons button').forEach(btn => {
          btn.classList.remove('active');
        });
        this.classList.add('active');
      });
    });
  }
  
  // Replace your existing time slider initialization with this:
function initializeTimeSlider() {
    const timeSlider = document.getElementById('timeSlider');
    const labels = document.querySelectorAll('.slider-labels span');
    
    // Update all labels initially
    updateSliderLabels(timeSlider.value);
    
    timeSlider.addEventListener('input', function() {
      updateSliderLabels(this.value);
    });
    
    function updateSliderLabels(value) {
      // Highlight the current selected value
      labels.forEach((label, index) => {
        const labelValue = 10 + (index * 10);
        if (labelValue <= value) {
          label.style.fontWeight = 'bold';
          label.style.color = '#5a4bfc'; // Your theme color
        } else {
          label.style.fontWeight = 'normal';
          label.style.color = '#666';
        }
      });
    }
  }
  
  // Simulated API Call (replace with your actual API call)
  function simulateApiCall(mood, time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const activities = {
          energetic: [`Go for a ${time} minute run`, `Do ${time/10} sets of burpees`],
          tired: [`Take a ${time} minute power nap`, `Do gentle stretching for ${time} minutes`],
          creative: [`Write a ${time/10} paragraph short story`, `Sketch for ${time} minutes`]
        };
        
        const defaultActivities = [
          `Read for ${time} minutes`,
          `Listen to music for ${time} minutes`,
          `Call a friend for ${time} minutes`
        ];
        
        const suggestions = activities[mood.toLowerCase()] || defaultActivities;
        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        
        resolve({ suggestion: randomSuggestion });
      }, 800); // Simulate network delay
    });
  }