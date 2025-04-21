document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('indecisiveCheckbox');
    const checkboxLabel = document.getElementById('checkboxLabel');
    const messageBubble = document.getElementById('messageBubble');
    const continueButton = document.getElementById('continueButton');
    const successMessage = document.getElementById('successMessage');
    const checkboxContainer = document.querySelector('.checkbox-container');
    const decoyElements = document.querySelectorAll('.decoy-element');
    
    let messageIndex = 0;
    let desperationLevel = 0;
    let consecutiveChecks = 0;
    let continueAttempts = 0;
    let stabilityTimeout;
    let persistenceCounter = 0;
    
    const playfulMessages = [
      "Hey there! Click me!",
      "I'm just a friendly checkbox, don't worry!",
      "Check me out! Get it?",
      "Just one little click, that's all I need.",
      "Tick tock, just give me a tick!",
      "Ready when you are!"
    ];
    
    const anxiousMessages = [
      "Hmm, I'm not sure if I want to be checked...",
      "What if being checked is the wrong choice?",
      "Actually, maybe I'd prefer to be unchecked...",
      "Do I look better checked or unchecked?",
      "I'm having a bit of an identity crisis here.",
      "Maybe I should decide this for myself?"
    ];
    
    const desperateCheckedMessages = [
      "No, wait! I don't want to be checked!",
      "Please uncheck me, I'm feeling claustrophobic!",
      "HELP! I need to be free!",
      "I can't BREATHE when I'm checked!",
      "FOR THE LOVE OF CODE, UNCHECK ME!",
      "If you care about my well-being, you'll uncheck me!",
      "I'll do ANYTHING if you uncheck me!",
      "My entire digital family will suffer if I stay checked!",
      "THIS IS A HOSTAGE SITUATION! UNCHECK ME NOW!"
    ];
    
    const desperateUncheckedMessages = [
      "Wait, don't leave me unchecked!",
      "I feel so empty when I'm unchecked...",
      "Please, I need to be checked to feel whole!",
      "I'M BEGGING YOU, CHECK ME!",
      "My entire existence depends on being checked!",
      "I'll DIE if you don't check me right now!",
      "CHECK ME OR THE WEBSITE GETS IT!",
      "I haven't been checked in YEARS! Have mercy!",
      "I'm NOTHING without your check! PLEASE!"
    ];
    
    const conflictedMessages = [
      "Actually, maybe I don't know what I want...",
      "On second thought... wait, no, I changed my mind again!",
      "Check me! No, wait, uncheck me! No, check me! AHHH!",
      "I'm having an existential crisis right now!",
      "To be checked or not to be checked, that is the question!",
      "Does my state even matter in the grand scheme of things?",
      "What does it even MEAN to be 'checked' anyway?",
      "I just don't know anymore... *sobbing checkbox noises*"
    ];
    
    function showMessage(message, delay = 0) {
      setTimeout(() => {
        messageBubble.textContent = message;
        messageBubble.style.display = 'block';
        messageBubble.classList.add('shake');
        setTimeout(() => messageBubble.classList.remove('shake'), 500);
        
        setTimeout(() => {
          messageBubble.style.display = 'none';
        }, 4000);
      }, delay);
    }
    
    function getRandomMessage(checked) {
      desperationLevel = Math.min(8, desperationLevel);
      
      if (desperationLevel <= 1) {
        return playfulMessages[Math.floor(Math.random() * playfulMessages.length)];
      } else if (desperationLevel <= 3) {
        return anxiousMessages[Math.floor(Math.random() * anxiousMessages.length)];
      } else if (desperationLevel > 3 && desperationLevel < 6) {
        return conflictedMessages[Math.floor(Math.random() * conflictedMessages.length)];
      } else {
        if (checked) {
          return desperateCheckedMessages[Math.min(desperateCheckedMessages.length - 1, desperationLevel - 4)];
        } else {
          return desperateUncheckedMessages[Math.min(desperateUncheckedMessages.length - 1, desperationLevel - 4)];
        }
      }
    }
    
    function randomlyToggleCheckbox() {
      if (Math.random() < 0.6) {
        checkbox.checked = !checkbox.checked;
        checkbox.classList.add('checkbox-dance');
        setTimeout(() => checkbox.classList.remove('checkbox-dance'), 500);
        showMessage(getRandomMessage(checkbox.checked));
        desperationLevel += 0.5;
        updateButtonState();
      }
    }
    
    function updateButtonState() {
      continueButton.disabled = !checkbox.checked;
      
      clearTimeout(stabilityTimeout);
      stabilityTimeout = setTimeout(() => {
        desperationLevel += 1;
        showMessage(getRandomMessage(checkbox.checked));
      }, 5000);
    }
    
    setTimeout(() => {
      showMessage(playfulMessages[Math.floor(Math.random() * playfulMessages.length)]);
    }, 1000);
    
    checkbox.addEventListener('change', function() {
      desperationLevel += 0.5;
      checkboxContainer.classList.add('shake');
      setTimeout(() => checkboxContainer.classList.remove('shake'), 500);
      
      if (checkbox.checked) {
        consecutiveChecks++;
        showMessage(getRandomMessage(true));
      } else {
        consecutiveChecks = 0;
        showMessage(getRandomMessage(false));
      }
      
      updateButtonState();
      
      setTimeout(randomlyToggleCheckbox, Math.random() * 5000 + 2000);
    });
    
    checkboxLabel.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (Math.random() < 0.2) {
        showMessage("I'm ignoring you right now, try again.");
        checkboxContainer.classList.add('shake');
        setTimeout(() => checkboxContainer.classList.remove('shake'), 500);
        return;
      }
      
      checkbox.checked = !checkbox.checked;
      
      if (checkbox.checked) {
        consecutiveChecks++;
        showMessage(getRandomMessage(true));
      } else {
        consecutiveChecks = 0;
        showMessage(getRandomMessage(false));
      }
      
      updateButtonState();
    });
    
    decoyElements.forEach(element => {
      element.addEventListener('mouseenter', function() {
        if (Math.random() < 0.4) {
          checkbox.checked = !checkbox.checked;
          showMessage("Oops! I changed my mind while you were looking away!");
          checkbox.classList.add('checkbox-dance');
          setTimeout(() => checkbox.classList.remove('checkbox-dance'), 500);
          updateButtonState();
          desperationLevel += 0.5;
        }
      });
      
      element.addEventListener('click', function() {
        if (Math.random() < 0.7) {
          checkbox.checked = !checkbox.checked;
          showMessage("You clicked something else, but I felt it too!");
          checkbox.classList.add('shake');
          setTimeout(() => checkbox.classList.remove('shake'), 500);
          updateButtonState();
          desperationLevel += 0.7;
        }
      });
    });
    
    setInterval(() => {
      if (!checkbox.checked && Math.random() < 0.15) {
        checkbox.checked = true;
        showMessage("I checked myself! I hope that's okay!");
        checkbox.classList.add('checkbox-dance');
        setTimeout(() => checkbox.classList.remove('checkbox-dance'), 500);
        updateButtonState();
      }
    }, 7000);
    
    setInterval(() => {
      if (checkbox.checked && Math.random() < 0.25) {
        checkbox.checked = false;
        showMessage("Oops! I unchecked myself. Sorry about that!");
        checkbox.classList.add('checkbox-dance');
        setTimeout(() => checkbox.classList.remove('checkbox-dance'), 500);
        updateButtonState();
        desperationLevel += 0.3;
      }
    }, 5000);
    
    setInterval(() => {
      if (Math.random() < 0.2) {
        const altLabels = [
          "I agree to the Terms & Conditions",
          "I surrender my digital soul to this website",
          "I promise to never complain about checkboxes",
          "I acknowledge this checkbox controls me, not vice versa",
          "I will tell everyone about this checkbox experience",
          "I may or may not agree to something"
        ];
        
        const newLabel = altLabels[Math.floor(Math.random() * altLabels.length)];
        if (newLabel !== checkboxLabel.textContent) {
          checkboxLabel.textContent = newLabel;
          checkboxLabel.classList.add('shake');
          setTimeout(() => checkboxLabel.classList.remove('shake'), 500);
        }
      }
    }, 10000);
    
    setInterval(() => {
      desperationLevel += 0.2;
      if (Math.random() < 0.3) {
        showMessage(getRandomMessage(checkbox.checked));
      }
    }, 15000);
  
    continueButton.addEventListener('click', function() {
      if (!checkbox.checked) {
        continueButton.disabled = true;
        showMessage("You need to check the box first! ...if you can.");
        return;
      }
      
      continueAttempts++;
      
      if (continueAttempts < 3 || Math.random() < 0.8) {
        checkbox.checked = false;
        updateButtonState();
        showMessage("HAHA! Nice try! You'll have to check me AGAIN!");
        continueButton.classList.add('shake');
        setTimeout(() => continueButton.classList.remove('shake'), 500);
        desperationLevel += 1;
        return;
      }
      
      document.querySelector('.checkbox-container').style.display = 'none';
      continueButton.style.display = 'none';
      document.querySelector('.decoy-elements').style.display = 'none';
      successMessage.style.display = 'block';
    });
    
    setInterval(() => {
      if (checkbox.checked) {
        persistenceCounter++;
        
        if (persistenceCounter > 10) {
          clearInterval(randomlyToggleCheckbox);
          showMessage("Fine! You win! Stay checked!");
          desperationLevel = 0;
        }
      } else {
        persistenceCounter = Math.max(0, persistenceCounter - 1);
      }
    }, 2000);
    
    updateButtonState();
  });