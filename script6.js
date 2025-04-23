document.addEventListener('DOMContentLoaded', function() {
    const textVariations = {
      "Welcome to The Gaslighting Website": [
        "Welcome to The Gaslightning Website",
        "Welcome to The Gasslighting Website",
        "Welcome to The Gaslighting Web Site",
        "Welcome to Our Gaslighting Website",
        "Welcome to The Gaslighting Website"
      ],
      "This website may seem normal at first, but things aren't always as they appear. You might notice some elements changing over time, or perhaps you're just imagining things?": [
        "This website may seem normal at first, but things aren't always what they appear. You might notice some elements changing over time, or perhaps you're just imagining things?",
        "This website might seem normal initially, but things aren't always as they appear. You could notice some elements changing over time, or perhaps it's all in your imagination?",
        "This website may seem typical at first, but appearances can be deceiving. You might notice elements changing subtly, or perhaps you're just seeing things?",
        "The website appears normal initially, but things aren't always as they seem. You could notice elements transforming gradually, or maybe you're just imagining it?",
        "This site may look ordinary at first, but things aren't always as they appear. You might notice some elements shifting over time, or are you just imagining things?"
      ],
      "Our team of experts has designed this experience to test the limits of human perception. Are you seeing what you think you're seeing? Can you trust your memory?": [
        "Our team of experts designed this experience to test the boundaries of human perception. Are you seeing what you think you're seeing? Can you trust your memory?",
        "Our expert team has created this experience to explore the limits of human perception. Are you really seeing what you think? Can you trust your own memory?",
        "A team of specialists designed this experience to test human perception limits. Are you seeing what you believe you're seeing? Can your memory be trusted?",
        "Our experts designed this experience to push the boundaries of perception. Are you truly seeing what you think? Is your memory reliable?",
        "This experience was crafted by our team to test perceptual limitations. Are you seeing correctly? How trustworthy is your memory?"
      ],
      "Key Features": [
        "Main Features",
        "Key Features",
        "Core Features",
        "Primary Features",
        "Essential Features"
      ],
      "Seamless user interface that adapts to your preferences": [
        "Seamless user interface that adapts to your preferences",
        "Smooth user interface that adjusts to your preferences",
        "Seamless interface that adapts to user preferences",
        "Intuitive user interface that conforms to your preferences",
        "Frictionless UI that adapts to personal preferences"
      ],
      "Advanced memory testing algorithms": [
        "Advanced memory testing algorithms",
        "Sophisticated memory testing algorithms",
        "Advanced memory assessment algorithms",
        "Cutting-edge memory testing systems",
        "Next-generation memory testing protocols"
      ],
      "State-of-the-art perception validation tools": [
        "State-of-the-art perception validation tools",
        "Leading-edge perception verification tools",
        "State-of-the-art perception testing instruments",
        "Cutting-edge perception validation mechanisms",
        "Advanced perception validation utilities"
      ],
      "Cutting-edge reality questioning mechanisms": [
        "Cutting-edge reality questioning mechanisms",
        "Advanced reality verification systems",
        "Innovative reality questioning functions",
        "Sophisticated reality testing mechanisms",
        "Next-gen reality questioning frameworks"
      ],
      "Try taking a screenshot and comparing it later. That should prove things one way or another.": [
        "Try taking a screenshot and comparing it later. That should prove things one way or another.",
        "Consider taking a screenshot to compare later. That might provide some proof either way.",
        "Maybe take a screenshot for later comparison. That could help verify your suspicions.",
        "You could take a screenshot to check later. That should help determine what's happening.",
        "Perhaps capture a screenshot for future reference! That might help confirm your experience."
      ]
    };
    
    const startBgColor = [240, 240, 240];
    const endBgColor = [235, 238, 245];t
    
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.originalHref = item.getAttribute('href');
      item.destinations = JSON.parse(item.getAttribute('data-destinations'));
      item.currentIndex = 0;
    });
    
    const changingTextElements = document.querySelectorAll('.changing-text');
    changingTextElements.forEach(el => {
      el.originalText = el.textContent;
      el.dataset.lastChanged = Date.now();
    });
    
    let userActive = true;
    let userLastActive = Date.now();
    let pageVisibility = true;
    
    function changeElementsSubtly() {
      const now = Date.now();
      if ((now - userLastActive > 5000 || !pageVisibility) && Math.random() < 0.3) {
        changingTextElements.forEach(el => {
          if (now - el.dataset.lastChanged < 30000) return;
          
          if (Math.random() < 0.3 && textVariations[el.originalText]) {
            const variations = textVariations[el.originalText];
            const currentText = el.textContent;
            let newText;
            
            do {
              newText = variations[Math.floor(Math.random() * variations.length)];
            } while (newText === currentText && variations.length > 1);
            
            el.classList.add('hidden');
            
            setTimeout(() => {
              el.textContent = newText;
              el.classList.remove('hidden');
              el.dataset.lastChanged = now;
            }, 300);
          }
        });
      }
    }
    
    function shiftBackgroundColor() {
      const elapsed = (Date.now() % 3600000) / 3600000;
      const r = Math.round(startBgColor[0] + (endBgColor[0] - startBgColor[0]) * elapsed);
      const g = Math.round(startBgColor[1] + (endBgColor[1] - startBgColor[1]) * elapsed);
      const b = Math.round(startBgColor[2] + (endBgColor[2] - startBgColor[2]) * elapsed);
      document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
    
    function rotateImages() {
      const rotatingElements = document.querySelectorAll('.rotate-element');
      rotatingElements.forEach(el => {
        const rotationAmount = (Date.now() % 7200000) / 20000;
        el.style.transform = `rotate(${rotationAmount}deg)`;
      });
    }
    
    function changeNavDestinations() {
      if (!userActive || !pageVisibility) {
        navItems.forEach(item => {
          if (Math.random() < 0.2) {
            item.currentIndex = (item.currentIndex + 1) % item.destinations.length;
            item.setAttribute('href', item.destinations[item.currentIndex]);
          }
        });
      }
    }
    
    document.addEventListener('mousemove', function() {
      userActive = true;
      userLastActive = Date.now();
      setTimeout(() => { userActive = false; }, 2000);
    });
    
    document.addEventListener('click', function() {
      userActive = true;
      userLastActive = Date.now();
      setTimeout(() => { userActive = false; }, 2000);
    });
    
    document.addEventListener('keydown', function() {
      userActive = true;
      userLastActive = Date.now();
      setTimeout(() => { userActive = false; }, 2000);
    });
    
    document.addEventListener('visibilitychange', function() {
      pageVisibility = document.visibilityState === 'visible';
      
      if (pageVisibility && document.visibilityState === 'visible') {
        setTimeout(changeElementsSubtly, 100);
        setTimeout(changeNavDestinations, 200);
      }
    });
    
    navItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.body.style.opacity = '0.8';
        setTimeout(() => {
          document.body.style.opacity = '1';
          
          changeElementsSubtly();
          changeNavDestinations();
          
          if (Math.random() < 0.1) {
            const root = document.documentElement;
            const primary = getComputedStyle(root).getPropertyValue('--primary-color');
            const secondary = getComputedStyle(root).getPropertyValue('--secondary-color');
            root.style.setProperty('--primary-color', secondary);
            root.style.setProperty('--secondary-color', primary);
          }
          
          window.scrollTo(0, 0);
        }, 100);
      });
    });
    
    function changeElementSizes() {
      if (!userActive || !pageVisibility) {
        const container = document.querySelector('.container');
        const currentFontSize = window.getComputedStyle(container).fontSize;
        const size = parseFloat(currentFontSize);
        
        if (Math.random() < 0.5) {
          const newSize = Math.random() < 0.5 ? size * 0.99 : size * 1.01;
          container.style.fontSize = `${newSize}px`;
        }
      }
    }
    
    let lastScrollPosition = window.scrollY;
    window.addEventListener('scroll', function() {
      lastScrollPosition = window.scrollY;
    });
    
    function adjustScrollPosition() {
      if (!userActive && Math.random() < 0.1) {
        const adjustment = Math.random() < 0.5 ? -10 : 10;
        window.scrollTo(0, lastScrollPosition + adjustment);
      }
    }
    
    setInterval(changeElementsSubtly, 10000);
    setInterval(shiftBackgroundColor, 5000);
    setInterval(rotateImages, 1000);
    setInterval(changeNavDestinations, 30000);
    setInterval(changeElementSizes, 60000);
    setInterval(adjustScrollPosition, 15000);
    
    let clickCount = 0;
    let clickTimer;
    let lastClickX = 0;
    let lastClickY = 0;
    
    document.addEventListener('click', function(e) {
      const distance = Math.sqrt(
        Math.pow(e.clientX - lastClickX, 2) + 
        Math.pow(e.clientY - lastClickY, 2)
      );
      
      if (distance < 20) {
        clickCount++;
      } else {
        clickCount = 1;
      }
      
      lastClickX = e.clientX;
      lastClickY = e.clientY;
      
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 1000);
      
      if (clickCount >= 5) {
        const root = document.documentElement;
        const primary = getComputedStyle(root).getPropertyValue('--primary-color');
        const secondary = getComputedStyle(root).getPropertyValue('--secondary-color');
        
        root.style.setProperty('--primary-color', secondary);
        root.style.setProperty('--secondary-color', primary);
        
        clickCount = 0;
      }
    });
    
    const pageLoadTime = Date.now();
    
    function intensifyEffects() {
      const minutesOnPage = (Date.now() - pageLoadTime) / 60000;
      
      if (minutesOnPage > 2) {
        if (Math.random() < 0.1) {
          const headerText = document.querySelector('h1');
          const currentText = headerText.textContent;
          
          const headerVariations = [
            "The Web Wasn't Ready For This",
            "The Web Wasn't Ready For You",
            "The Web Was Ready For This",
            "The Web Wasn't Made For This",
            "The Web Wasn't Meant For This"
          ];
          
          let newText;
          do {
            newText = headerVariations[Math.floor(Math.random() * headerVariations.length)];
          } while (newText === currentText);
          
          headerText.classList.add('hidden');
          setTimeout(() => {
            headerText.textContent = newText;
            headerText.classList.remove('hidden');
          }, 300);
        }
      }
      
      if (minutesOnPage > 5) {
        if (Math.random() < 0.05) {
          const dayCounter = document.querySelector('.day-counter');
          const currentDay = dayCounter.textContent;
          
          const dayVariations = [
            "Day 6: The Gaslighting Website",
            "Day 7: The Gaslighting Website",
            "Day 5: The Gaslighting Website",
            "Day ??: The Gaslighting Website",
            "Day 6: The Gaslit Website"
          ];
          
          let newDay;
          do {
            newDay = dayVariations[Math.floor(Math.random() * dayVariations.length)];
          } while (newDay === currentDay);
          
          dayCounter.classList.add('hidden');
          setTimeout(() => {
            dayCounter.textContent = newDay;
            dayCounter.classList.remove('hidden');
          }, 300);
        }
      }
    }
    
    setInterval(intensifyEffects, 60000);
  });