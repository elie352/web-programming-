/**
 * Main JavaScript file for portfolio website
 * Handles common functionality across all pages including:
 * - Mobile menu toggle
 * - Dark mode toggle
 * - Scroll to top button
 * - Navigation highlighting
 * - Scroll animations
 * - User switching
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  setupMobileMenu();
  setupDarkMode();
  setupScrollToTop();
  setupNavHighlighting();
  setupSkillProgress();
  addScrollAnimations();
  
  // Initialize user switcher functionality
  setupUserSwitcher();
  
  // Check for saved preferences
  loadSavedPreferences();
  
  // Check if we need to update page-specific content
  updatePageSpecificContent();
});

/**
 * Mobile Menu Toggle
 * Shows/hides the mobile navigation menu
 */
function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  
  if (!mobileMenuBtn || !mobileNav) return;
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target) && mobileNav.classList.contains('active')) {
      mobileMenuBtn.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}

/**
 * Dark Mode Toggle
 * Switches between light and dark mode
 */
function setupDarkMode() {
  const modeToggle = document.getElementById('modeToggle');
  
  if (!modeToggle) return;
  
  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }
  });
}

/**
 * Scroll to Top Button
 * Shows/hides the scroll to top button based on scroll position
 */
function setupScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  if (!scrollToTopBtn) return;
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add('active');
    } else {
      scrollToTopBtn.classList.remove('active');
    }
  });
  
  // Scroll to top when button is clicked
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Navigation Highlighting
 * Highlights the current section in the navigation
 */
function setupNavHighlighting() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list a');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');
  
  if (!sections.length || !navLinks.length) return;
  
  function updateActiveLink() {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}` || 
          (link.getAttribute('href') === 'index.html' && currentSection === 'home')) {
        link.classList.add('active');
      }
    });
    
    mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}` ||
          (link.getAttribute('href') === 'index.html' && currentSection === 'home')) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveLink);
  window.addEventListener('load', updateActiveLink);
}

/**
 * Skill Progress Animation
 * Animates the skill progress bars
 */
function setupSkillProgress() {
  const skillProgress = document.querySelectorAll('.skill-progress');
  
  if (!skillProgress.length) return;
  
  function animateSkills() {
    skillProgress.forEach(progress => {
      const progressValue = progress.getAttribute('data-progress');
      progress.style.width = `${progressValue}%`;
    });
  }
  
  // Use Intersection Observer to trigger animation when skills are visible
  const skillsSection = document.querySelector('.skills');
  
  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(animateSkills, 300);
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(skillsSection);
  } else {
    // If not on homepage, animate immediately
    animateSkills();
  }
}

/**
 * Scroll Animations
 * Adds fade-in animations to elements when they come into view
 */
function addScrollAnimations() {
  const animatedElements = document.querySelectorAll('.project-card, .cv-card, .about-content, .skill-group');
  
  if (!animatedElements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    element.classList.add('animated');
    observer.observe(element);
  });
}

/**
 * Load Saved Preferences
 * Loads user preferences from localStorage
 */
function loadSavedPreferences() {
  // Dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }
  
  // Add header scroll effect
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Load saved user preference
  loadSavedUser();
}

/**
 * User Switcher Functionality
 * Allows switching between different user profiles
 */
function setupUserSwitcher() {
  const userSwitchBtn = document.getElementById('userSwitchBtn');
  const userDropdown = document.getElementById('userDropdown');
  const userOptions = document.querySelectorAll('.user-option');
  const currentUserElement = document.getElementById('currentUser');
  
  if (!userSwitchBtn || !userDropdown) return;
  
  // Toggle dropdown
  userSwitchBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('active');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    userDropdown.classList.remove('active');
  });
  
  // Prevent dropdown from closing when clicking inside it
  userDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  
  // Handle user selection
  userOptions.forEach(option => {
    option.addEventListener('click', () => {
      const username = option.dataset.username;
      
      // Update current user display
      if (currentUserElement) {
        currentUserElement.textContent = username;
      }
      
      // Update active class
      userOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      
      // Close dropdown
      userDropdown.classList.remove('active');
      
      // Save selected user to localStorage
      localStorage.setItem('currentUser', username);
      localStorage.setItem('switchTimestamp', Date.now().toString());
      
      // Show notification
      showNotification(`Switched to ${username}`);
      
      // Update site content based on user
      updateSiteForUser(username);
      
      // Update page-specific content
      updatePageSpecificContent();
      
      // Force reload if we're not on the homepage
      if (window.location.pathname !== '/' && !window.location.pathname.includes('index.html')) {
        window.location.reload();
      }
    });
  });
  
  // Setup mobile user switcher if it exists
  setupMobileUserSwitcher();
  
  // Listen for changes from other tabs/pages
  window.addEventListener('storage', (e) => {
    if (e.key === 'currentUser' || e.key === 'switchTimestamp') {
      // Another tab changed the user, reload to show changes
      window.location.reload();
    }
  });
}

/**
 * Setup Mobile User Switcher
 * Creates a user switcher for mobile view
 */
function setupMobileUserSwitcher() {
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavList = document.querySelector('.mobile-nav-list');
  
  if (!mobileNav || !mobileNavList) return;
  
  // Create mobile user switcher if it doesn't exist
  if (!document.querySelector('.mobile-user-switcher')) {
    const currentUser = localStorage.getItem('currentUser') || 'Andrew Chahine';
    
    const mobileUserSwitcher = document.createElement('div');
    mobileUserSwitcher.className = 'mobile-user-switcher';
    mobileUserSwitcher.innerHTML = `
      <div class="mobile-user-label">Switch User:</div>
      <div class="mobile-user-options">
        <div class="mobile-user-option ${currentUser === 'Andrew Chahine' ? 'active' : ''}" data-username="Andrew Chahine">
          <i class="fas fa-user"></i>
          <span>Andrew Chahine</span>
        </div>
        <div class="mobile-user-option ${currentUser === 'Elie Matta' ? 'active' : ''}" data-username="Elie Matta">
          <i class="fas fa-user"></i>
          <span>Elie Matta</span>
        </div>
        <div class="mobile-user-option ${currentUser === 'Jhon aun ' ? 'active' : ''}" data-username="Jhon aun ">
          <i class="fas fa-user"></i>
          <span>Jhon aun </span>
        </div>
      </div>
    `;
    
    // Insert before mobile nav list
    mobileNav.insertBefore(mobileUserSwitcher, mobileNavList);
  }
  
  // Handle user selection in mobile view
  const mobileUserOptions = document.querySelectorAll('.mobile-user-option');
  
  mobileUserOptions.forEach(option => {
    option.addEventListener('click', () => {
      const username = option.dataset.username;
      
      // Update active class
      mobileUserOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      
      // Update desktop user switcher
      const desktopUserOptions = document.querySelectorAll('.user-option');
      const currentUserElement = document.getElementById('currentUser');
      
      if (currentUserElement) {
        currentUserElement.textContent = username;
      }
      
      desktopUserOptions.forEach(opt => {
        if (opt.dataset.username === username) {
          opt.classList.add('active');
        } else {
          opt.classList.remove('active');
        }
      });
      
      // Save selected user to localStorage
      localStorage.setItem('currentUser', username);
      localStorage.setItem('switchTimestamp', Date.now().toString());
      
      // Show notification
      showNotification(`Switched to ${username}`);
      
      // Update site content based on user
      updateSiteForUser(username);
      
      // Update page-specific content
      updatePageSpecificContent();
      
      // Force reload if we're not on the homepage
      if (window.location.pathname !== '/' && !window.location.pathname.includes('index.html')) {
        window.location.reload();
      }
    });
  });
}

/**
 * Load Saved User
 * Loads the saved user preference from localStorage
 */
function loadSavedUser() {
  const savedUser = localStorage.getItem('currentUser');
  
  if (savedUser) {
    const userOptions = document.querySelectorAll('.user-option');
    const mobileUserOptions = document.querySelectorAll('.mobile-user-option');
    const currentUserElement = document.getElementById('currentUser');
    
    if (currentUserElement) {
      currentUserElement.textContent = savedUser;
    }
    
    userOptions.forEach(option => {
      if (option.dataset.username === savedUser) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
    
    mobileUserOptions.forEach(option => {
      if (option.dataset.username === savedUser) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
    
    // Update site content for this user
    updateSiteForUser(savedUser);
  } else {
    // Default to Andrew Chahine if no user is saved
    localStorage.setItem('currentUser', 'Andrew Chahine');
  }
}

/**
 * Update Site for User
 * Updates site content based on selected user
 * @param {string} username - The selected username
 */
function updateSiteForUser(username) {
  // Define user-specific content for each profile
  const userProfiles = {
    'Andrew Chahine': {
      logoText: 'U1',
      title: 'Software Developer & UI/UX Designer',
      email: 'user1@example.com',
      phone: '+123 45 678 910',
      location: 'City, Country',
      headline: 'I create intuitive and engaging digital experiences that solve real problems.',
      bio: "I'm a passionate full-stack developer with a strong focus on creating intuitive and efficient digital solutions. With 3 years of professional experience, I specialize in modern web technologies and user interface design.\n\nCurrently based in Aramoun, I'm pursuing my Master's degree in Computer Science while working on freelance projects. My approach combines technical expertise with creative problem-solving to build applications that not only work flawlessly but also provide an exceptional user experience.\n\nWhen I'm not coding, you'll find me exploring hiking trails, experimenting with photography, or contributing to open-source projects that make a difference.",
      birthday: 'Months Day, Year',
      education: "Master's in Computer Science (in progress)",
      languages: 'English (Native), Spanish (Intermediate), French (Basic)'
    },
    'Elie Matta': {
      logoText: 'EM',
      title: 'Backend Developer & UX Specialist',
      email: 'elie.b.matta@net.usek.edu.lb',
      phone: '+961 81 376 071',
      location: 'Kfarmashoun, Byblos',
      headline: 'I craft beautiful interfaces and seamless user experiences that delight customers.',
      bio: "I'm a specialized frontend developer with a passion for creating clean, efficient, and user-friendly interfaces. With 5 years of experience in web development, I focus on translating design concepts into responsive and accessible websites.\n\nBased in Beirut, I collaborate with designers and backend developers to build cohesive applications that prioritize user experience. I believe that great design is invisible—it should feel natural and intuitive to users.\n\nOutside of work, I enjoy playing guitar, exploring street photography, and mentoring aspiring developers in my community.",
      birthday: 'March 11, 2005',
      education: "Bachelor's in Computer Engineering",
      languages: 'Arabic (Native), English (Fluent), French (Intermediate)'
    },
    'Jhon aun ': {
      logoText: 'U3',
      title: 'Full-Stack Developer & Data Analyst',
      email: 'user3@example.com',
      phone: '+123 45 678 910',
      location: 'Seattle, Washington',
      headline: 'I build data-driven applications that transform complex information into actionable insights.',
      bio: "I'm a full-stack developer with a background in data science, combining technical expertise with analytical thinking to create meaningful digital solutions. With 4 years of professional experience, I specialize in developing applications that make data accessible and useful.\n\nCurrently working in Seattle, I focus on creating scalable web applications with robust backends and intuitive frontends. I'm particularly interested in data visualization and making complex information understandable through thoughtful interface design.\n\nWhen I'm away from my keyboard, I enjoy hiking in the Pacific Northwest, practicing yoga, and volunteering with coding education programs for underrepresented groups in tech.",
      birthday: 'Months Day, Year',
      education: "Master's in Data Science",
      languages: 'English (Native), Mandarin (Basic), German (Intermediate)'
    }
  };
  
  // Get the user profile data
  const profile = userProfiles[username];
  if (!profile) return;
  
  // Update page title
  const originalTitle = document.title;
  const titleParts = originalTitle.split('|');
  
  if (titleParts.length > 1) {
    const newTitle = `${username} | ${titleParts[1].trim()}`;
    document.title = newTitle;
  } else {
    document.title = username;
  }
  
  // Update logo text
  const logoElements = document.querySelectorAll('.logo a');
  logoElements.forEach(logo => {
    logo.textContent = profile.logoText;
  });
  
  // Update hero section if we're on the home page
  updateHeroSection(username, profile);
  
  // Update about section if it exists
  updateAboutSection(profile);
  
  // Update contact information
  updateContactInfo(profile);
  
  // Update footer copyright
  const footerCopyright = document.querySelector('.footer-bottom p');
  if (footerCopyright) {
    footerCopyright.textContent = `© 2025 ${username}. All rights reserved.`;
  }
}

/**
 * Update Hero Section
 * Updates the hero section content for the selected user
 * @param {string} username - The username
 * @param {Object} profile - The user profile data
 */
function updateHeroSection(username, profile) {
  // Update hero title
  const heroTitleElement = document.querySelector('.hero-text h1');
  if (heroTitleElement) {
    const highlightSpan = heroTitleElement.querySelector('.highlight');
    if (highlightSpan) {
      highlightSpan.textContent = username;
    } else {
      heroTitleElement.innerHTML = `Hi, I'm <span class="highlight">${username}</span>`;
    }
  }
  
  // Update hero subtitle
  const heroSubtitleElement = document.querySelector('.hero-text h2');
  if (heroSubtitleElement) {
    heroSubtitleElement.textContent = profile.title;
  }
  
  // Update hero description
  const heroDescriptionElement = document.querySelector('.hero-text p');
  if (heroDescriptionElement) {
    heroDescriptionElement.textContent = profile.headline;
  }
  
  // Update profile image alt text if it exists
  const profileImage = document.querySelector('.hero-image img, .image-container img');
  // Update profile image source based on selected user
if (profileImage) {
  // Set different profile images for different users
  if (username === 'Elie Matta') {
    profileImage.src = "images/ElieMatta.png";
  } else if (username === 'Jhon aun ') {
    profileImage.src = 'images/user3.jpg';
  } else {
    profileImage.src = 'images/user1.jpg'; // Default for Andrew Chahine
  }
}
}

/**
 * Update About Section
 * Updates the about section content for the selected user
 * @param {Object} profile - The user profile data
 */
function updateAboutSection(profile) {
  // Update about text paragraphs
  const aboutTextElements = document.querySelectorAll('.about-text p');
  if (aboutTextElements.length > 0) {
    // Split the bio into paragraphs
    const bioParagraphs = profile.bio.split('\n\n');
    
    // Update existing paragraphs
    for (let i = 0; i < Math.min(aboutTextElements.length, bioParagraphs.length); i++) {
      aboutTextElements[i].textContent = bioParagraphs[i];
    }
  }
  
  // Update about info list items
  const infoItems = document.querySelectorAll('.info-list li');
  infoItems.forEach(item => {
    const label = item.querySelector('.info-label');
    const value = item.querySelector('.info-value');
    
    if (label && value) {
      if (label.textContent.includes('Birthday')) {
        value.textContent = profile.birthday;
      } else if (label.textContent.includes('Education')) {
        value.textContent = profile.education;
      } else if (label.textContent.includes('Location')) {
        value.textContent = profile.location;
      } else if (label.textContent.includes('Email')) {
        value.textContent = profile.email;
      } else if (label.textContent.includes('Phone')) {
        value.textContent = profile.phone;
      } else if (label.textContent.includes('Languages')) {
        value.textContent = profile.languages;
      }
    }
  });
}

/**
 * Update Contact Information
 * Updates the contact information for the selected user
 * @param {Object} profile - The user profile data
 */
function updateContactInfo(profile) {
  // Update email elements
  document.querySelectorAll('a[href^="mailto:"]').forEach(element => {
    element.href = `mailto:${profile.email}`;
    element.textContent = profile.email;
  });
  
  // Update phone elements
  document.querySelectorAll('a[href^="tel:"]').forEach(element => {
    element.href = `tel:${profile.phone}`;
    element.textContent = profile.phone;
  });
  
  // Update location text
  document.querySelectorAll('.contact-details h4, .contact-details p').forEach(element => {
    if (element.textContent.trim() === 'Location') {
      const locationElement = element.nextElementSibling;
      if (locationElement) {
        locationElement.textContent = profile.location;
      }
    }
  });
  
  // Direct approach for contact details
  const contactDetails = document.querySelectorAll('.contact-details');
  contactDetails.forEach(details => {
    const heading = details.querySelector('h4');
    if (heading) {
      if (heading.textContent === 'Location') {
        const paragraph = details.querySelector('p');
        if (paragraph) paragraph.textContent = profile.location;
      } else if (heading.textContent === 'Email') {
        const link = details.querySelector('a');
        if (link) {
          link.href = `mailto:${profile.email}`;
          link.textContent = profile.email;
        }
      } else if (heading.textContent === 'Phone') {
        const link = details.querySelector('a');
        if (link) {
          link.href = `tel:${profile.phone}`;
          link.textContent = profile.phone;
        }
      }
    }
  });
}

/**
 * Update Page Specific Content
 * Checks which page we're on and updates page-specific content
 */
function updatePageSpecificContent() {
  const path = window.location.pathname;
  
  // Check which page we're on
  if (path.includes('schedule.html')) {
    if (typeof updateScheduleForCurrentUser === 'function') {
      updateScheduleForCurrentUser();
    }
  } else if (path.includes('cv.html')) {
    if (typeof updateCVForCurrentUser === 'function') {
      updateCVForCurrentUser();
    }
  }
}

/**
 * Show Notification
 * Displays a notification message
 * @param {string} message - The notification message
 */
function showNotification(message) {
  // Create notification element if it doesn't exist
  let notification = document.querySelector('.user-notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.className = 'user-notification';
    document.body.appendChild(notification);
    
    // Add notification styles if not already in CSS
    if (!document.getElementById('notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        .user-notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: var(--primary-color);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-md);
          z-index: 9999;
          transform: translateY(100px);
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .user-notification.active {
          transform: translateY(0);
          opacity: 1;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Set message
  notification.textContent = message;
  
  // Show notification
  notification.classList.add('active');
  
  // Hide after delay
  setTimeout(() => {
    notification.classList.remove('active');
  }, 3000);
}

// Add custom contains selector for plain JavaScript
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

// Custom selector for elements containing text
document.querySelectorAll = (function(originalQuerySelectorAll) {
  return function(selector) {
    if (selector.includes(':contains(')) {
      // Extract the search text
      const match = selector.match(/:contains\((['"])(.*?)\1\)/);
      if (match) {
        const searchText = match[2];
        const newSelector = selector.replace(/:contains\(['"].*?['"]\)/, '');
        
        // Get elements with the basic selector
        const elements = originalQuerySelectorAll.call(this, newSelector);
        
        // Filter for elements containing the text
        const result = Array.from(elements).filter(el => 
          el.textContent.includes(searchText)
        );
        
        return result;
      }
    }
    return originalQuerySelectorAll.call(this, selector);
  };
})(document.querySelectorAll);