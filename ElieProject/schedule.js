/**
 * Schedule JavaScript file for portfolio website
 * Handles the functionality of the weekly schedule page
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  setupSemesterSelector();
  setupEventInteractions();
  
  // Check if we need to update the schedule based on current user
  updateScheduleForCurrentUser();
});

/**
 * Setup semester selector functionality
 * Allows switching between different semester schedules
 */
function setupSemesterSelector() {
  const semesterSelect = document.getElementById('semesterSelect');
  
  if (!semesterSelect) return;
  
  // Handle semester change
  semesterSelect.addEventListener('change', (e) => {
    const selectedSemester = e.target.value;
    loadSchedule(selectedSemester);
  });
}

/**
 * Load schedule data for the selected semester
 * @param {string} semester - The selected semester value
 */
function loadSchedule(semester) {
  // In a real application, this would fetch data from a server
  // For this demo, we'll just show a notification that this would change the schedule
  
  // Get all events
  const events = document.querySelectorAll('.event');
  
  // First, fade out all events
  events.forEach(event => {
    event.style.opacity = '0.3';
    event.style.transform = 'scale(0.95)';
    event.style.transition = 'all 0.3s ease';
  });
  
  // After a short delay, fade them back in to simulate loading new data
  setTimeout(() => {
    events.forEach(event => {
      event.style.opacity = '1';
      event.style.transform = 'scale(1)';
    });
    
    // Show notification
    showNotification(`Schedule updated to ${getSemesterName(semester)}`);
  }, 500);
}

/**
 * Get formatted semester name from the value
 * @param {string} semester - The semester value
 * @returns {string} The formatted semester name
 */
function getSemesterName(semester) {
  switch (semester) {
    case 'spring2025':
      return 'Spring 2025';
    case 'fall2024':
      return 'Fall 2024';
    case 'summer2024':
      return 'Summer 2024';
    default:
      return 'Current Semester';
  }
}

/**
 * Setup event interactions
 * Adds click functionality to schedule events
 */
function setupEventInteractions() {
  // Get all events
  const events = document.querySelectorAll('.event');
  
  events.forEach(event => {
    // Add click event to show details
    event.addEventListener('click', () => {
      const title = event.querySelector('h3').textContent;
      const time = event.querySelector('.event-time').textContent;
      const location = event.querySelector('.event-location').textContent;
      
      // Determine event type based on class
      let eventType = '';
      if (event.classList.contains('work')) {
        eventType = 'Work';
      } else if (event.classList.contains('class')) {
        eventType = 'Class';
      } else if (event.classList.contains('research')) {
        eventType = 'Research';
      } else if (event.classList.contains('personal')) {
        eventType = 'Personal';
      }
      
      // Show event details in a popup
      showEventDetails(title, time, location, eventType);
    });
  });
}

/**
 * Update schedule for current user
 * Checks localStorage for current user and updates schedule accordingly
 */
function updateScheduleForCurrentUser() {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) return;
  
  // Define schedule data for each user
  const userSchedules = {
    'User 1': {
      workLabel: 'Frontend Development',
      classLabel: 'Advanced Algorithms',
      researchLabel: 'Research Meeting',
      personalLabel: 'Gym',
      workLocation: 'TechInnovate Inc.',
      classLocation: 'Anderson Hall 223',
      researchLocation: 'Davis Lab',
      personalLocation: 'Campus Recreation Center',
      scheduleNotes: [
        {
          title: 'Finals Week Adjustments',
          description: 'During the final two weeks of the semester (May 25 - June 7), this schedule will be adjusted to accommodate final exams and project presentations.'
        },
        {
          title: 'Office Hours',
          description: 'Research advisor office hours are available by appointment on Mondays and Wednesdays from 1:00 PM to 3:00 PM.'
        },
        {
          title: 'Work Schedule',
          description: 'Work hours at TechInnovate Inc. are flexible within the scheduled timeframes and occasionally include remote work opportunities.'
        }
      ]
    },
    'Elie Matta': {
      workLabel: 'UX Design Workshop',
      classLabel: 'Web Architecture',
      researchLabel: 'Client Projects',
      personalLabel: 'Photography',
      workLocation: 'DesignHub Co.',
      classLocation: 'Beirut Digital District',
      researchLocation: 'Home Office',
      personalLocation: 'Beirut Arts Center',
      scheduleNotes: [
        {
          title: 'Client Meetings',
          description: 'Client meetings are scheduled on Tuesdays and Thursdays. These times are reserved and may require adjustments to other activities.'
        },
        {
          title: 'UX Workshops',
          description: 'UX design workshops are conducted every Monday with the product team at DesignHub Co.'
        },
        {
          title: 'Teaching Schedule',
          description: 'Guest lecturer for Web Architecture course at the Beirut Digital District, focusing on modern frontend frameworks.'
        }
      ]
    },
    'Jhon aun ': {
      workLabel: 'Data Analytics',
      classLabel: 'Machine Learning',
      researchLabel: 'Data Science Project',
      personalLabel: 'Yoga Class',
      workLocation: 'DataViz Solutions',
      classLocation: 'Smith Hall 302',
      researchLocation: 'Analytics Lab',
      personalLocation: 'Mind & Body Studio',
      scheduleNotes: [
        {
          title: 'Dataset Deadlines',
          description: 'Dataset processing and analysis reports are due every Friday. Schedule is adjusted to prioritize data work toward the end of the week.'
        },
        {
          title: 'Team Meetings',
          description: 'Weekly team meetings with the data science group are held every Monday morning.'
        },
        {
          title: 'Mentorship Sessions',
          description: 'Mentorship sessions for junior developers are scheduled on Wednesday afternoons as part of the company\'s professional development program.'
        }
      ]
    }
  };
  
  // Get the user's schedule data
  const scheduleData = userSchedules[currentUser];
  if (!scheduleData) return;
  
  // Update all work events
  document.querySelectorAll('.event.work').forEach(event => {
    const titleElement = event.querySelector('h3');
    const locationElement = event.querySelector('.event-location');
    
    if (titleElement && !titleElement.textContent.includes('Team Meeting')) {
      titleElement.textContent = scheduleData.workLabel;
    }
    
    if (locationElement) {
      locationElement.textContent = scheduleData.workLocation;
    }
  });
  
  // Update all class events
  document.querySelectorAll('.event.class').forEach(event => {
    const titleElement = event.querySelector('h3');
    const locationElement = event.querySelector('.event-location');
    
    if (titleElement && !titleElement.textContent.includes('Machine Learning')) {
      titleElement.textContent = scheduleData.classLabel;
    }
    
    if (locationElement) {
      locationElement.textContent = scheduleData.classLocation;
    }
  });
  
  // Update all research events
  document.querySelectorAll('.event.research').forEach(event => {
    const titleElement = event.querySelector('h3');
    const locationElement = event.querySelector('.event-location');
    
    if (titleElement && !titleElement.textContent.includes('Personal Project')) {
      titleElement.textContent = scheduleData.researchLabel;
    }
    
    if (locationElement) {
      locationElement.textContent = scheduleData.researchLocation;
    }
  });
  
  // Update all personal events
  document.querySelectorAll('.event.personal').forEach(event => {
    const titleElement = event.querySelector('h3');
    const locationElement = event.querySelector('.event-location');
    
    if (titleElement && titleElement.textContent.includes('Gym')) {
      titleElement.textContent = scheduleData.personalLabel;
    }
    
    if (locationElement && locationElement.textContent.includes('Campus Recreation Center')) {
      locationElement.textContent = scheduleData.personalLocation;
    }
  });
  
  // Update schedule notes
  const notesContent = document.querySelector('.notes-content');
  if (notesContent && scheduleData.scheduleNotes) {
    // Clear existing notes
    notesContent.innerHTML = '';
    
    // Add new notes
    scheduleData.scheduleNotes.forEach(note => {
      const noteItem = document.createElement('div');
      noteItem.className = 'note-item';
      noteItem.innerHTML = `
        <div class="note-icon"><i class="fas fa-info-circle"></i></div>
        <div class="note-text">
          <h3>${note.title}</h3>
          <p>${note.description}</p>
        </div>
      `;
      notesContent.appendChild(noteItem);
    });
  }
  
  console.log(`Schedule updated for user: ${currentUser}`);
}

/**
 * Show event details in a popup
 * @param {string} title - The event title
 * @param {string} time - The event time
 * @param {string} location - The event location
 * @param {string} eventType - The event type
 */
function showEventDetails(title, time, location, eventType) {
  // Create modal if it doesn't already exist
  let modal = document.getElementById('eventModal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'eventModal';
    modal.className = 'event-modal';
    document.body.appendChild(modal);
  }
  
  // Set modal content
  modal.innerHTML = `
    <div class="event-modal-content">
      <div class="event-modal-header ${eventType.toLowerCase()}">
        <h3>${title}</h3>
        <span class="event-type">${eventType}</span>
        <button class="event-modal-close">&times;</button>
      </div>
      <div class="event-modal-body">
        <div class="event-detail">
          <i class="fas fa-clock"></i>
          <span>${time}</span>
        </div>
        <div class="event-detail">
          <i class="fas fa-map-marker-alt"></i>
          <span>${location}</span>
        </div>
        <div class="event-notes">
          <h4>Notes</h4>
          <p>Additional details about this event would appear here. In a full application, this could include information like course materials, meeting agenda, or preparation requirements.</p>
        </div>
      </div>
      <div class="event-modal-footer">
        <button class="btn btn-primary btn-sm">Add to Calendar</button>
        <button class="btn btn-outline btn-sm event-modal-close">Close</button>
      </div>
    </div>
  `;
  
  // Show modal with animation
  setTimeout(() => {
    modal.classList.add('active');
  }, 10);
  
  // Close button functionality
  const closeButtons = modal.querySelectorAll('.event-modal-close');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.remove();
      }, 300);
    });
  });
  
  // Add to Calendar button functionality
  const addToCalendarButton = modal.querySelector('.btn-primary');
  addToCalendarButton.addEventListener('click', () => {
    showNotification('Event added to calendar');
    modal.classList.remove('active');
    setTimeout(() => {
      modal.remove();
    }, 300);
  });
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.remove();
      }, 300);
    }
  });
}

/**
 * Show a notification message
 * @param {string} message - The notification message
 */
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-info-circle"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add to document
  document.body.appendChild(notification);
  
  // Show with animation
  setTimeout(() => {
    notification.classList.add('active');
  }, 10);
  
  // Remove after a delay
  setTimeout(() => {
    notification.classList.remove('active');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Create needed CSS for notification and event modal
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Event Modal Styles */
    .event-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    
    .event-modal.active {
      opacity: 1;
      visibility: visible;
    }
    
    .event-modal-content {
      background-color: var(--card-bg);
      border-radius: var(--border-radius-lg);
      width: 90%;
      max-width: 500px;
      box-shadow: var(--shadow-lg);
      overflow: hidden;
      transform: translateY(-20px);
      transition: transform 0.3s ease;
    }
    
    .event-modal.active .event-modal-content {
      transform: translateY(0);
    }
    
    .event-modal-header {
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      color: white;
      position: relative;
    }
    
    .event-modal-header.work {
      background-color: #4361ee;
    }
    
    .event-modal-header.class {
      background-color: #f72585;
    }
    
    .event-modal-header.research {
      background-color: #7209b7;
    }
    
    .event-modal-header.personal {
      background-color: #4cc9f0;
    }
    
    .event-modal-header h3 {
      margin: 0;
      font-size: 1.2rem;
      color: white;
      flex: 1;
    }
    
    .event-type {
      background-color: rgba(255, 255, 255, 0.2);
      padding: 0.25rem 0.5rem;
      border-radius: var(--border-radius-sm);
      font-size: 0.8rem;
      margin-right: 2rem;
    }
    
    .event-modal-close {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      margin: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
    
    .event-modal-body {
      padding: 1.5rem;
    }
    
    .event-detail {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    
    .event-detail i {
      color: var(--primary-color);
    }
    
    .event-notes {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }
    
    .event-notes h4 {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
    
    .event-notes p {
      font-size: 0.9rem;
      color: var(--gray-600);
      margin: 0;
    }
    
    .event-modal-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--border-color);
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }
    
    .btn-sm {
      padding: 0.4rem 0.8rem;
      font-size: 0.9rem;
    }
    
    /* Notification Styles */
    .notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: var(--card-bg);
      box-shadow: var(--shadow-lg);
      border-radius: var(--border-radius-md);
      padding: 1rem;
      z-index: 1000;
      transform: translateY(20px);
      opacity: 0;
      transition: all 0.3s ease;
    }
    
    .notification.active {
      transform: translateY(0);
      opacity: 1;
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .notification-content i {
      color: var(--primary-color);
    }
    
    @media (max-width: 576px) {
      .event-modal-content {
        width: 95%;
      }
      
      .event-modal-header {
        padding: 0.8rem 1rem;
      }
      
      .event-modal-body,
      .event-modal-footer {
        padding: 1rem;
      }
      
      .event-modal-footer {
        flex-direction: column;
      }
      
      .event-modal-footer button {
        width: 100%;
      }
    }
  `;
  
  document.head.appendChild(style);
});