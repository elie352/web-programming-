document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupScrollToTop();
  setupNavHighlighting();
  setupSkillProgress();
  addScrollAnimations();
  setupUserSwitcher();
  loadSavedPreferences();
  setupContactForm(); // Added call
});

function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (!mobileMenuBtn || !mobileNav) return;
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target) && mobileNav.classList.contains('active')) {
      mobileMenuBtn.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}

function setupScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if (!scrollToTopBtn) return;
  window.addEventListener('scroll', () => {
    scrollToTopBtn.classList.toggle('active', window.scrollY > 500);
  });
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function setupNavHighlighting() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list a');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');
  if (!sections.length || (!navLinks.length && !mobileNavLinks.length)) return;

  function updateActiveLink() {
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + section.offsetHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    [...navLinks, ...mobileNavLinks].forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      const linkTargetId = href.includes('#') ? href.substring(href.lastIndexOf('#') + 1) : null;
      const linkPageName = href.substring(href.lastIndexOf('/') + 1).split('.')[0];

       if (linkTargetId && linkTargetId === currentSection) {
        link.classList.add('active');
      } else if (!linkTargetId && window.location.pathname.includes(link.pathname.substring(link.pathname.lastIndexOf('/')))) {
         if (linkPageName === 'index' && (currentSection === 'home' || !currentSection && window.scrollY < 200)) {
            link.classList.add('active');
         } else if (document.body.id === `${linkPageName}-page`) { // Assuming you add an ID to the body like <body id="cv-page">
            link.classList.add('active');
         }
      } else if (href === 'index.html' && (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html')) && (currentSection === 'home' || !currentSection && window.scrollY < 200 ) ) {
          link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink);
  window.addEventListener('load', updateActiveLink);
  updateActiveLink();
}

function setupSkillProgress() {
  const skillProgressBars = document.querySelectorAll('.skill-progress');
  if (!skillProgressBars.length) return;
  function animateSkills() {
    skillProgressBars.forEach(progress => {
      progress.style.width = progress.getAttribute('data-progress') + '%';
    });
  }
  const skillsSection = document.querySelector('.skills');
  const cvSkillsContainer = document.querySelector('.cv-card .skills-container');

  const targetSection = skillsSection || (cvSkillsContainer ? cvSkillsContainer.closest('.cv-card') : null);

  if (targetSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(animateSkills, 300);
        observer.unobserve(targetSection);
      }
    }, { threshold: 0.2 });
    observer.observe(targetSection);
  }
}

function addScrollAnimations() {
  const animatedElements = document.querySelectorAll('.project-card, .cv-card, .about-content, .skill-group, .topic-card');
  if (!animatedElements.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  animatedElements.forEach(element => {
    element.classList.add('animated');
    observer.observe(element);
  });
}

function loadSavedPreferences() {
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }
  loadSavedUser();
}

function setupUserSwitcher() {
  const userSwitchBtn = document.getElementById('userSwitchBtn');
  const userDropdown = document.getElementById('userDropdown');
  const userOptions = document.querySelectorAll('#userDropdown .user-option'); // Corrected selector
  const currentUserElement = document.getElementById('currentUser');

  if (!userSwitchBtn || !userDropdown || !userOptions.length || !currentUserElement) return;

  userSwitchBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('active');
  });
  document.addEventListener('click', () => userDropdown.classList.remove('active'));
  userDropdown.addEventListener('click', (e) => e.stopPropagation());

  userOptions.forEach(option => {
    option.addEventListener('click', () => {
      const username = option.dataset.username;
      currentUserElement.textContent = username;
      userOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      userDropdown.classList.remove('active');
      handleUserSwitch(username);
    });
  });
  setupMobileUserSwitcher();
}

function setupMobileUserSwitcher() {
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavList = mobileNav ? mobileNav.querySelector('.mobile-nav-list') : null;
  if (!mobileNav || !mobileNavList) return;

  let mobileUserSwitcher = mobileNav.querySelector('.mobile-user-switcher');
  if (!mobileUserSwitcher) {
     const initialUser = localStorage.getItem('currentUser') || 'Andrew Chahine';
     mobileUserSwitcher = document.createElement('div');
     mobileUserSwitcher.className = 'mobile-user-switcher';
     mobileUserSwitcher.innerHTML = `
       <div class="mobile-user-label">Switch User:</div>
       <div class="mobile-user-options">
         <div class="mobile-user-option ${initialUser === 'Andrew Chahine' ? 'active' : ''}" data-username="Andrew Chahine"><i class="fas fa-user"></i> <span>Andrew Chahine</span></div>
         <div class="mobile-user-option ${initialUser === 'Elie Matta' ? 'active' : ''}" data-username="Elie Matta"><i class="fas fa-user"></i> <span>Elie Matta</span></div>
         <div class="mobile-user-option ${initialUser === 'John Aoun' ? 'active' : ''}" data-username="John Aoun"><i class="fas fa-user"></i> <span>John Aoun</span></div> {/* Changed */}
       </div>
     `;
     mobileNav.insertBefore(mobileUserSwitcher, mobileNavList);
  }

  const mobileUserOptions = mobileUserSwitcher.querySelectorAll('.mobile-user-option');
  const currentUserElement = document.getElementById('currentUser');
  const desktopUserOptions = document.querySelectorAll('#userDropdown .user-option'); // Corrected selector

  mobileUserOptions.forEach(option => {
    option.addEventListener('click', () => {
      const username = option.dataset.username;
      mobileUserOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      if (currentUserElement) currentUserElement.textContent = username;
      desktopUserOptions.forEach(opt => opt.classList.toggle('active', opt.dataset.username === username));

      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      if (mobileNav.classList.contains('active') && mobileMenuBtn) {
          mobileMenuBtn.classList.remove('active');
          mobileNav.classList.remove('active');
          document.body.classList.remove('menu-open');
      }
      handleUserSwitch(username);
    });
  });
}

function handleUserSwitch(username) {
  localStorage.setItem('currentUser', username);
  const currentPath = window.location.pathname;
  const isIndexPage = currentPath.endsWith('/') || currentPath.endsWith('index.html');

  if (isIndexPage) {
    updateSiteForUser(username);
    showNotification(`Switched to ${username}`);
  } else {
    // For other pages like CV, Quiz, Schedule, Research, we reload
    // The loadSavedUser function on those pages will handle updating content
    window.location.reload();
  }
}

function loadSavedUser() {
  const savedUser = localStorage.getItem('currentUser') || 'Andrew Chahine'; // Default user
  if (localStorage.getItem('currentUser') !== savedUser) {
     localStorage.setItem('currentUser', savedUser);
  }

  const currentUserElement = document.getElementById('currentUser');
  const userOptions = document.querySelectorAll('#userDropdown .user-option'); // Corrected selector
  const mobileUserOptions = document.querySelectorAll('#mobileNav .mobile-user-option'); // Corrected selector for mobile

  if (currentUserElement) currentUserElement.textContent = savedUser;
  userOptions.forEach(opt => opt.classList.toggle('active', opt.dataset.username === savedUser));
  mobileUserOptions.forEach(opt => opt.classList.toggle('active', opt.dataset.username === savedUser));

  // This will update common elements like header/footer if needed, and specific page content
  updateSiteForUser(savedUser);

   // Call page-specific update functions if they exist
   if (typeof updateCVForCurrentUser === 'function' && document.querySelector('.cv-profile-info')) { // Check if on CV page
     updateCVForCurrentUser();
   }
   if (typeof loadSchedule === 'function' && document.getElementById('semesterSelect')) { // Check if on Schedule page
        const semesterSelect = document.getElementById('semesterSelect');
        const initialSemester = semesterSelect ? semesterSelect.value : 'fall2024';
        loadSchedule(initialSemester, savedUser); // From schedule.js
        if(typeof updateNotesForCurrentUser === 'function') {
            updateNotesForCurrentUser(savedUser); // From schedule.js
        }
   }
   // No specific load function needed here for quiz.js as it initializes on its own
   // No specific load function needed for research.js as it handles its own language and data loading.
}

function updateSiteForUser(username) {
  const userProfiles = {
    'Andrew Chahine': { logoText: 'AC', title: 'Computer Science Student', email: 'andrewchahine24@gmail.com', phone: '+961 71 818 789', location: 'Jeita, Lebanon', headline: "I'm a motivated computer science student with excellent communication skills and a positive, adaptable attitude.", bio: "I'm a motivated computer science student with excellent communication skills and a positive, adaptable attitude. Comfortable in fast-paced environments and skilled at working both independently and as part of a team.\n\nKnown for being reliable, friendly, and dedicated to delivering outstanding service. Always ready to go the extra mile to ensure a great customer experience.\n\nCurrently pursuing my Bachelor's degree in Computer Science at Holy Spirit University of Kaslik while gaining practical experience through various activities and projects.", birthday: 'August 12, 2004', education: "Bachelor's in Computer Science (in progress)", languages: 'Arabic (Native), English (Fluent), French (Advanced)', profileImage: 'images/user1.jpg' },
    'Elie Matta': { logoText: 'EM', title: 'Computer Science Student', email: 'elie.b.matta@net.usek.edu.lb', phone: '+961 81 376 071', location: 'Byblos, Lebanon', headline: 'I am a dedicated Computer Science student focusing on software development and innovative technology solutions.', bio: "Passionate about technology and problem-solving, I am currently in my first year of Computer Engineering at Holy Spirit University of Kaslik. I am eager to apply my growing knowledge to real-world challenges and contribute to impactful projects.\n\nMy experience as a waiter has honed my communication and multitasking skills, preparing me for dynamic team environments. I am also actively involved in church and community movements, developing leadership and organizational abilities.", birthday: 'March 11, 2005', education: "Bachelor's in Computer Engineering (in progress)", languages: 'Arabic (Native), English (Fluent), French (Advanced)', profileImage: 'images/ElieMatta.png' },
    'John Aoun': { logoText: 'JA', title: 'Full-Stack Developer & Data Analyst', email: 'john.aoun@example.com', phone: '+1 (206) 555-1234', location: 'Seattle, Washington', headline: 'I build data-driven applications and bring complex data to life through intuitive design.', bio: "I'm a full-stack developer with a background in data science, combining technical expertise with analytical thinking to create meaningful digital solutions. With 4 years of professional experience, I specialize in developing applications that make data accessible and useful.\n\nCurrently working in Seattle, I focus on creating scalable web applications with robust backends and intuitive frontends. I'm particularly interested in data visualization and making complex information understandable through thoughtful interface design.", birthday: 'May 20, 1992', education: "Master's in Data Science, University of Washington", languages: 'English (Native), Mandarin (Basic), German (Intermediate)', profileImage: 'images/user3.jpg' }
  };
  const profile = userProfiles[username];
  if (!profile) {
      console.warn(`Profile for ${username} not found in userProfiles.`);
      return;
  }

  document.querySelectorAll('.logo a').forEach(logo => logo.textContent = profile.logoText || "Portfolio");
  const footerCopyright = document.querySelector('.footer-bottom p');
  if (footerCopyright) footerCopyright.textContent = `© ${new Date().getFullYear()} ${username}. All rights reserved.`;

    let pageSpecificSegment = profile.title; // Default to profile title
    const currentPath = window.location.pathname;
    if(currentPath.includes('cv.html')) pageSpecificSegment = 'CV';
    else if(currentPath.includes('schedule.html')) pageSpecificSegment = 'Schedule';
    else if(currentPath.includes('quiz.html')) pageSpecificSegment = 'Quiz';
    else if(currentPath.includes('research.html')) pageSpecificSegment = 'Research';
    // For index.html, profile.title is already appropriate.

    document.title = `${username} | ${pageSpecificSegment}`;


  if (document.querySelector('.hero')) { // Only update hero section if it exists (i.e., on index.html)
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) heroTitle.innerHTML = `Hi, I'm <span class="highlight">${username}</span>`;
    const heroSubtitle = document.querySelector('.hero-text h2');
    if (heroSubtitle) heroSubtitle.textContent = profile.title;
    const heroDesc = document.querySelector('.hero-text p');
    if (heroDesc) heroDesc.textContent = profile.headline;

    const profileImgElement = document.getElementById('profileImage'); // Ensure your hero image has id="profileImage"
    if (profileImgElement) {
      profileImgElement.src = profile.profileImage || 'images/default-profile.jpg'; // Fallback image
      profileImgElement.alt = username;
    }

    // Update About Me section on index.html
    const aboutTextParas = document.querySelectorAll('#about .about-text p'); // Target paragraphs within the #about section
     if (aboutTextParas.length > 0 && profile.bio) {
        const bioParagraphs = profile.bio.split('\n\n'); // Split bio into paragraphs
        // Clear existing paragraphs first
        // aboutTextParas.forEach(p => p.textContent = ''); // Optional: clear existing before populating

        for (let i = 0; i < bioParagraphs.length; i++) {
            if (aboutTextParas[i]) { // If a <p> element exists at this index
                aboutTextParas[i].textContent = bioParagraphs[i];
            } else { // Optionally, create new <p> elements if bio has more paragraphs than available <p> tags
                // const newPara = document.createElement('p');
                // newPara.textContent = bioParagraphs[i];
                // document.querySelector('#about .about-text').appendChild(newPara); // Append to the correct container
            }
        }
        // If bio has fewer paragraphs than existing <p> tags, clear the extras
        for (let i = bioParagraphs.length; i < aboutTextParas.length; i++) {
            aboutTextParas[i].textContent = '';
        }
    }


    document.querySelectorAll('#about .info-list li').forEach(item => { // Target info-list within #about section
      const labelElement = item.querySelector('.info-label');
      const valueElement = item.querySelector('.info-value');
      if (labelElement && valueElement) {
        const labelText = labelElement.textContent || labelElement.innerText; // Get text content robustly
        if (labelText.includes('Birthday')) valueElement.textContent = profile.birthday;
        else if (labelText.includes('Education')) valueElement.textContent = profile.education;
        else if (labelText.includes('Location')) valueElement.textContent = profile.location;
        else if (labelText.includes('Email')) valueElement.textContent = profile.email;
        else if (labelText.includes('Phone')) valueElement.textContent = profile.phone;
        else if (labelText.includes('Languages')) valueElement.textContent = profile.languages;
      }
    });

    // Update contact section on index.html
    document.querySelectorAll('#contact .contact-details a[href^="mailto:"]').forEach(el => { el.href = `mailto:${profile.email}`; el.textContent = profile.email; });
    document.querySelectorAll('#contact .contact-details a[href^="tel:"]').forEach(el => { el.href = `tel:${profile.phone.replace(/\s+/g, '')}`; el.textContent = profile.phone; });
    document.querySelectorAll('#contact .contact-details').forEach(details => {
        const heading = details.querySelector('h4');
        if(heading && (heading.textContent === 'Location' || heading.innerText === 'Location')) { // Check both
            const p = details.querySelector('p');
            if(p) p.textContent = profile.location;
        }
    });
  }
}

function showNotification(message) {
  let notification = document.querySelector('.user-notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.className = 'user-notification';
    document.body.appendChild(notification);
    if (!document.getElementById('notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        .user-notification {
          position: fixed; bottom: 20px; right: 20px;
          background-color: var(--primary-color); color: white;
          padding: 0.75rem 1.5rem; border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-md); z-index: 9999;
          transform: translateY(100px); opacity: 0; transition: all 0.3s ease;
        }
        .user-notification.active { transform: translateY(0); opacity: 1; }
        html[dir="rtl"] .user-notification { right: auto; left: 20px; }
      `;
      document.head.appendChild(style);
    }
  }
  notification.textContent = message;
  notification.classList.add('active');
  setTimeout(() => {
    notification.classList.remove('active');
    setTimeout(() => { if (notification.parentNode) notification.parentNode.removeChild(notification); }, 300);
  }, 3000);
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            fetch('submit_contact.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showNotification(data.message || 'Message sent successfully!');
                    contactForm.reset();
                } else {
                    showNotification(data.message || 'Error sending message.');
                }
            })
            .catch(error => {
                console.error('Error submitting contact form:', error);
                showNotification('An error occurred. Please try again.');
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
        });
    }
}

// Polyfills for older browser compatibility (mostly for IE, but good practice)
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
if (typeof NodeList !== 'undefined' && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
if (typeof String.prototype.endsWith !== 'function') {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}
if (typeof String.prototype.includes !== 'function') {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}