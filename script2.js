document.addEventListener('DOMContentLoaded', function() {
    const runawayTexts = document.querySelectorAll('.runaway-text');
    const secretMessage = document.querySelector('.secret-message');
    
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseSpeed = 0;
    let mouseMoving = false;
    let mouseStillTimeout;
    let activeParagraphIndex = -1;
    
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      mouseSpeed = Math.sqrt(dx * dx + dy * dy);
      
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      
      mouseMoving = true;
      clearTimeout(mouseStillTimeout);
      
      mouseStillTimeout = setTimeout(function() {
        mouseMoving = false;
        calmDownText();
      }, 1500);
      
      checkProximity();
    });
    
    document.addEventListener('mouseout', function() {
      setTimeout(function() {
        mouseMoving = false;
        calmDownText();
      }, 1000);
    });
    
    function checkProximity() {
      if (!mouseMoving) return;
      
      runawayTexts.forEach((paragraph, index) => {
        const rect = paragraph.getBoundingClientRect();
        
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(mouseX - centerX, 2) + 
          Math.pow(mouseY - centerY, 2)
        );
        
        if (distance < 200) {
          runAway(paragraph, index);
          activeParagraphIndex = index;
        }
      });
    }
    
    function runAway(paragraph, index) {
      const rect = paragraph.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      let dirX = centerX - mouseX;
      let dirY = centerY - mouseY;
      
      const length = Math.sqrt(dirX * dirX + dirY * dirY);
      if (length > 0) {
        dirX = dirX / length * (mouseSpeed * 0.5);
        dirY = dirY / length * (mouseSpeed * 0.5);
      }
      
      const randomX = (Math.random() - 0.5) * 50 * (index % 3 + 1);
      const randomY = (Math.random() - 0.5) * 50 * ((index + 1) % 3 + 1);
      
      const rotation = (Math.random() - 0.5) * mouseSpeed * 0.5;
      
      paragraph.style.transition = 'transform 0.3s ease';
      paragraph.style.transform = `translate(${dirX + randomX}px, ${dirY + randomY}px) rotate(${rotation}deg)`;
      paragraph.style.opacity = Math.max(0.5, 1 - (mouseSpeed * 0.01));
      
      if (mouseSpeed > 50) {
        paragraph.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
          paragraph.style.animation = '';
        }, 500);
      }
    }
    
    function calmDownText() {
      runawayTexts.forEach(paragraph => {
        paragraph.style.transition = 'transform 1s ease, opacity 1s ease';
        paragraph.style.transform = 'translate(0, 0) rotate(0deg)';
        paragraph.style.opacity = '1';
      });
      
      if (activeParagraphIndex >= 0) {
        secretMessage.style.opacity = '1';
      }
    }
    
    runawayTexts.forEach((paragraph, index) => {
      const randomX = (Math.random() - 0.5) * 10;
      const randomY = (Math.random() - 0.5) * 10;
      paragraph.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
  });