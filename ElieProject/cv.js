/**
 * CV JavaScript file for portfolio website
 * Handles the functionality of the CV page
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  setupDownloadCV();
  animateTimeline();
  setupSkillTags();
  
  // Update CV for current user
  updateCVForCurrentUser();
});

/**
 * Setup download CV functionality
 * Simulates downloading a CV file
 */
function setupDownloadCV() {
  const downloadBtn = document.getElementById('downloadCV');
  
  if (!downloadBtn) return;
  
  downloadBtn.addEventListener('click', () => {
    // In a real application, this would trigger a file download
    // For this demo, we'll simulate the download with a notification
    
    // Change button state to show loading
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing PDF...';
    downloadBtn.disabled = true;
    
    // Simulate processing time
    setTimeout(() => {
      // Reset button state
      downloadBtn.innerHTML = originalText;
      downloadBtn.disabled = false;
      
      // Show success notification
      showNotification('CV downloaded successfully');
    }, 1500);
  });
}

/**
 * Animate timeline elements
 * Adds staggered animation to timeline items
 */
function animateTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (!timelineItems.length) return;
  
  // Using Intersection Observer for animation triggers
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add animation class with delay based on index
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, index * 200);
        
        // Stop observing this element
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Add base animation class and start observing
  timelineItems.forEach(item => {
    item.classList.add('timeline-animated');
    observer.observe(item);
  });
  
  // Add necessary CSS styles for animation
  const style = document.createElement('style');
  style.textContent = `
    .timeline-animated {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .timeline-animated.animate {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  
  document.head.appendChild(style);
}

/**
 * Setup skill tags interactions
 * Adds hover animations and click functionality to skill tags
 */
function setupSkillTags() {
  const skillTags = document.querySelectorAll('.skill-tag');
  
  if (!skillTags.length) return;
  
  skillTags.forEach(tag => {
    // Add hover effect
    tag.addEventListener('mouseenter', () => {
      // Subtle pop effect
      tag.style.transform = 'translateY(-5px) scale(1.05)';
      tag.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
    
    tag.addEventListener('mouseleave', () => {
      // Reset to original state
      tag.style.transform = '';
      tag.style.boxShadow = '';
    });
    
    // Add click functionality
    tag.addEventListener('click', () => {
      const skillName = tag.textContent.trim();
      showSkillDetails(skillName, tag);
    });
  });
}

/**
 * Update CV for current user
 * Checks localStorage for current user and updates CV accordingly
 */
function updateCVForCurrentUser() {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) return;
  
  // Define CV data for each user
  const userCVData = {
    'Andrew Chahine': {
      title: 'Software Developer & UI/UX Designer',
      email: 'carlrizk333@icloud.com',
      phone: '+961 81 276 525',
      location: 'Aramoun, Lebanon',
      education: [
        {
          period: '2023 - Present',
          degree: 'Master of Science in Computer Science',
          institution: 'University of Washington',
          description: 'Specializing in Human-Computer Interaction and Artificial Intelligence'
        },
        {
          period: '2019 - 2023',
          degree: 'Bachelor of Science in Computer Science',
          institution: 'Seattle Pacific University',
          description: 'Minor in Digital Media. GPA: 3.85/4.0'
        },
        {
          period: '2018',
          degree: 'Web Development Bootcamp',
          institution: 'Code Fellows',
          description: 'Intensive 12-week program focused on full-stack JavaScript development'
        }
      ],
      experience: [
        {
          period: '2022 - Present',
          position: 'Front-End Developer',
          company: 'TechInnovate Inc.',
          responsibilities: [
            'Develop and maintain responsive web applications using React.js and TypeScript',
            'Collaborate with UI/UX designers to implement visually appealing interfaces',
            'Optimize application performance and ensure cross-browser compatibility',
            'Implement unit and integration tests using Jest and React Testing Library'
          ]
        },
        {
          period: '2020 - 2022',
          position: 'Junior Full-Stack Developer',
          company: 'WebSolve Solutions',
          responsibilities: [
            'Developed both client and server-side applications using Node.js and React',
            'Created and maintained RESTful APIs and database models',
            'Participated in Agile development cycles and code reviews',
            'Assisted in the deployment and monitoring of web applications'
          ]
        },
        {
          period: '2019 - 2020',
          position: 'Web Development Intern',
          company: 'Digital Frontier',
          responsibilities: [
            'Assisted in the development of client websites using HTML, CSS, and JavaScript',
            'Learned and implemented modern web development practices and tooling',
            'Contributed to team projects under the guidance of senior developers'
          ]
        }
      ],
      projects: [
        {
          title: 'E-commerce Dashboard',
          description: 'A comprehensive dashboard for e-commerce analytics with real-time data visualization.',
          technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js']
        },
        {
          title: 'Fitness Tracker App',
          description: 'A cross-platform mobile application for tracking workouts and nutrition.',
          technologies: ['Flutter', 'Firebase', 'RESTful API']
        },
        {
          title: 'Banking App Redesign',
          description: 'Complete redesign of a banking application with improved user experience and accessibility.',
          technologies: ['Figma', 'Usability Testing', 'Prototyping']
        }
      ],
      certifications: [
        {
          name: 'AWS Certified Developer - Associate',
          issuer: 'Amazon Web Services',
          year: '2023',
          icon: 'fab fa-aws'
        },
        {
          name: 'React Developer Certification',
          issuer: 'Meta',
          year: '2022',
          icon: 'fab fa-react'
        },
        {
          name: 'Google UX Design Professional Certificate',
          issuer: 'Google',
          year: '2021',
          icon: 'fab fa-google'
        }
      ],
      skills: {
        programming: ['JavaScript', 'TypeScript', 'Python', 'Java', 'HTML/CSS', 'SQL'],
        frameworks: ['React.js', 'Node.js', 'Express', 'Vue.js', 'Django', 'Flask', 'Bootstrap', 'Tailwind CSS'],
        tools: ['Git', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL', 'Firebase', 'RESTful APIs', 'GraphQL']
      },
      languages: [
        { name: 'English', level: 'Native', dots: 5 },
        { name: 'Spanish', level: 'Intermediate', dots: 3 },
        { name: 'French', level: 'Basic', dots: 2 }
      ],
      references: [
        {
          name: 'Sarah Johnson',
          position: 'Senior Developer at TechInnovate Inc.',
          email: 'sarah.johnson@example.com'
        },
        {
          name: 'Mark Williams',
          position: 'Project Manager at WebSolve Solutions',
          email: 'mark.williams@example.com'
        }
      ]
    },
    'Elie Matta': {
      title: 'Frontend Developer & UX Specialist',
      email: 'elie.matta@example.com',
      phone: '+961 71 123 456',
      location: 'Beirut, Lebanon',
      education: [
        {
          period: '2015 - 2018',
          degree: 'Bachelor of Engineering in Computer Science',
          institution: 'American University of Beirut',
          description: 'Focus on Human-Computer Interaction and Web Technologies'
        },
        {
          period: '2014',
          degree: 'UI/UX Design Certificate',
          institution: 'Interaction Design Foundation',
          description: 'Comprehensive program covering user experience principles and interface design'
        },
        {
          period: '2013',
          degree: 'Associate Degree in Digital Arts',
          institution: 'Lebanese Academy of Fine Arts',
          description: 'Foundation in visual design, typography, and digital illustration'
        }
      ],
      experience: [
        {
          period: '2021 - Present',
          position: 'Senior Frontend Developer',
          company: 'DesignHub Co.',
          responsibilities: [
            'Lead the frontend development team in creating intuitive user interfaces',
            'Conduct UX workshops with clients to define project requirements',
            'Implement responsive designs using modern CSS frameworks and techniques',
            'Mentor junior developers in frontend best practices and performance optimization'
          ]
        },
        {
          period: '2018 - 2021',
          position: 'UX Developer',
          company: 'Beirut Digital District',
          responsibilities: [
            'Collaborated with design and marketing teams to create cohesive digital experiences',
            'Developed interactive prototypes for user testing and stakeholder presentations',
            'Implemented A/B testing to optimize user flows and increase conversion rates',
            'Created and maintained component libraries and design systems'
          ]
        },
        {
          period: '2016 - 2018',
          position: 'Frontend Design Intern',
          company: 'CreativeTech Solutions',
          responsibilities: [
            'Assisted senior designers in creating wireframes and mockups',
            'Implemented designs using HTML, CSS, and JavaScript',
            'Participated in usability testing sessions and incorporated feedback',
            'Developed interactive elements for digital marketing campaigns'
          ]
        }
      ],
      projects: [
        {
          title: 'Healthcare Portal Redesign',
          description: 'Complete redesign of a patient portal for a major regional healthcare provider.',
          technologies: ['Vue.js', 'Figma', 'SCSS', 'Accessibility Standards']
        },
        {
          title: 'E-commerce Mobile App',
          description: 'Native mobile shopping experience with personalized recommendations.',
          technologies: ['React Native', 'Redux', 'Firebase', 'Stripe Integration']
        },
        {
          title: 'Interactive Data Dashboard',
          description: 'Real-time visualization platform for monitoring business metrics.',
          technologies: ['D3.js', 'React', 'GraphQL', 'Material UI']
        }
      ],
      certifications: [
        {
          name: 'Certified User Experience Professional',
          issuer: 'Nielsen Norman Group',
          year: '2022',
          icon: 'fas fa-certificate'
        },
        {
          name: 'Advanced Frontend Architecture',
          issuer: 'Frontend Masters',
          year: '2021',
          icon: 'fas fa-code'
        },
        {
          name: 'Certified Accessibility Specialist',
          issuer: 'International Association of Accessibility Professionals',
          year: '2020',
          icon: 'fas fa-universal-access'
        }
      ],
      skills: {
        programming: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3/SCSS', 'SVG Animation', 'WebGL'],
        frameworks: ['Vue.js', 'React', 'Next.js', 'Nuxt.js', 'TailwindCSS', 'Material UI', 'Framer Motion'],
        tools: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Storybook', 'Jest', 'Cypress', 'Webpack', 'Vite']
      },
      languages: [
        { name: 'Arabic', level: 'Native', dots: 5 },
        { name: 'English', level: 'Fluent', dots: 5 },
        { name: 'French', level: 'Advanced', dots: 4 }
      ],
      references: [
        {
          name: 'Nadia Hakim',
          position: 'Creative Director at DesignHub Co.',
          email: 'nadia.hakim@example.com'
        },
        {
          name: 'Tarek Saleh',
          position: 'CTO at Beirut Digital District',
          email: 'tarek.saleh@example.com'
        }
      ]
    },
    'Jhon aun ': {
      title: 'Full-Stack Developer & Data Analyst',
      email: 'sarah.johnson@example.com',
      phone: '+1 206 555 1234',
      location: 'Seattle, Washington',
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
      certifications: [
        {
          name: 'Microsoft Certified: Azure Data Scientist Associate',
          issuer: 'Microsoft',
          year: '2023',
          icon: 'fab fa-microsoft'
        },
        {
          name: 'TensorFlow Developer Certificate',
          issuer: 'Google',
          year: '2022',
          icon: 'fab fa-google'
        },
        {
          name: 'AWS Certified Data Analytics - Specialty',
          issuer: 'Amazon Web Services',
          year: '2021',
          icon: 'fab fa-aws'
        }
      ],
      skills: {
        programming: ['Python', 'R', 'JavaScript', 'SQL', 'Java', 'Scala'],
        frameworks: ['TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn', 'React', 'Flask', 'Django'],
        tools: ['Tableau', 'Power BI', 'Jupyter', 'Docker', 'AWS', 'GCP', 'Hadoop', 'Spark']
      },
      languages: [
        { name: 'English', level: 'Native', dots: 5 },
        { name: 'Mandarin', level: 'Basic', dots: 2 },
        { name: 'German', level: 'Intermediate', dots: 3 }
      ],
      references: [
        {
          name: 'Dr. Michael Chen',
          position: 'Lead Data Scientist at DataViz Solutions',
          email: 'michael.chen@example.com'
        },
        {
          name: 'Jennifer Lee',
          position: 'Director of Analytics at Tech Analytics Inc.',
          email: 'jennifer.lee@example.com'
        }
      ]
    }
  };
  
  // Get the user's CV data
  const cvData = userCVData[currentUser];
  if (!cvData) return;
  
  // Update CV header information
  const cvProfileName = document.querySelector('.cv-profile-info h1');
  if (cvProfileName) {
    cvProfileName.textContent = currentUser;
  }
  
  const cvProfileTitle = document.querySelector('.cv-profile-info .cv-title');
  if (cvProfileTitle) {
    cvProfileTitle.textContent = cvData.title;
  }
  
  // Update contact information
  const cvContactItems = document.querySelectorAll('.cv-contact-item');
  cvContactItems.forEach(item => {
    const icon = item.querySelector('i');
    if (icon) {
      if (icon.classList.contains('fa-envelope')) {
        item.querySelector('span').textContent = cvData.email;
      } else if (icon.classList.contains('fa-phone')) {
        item.querySelector('span').textContent = cvData.phone;
      } else if (icon.classList.contains('fa-map-marker-alt')) {
        item.querySelector('span').textContent = cvData.location;
      }
    }
  });
  
  // Update About Me section
  const aboutMeSection = document.querySelector('.cv-card-header h2:contains("About Me")');
  if (aboutMeSection) {
    const cvCard = aboutMeSection.closest('.cv-card');
    if (cvCard) {
      const paragraphs = cvCard.querySelectorAll('.cv-card-content p');
      if (paragraphs.length > 0) {
        const bio = localStorage.getItem('userBio-' + currentUser);
        if (bio) {
          const bioParts = bio.split('\n\n');
          for (let i = 0; i < Math.min(paragraphs.length, bioParts.length); i++) {
            paragraphs[i].textContent = bioParts[i];
          }
        }
      }
    }
  }
  
  // Update Education timeline
  if (cvData.education) {
    updateTimelineSection('Education', cvData.education);
  }
  
  // Update Work Experience timeline
  if (cvData.experience) {
    updateTimelineSection('Work Experience', cvData.experience);
  }
  
  // Update Projects section
  if (cvData.projects) {
    const projectsSection = document.querySelector('.cv-card-header h2:contains("Projects")');
    if (projectsSection) {
      const cvCard = projectsSection.closest('.cv-card');
      if (cvCard) {
        const projectList = cvCard.querySelector('.project-list');
        if (projectList) {
          projectList.innerHTML = '';
          
          cvData.projects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            
            let techTags = '';
            project.technologies.forEach(tech => {
              techTags += `<span class="tech-tag">${tech}</span>`;
            });
            
            projectItem.innerHTML = `
              <h3>${project.title}</h3>
              <p class="project-description">${project.description}</p>
              <div class="project-technologies">
                ${techTags}
              </div>
              <div class="project-links">
                <a href="#" target="_blank" class="project-link"><i class="fas fa-link"></i> Live Demo</a>
                <a href="#" target="_blank" class="project-link"><i class="fab fa-github"></i> GitHub</a>
              </div>
            `;
            
            projectList.appendChild(projectItem);
          });
        }
      }
    }
  }
  
  // Update Certifications section
  if (cvData.certifications) {
    const certificationsSection = document.querySelector('.cv-card-header h2:contains("Certifications")');
    if (certificationsSection) {
      const cvCard = certificationsSection.closest('.cv-card');
      if (cvCard) {
        const certificationList = cvCard.querySelector('.certification-list');
        if (certificationList) {
          certificationList.innerHTML = '';
          
          cvData.certifications.forEach(cert => {
            const certItem = document.createElement('div');
            certItem.className = 'certification-item';
            
            certItem.innerHTML = `
              <div class="certification-logo">
                <i class="${cert.icon}"></i>
              </div>
              <div class="certification-info">
                <h3>${cert.name}</h3>
                <p>${cert.issuer} • ${cert.year}</p>
              </div>
            `;
            
            certificationList.appendChild(certItem);
          });
        }
      }
    }
  }
  
  // Update Technical Skills section
  if (cvData.skills) {
    updateSkillsSection(cvData.skills);
  }
  
  // Update Languages section
  if (cvData.languages) {
    const languagesSection = document.querySelector('.cv-card-header h2:contains("Languages")');
    if (languagesSection) {
      const cvCard = languagesSection.closest('.cv-card');
      if (cvCard) {
        const languageList = cvCard.querySelector('.language-list');
        if (languageList) {
          languageList.innerHTML = '';
          
          cvData.languages.forEach(lang => {
            const langItem = document.createElement('div');
            langItem.className = 'language-item';
            
            let dots = '';
            for (let i = 1; i <= 5; i++) {
              dots += `<span class="dot${i <= lang.dots ? ' active' : ''}"></span>`;
            }
            
            langItem.innerHTML = `
              <span class="language-name">${lang.name}</span>
              <div class="language-level">
                <div class="level-dots">
                  ${dots}
                </div>
                <span class="level-text">${lang.level}</span>
              </div>
            `;
            
            languageList.appendChild(langItem);
          });
        }
      }
    }
  }
  
  // Update References section - FIXED VERSION
  if (cvData.references) {
    // Find all h2 elements and locate the References one
    const headers = document.querySelectorAll('.cv-card-header h2');
    let referencesHeader = null;
    
    headers.forEach(header => {
      if (header.textContent.trim() === 'References') {
        referencesHeader = header;
      }
    });
    
    if (referencesHeader) {
      const cvCard = referencesHeader.closest('.cv-card');
      if (cvCard) {
        const referencesList = cvCard.querySelector('.references-list');
        if (referencesList) {
          // Clear out existing references
          referencesList.innerHTML = '';
          
          // Add the new references for the current user
          cvData.references.forEach(ref => {
            const refItem = document.createElement('div');
            refItem.className = 'reference-item';
            
            refItem.innerHTML = `
              <h3>${ref.name}</h3>
              <p class="reference-position">${ref.position}</p>
              <div class="reference-contact">
                <span><i class="fas fa-envelope"></i> ${ref.email}</span>
                <span><i class="fas fa-phone"></i> Available upon request</span>
              </div>
            `;
            
            referencesList.appendChild(refItem);
          });
        }
      }
    }
  }
  
  console.log(`CV updated for user: ${currentUser}`);
}

/**
 * Update timeline section
 * @param {string} sectionTitle - The title of the section to update
 * @param {Array} itemsData - The data for the timeline items
 */
function updateTimelineSection(sectionTitle, itemsData) {
  // Find the section by iterating through all h2 elements
  const headers = document.querySelectorAll('.cv-card-header h2');
  let sectionHeader = null;
  
  headers.forEach(header => {
    if (header.textContent.trim() === sectionTitle) {
      sectionHeader = header;
    }
  });
  
  if (sectionHeader) {
    const cvCard = sectionHeader.closest('.cv-card');
    if (cvCard) {
      const timeline = cvCard.querySelector('.timeline');
      if (timeline) {
        timeline.innerHTML = '';
        
        itemsData.forEach(item => {
          const timelineItem = document.createElement('div');
          timelineItem.className = 'timeline-item';
          
          // Create responsibilities HTML for work experience
          let responsibilitiesHTML = '';
          if (item.responsibilities) {
            responsibilitiesHTML = '<ul class="timeline-duties">';
            item.responsibilities.forEach(responsibility => {
              responsibilitiesHTML += `<li>${responsibility}</li>`;
            });
            responsibilitiesHTML += '</ul>';
          }
          
          timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-date">${item.period}</div>
            <div class="timeline-content">
              <h3>${item.degree || item.position}</h3>
              <p class="timeline-institution">${item.institution || item.company}</p>
              ${item.description ? `<p>${item.description}</p>` : ''}
              ${responsibilitiesHTML}
            </div>
          `;
          
          timeline.appendChild(timelineItem);
        });
        
        // Re-apply animation
        animateTimelineItems(timeline);
      }
    }
  }
}

/**
 * Animate timeline items
 * @param {HTMLElement} timeline - The timeline element
 */
function animateTimelineItems(timeline) {
  const timelineItems = timeline.querySelectorAll('.timeline-item');
  
  timelineItems.forEach(item => {
    item.classList.add('timeline-animated');
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, index * 200);
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  timelineItems.forEach(item => {
    observer.observe(item);
  });
}

/**
 * Update skills section
 * @param {Object} skillsData - The skills data
 */
function updateSkillsSection(skillsData) {
  const skillsSection = document.querySelector('.cv-card-header h2:contains("Technical Skills")');
  if (skillsSection) {
    const cvCard = skillsSection.closest('.cv-card');
    if (cvCard) {
      const skillsContainer = cvCard.querySelector('.skills-container');
      if (skillsContainer) {
        skillsContainer.innerHTML = '';
        
        // Programming Languages
        if (skillsData.programming && skillsData.programming.length > 0) {
          const category = document.createElement('div');
          category.className = 'skill-category';
          
          let skillTags = '';
          skillsData.programming.forEach(skill => {
            skillTags += `<span class="skill-tag">${skill}</span>`;
          });
          
          category.innerHTML = `
            <h3>Programming Languages</h3>
            <div class="skill-tags">
              ${skillTags}
            </div>
          `;
          
          skillsContainer.appendChild(category);
        }
        
        // Frameworks & Libraries
        if (skillsData.frameworks && skillsData.frameworks.length > 0) {
          const category = document.createElement('div');
          category.className = 'skill-category';
          
          let skillTags = '';
          skillsData.frameworks.forEach(skill => {
            skillTags += `<span class="skill-tag">${skill}</span>`;
          });
          
          category.innerHTML = `
            <h3>Frameworks & Libraries</h3>
            <div class="skill-tags">
              ${skillTags}
            </div>
          `;
          
          skillsContainer.appendChild(category);
        }
        
        // Tools & Technologies
        if (skillsData.tools && skillsData.tools.length > 0) {
          const category = document.createElement('div');
          category.className = 'skill-category';
          
          let skillTags = '';
          skillsData.tools.forEach(skill => {
            skillTags += `<span class="skill-tag">${skill}</span>`;
          });
          
          category.innerHTML = `
            <h3>Tools & Technologies</h3>
            <div class="skill-tags">
              ${skillTags}
            </div>
          `;
          
          skillsContainer.appendChild(category);
        }
        
        // Re-setup skill tags
        setupSkillTags();
      }
    }
  }
}

/**
 * Show skill details in a tooltip
 * @param {string} skillName - The name of the skill
 * @param {HTMLElement} targetElement - The element to attach the tooltip to
 */
function showSkillDetails(skillName, targetElement) {
  // Remove any existing tooltips
  const existingTooltip = document.querySelector('.skill-tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }
  
  // Get skill description based on name
  const description = getSkillDescription(skillName);
  
  // Create tooltip element
  const tooltip = document.createElement('div');
  tooltip.className = 'skill-tooltip';
  tooltip.innerHTML = `
    <div class="tooltip-content">
      <h4>${skillName}</h4>
      <p>${description}</p>
    </div>
    <div class="tooltip-arrow"></div>
  `;
  
  // Add to DOM
  document.body.appendChild(tooltip);
  
  // Position tooltip
  positionTooltip(tooltip, targetElement);
  
  // Add active class after a small delay for animation
  setTimeout(() => {
    tooltip.classList.add('active');
  }, 10);
  
  // Close tooltip when clicking anywhere
  document.addEventListener('click', function closeTooltip(e) {
    if (!tooltip.contains(e.target) && e.target !== targetElement) {
      tooltip.classList.remove('active');
      
      setTimeout(() => {
        tooltip.remove();
      }, 300);
      
      document.removeEventListener('click', closeTooltip);
    }
  });
  
  // Also close on scroll
  window.addEventListener('scroll', function scrollClose() {
    tooltip.classList.remove('active');
    
    setTimeout(() => {
      tooltip.remove();
    }, 300);
    
    window.removeEventListener('scroll', scrollClose);
  });
}

/**
 * Position tooltip relative to target element
 * @param {HTMLElement} tooltip - The tooltip element
 * @param {HTMLElement} targetElement - The target element
 */
function positionTooltip(tooltip, targetElement) {
  const targetRect = targetElement.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  
  // Default position is above the target
  let top = targetRect.top - tooltipRect.height - 10;
  const left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
  
  // If tooltip would go off-screen at the top, position it below the target
  if (top < 10) {
    top = targetRect.bottom + 10;
    tooltip.classList.add('bottom');
  }
  
  // Set position
  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
}

/**
 * Get skill description based on skill name
 * @param {string} skillName - The name of the skill
 * @returns {string} The skill description
 */
function getSkillDescription(skillName) {
  // Map of skill names to descriptions
  const skillDescriptions = {
    // Programming Languages
    'JavaScript': 'Modern ECMAScript with experience in both frontend and backend development. Proficient in ES6+ features and functional programming concepts.',
    'TypeScript': 'Strong typing for JavaScript with interfaces, generics, and advanced type features for building scalable applications.',
    'Python': 'Data processing, automation, and backend development with frameworks like Django and Flask.',
    'Java': 'Enterprise application development with Spring Boot and Java EE. Object-oriented programming concepts and design patterns.',
    'HTML/CSS': 'Semantic markup, responsive design, CSS Grid, Flexbox, animations, and cross-browser compatibility.',
    'HTML5': 'Modern HTML with semantic elements, multimedia support, and browser APIs for advanced functionality.',
    'CSS3/SCSS': 'Advanced styling with CSS preprocessors, custom properties, animations, and modern layout techniques.',
    'SQL': 'Database design, complex queries, stored procedures, and performance optimization across multiple database systems.',
    'R': 'Statistical computing and graphics for data analysis, visualization, and machine learning applications.',
    'Scala': 'Functional programming for big data processing and distributed computing applications.',
    'SVG Animation': 'Creating interactive and animated vector graphics for modern web applications.',
    'WebGL': 'Hardware-accelerated 3D and 2D graphics rendering in web browsers.',
    
    // Frameworks & Libraries
    'React.js': 'Component-based UI development with hooks, context API, and state management solutions like Redux.',
    'React': 'Component-based UI development with hooks, context API, and state management solutions like Redux.',
    'Node.js': 'Server-side JavaScript with Express.js, API development, and asynchronous programming patterns.',
    'Express': 'Fast, unopinionated, minimalist web framework for Node.js for building APIs and web applications.',
    'Vue.js': 'Progressive JavaScript framework for building user interfaces with a focus on simplicity and performance.',
    'Django': 'High-level Python web framework that encourages rapid development and clean, pragmatic design.',
    'Flask': 'Lightweight Python web framework that is easy to extend and integrate with other libraries.',
    'TensorFlow': 'Open-source machine learning framework for building and deploying ML models.',
    'PyTorch': 'Deep learning framework with strong GPU acceleration and dynamic computation graphs.',
    'Pandas': 'Data analysis and manipulation library providing data structures and operations for numerical tables.',
    'NumPy': 'Fundamental package for scientific computing with powerful N-dimensional array objects.',
    'Scikit-learn': 'Machine learning library featuring classification, regression, clustering algorithms and more.',
    'Bootstrap': 'Popular CSS framework for developing responsive and mobile-first websites.',
    'Tailwind CSS': 'Utility-first CSS framework for rapidly building custom user interfaces without writing custom CSS.',
    'TailwindCSS': 'Utility-first CSS framework for rapidly building custom user interfaces without writing custom CSS.',
    'Material UI': 'React components library implementing Google\'s Material Design principles.',
    'Next.js': 'React framework for production-grade applications with server-side rendering and static site generation.',
    'Nuxt.js': 'Vue.js framework for creating universal applications with server-side rendering capabilities.',
    'Framer Motion': 'Production-ready animation library for React with a focus on developer experience.',
    'React Native': 'Framework for building native mobile apps using React and JavaScript with native components.',
    'NLTK': 'Natural Language Toolkit for building Python programs to work with human language data.',
    'spaCy': 'Industrial-strength library for natural language processing in Python.',
    'FastAPI': 'Modern, fast web framework for building APIs with Python based on standard type hints.',
    
    // Tools & Technologies
    'Git': 'Distributed version control system for tracking changes in source code during software development.',
    'Docker': 'Platform for developing, shipping, and running applications in containers for consistent environments.',
    'AWS': 'Cloud computing services including EC2, S3, Lambda, and more for building scalable applications.',
    'MongoDB': 'NoSQL document database with scalability and flexibility that stores data in JSON-like documents.',
    'PostgreSQL': 'Open source object-relational database system with a strong reputation for reliability and data integrity.',
    'Firebase': 'Platform for developing mobile and web applications with real-time database and authentication services.',
    'RESTful APIs': 'Architectural style for designing networked applications with a standardized approach to API design.',
    'GraphQL': 'Query language for APIs and a runtime for executing those queries with existing data.',
    'Figma': 'Collaborative interface design tool for creating, testing, and sharing designs in real-time.',
    'Adobe XD': 'Vector-based user experience design tool for web apps and mobile apps with prototyping capabilities.',
    'Sketch': 'Digital design platform for creating, prototyping, and collaborating on interface designs.',
    'InVision': 'Digital product design platform for prototyping, collaboration, and workflow management.',
    'Storybook': 'UI component explorer for front-end developers to develop and test components in isolation.',
    'Jest': 'JavaScript testing framework with a focus on simplicity and support for large web applications.',
    'Cypress': 'End-to-end testing framework for web applications with a focus on developer experience.',
    'Webpack': 'Static module bundler for modern JavaScript applications with features like code splitting.',
    'Vite': 'Next-generation frontend build tool that significantly improves the development experience.',
    'GCP': 'Google Cloud Platform providing cloud computing services for building and deploying applications.',
    'Hadoop': 'Framework for distributed storage and processing of large datasets using the MapReduce model.',
    'Spark': 'Unified analytics engine for large-scale data processing with APIs in Java, Scala, Python, and R.',
    'Tableau': 'Interactive data visualization software focused on business intelligence.',
    'Power BI': 'Business analytics service by Microsoft for interactive visualizations and business intelligence.',
    'Jupyter': 'Web application for creating and sharing documents with live code, equations, and visualizations.',
    'Apache Airflow': 'Platform to programmatically author, schedule, and monitor workflows as directed acyclic graphs.'
  };
  
  // Return description if found, or a default message
  return skillDescriptions[skillName] || 'Proficient in this technology with practical experience in real-world projects.';
}

/**
 * Show a notification message
 * @param {string} message - The notification message
 */
function showNotification(message) {
  // Create notification element if it doesn't exist
  let notification = document.querySelector('.cv-notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.className = 'cv-notification';
    document.body.appendChild(notification);
  }
  
  // Set message
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-check-circle"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Show notification
  notification.classList.add('active');
  
  // Auto-hide after delay
  setTimeout(() => {
    notification.classList.remove('active');
  }, 3000);
}

// Add necessary CSS for tooltips and notifications
document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('cv-styles')) {
    const style = document.createElement('style');
    style.id = 'cv-styles';
    style.textContent = `
      /* Skill tooltip styles */
      .skill-tooltip {
        position: fixed;
        z-index: 1000;
        max-width: 300px;
        background-color: var(--card-bg);
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-lg);
        padding: 0;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        pointer-events: auto;
      }
      
      .skill-tooltip.active {
        opacity: 1;
        transform: translateY(0);
      }
      
      .tooltip-content {
        padding: 1rem;
      }
      
      .tooltip-content h4 {
        margin: 0 0 0.5rem;
        color: var(--primary-color);
        font-size: 1rem;
      }
      
      .tooltip-content p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--text-color);
      }
      
      .tooltip-arrow {
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid var(--card-bg);
      }
      
      .skill-tooltip.bottom .tooltip-arrow {
        top: auto;
        bottom: -8px;
        border-bottom: none;
        border-top: 8px solid var(--card-bg);
      }
      
      /* Notification styles */
      .cv-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--success-color);
        color: white;
        border-radius: var(--border-radius-md);
        padding: 1rem;
        z-index: 1000;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-md);
      }
      
      .cv-notification.active {
        transform: translateX(0);
        opacity: 1;
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      @media (max-width: 768px) {
        .skill-tooltip {
          max-width: 250px;
        }
      }
    `;
    
    document.head.appendChild(style);
  }
});

// Add custom contains selector for plain JavaScript
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

// Extend querySelector to support :contains
if (!document.querySelector('h2:contains("About")')) {
  const originalQuerySelector = document.querySelector;
  document.querySelector = function(selector) {
    try {
      if (selector.includes(':contains(')) {
        const match = /:contains\(['"]?([^'"]+)['"]?\)/.exec(selector);
        if (match) {
          const baseSelector = selector.split(':contains')[0];
          const searchText = match[1];
          
          const elements = document.querySelectorAll(baseSelector);
          for (let i = 0; i < elements.length; i++) {
            if (elements[i].textContent.includes(searchText)) {
              return elements[i];
            }
          }
          return null;
        }
      }
      return originalQuerySelector.call(this, selector);
    } catch (e) {
      return originalQuerySelector.call(this, selector);
    }
  };
}