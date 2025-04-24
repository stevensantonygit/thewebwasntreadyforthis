document.addEventListener('DOMContentLoaded', function() {
    let mouseX = 0;
    let mouseY = 0;
    const cursorFollower = document.querySelector('.cursor-follower');
    
    let lastScrollTop = 0;
    let scrollDirection = 1;
    let scrollSpeed = 1;
    let isAccelerating = false;
    const scrollPosition = document.getElementById('scroll-position');
    
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const floatingElements = document.querySelectorAll('.floating-element');
    const zoomElements = document.querySelectorAll('.zoom-element');
    const zoomTargets = document.querySelectorAll('.zoom-target');
    
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursorFollower.style.left = mouseX + 'px';
      cursorFollower.style.top = mouseY + 'px';
    });
    
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      
      scrollPosition.textContent = Math.round(scrollPercentage) + '%';
      
      scrollDirection = (scrollTop > lastScrollTop) ? 1 : -1;
      lastScrollTop = scrollTop;
      
      parallaxLayers.forEach((layer, index) => {
        const speed = (index + 1) * 0.5;
        const yOffset = scrollTop * speed * scrollDirection;
        layer.style.transform = `translateY(${yOffset * 0.1}px) translateZ(${-10 + index * 5}px) scale(${2 - index * 0.5})`;
      });
      
      floatingElements.forEach((element, index) => {
        const speedMultiplier = parseFloat(element.textContent.match(/\d+(\.\d+)?/)) || ((index % 3) + 1);
        const yOffset = scrollTop * 0.2 * speedMultiplier * (index % 2 === 0 ? 1 : -1);
        const xOffset = Math.sin(scrollTop * 0.001 * speedMultiplier) * 50;
        element.style.transform = `translateY(${yOffset}px) translateX(${xOffset}px) rotate(${scrollTop * 0.05 * speedMultiplier}deg)`;
      });
      
      if (!isAccelerating && Math.random() < 0.005) {
        triggerScrollAcceleration();
      }
      
      if (Math.random() < 0.01) {
        triggerRandomZoom();
      }
    });
    
    function triggerScrollAcceleration() {
      isAccelerating = true;
      document.body.classList.add('scroll-acceleration');
      
      const direction = Math.random() < 0.5 ? 1 : -1;
      const amount = Math.random() * 2000 + 500;
      
      window.scrollBy({
        top: amount * direction,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        isAccelerating = false;
        document.body.classList.remove('scroll-acceleration');
      }, 1000);
    }
    
    function triggerRandomZoom() {
      const randomElement = zoomElements[Math.floor(Math.random() * zoomElements.length)];
      randomElement.style.transform = 'scale(2)';
      
      setTimeout(() => {
        randomElement.style.transform = 'scale(1)';
      }, 500);
    }
    
    setInterval(() => {
      zoomTargets.forEach(element => {
        if (Math.random() < 0.05) {
          const rect = element.getBoundingClientRect();
          const elemX = rect.left + rect.width / 2;
          const elemY = rect.top + rect.height / 2;
          
          const distX = mouseX - elemX;
          const distY = mouseY - elemY;
          const distance = Math.sqrt(distX * distX + distY * distY);
          
          if (distance < 500) {
            const zoomX = distX * 0.3;
            const zoomY = distY * 0.3;
            
            element.style.transform = `translate(${zoomX}px, ${zoomY}px) scale(1.5)`;
            
            setTimeout(() => {
              element.style.transform = 'translate(0, 0) scale(1)';
            }, 500);
          }
        }
      });
    }, 2000);
    
    const section2 = document.getElementById('section2');
    
    window.addEventListener('scroll', function() {
      const section2Rect = section2.getBoundingClientRect();
      
      if (section2Rect.top < window.innerHeight && 
          section2Rect.bottom > 0 && 
          Math.random() < 0.01) {
        
        const currentScroll = window.pageYOffset;
        window.scrollTo({
          top: currentScroll - (scrollDirection * 200),
          behavior: 'smooth'
        });
      }
    });
    
    setInterval(() => {
      if (Math.random() < 0.1) {
        const size = Math.random() * 100 + 20;
        cursorFollower.style.width = size + 'px';
        cursorFollower.style.height = size + 'px';
        
        setTimeout(() => {
          cursorFollower.style.width = '20px';
          cursorFollower.style.height = '20px';
        }, 500);
      }
    }, 3000);
    
    const contentBlocks = document.querySelectorAll('.content-block');
    
    setInterval(() => {
      contentBlocks.forEach(block => {
        if (Math.random() < 0.1) {
          const angle = (Math.random() - 0.5) * 10;
          block.style.transform = `rotate(${angle}deg)`;
          
          setTimeout(() => {
            block.style.transform = 'rotate(0deg)';
          }, 2000);
        }
      });
    }, 5000);
    
    const navItems = document.querySelectorAll('.nav-item');
    
    setInterval(() => {
      if (Math.random() < 0.05) {
        const navContainer = document.querySelector('.navigation');
        
        const shuffledItems = Array.from(navItems).sort(() => Math.random() - 0.5);
        shuffledItems.forEach(item => navContainer.appendChild(item));
      }
    }, 10000);
    
    navItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          if (Math.random() < 0.2) {
            window.scrollBy({
              top: -500,
              behavior: 'smooth'
            });
            
            setTimeout(() => {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 500);
          } else {
            const speed = Math.random() < 0.3 ? 'auto' : 'smooth';
            targetElement.scrollIntoView({ behavior: speed });
          }
        }
      });
    });
  });