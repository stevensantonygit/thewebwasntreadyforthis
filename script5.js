document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const successMessage = document.getElementById('successMessage');
    let popupCount = 0;
    let refuseCount = 0;
    let acceptCount = 0;
    let followingPopups = [];
    let mouseX = 0, mouseY = 0;
    
    const legalTextVariations = [
      "By clicking 'Accept', you acknowledge that we will collect your data for purposes including but not limited to targeted advertising, behavioral analysis, and selling to third parties. Your consent is binding until the heat death of the universe.",
      
      "Accepting cookies means you grant us unrestricted access to monitor your online activities. We may use this information to judge your internet habits silently. We promise not to laugh too loudly at your search history.",
      
      "Our cookies are like digital breadcrumbs that follow you everywhere online. By accepting, you agree to carry these breadcrumbs to every corner of the internet you visit. Don't worry, the birds won't eat these ones.",
      
      "Your acceptance constitutes a legally binding agreement whereby your data becomes our data, your preferences become our business model, and your privacy becomes an optional concept that we'll consider when we feel like it.",
      
      "Each cookie we place contains a tiny digital version of our legal team, ready to justify our use of your data at any moment. By accepting, you agree to feed and house these tiny lawyers indefinitely.",
      
      "By refusing cookies, you acknowledge that this website may become unusable, your internet may slow down, and your electronic devices may randomly play Rick Astley's 'Never Gonna Give You Up' at 3 AM.",
      
      "Our cookies have feelings too. Refusing them causes significant emotional distress to these small data packets. Are you really that heartless? Think of the cookies!",
      
      "Accepting cookies is technically optional in the same way that breathing is technically optional. You could refuse, but the consequences might be similarly uncomfortable.",
      
      "Our advanced AI-powered cookies can predict your future based on your browsing habits. By accepting, you waive all rights to be surprised by your own destiny. We already know what you'll have for breakfast tomorrow.",
      
      "These cookies are free of gluten, dairy, and privacy concerns. Any resemblance to actual nutritional cookies is purely coincidental and should not be consumed physically. Digital consumption only.",
      
      "By accepting, you agree that our cookies may form a small civilization on your hard drive, developing their own culture and possibly contacting you about their religious beliefs.",
      
      "Our legal team insisted we inform you that these cookies may or may not become sentient and apply for citizenship in your country. Any tax implications from cookie-related income are solely your responsibility."
    ];
    
    function createCookiePopup(x, y, scale = 1, isFollower = false) {
      popupCount++;
      
      const popup = document.createElement('div');
      popup.className = isFollower ? 'cookie-popup cursor-follower' : 'cookie-popup';
      popup.id = `popup-${popupCount}`;
      popup.style.width = `${300 * scale}px`;
      popup.style.fontSize = `${scale * 100}%`;
      
      if (x === undefined || y === undefined) {
        x = Math.random() * (window.innerWidth - 350);
        y = Math.random() * (window.innerHeight - 250);
      }
      
      popup.style.left = `${x}px`;
      popup.style.top = `${y}px`;
      
      const legalTextIndex = Math.floor(Math.random() * legalTextVariations.length);
      
      popup.innerHTML = `
        <button class="close-btn">&times;</button>
        <h3>We Value Your Privacy</h3>
        <div class="legal-text">
          ${legalTextVariations[legalTextIndex]}
        </div>
        <div class="cookie-buttons">
          <button class="accept-btn">Accept All</button>
          <button class="refuse-btn">Refuse</button>
        </div>
      `;
      
      document.body.appendChild(popup);
      
      const closeBtn = popup.querySelector('.close-btn');
      const acceptBtn = popup.querySelector('.accept-btn');
      const refuseBtn = popup.querySelector('.refuse-btn');
      const legalTextDiv = popup.querySelector('.legal-text');
      
      closeBtn.addEventListener('click', function() {
        popup.classList.add('shake');
        
        const rect = popup.getBoundingClientRect();
        
        setTimeout(() => {
          if (document.querySelectorAll('.cookie-popup').length < 20) {
            createCookiePopup(rect.left - 30, rect.top - 30);
            createCookiePopup(rect.left + 30, rect.top + 30);
          }
        }, 300);
      });
      
      acceptBtn.addEventListener('click', function() {
        acceptCount++;
        
        if (acceptCount >= 10) {
          const allPopups = document.querySelectorAll('.cookie-popup');
          allPopups.forEach(p => p.remove());
          followingPopups = [];
          successMessage.style.display = 'block';
          return;
        }
        
        popup.classList.add('cursor-follower');
        followingPopups.push(popup);
        
        popup.dataset.offsetX = Math.random() * 100 - 50;
        popup.dataset.offsetY = Math.random() * 100 - 50;
        
        setTimeout(() => {
          createCookiePopup();
        }, 500);
      });
      
      refuseBtn.addEventListener('click', function() {
        refuseCount++;
        
        const currentScale = parseFloat(popup.style.width) / 300;
        const newScale = currentScale * 0.8;
        
        if (newScale < 0.3) {
          popup.remove();
          createCookiePopup(
            Math.random() * window.innerWidth, 
            Math.random() * window.innerHeight, 
            0.3, 
            true
          );
        } else {
          popup.style.width = `${300 * newScale}px`;
          popup.style.fontSize = `${newScale * 100}%`;
        }
        
        const newLegalTextIndex = (legalTextIndex + Math.floor(Math.random() * (legalTextVariations.length - 1) + 1)) % legalTextVariations.length;
        legalTextDiv.innerHTML = legalTextVariations[newLegalTextIndex];
        legalTextDiv.classList.add('shake');
        setTimeout(() => legalTextDiv.classList.remove('shake'), 500);
      });
      
      legalTextDiv.addEventListener('scroll', function() {
        if (Math.random() < 0.3 && legalTextDiv.scrollTop > 20) {
          const currentText = legalTextDiv.innerHTML;
          const availableTexts = legalTextVariations.filter(text => text !== currentText);
          const newText = availableTexts[Math.floor(Math.random() * availableTexts.length)];
          
          legalTextDiv.innerHTML = newText;
        }
      });
      
      return popup;
    }
    
    setTimeout(() => {
      createCookiePopup(
        window.innerWidth / 2 - 150,
        window.innerHeight / 2 - 100
      );
    }, 1000);
    
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      followingPopups.forEach((popup, index) => {
        setTimeout(() => {
          if (popup && document.body.contains(popup)) {
            const offsetX = parseFloat(popup.dataset.offsetX || 0);
            const offsetY = parseFloat(popup.dataset.offsetY || 0);
            
            popup.style.left = `${mouseX + offsetX}px`;
            popup.style.top = `${mouseY + offsetY}px`;
          }
        }, index * 50);
      });
    });
    
    setInterval(() => {
      const currentPopups = document.querySelectorAll('.cookie-popup').length;
      if (currentPopups < 5) {
        createCookiePopup();
      }
    }, 20000);
    
    let clickCount = 0;
    let clickTimer;
    
    document.addEventListener('click', function(e) {
      if (e.target.closest('.cookie-popup')) return;
      
      clickCount++;
      clearTimeout(clickTimer);
      
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 2000);
      
      if (clickCount >= 5) {
        createCookiePopup(e.clientX, e.clientY);
        clickCount = 0;
      }
    });
  });