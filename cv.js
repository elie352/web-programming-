// cv.js - Updated with complete data for all users

// Data object holding CV information for each user
const userCVData = {
  'Andrew Chahine': {
    title: 'Computer Science Student',
    email: 'andrewchahine24@gmail.com',
    phone: '+961 71 818 789',
    location: 'Jeita, Lebanon',
    profileImage: 'images/user1.jpg',
    about: [
        'Motivated computer science student with excellent communication skills and a positive, adaptable attitude. Comfortable in fast-paced environments and skilled at working both independently and as part of a team.',
        'Known for being reliable, friendly, and dedicated to delivering outstanding service. Always ready to go the extra mile to ensure a great customer experience.'
    ],
    education: [
      {
        period: 'September 2022 - Present',
        degree: 'Bachelor of Computer Science',
        institution: 'Holy Spirit University of Kaslik, Kaslik',
        description: 'Second-year computer science student (2025 academic year)'
      },
      {
        period: '2011 - 2022',
        degree: 'Lebanese Baccalaureate in Life Sciences',
        institution: 'Antonine International School (AIS), Ajaltoun',
        description: ''
      }
    ],
    experience: [
      {
        period: 'June 2023 - September 2023',
        position: 'Counter Staff',
        company: 'Hawa Chicken, Jeita',
        responsibilities: [
          'Processed customer orders efficiently, ensuring minimal wait times and smooth workflow.',
          'Handled cash and card transactions with accuracy, maintaining financial accountability.',
          'Managed peak-hour service by multitasking and prioritizing tasks effectively.',
          'Provided excellent customer service by addressing inquiries and resolving concerns professionally.'
        ]
      }
    ],
    extracurricular: [
      {
        period: 'June 2019 - March 2021',
        position: 'The Marian Apostolic Movement',
        organization: 'Zouk Mosbeh',
        responsibilities: [
          'Assisted in organizing and facilitating events for younger children.',
          'Contributed to the planning and execution of educational and recreational activities, gaining valuable teamwork and time management experience.'
        ]
      },
      {
        period: 'April 2017 - January 2019',
        position: 'Scouts Member',
        organization: 'SDI - St. Jean Ajaltoun Group',
        responsibilities: [
          'Participated actively in organizing camp activities, working efficiently with peers to ensure smooth execution of events.',
          'Supported camp preparations, demonstrating reliability, collaboration, and organizational skills.'
        ]
      }
    ],
    projects: [
      {
        title: 'Personal Portfolio Website',
        description: 'A responsive website showcasing my skills, projects, and professional experience.',
        technologies: ['HTML', 'CSS', 'JavaScript']
      },
      {
        title: 'University Course Projects',
        description: 'Various computer science assignments and projects completed as part of my academic curriculum.',
        technologies: ['Programming', 'Problem Solving', 'Data Structures']
      }
    ],
    skills: {
      professional: ['Professionalism', 'Organization Skills', 'Multitasking in a fast-paced environment', 'Communication Skills'],
      personal: ['Stress Management', 'Fast Learner', 'Attention to Detail', 'Teamwork']
    },
    languages: [
      { name: 'Arabic', level: 'Native', dots: 5 },
      { name: 'English', level: 'Fluent', dots: 5 },
      { name: 'French', level: 'Advanced', dots: 4 }
    ]
  },
  'Elie Matta': {
    title: 'Computer Science Student',
    email: 'elie.b.matta@net.usek.edu.lb',
    phone: '+961 81 376 071',
    location: 'Byblos, Lebanon',
    profileImage: 'images/ElieMatta.png',
    about: [
        'Passionate about technology and problem-solving, I am currently in my first year of Computer Engineering at Holy Spirit University of Kaslik. I am eager to apply my growing knowledge to real-world challenges and contribute to impactful projects.',
        'My experience as a waiter has honed my communication and multitasking skills, preparing me for dynamic team environments. I am also actively involved in church and community movements, developing leadership and organizational abilities.'
    ],
    education: [
      {
        period: '2023 - Present',
        degree: 'Bachelor of Engineering in Computer Science',
        institution: 'Holy Spirit University Of Kaslik',
        description: 'First year computer science student (2025 academic year)'
      },
      {
        period: '2011-2023',
        degree: 'French baccalaureate',
        institution: 'Frere mariste, Amshit',
        description: ''
      },
    ],
    experience: [
      {
        period: 'June 2022 - September 2022',
        position: 'Waiter',
        company: 'Ocean Blue, Byblos',
        responsibilities: [
          'Processed customer orders efficiently, ensuring minimal wait times and smooth workflow.',
          'Handled cash and card transactions with accuracy, maintaining financial accountability.',
          'Managed peak-hour service by multitasking and prioritizing tasks effectively.',
          'Provided excellent customer service by addressing inquiries and resolving concerns professionally.'
        ]
      },
      
    ],
    extracurricular: [
      {
        period: 'June 2019 - Present',
        position: 'Taleaa Church Movement',
        organization: 'Byblos',
        responsibilities: [
          'Assisted in organizing and facilitating events for younger children.',
          'Contributed to the planning and execution of educational and recreational activities, gaining valuable teamwork and time management experience.'
        ]
      },
      {
        period: 'June 2019 - Present',
        position: 'Fersen Member',
        organization: 'St Abda Byblos',
        responsibilities: [
          'Participated actively in organizing camp activities, working efficiently with peers to ensure smooth execution of events.',
          'Supported camp preparations, demonstrating reliability, collaboration, and organizational skills.'
        ]
      }
    ],
    projects: [
      {
        title: 'Personal Portfolio Website',
        description: 'A responsive website showcasing my skills, projects, and professional experience.',
        technologies: ['HTML', 'CSS', 'JavaScript']
      },
      {
        title: 'University Course Projects',
        description: 'Various computer science assignments and projects completed as part of my academic curriculum.',
        technologies: ['Programming', 'Problem Solving', 'Data Structures']
      }
    ],
    skills: {
      professional: ['Professionalism', 'Organization Skills', 'Multitasking in a fast-paced environment', 'Communication Skills'],
      personal: ['Stress Management', 'Fast Learner', 'Attention to Detail', 'Teamwork']
    },
    languages: [
      { name: 'Arabic', level: 'Native', dots: 5 },
      { name: 'English', level: 'Fluent', dots: 5 },
      { name: 'French', level: 'Advanced', dots: 4 }
    ]
  },
  'John Aoun': {
    title: 'Full-Stack Developer & Data Analyst',
    email: 'john.aoun@example.com',
    phone: '+1 206 555 1234',
    location: 'Seattle, Washington',
    profileImage: 'images/user3.jpg',
    about: [
      "I'm a full-stack developer with a background in data science, combining technical expertise with analytical thinking to create meaningful digital solutions. With 4 years of professional experience, I specialize in developing applications that make data accessible and useful.",
      "Currently working in Seattle, I focus on creating scalable web applications with robust backends and intuitive frontends. I'm particularly interested in data visualization and making complex information understandable through thoughtful interface design."
    ],
    education: [
      {
        period: '2020 - 2022',
        degree: 'Master of Science in Data Science',
        institution: 'University of Washington',
        description: 'Focus on Machine Learning and Statistical Analysis'
      },
      {
        period: '2016 - 2020',
        degree: 'Bachelor of Science in Computer Science',
        institution: 'Stanford University',
        description: 'Minor in Statistics. GPA: 3.9/4.0'
      },
      {
        period: '2019',
        degree: 'Data Science Immersive',
        institution: 'General Assembly',
        description: 'Intensive program focused on data analysis and visualization'
      }
    ],
    experience: [
      {
        period: '2022 - Present',
        position: 'Data Scientist & Full-Stack Developer',
        company: 'DataViz Solutions',
        responsibilities: [
          'Develop data-driven web applications using Python, R, and JavaScript',
          'Design and implement data visualization dashboards and interactive reports',
          'Apply machine learning algorithms to extract insights from large datasets',
          'Collaborate with data engineers to optimize data pipelines and processing'
        ]
      },
      {
        period: '2020 - 2022',
        position: 'Data Analyst',
        company: 'Tech Analytics Inc.',
        responsibilities: [
          'Analyzed user behavior data to identify trends and opportunities',
          'Created automated reporting tools using Python and SQL',
          'Presented findings and recommendations to executive stakeholders',
          'Contributed to A/B testing strategy and implementation'
        ]
      },
      {
        period: '2018 - 2020',
        position: 'Software Engineering Intern',
        company: 'Insight Data',
        responsibilities: [
          'Assisted in developing data processing pipelines using Python and Apache Spark',
          'Built internal tools for data quality monitoring',
          'Participated in code reviews and agile development processes',
          'Contributed to open-source data science libraries'
        ]
      }
    ],
    extracurricular: [ /* John has no extracurricular activities listed */ ],
    projects: [
      {
        title: 'Predictive Analytics Platform',
        description: 'Machine learning system for forecasting business metrics with interactive visualizations.',
        technologies: ['Python', 'TensorFlow', 'Flask', 'D3.js']
      },
      {
        title: 'Natural Language Processing Tool',
        description: 'Text analysis application for sentiment analysis and topic modeling of customer feedback.',
        technologies: ['NLTK', 'spaCy', 'React', 'FastAPI']
      },
      {
        title: 'Data Pipeline Automation',
        description: 'ETL system for processing and analyzing large datasets from multiple sources.',
        technologies: ['Apache Airflow', 'PostgreSQL', 'AWS', 'Docker']
      }
    ],
    skills: {
      professional: ['Python', 'R', 'JavaScript', 'SQL', 'Machine Learning', 'Data Visualization', 'Data Analysis'],
      // Changed 'personal' to 'technical' for John's context
      technical: ['TensorFlow', 'PyTorch', 'Pandas', 'Tableau', 'Power BI']
    },
    languages: [
      { name: 'English', level: 'Native', dots: 5 },
      { name: 'Mandarin', level: 'Basic', dots: 2 },
      { name: 'German', level: 'Intermediate', dots: 3 }
    ]
  }
};

// --- The rest of your functions from cv.js (updateCVForCurrentUser, clearCVDynamicFields, updateTimelineSectionById, etc.) go below this line ---
// --- Make sure to include the version with enhanced logging and ID-based selectors ---

document.addEventListener('DOMContentLoaded', () => {
  console.log('[CV.js] DOMContentLoaded event fired.');
  setupDownloadCV();
  animateTimeline();
  setupSkillTags();
  
  console.log('[CV.js] Calling updateCVForCurrentUser from DOMContentLoaded.');
  updateCVForCurrentUser();
});

function updateCVForCurrentUser() {
  const currentUser = localStorage.getItem('currentUser');
  console.log('[CV.js] updateCVForCurrentUser started. User from localStorage:', currentUser);

  if (!currentUser) {
    console.warn('[CV.js] No current user found in localStorage. Displaying default or clearing fields.');
    // Display default (Andrew Chahine) or clear. Let's clear to avoid confusion.
    const defaultUser = 'Andrew Chahine'; // Or decide how to handle no selection
    const cvDataDefault = userCVData[defaultUser];
    if (cvDataDefault) {
        // Temporarily set to default user to populate initially, main.js loadSavedUser might correct this
        populateCVFields(defaultUser, cvDataDefault);
    } else {
         clearCVDynamicFields();
    }
    return;
  }

  const cvData = userCVData[currentUser];

  if (!cvData) {
    console.error(`[CV.js] CV data for user '${currentUser}' NOT FOUND in userCVData! Check keys.`);
    console.log('[CV.js] Available keys in userCVData:', Object.keys(userCVData));
    clearCVDynamicFields(); // Clear fields to avoid showing stale data
    // Update the name to the current user even if data is missing, or show 'User not found'
    const cvProfileNameFallback = document.querySelector('.cv-profile-info h1');
    if (cvProfileNameFallback) cvProfileNameFallback.textContent = currentUser + " (Data not found)";
    return;
  }
  
  console.log(`[CV.js] Found CV data for ${currentUser}. Populating fields.`);
  populateCVFields(currentUser, cvData); // Call helper to populate
  console.log('[CV.js] updateCVForCurrentUser completed.');
}

// Helper function to populate CV fields (reduces repetition)
function populateCVFields(userName, userData) {
    // Update Profile Info
    const cvProfileName = document.querySelector('.cv-profile-info h1');
    if (cvProfileName) cvProfileName.textContent = userName;
    else console.error('[CV.js] Selector .cv-profile-info h1 not found.');

    const cvProfileTitle = document.querySelector('.cv-profile-info .cv-title');
    if (cvProfileTitle) cvProfileTitle.textContent = userData.title || 'N/A';
    else console.error('[CV.js] Selector .cv-profile-info .cv-title not found.');

    const cvProfileImage = document.querySelector('.cv-profile-image img');
    if (cvProfileImage) {
        cvProfileImage.src = userData.profileImage || 'images/default-profile.jpg';
        cvProfileImage.alt = userName;
    } else console.error('[CV.js] Selector .cv-profile-image img not found.');

    const cvContactItems = document.querySelectorAll('.cv-contact-item');
    cvContactItems.forEach(item => {
        const icon = item.querySelector('i');
        const span = item.querySelector('span');
        if (icon && span) {
            if (icon.classList.contains('fa-envelope')) span.textContent = userData.email || 'N/A';
            else if (icon.classList.contains('fa-phone')) span.textContent = userData.phone || 'N/A';
            else if (icon.classList.contains('fa-map-marker-alt')) span.textContent = userData.location || 'N/A';
        }
    });

    // Update About Me (Assuming ID: #cv-about-card)
    const aboutCard = document.getElementById('cv-about-card');
    if (aboutCard) {
        const paragraphs = aboutCard.querySelectorAll('.cv-card-content p');
        if (userData.about && userData.about.length > 0) {
            paragraphs.forEach((p, i) => { p.textContent = userData.about[i] || ''; });
            if (userData.about.length < paragraphs.length) {
                for (let i = userData.about.length; i < paragraphs.length; i++) { paragraphs[i].textContent = ''; }
            }
        } else {
            paragraphs.forEach(p => p.textContent = 'About information not available.');
        }
    } else console.warn('[CV.js] CV Card with ID "cv-about-card" not found.');

    // Update sections using IDs
    updateTimelineSectionById('cv-education-card', userData.education || []);
    updateTimelineSectionById('cv-experience-card', userData.experience || []);
    updateTimelineSectionById('cv-extracurricular-card', userData.extracurricular || []);
    updateProjectsSectionById('cv-projects-card', userData.projects || []);
    updateSkillsSectionById('cv-skills-card', userData.skills || { professional: [], personal: [], technical: [] }); // Include technical
    updateLanguagesSectionById('cv-languages-card', userData.languages || []);
}


function clearCVDynamicFields() {
    console.log("[CV.js] Clearing dynamic CV fields.");
    const safeClear = (selector, value = 'N/A') => {
        const el = document.querySelector(selector);
        if (el) el.textContent = value;
    };

    safeClear('.cv-profile-info h1', 'User');
    safeClear('.cv-profile-info .cv-title', 'Title');
    document.querySelectorAll('.cv-contact-item span').forEach(s => s.textContent = 'N/A');
    
    const profileImage = document.querySelector('.cv-profile-image img');
    if (profileImage) profileImage.src = 'images/default-profile.jpg';

    // Clear sections
    updateTimelineSectionById('cv-education-card', []);
    updateTimelineSectionById('cv-experience-card', []);
    updateTimelineSectionById('cv-extracurricular-card', []);
    updateProjectsSectionById('cv-projects-card', []);
    updateSkillsSectionById('cv-skills-card', { professional: [], personal: [], technical: [] });
    updateLanguagesSectionById('cv-languages-card', []);

    const aboutCard = document.getElementById('cv-about-card');
    if (aboutCard) {
        aboutCard.querySelectorAll('.cv-card-content p').forEach(p => p.textContent = 'About information not available.');
    }
}


function updateTimelineSectionById(cardId, itemsData) {
  console.log(`[CV.js] Updating timeline for card ID: ${cardId} with items:`, itemsData ? itemsData.length : 0);
  const cardElement = document.getElementById(cardId);
  if (!cardElement) {
    console.warn(`[CV.js] Card with ID "${cardId}" not found.`);
    return;
  }
  const timeline = cardElement.querySelector('.timeline');
  if (!timeline) {
    console.error(`[CV.js] Timeline element not found within card ID: ${cardId}.`);
    return;
  }
  timeline.innerHTML = ''; // Clear existing items
  if (!itemsData || itemsData.length === 0) {
    timeline.innerHTML = '<p>No information available for this section.</p>';
    return;
  }
  itemsData.forEach(item => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item'; // Add timeline-animated if you want observers per item
    let responsibilitiesHTML = '';
    if (item.responsibilities && item.responsibilities.length > 0) {
      responsibilitiesHTML = '<ul class="timeline-duties">';
      item.responsibilities.forEach(resp => { responsibilitiesHTML += `<li>${resp}</li>`; });
      responsibilitiesHTML += '</ul>';
    }
    timelineItem.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-date">${item.period || 'N/A'}</div>
      <div class="timeline-content">
        <h3>${item.degree || item.position || 'N/A'}</h3>
        <p class="timeline-institution">${item.institution || item.company || 'N/A'}</p>
        ${item.description ? `<p>${item.description}</p>` : ''}
        ${responsibilitiesHTML}
      </div>`;
    timeline.appendChild(timelineItem);
  });
  animateTimelineItems(timeline); // Re-run animation setup for newly added items
}

function updateProjectsSectionById(cardId, projectsData) {
    console.log(`[CV.js] Updating projects for card ID: ${cardId} with items:`, projectsData ? projectsData.length : 0);
    const cardElement = document.getElementById(cardId);
    if (!cardElement) { console.warn(`[CV.js] Card with ID "${cardId}" not found.`); return; }
    const projectList = cardElement.querySelector('.project-list');
    if (!projectList) { console.error(`[CV.js] .project-list not found in card ID: ${cardId}.`); return; }
    projectList.innerHTML = '';
    if (!projectsData || projectsData.length === 0) {
        projectList.innerHTML = '<p>No projects to display.</p>'; return;
    }
    projectsData.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        let techTags = (project.technologies || []).map(tech => `<span class="tech-tag">${tech}</span>`).join('');
        projectItem.innerHTML = `
            <h3>${project.title || 'N/A'}</h3>
            <p class="project-description">${project.description || 'N/A'}</p>
            <div class="project-technologies">${techTags}</div>
            <div class="project-links">
                <a href="#" target="_blank" class="project-link"><i class="fas fa-link"></i> Live Demo</a>
                <a href="#" target="_blank" class="project-link"><i class="fab fa-github"></i> GitHub</a>
            </div>`;
        projectList.appendChild(projectItem);
    });
}

function updateSkillsSectionById(cardId, skillsData) {
    console.log(`[CV.js] Updating skills for card ID: ${cardId} with data:`, skillsData);
    const cardElement = document.getElementById(cardId);
    if (!cardElement) { console.warn(`[CV.js] Card with ID "${cardId}" not found.`); return; }
    const skillsContainer = cardElement.querySelector('.skills-container');
    if (!skillsContainer) { console.error(`[CV.js] .skills-container not found in card ID: ${cardId}.`); return; }
    skillsContainer.innerHTML = '';
    const hasProfSkills = skillsData && skillsData.professional && skillsData.professional.length > 0;
    const hasPersSkills = skillsData && skillsData.personal && skillsData.personal.length > 0;
    const hasTechSkills = skillsData && skillsData.technical && skillsData.technical.length > 0;

    if (!hasProfSkills && !hasPersSkills && !hasTechSkills) {
        skillsContainer.innerHTML = '<p>No skills to display.</p>'; return;
    }

    if (hasProfSkills) {
        const category = document.createElement('div');
        category.className = 'skill-category';
        let skillTags = skillsData.professional.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
        category.innerHTML = `<h3>Professional Skills</h3><div class="skill-tags">${skillTags}</div>`;
        skillsContainer.appendChild(category);
    }
    if (hasPersSkills) {
        const category = document.createElement('div');
        category.className = 'skill-category';
        let skillTags = skillsData.personal.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
        category.innerHTML = `<h3>Personal Qualities</h3><div class="skill-tags">${skillTags}</div>`;
        skillsContainer.appendChild(category);
    }
     if (hasTechSkills) { // Added technical skills category for John Aoun
        const category = document.createElement('div');
        category.className = 'skill-category';
        let skillTags = skillsData.technical.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
        category.innerHTML = `<h3>Technical Tools/Frameworks</h3><div class="skill-tags">${skillTags}</div>`;
        skillsContainer.appendChild(category);
    }
    setupSkillTags();
}

function updateLanguagesSectionById(cardId, languagesData) {
    console.log(`[CV.js] Updating languages for card ID: ${cardId} with items:`, languagesData ? languagesData.length : 0);
    const cardElement = document.getElementById(cardId);
    if (!cardElement) { console.warn(`[CV.js] Card with ID "${cardId}" not found.`); return; }
    const languageList = cardElement.querySelector('.language-list');
    if (!languageList) { console.error(`[CV.js] .language-list not found in card ID: ${cardId}.`); return; }
    languageList.innerHTML = '';
    if (!languagesData || languagesData.length === 0) {
        languageList.innerHTML = '<p>No languages to display.</p>'; return;
    }
    languagesData.forEach(lang => {
        const langItem = document.createElement('div');
        langItem.className = 'language-item';
        let dots = Array(5).fill(0).map((_, i) => `<span class="dot${i < (lang.dots || 0) ? ' active' : ''}"></span>`).join('');
        langItem.innerHTML = `
            <span class="language-name">${lang.name || 'N/A'}</span>
            <div class="language-level">
                <div class="level-dots">${dots}</div>
                <span class="level-text">${lang.level || 'N/A'}</span>
            </div>`;
        languageList.appendChild(langItem);
    });
}


// --- Other functions from your cv.js (setupDownloadCV, animateTimeline, setupSkillTags, showSkillDetails, etc.) ---
// Ensure these functions are included below this line as they were in your original/previous file

function setupDownloadCV() {
  const downloadBtn = document.getElementById('downloadCV');
  if (!downloadBtn) return;
  downloadBtn.addEventListener('click', () => {
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing PDF...';
    downloadBtn.disabled = true;
    setTimeout(() => { // Simulate PDF generation/download
      downloadBtn.innerHTML = originalText;
      downloadBtn.disabled = false;
      showNotification('CV download simulated (actual PDF generation not implemented).');
    }, 1500);
  });
}

function animateTimeline() {
  const timelines = document.querySelectorAll('.timeline');
  if (!timelines.length) return;

  timelines.forEach(timeline => {
    animateTimelineItems(timeline);
  });
}

function animateTimelineItems(timelineElement) {
  const timelineItems = timelineElement.querySelectorAll('.timeline-item');
  if (!timelineItems.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, index * 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  timelineItems.forEach(item => {
    item.classList.add('timeline-animated');
    observer.observe(item);
  });
}


function setupSkillTags() {
  const skillsCard = document.getElementById('cv-skills-card');
  if (skillsCard) {
    // Use event delegation for handling clicks and hovers on skill tags
    skillsCard.addEventListener('click', function(event) {
        if (event.target.classList.contains('skill-tag')) {
            const skillName = event.target.textContent.trim();
            showSkillDetails(skillName, event.target);
        }
    });
    skillsCard.addEventListener('mouseover', function(event) {
        if (event.target.classList.contains('skill-tag')) {
            event.target.style.transform = 'translateY(-3px) scale(1.03)';
            event.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.08)';
        }
    });
    skillsCard.addEventListener('mouseout', function(event) {
        if (event.target.classList.contains('skill-tag')) {
            event.target.style.transform = '';
            event.target.style.boxShadow = '';
        }
    });
  }
}

function showSkillDetails(skillName, targetElement) {
  const existingTooltip = document.querySelector('.skill-tooltip');
  if (existingTooltip) existingTooltip.remove();

  const description = getSkillDescription(skillName);
  const tooltip = document.createElement('div');
  tooltip.className = 'skill-tooltip';
  tooltip.innerHTML = `<div class="tooltip-content"><h4>${skillName}</h4><p>${description}</p></div><div class="tooltip-arrow"></div>`;
  document.body.appendChild(tooltip);
  positionTooltip(tooltip, targetElement);
  setTimeout(() => tooltip.classList.add('active'), 10);

  function closeHandler(e) {
    if (!tooltip.contains(e.target) && e.target !== targetElement) {
      tooltip.classList.remove('active');
      setTimeout(() => tooltip.remove(), 300);
      document.removeEventListener('click', closeHandler, true);
      window.removeEventListener('scroll', scrollHandler, true);
    }
  }
  function scrollHandler() {
    tooltip.classList.remove('active');
    setTimeout(() => tooltip.remove(), 300);
    document.removeEventListener('click', closeHandler, true);
    window.removeEventListener('scroll', scrollHandler, true);
  }
  document.addEventListener('click', closeHandler, true);
  window.addEventListener('scroll', scrollHandler, true);
}

function positionTooltip(tooltip, targetElement) {
  const targetRect = targetElement.getBoundingClientRect();
  tooltip.style.position = 'absolute'; // Use absolute to position relative to document

  // Calculate initial position (below the target)
  let top = targetRect.bottom + window.scrollY + 8;
  let left = targetRect.left + window.scrollX + targetRect.width / 2;

  // Append temporarily to measure
  tooltip.style.visibility = 'hidden';
  document.body.appendChild(tooltip); // Add to body to measure accurately
  const tooltipRect = tooltip.getBoundingClientRect();
  tooltip.style.visibility = ''; // Make visible again


  // Center horizontally
  left -= tooltipRect.width / 2;

  // Adjust if off-screen horizontally
  if (left + tooltipRect.width > window.innerWidth - 10) { // 10px buffer
    left = window.innerWidth - tooltipRect.width - 10;
  }
  if (left < 10) {
    left = 10;
  }

  // Adjust if off-screen vertically (position above if needed)
  const arrowHeight = 8;
  if (targetRect.bottom + tooltipRect.height + arrowHeight > window.innerHeight && // Not enough space below
      targetRect.top - tooltipRect.height - arrowHeight > 0) { // Enough space above
    top = targetRect.top + window.scrollY - tooltipRect.height - arrowHeight;
    tooltip.classList.add('bottom-arrow'); // Class to style arrow pointing up
  } else {
    tooltip.classList.remove('bottom-arrow'); // Ensure arrow points down
  }


  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;

  // Ensure arrow is positioned correctly relative to the tooltip body
  const arrow = tooltip.querySelector('.tooltip-arrow');
  if (arrow) {
      // Reset arrow position, CSS should handle base centering
      arrow.style.left = '50%';
      arrow.style.transform = 'translateX(-50%)';

      // If tooltip was shifted horizontally, adjust arrow
      const tooltipLeftOffset = parseFloat(tooltip.style.left) - window.scrollX;
      const targetCenter = targetRect.left + targetRect.width / 2;
      const arrowOffset = targetCenter - tooltipLeftOffset - (arrow.offsetWidth / 2); // Calculate offset needed for arrow to point to target center

      // Constrain arrow position within tooltip bounds
      const minArrowLeft = arrow.offsetWidth / 2;
      const maxArrowLeft = tooltipRect.width - arrow.offsetWidth / 2;
      arrow.style.left = `${Math.max(minArrowLeft, Math.min(arrowOffset, maxArrowLeft))}px`;
  }
}


function getSkillDescription(skillName) {
  const skillDescriptions = {
    'Professionalism': 'Maintaining high standards of professionalism in all interactions, adhering to workplace expectations, and representing myself and my team appropriately.',
    'Organization Skills': 'Effectively planning and structuring tasks, resources, and time to achieve optimal outcomes and meet deadlines.',
    'Multitasking': 'Ability to handle multiple responsibilities simultaneously while maintaining quality and efficiency.',
    'Multitasking in a fast-paced environment': 'Managing multiple tasks simultaneously while maintaining quality and efficiency, particularly in high-pressure situations with tight deadlines.',
    'Communication Skills': 'Clearly and effectively conveying information both verbally and in writing, while also being an attentive listener.',
    'Stress Management': 'Ability to remain calm and effective under pressure, using appropriate strategies to manage workplace stress.',
    'Fast Learner': 'Quickly adapting to new information, technologies, and environments with minimal assistance.',
    'Attention to Detail': 'Maintaining high accuracy and thoroughness in all tasks and projects, with a focus on quality.',
    'Teamwork': 'Collaborating effectively with others, contributing positively to group dynamics, and working toward common goals.',
    'Python': 'Proficient in Python for web development (Flask/Django), data analysis (Pandas, NumPy), and scripting.',
    'R': 'Experienced in using R for statistical analysis, data visualization (ggplot2), and reporting.',
    'JavaScript': 'Skilled in modern JavaScript (ES6+) for frontend interactivity, DOM manipulation, and working with frameworks like React.',
    'SQL': 'Strong understanding of SQL for database management, querying, and data manipulation across various RDBMS.',
    'Machine Learning': 'Knowledgeable in machine learning concepts and algorithms, with experience using libraries like scikit-learn and TensorFlow/Keras.',
    'Data Visualization': 'Ability to create compelling and informative data visualizations using tools like D3.js, Tableau, or Python libraries (Matplotlib, Seaborn).',
    'Adaptability': 'Flexible and open to new challenges and changes in project requirements or technologies.',
    'Problem Solving': 'Strong analytical and problem-solving skills, capable of identifying issues and developing effective solutions.',
    'TensorFlow': 'Experience using TensorFlow for building and training machine learning models, particularly deep learning.',
    'PyTorch': 'Experience using PyTorch for building and training machine learning models, particularly deep learning.',
    'Pandas': 'Proficient in using the Pandas library for data manipulation and analysis in Python.',
    'Tableau': 'Skilled in using Tableau for creating interactive dashboards and data visualizations.',
    'Power BI': 'Skilled in using Power BI for creating interactive dashboards and business intelligence reports.',
     'HTML': 'Proficient in writing semantic HTML5 markup for web structure.',
     'CSS': 'Skilled in using CSS3 for styling web pages, including layouts (Flexbox, Grid) and animations.',
     'Programming': 'General programming skills acquired through computer science coursework.',
     'Data Structures': 'Understanding of fundamental data structures and their application.',
    'default': 'A valuable skill contributing to overall competence and project success.'
  };
  return skillDescriptions[skillName] || skillDescriptions['default'];
}

function showNotification(message) {
  let notification = document.querySelector('.cv-notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.className = 'cv-notification';
    document.body.appendChild(notification);
     // Add styles dynamically if not already present
     if (!document.getElementById('cv-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'cv-notification-styles';
        style.textContent = `
            .cv-notification {
                position: fixed; bottom: 20px; right: 20px;
                background-color: var(--success-color); color: white;
                padding: 1rem; border-radius: var(--border-radius-md);
                box-shadow: var(--shadow-md); z-index: 1001; /* Ensure it's above other elements */
                transform: translateX(120%); opacity: 0;
                transition: all 0.3s ease-in-out;
            }
            .cv-notification.active { transform: translateX(0); opacity: 1; }
            .notification-content { display: flex; align-items: center; gap: 0.5rem; }
            .notification-content i { font-size: 1.2rem; }
             html[dir="rtl"] .cv-notification { right: auto; left: 20px; transform: translateX(-120%); }
             html[dir="rtl"] .cv-notification.active { transform: translateX(0); }
        `;
        document.head.appendChild(style);
     }
  }
  notification.innerHTML = `<div class="notification-content"><i class="fas fa-check-circle"></i><span>${message}</span></div>`;
  notification.classList.add('active');
  setTimeout(() => {
    notification.classList.remove('active');
    setTimeout(() => { if(notification.parentElement) notification.remove(); }, 300);
  }, 3000);
}

// Polyfill for Element.matches (if not already in main.js or elsewhere)
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

// Add styles for the tooltip arrow positioning if not in cv.css
if (!document.getElementById('tooltip-arrow-styles')) {
    const style = document.createElement('style');
    style.id = 'tooltip-arrow-styles';
    style.textContent = `
        .skill-tooltip .tooltip-arrow {
            position: absolute;
            width: 0; height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid var(--card-bg); /* Arrow pointing down */
            top: -7px; /* Position arrow just above tooltip body */
            left: 50%; /* Center horizontally */
            transform: translateX(-50%);
        }
        .skill-tooltip.bottom-arrow .tooltip-arrow {
             top: auto;
             bottom: -7px; /* Position arrow just below tooltip body */
             border-bottom: none;
             border-top: 8px solid var(--card-bg); /* Arrow pointing up */
        }
    `;
    document.head.appendChild(style);
}