const userSchedules = {
  'Andrew Chahine': {
    workLabel: 'Frontend Development', classLabel: 'Advanced Algorithms', researchLabel: 'Research Meeting', personalLabel: 'Gym',
    workLocation: 'TechInnovate Inc.', classLocation: 'Anderson Hall 223', researchLocation: 'Davis Lab', personalLocation: 'Campus Recreation Center',
    scheduleNotes: [
      { title: 'Finals Week Adjustments', description: 'During the final two weeks of the semester, this schedule may be adjusted...' },
      { title: 'Office Hours', description: 'Advisor office hours are available by appointment...' },
      { title: 'Work Schedule', description: 'Work hours at TechInnovate Inc. are flexible...' }
    ],
    typicalClassLoad: { spring: 3, fall: 4, summer: 1 },
    typicalWorkHours: 15
  },
  'Elie Matta': {
    workLabel: 'UX Design Workshop', classLabel: 'Web Architecture', researchLabel: 'Client Projects', personalLabel: 'Photography',
    workLocation: 'DesignHub Co.', classLocation: 'Beirut Digital District', researchLocation: 'Home Office', personalLocation: 'Beirut Arts Center',
    scheduleNotes: [
      { title: 'Client Meetings', description: 'Client meetings are scheduled on Tuesdays and Thursdays...' },
      { title: 'UX Workshops', description: 'UX design workshops are conducted every Monday...' },
      { title: 'Teaching Schedule', description: 'Guest lecturer for Web Architecture course...' }
    ],
    typicalClassLoad: { spring: 1, fall: 1, summer: 0 },
    typicalWorkHours: 25
  },
  'User 3': {
    workLabel: 'Data Analytics', classLabel: 'Machine Learning', researchLabel: 'Data Science Project', personalLabel: 'Yoga Class',
    workLocation: 'DataViz Solutions', classLocation: 'Smith Hall 302', researchLocation: 'Analytics Lab', personalLocation: 'Mind & Body Studio',
    scheduleNotes: [
      { title: 'Dataset Deadlines', description: 'Dataset processing reports due every Friday...' },
      { title: 'Team Meetings', description: 'Weekly team meetings are held every Monday morning.' },
      { title: 'Mentorship Sessions', description: 'Mentorship sessions scheduled on Wednesday afternoons...' }
    ],
    typicalClassLoad: { spring: 2, fall: 3, summer: 1 },
    typicalWorkHours: 20
  }
};

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const timeSlots = 13;
const hourMap = (startRow) => 7 + startRow;

document.addEventListener('DOMContentLoaded', () => {
  setupSemesterSelector();
  setupEventInteractions();

  const currentUser = localStorage.getItem('currentUser') || 'Andrew Chahine';
  const semesterSelect = document.getElementById('semesterSelect');
  const initialSemester = semesterSelect ? semesterSelect.value : 'fall2024';

  loadSchedule(initialSemester, currentUser);
  updateNotesForCurrentUser(currentUser);
});


function setupSemesterSelector() {
  const semesterSelect = document.getElementById('semesterSelect');
  if (!semesterSelect) return;

  semesterSelect.addEventListener('change', (e) => {
    const selectedSemester = e.target.value;
    const currentUser = localStorage.getItem('currentUser') || 'Andrew Chahine';
    loadSchedule(selectedSemester, currentUser);
  });
}


function loadSchedule(semester, user) {
  console.log(`Loading schedule for User: ${user}, Semester: ${semester}`);
  const scheduleGrid = document.getElementById('scheduleGrid');
  const dayColumns = scheduleGrid ? scheduleGrid.querySelectorAll('.day-column') : [];

  if (!scheduleGrid || dayColumns.length === 0) {
      console.error("Schedule grid or day columns not found!");
      return;
  }

  dayColumns.forEach(column => {
    const events = column.querySelectorAll('.event');
    events.forEach(event => event.remove());
  });


  const userData = userSchedules[user] || userSchedules['Andrew Chahine'];
  const scheduleData = generateRandomScheduleData(userData, semester);

  scheduleData.forEach(eventData => {
    const dayColumn = scheduleGrid.querySelector(`.day-column[data-day="${eventData.day}"]`);
    if (dayColumn) {
      const eventElement = document.createElement('div');
      eventElement.className = `event ${eventData.type}`;
      eventElement.style.gridRow = `${eventData.startRow} / ${eventData.endRow}`;

      const startHour = hourMap(eventData.startRow);
      const endHour = hourMap(eventData.endRow);
      const startTimeStr = `${startHour % 12 === 0 ? 12 : startHour % 12}:00 ${startHour < 12 || startHour === 24 ? 'AM' : 'PM'}`;
      const endTimeStr = `${endHour % 12 === 0 ? 12 : endHour % 12}:00 ${endHour < 12 || endHour === 24 ? 'AM' : 'PM'}`;

      eventElement.innerHTML = `
        <div class="event-content">
          <h3>${eventData.title}</h3>
          <p class="event-time">${startTimeStr} - ${endTimeStr}</p>
          <p class="event-location">${eventData.location}</p>
        </div>
      `;
      eventElement.addEventListener('click', () => handleEventClick(eventData));

      dayColumn.appendChild(eventElement);
    }
  });

  scheduleGrid.style.opacity = '0';
  setTimeout(() => { scheduleGrid.style.transition = 'opacity 0.5s ease'; scheduleGrid.style.opacity = '1'; }, 10);

  showScheduleNotification(`Schedule updated to ${getSemesterName(semester)} for ${user}`);
}


function generateRandomScheduleData(userData, semester) {
    const events = [];
    const maxEventsPerDay = 4;
    const eventTypes = ['work', 'class', 'research', 'personal'];
    const minDuration = 2;
    const maxDuration = 4;

    daysOfWeek.forEach(day => {
        let dayEventCount = 0;
        const occupiedSlots = new Set();

        let numEventsToday = 0;
        if (day === 'saturday' || day === 'sunday') {
            numEventsToday = Math.floor(Math.random() * 3);
        } else {
            numEventsToday = Math.floor(Math.random() * (maxEventsPerDay - 1)) + 1;
        }

         let classCount = userData.typicalClassLoad ? userData.typicalClassLoad[semester.split(/(?=[A-Z])/)[0].toLowerCase()] || 1 : 1;

        for (let i = 0; i < numEventsToday && dayEventCount < maxEventsPerDay; i++) {
            let attempts = 0;
            let placed = false;
            while (attempts < 10 && !placed) {
                attempts++;
                const startRow = Math.floor(Math.random() * (timeSlots - minDuration + 1)) + 1;
                const duration = Math.floor(Math.random() * (maxDuration - minDuration + 1)) + minDuration;
                const endRow = Math.min(startRow + duration, timeSlots + 1);

                let overlap = false;
                for (let r = startRow; r < endRow; r++) {
                    if (occupiedSlots.has(r)) {
                        overlap = true;
                        break;
                    }
                }

                if (!overlap) {
                    for (let r = startRow; r < endRow; r++) {
                        occupiedSlots.add(r);
                    }

                    let eventType;
                    if (classCount > 0 && Math.random() < 0.4 && day !== 'saturday' && day !== 'sunday') {
                        eventType = 'class';
                        classCount--;
                    } else {
                         eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
                         if ((day === 'saturday' || day === 'sunday') && eventType !== 'personal' && Math.random() < 0.7) {
                             eventType = 'personal';
                         }
                    }


                    events.push({
                        day: day,
                        startRow: startRow,
                        endRow: endRow,
                        type: eventType,
                        title: userData[`${eventType}Label`] || 'Scheduled Event',
                        location: userData[`${eventType}Location`] || 'Various Locations'
                    });
                    placed = true;
                    dayEventCount++;
                }
            }
        }
    });

    events.sort((a, b) => {
      if (a.day !== b.day) return daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);
      return a.startRow - b.startRow;
    });


    return events;
}


function getSemesterName(semester) {
  switch (semester) {
    case 'spring2025': return 'Spring 2025';
    case 'fall2024': return 'Fall 2024';
    case 'summer2024': return 'Summer 2024';
    default: return 'Selected Semester';
  }
}


function setupEventInteractions() {
  const scheduleGrid = document.getElementById('scheduleGrid');
  if (!scheduleGrid) return;

  scheduleGrid.addEventListener('click', (e) => {
    const eventElement = e.target.closest('.event');
    if (eventElement) {
        const title = eventElement.querySelector('h3')?.textContent || 'Event';
        const time = eventElement.querySelector('.event-time')?.textContent || 'N/A';
        const location = eventElement.querySelector('.event-location')?.textContent || 'N/A';
        let eventType = '';
        if (eventElement.classList.contains('work')) eventType = 'Work';
        else if (eventElement.classList.contains('class')) eventType = 'Class';
        else if (eventElement.classList.contains('research')) eventType = 'Research';
        else if (eventElement.classList.contains('personal')) eventType = 'Personal';

        showEventDetailsModal(title, time, location, eventType);
    }
  });
}


function handleEventClick(eventData) {
    const startHour = hourMap(eventData.startRow);
    const endHour = hourMap(eventData.endRow);
    const startTimeStr = `${startHour % 12 === 0 ? 12 : startHour % 12}:00 ${startHour < 12 || startHour === 24 ? 'AM' : 'PM'}`;
    const endTimeStr = `${endHour % 12 === 0 ? 12 : endHour % 12}:00 ${endHour < 12 || endHour === 24 ? 'AM' : 'PM'}`;
    const time = `${startTimeStr} - ${endTimeStr}`;

    showEventDetailsModal(eventData.title, time, eventData.location, eventData.type.charAt(0).toUpperCase() + eventData.type.slice(1));
}


function updateNotesForCurrentUser(user) {
  const userData = userSchedules[user] || userSchedules['Andrew Chahine'];
  const notesContent = document.querySelector('.notes-content');

  if (notesContent && userData.scheduleNotes) {
    notesContent.innerHTML = '';
    userData.scheduleNotes.forEach(note => {
      const noteItem = document.createElement('div');
      noteItem.className = 'note-item';
      noteItem.innerHTML = `
        <div class="note-icon"><i class="fas fa-info-circle"></i></div>
        <div class="note-text">
          <h3>${note.title}</h3>
          <p>${note.description}</p>
        </div>`;
      notesContent.appendChild(noteItem);
    });
  } else if (notesContent) {
      notesContent.innerHTML = '<p>No specific notes available for this user.</p>';
  }
}


function showEventDetailsModal(title, time, location, eventType) {
  let modal = document.getElementById('eventModal');
  if (!modal) {
    console.error('Event modal element not found in HTML!');
    modal = document.createElement('div');
    modal.id = 'eventModal';
    modal.className = 'event-modal';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="event-modal-content">
      <div class="event-modal-header ${eventType.toLowerCase()}">
        <h3>${title}</h3>
        <span class="event-type">${eventType}</span>
        <button class="event-modal-close" aria-label="Close modal">&times;</button>
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
          <p>This is a randomly generated event. More details could be added here based on event type or specific logic.</p>
        </div>
      </div>
      <div class="event-modal-footer">
        <button class="btn btn-primary btn-sm">Add to Calendar</button>
        <button class="btn btn-outline btn-sm event-modal-close">Close</button>
      </div>
    </div>
  `;

  modal.classList.add('active');

  const closeButtons = modal.querySelectorAll('.event-modal-close');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  const addToCalendarButton = modal.querySelector('.btn-primary');
  if(addToCalendarButton) {
      addToCalendarButton.addEventListener('click', () => {
        showScheduleNotification('Add to Calendar feature not implemented.');
        modal.classList.remove('active');
      });
  }
}


function showScheduleNotification(message) {
  document.querySelectorAll('.schedule-notification').forEach(n => n.remove());

  const notification = document.createElement('div');
  notification.className = 'notification schedule-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-info-circle"></i>
      <span>${message}</span>
    </div>
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('active');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('active');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}