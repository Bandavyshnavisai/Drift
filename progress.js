document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const user = localStorage.getItem('driftUser');
    if (!user || !JSON.parse(user).authenticated) {
      window.location.href = 'login.html';
    }
  
    // Load and display progress data
    loadProgressData();
  });
  
  function loadProgressData() {
    const progress = JSON.parse(localStorage.getItem('driftProgress')) || {
      totalActivities: 0,
      lastActivityDate: null,
      currentStreak: 0,
      longestStreak: 0,
      badgeEarned: false,
      activityHistory: []
    };
  
    // Update stats
    document.getElementById('total-activities').textContent = progress.totalActivities;
    document.getElementById('current-streak').textContent = `${progress.currentStreak} days`;
    document.getElementById('longest-streak').textContent = `${progress.longestStreak} days`;
  
    // Update badges
    const badgesContainer = document.getElementById('badges-container');
    badgesContainer.innerHTML = '';
    
    if (progress.badgeEarned) {
      badgesContainer.innerHTML += `
        <div class="badge">
          <span class="badge-icon">🏆</span>
          <span class="badge-name">Explorer</span>
          <span class="badge-desc">Completed 3 activities</span>
        </div>
      `;
    }
  
    // Add more badge conditions as needed
    if (progress.totalActivities >= 10) {
      badgesContainer.innerHTML += `
        <div class="badge">
          <span class="badge-icon">🌟</span>
          <span class="badge-name">Adventurer</span>
          <span class="badge-desc">Completed 10 activities</span>
        </div>
      `;
    }
  
    // Update activity log
    const activityLog = document.getElementById('activity-log');
    activityLog.innerHTML = '';
    
    if (progress.activityHistory && progress.activityHistory.length > 0) {
      progress.activityHistory.slice().reverse().forEach(activity => {
        activityLog.innerHTML += `
          <div class="log-entry">
            <span class="log-date">${activity.date}</span>
            <span class="log-activity">${activity.mood} - ${activity.suggestion}</span>
          </div>
        `;
      });
    } else {
      activityLog.innerHTML = '<p>No activities recorded yet.</p>';
    }
  }
  
  function goBack() {
    window.location.href = 'main.html';
  }
  
  function logout() {
    localStorage.removeItem('driftUser');
    window.location.href = 'login.html';
  }