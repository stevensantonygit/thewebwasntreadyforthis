document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('hellForm');
    const formGroups = document.querySelectorAll('.form-group');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm');
    const birthdayInput = document.getElementById('birthday');
    const captchaInput = document.getElementById('captcha');
    const captchaQuestion = document.getElementById('captchaQuestion');
    const termsCheckbox = document.getElementById('terms');
    const termsLabel = document.getElementById('termsLabel');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('successMessage');
    const passwordRequirements = document.getElementById('passwordRequirements');
    const autocompleteDropdown = document.getElementById('autocompleteDropdown');
    
    let formSubmitting = false;
    let currentCaptchaAnswer = '4';
    let requirementsUpdateInterval;
    let formRearrangeInterval;
    let termsSwitchTimeout;
    let lastFocusedInput = null;
    let autocompleteTimeout;
    
    const badAutocompletes = {
      name: [
        'Absolutely Nobody', 
        'Your Worst Enemy', 
        'Please Don\'t Type Here', 
        'Error: Name Not Found', 
        'Anonymous Coward',
        '[REDACTED]',
        'I Don\'t Know My Own Name',
        'Your Royal Highness',
        'Batman'
      ],
      email: [
        'definitely.not.spam@scam.com',
        'please.hack.me@insecure.net',
        'no.reply.ever@blackhole.org',
        'your.data@we.sell.it.com',
        'nigerian.prince@money.now',
        'password123@bad.security',
        'i.love.viruses@malware.ru',
        'not.a.real.email@fake.fake',
        'admin@this.website'
      ]
    };
    
    const crazyRequirements = [
      ['At least 8 characters', 'One uppercase letter', 'One number', 'One special character'],
      ['Exactly 12 characters', 'No vowels allowed', 'Must include a Roman numeral', 'At least one emoji'],
      ['Must be palindrome', 'Include your birth year backwards', 'No repeating characters', 'Must contain "password"'],
      ['15+ characters', 'At least 3 currency symbols', 'Must be pronounceable', 'Cannot contain the letter "e"'],
      ['Must be prime number of characters', 'Contains at least one Kanji character', 'Minimum 3 mathematical symbols', 'Cannot use shift key'],
      ['Must be entirely uppercase', 'Contains your mother\'s maiden name', 'Odd number of characters', 'Includes a movie quote']
    ];
    
    const crazyTermsTexts = [
      'I agree to the Terms & Conditions',
      'I surrender my firstborn child to this website',
      'I pledge allegiance to the Form From Hell',
      'I will never complain about other forms ever again',
      'I acknowledge this website owns my soul now',
      'I promise to tell everyone about this horrible experience',
      'I will dream about this form tonight',
      'I am aware that no data is actually being submitted',
      'I have spent way too much time on this form'
    ];
    
    function initForm() {
      startRequirementsUpdater();
      startFormRearranger();
      setupCaptchaChanger();
      setupInputEvents();
      setupTermsSwitcher();
      setupFormSubmission();
    }
    
    function startRequirementsUpdater() {
      updatePasswordRequirements();
      requirementsUpdateInterval = setInterval(updatePasswordRequirements, 5000);
    }
    
    function updatePasswordRequirements() {
      const newRequirements = crazyRequirements[Math.floor(Math.random() * crazyRequirements.length)];
      
      passwordRequirements.innerHTML = '';
      
      newRequirements.forEach(req => {
        const li = document.createElement('li');
        li.textContent = req;
        passwordRequirements.appendChild(li);
      });
      
      passwordRequirements.parentElement.classList.add('shake');
      setTimeout(() => {
        passwordRequirements.parentElement.classList.remove('shake');
      }, 500);
      
      validatePassword();
    }
    
    function startFormRearranger() {
      formRearrangeInterval = setInterval(() => {
        if (formSubmitting) return;
        
        const values = {};
        formGroups.forEach(group => {
          const fieldName = group.dataset.field;
          const input = group.querySelector('input');
          if (input) values[fieldName] = input.value;
        });
        
        if (document.activeElement && document.activeElement.tagName === 'INPUT') {
          rearrangeFormElements();
        }
        

        setTimeout(() => {
          formGroups.forEach(group => {
            const fieldName = group.dataset.field;
            const input = group.querySelector('input');
            if (input && values[fieldName]) input.value = values[fieldName];
          });
        }, 100);
      }, 8000);
    }
    
    function rearrangeFormElements() {
      const parent = formGroups[0].parentElement;
      const formGroupsArray = Array.from(formGroups);
      
      const rearrangeableGroups = formGroupsArray.filter(group => 
        !group.classList.contains('terms') && group.dataset.field !== 'submit');
      
      const shuffled = rearrangeableGroups.sort(() => Math.random() - 0.5);
      
      shuffled.forEach(group => {
        group.classList.add('randomize');
        
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 10;
        const randomRotation = (Math.random() - 0.5) * 5;
        
        group.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
        
        parent.appendChild(group);
      });
      
      form.classList.add('shake');
      setTimeout(() => {
        form.classList.remove('shake');
      }, 500);
    }
    
    function setupCaptchaChanger() {
      updateCaptcha();
      
      setInterval(updateCaptcha, 15000);
      
      captchaInput.addEventListener('input', () => {
        if (captchaInput.value.length > 0 && Math.random() < 0.3) {
          updateCaptcha();
        }
      });
    }
    
    function updateCaptcha() {
      const operations = [
        { op: '+', compute: (a, b) => a + b },
        { op: '-', compute: (a, b) => a - b },
        { op: '×', compute: (a, b) => a * b }
      ];
      
      const randomOp = operations[Math.floor(Math.random() * operations.length)];
      let num1, num2;
      
      if (randomOp.op === '+') {
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * 10);
      } else if (randomOp.op === '-') {
        num1 = Math.floor(Math.random() * 10) + 5;
        num2 = Math.floor(Math.random() * 5);
      } else {
        num1 = Math.floor(Math.random() * 5) + 1;
        num2 = Math.floor(Math.random() * 5) + 1;
      }
      
      captchaQuestion.textContent = `What is ${num1} ${randomOp.op} ${num2}?`;
      currentCaptchaAnswer = randomOp.compute(num1, num2).toString();
      
      captchaInput.value = '';
      
      captchaInput.parentElement.classList.add('shake');
      setTimeout(() => {
        captchaInput.parentElement.classList.remove('shake');
      }, 500);
    }
    
    function setupInputEvents() {
      nameInput.addEventListener('input', () => {
        validateInput(nameInput, 'name', validateName);
        showAutocomplete(nameInput, 'name');
      });
      
      nameInput.addEventListener('focus', () => {
        lastFocusedInput = nameInput;
      });
      
      emailInput.addEventListener('input', () => {
        validateInput(emailInput, 'email', validateEmail);
        showAutocomplete(emailInput, 'email');
      });
      
      emailInput.addEventListener('focus', () => {
        lastFocusedInput = emailInput;
      });
      
      passwordInput.addEventListener('input', () => {
        validateInput(passwordInput, 'password', validatePassword);
      });
      
      confirmInput.addEventListener('input', () => {
        validateInput(confirmInput, 'confirm', validateConfirmPassword);
      });
      
      birthdayInput.addEventListener('change', () => {
        validateInput(birthdayInput, 'birthday', validateBirthday);
      });
      
      captchaInput.addEventListener('input', () => {
        validateInput(captchaInput, 'captcha', validateCaptcha);
      });
      
      document.addEventListener('click', (e) => {
        if (!e.target.matches('#autocompleteDropdown, #autocompleteDropdown *')) {
          autocompleteDropdown.style.display = 'none';
        }
      });
    }
    
    function validateInput(input, fieldName, validationFunc) {
      const errorMessage = input.parentElement.querySelector('.error-message');
      const result = validationFunc(input.value);
      
      if (!result.valid) {
        errorMessage.textContent = result.message;
        input.style.borderColor = 'var(--error-color)';
      } else {
        errorMessage.textContent = '';
        input.style.borderColor = 'var(--secondary-color)';
      }
    }
    
    function validateName(name) {
      if (!name) return { valid: false, message: 'Name is required' };
      if (name.length < 3) return { valid: false, message: 'Name must be at least 3 characters' };
      if (!/[A-Z]/.test(name)) return { valid: false, message: 'Name must contain at least one uppercase letter' };
      if (/\d/.test(name)) return { valid: false, message: 'Wait, your name has numbers in it?' };
      if (Math.random() < 0.1) return { valid: false, message: 'I just don\'t like this name, try another' };
      
      return { valid: true };
    }
    
    function validateEmail(email) {
      if (!email) return { valid: false, message: 'Email is required' };
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { valid: false, message: 'Invalid email format' };
      }
      
      if (email.length < 10) return { valid: false, message: 'Email is too short to be trusted' };
      if (!email.includes('.com') && !email.includes('.org') && !email.includes('.net')) {
        return { valid: false, message: 'Only .com, .org, or .net domains allowed' };
      }
      if (Math.random() < 0.15) return { valid: false, message: 'Our system rejects this email for... reasons' };
      
      return { valid: true };
    }
    
    function validatePassword(password = passwordInput.value) {
      const requirements = Array.from(passwordRequirements.querySelectorAll('li')).map(li => li.textContent);
      
      if (!password) return { valid: false, message: 'Password is required' };
      
      for (let i = 0; i < requirements.length; i++) {
        const req = requirements[i].toLowerCase();
        
        if (req.includes('characters') && req.includes('8')) {
          if (password.length < 8) return { valid: false, message: 'Password must be at least 8 characters' };
        }
        if (req.includes('characters') && req.includes('12')) {
          if (password.length !== 12) return { valid: false, message: 'Password must be exactly 12 characters' };
        }
        if (req.includes('characters') && req.includes('15+')) {
          if (password.length < 15) return { valid: false, message: 'Password must be at least 15 characters' };
        }
        if (req.includes('uppercase')) {
          if (!/[A-Z]/.test(password)) return { valid: false, message: 'Password must contain an uppercase letter' };
        }
        if (req.includes('number')) {
          if (!/\d/.test(password)) return { valid: false, message: 'Password must contain a number' };
        }
        if (req.includes('special character')) {
          if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return { valid: false, message: 'Password must contain a special character' };
        }
        if (req.includes('vowels')) {
          if (/[aeiou]/i.test(password)) return { valid: false, message: 'Password cannot contain vowels' };
        }
        if (req.includes('roman numeral')) {
          if (!/[IVXLCDM]/.test(password)) return { valid: false, message: 'Password must contain a Roman numeral' };
        }
        if (req.includes('emoji')) {
          const emojiRegex = /[\p{Emoji}]/u;
          if (!emojiRegex.test(password)) return { valid: false, message: 'Password must contain an emoji' };
        }
        if (req.includes('palindrome')) {
          const reversed = password.split('').reverse().join('');
          if (password !== reversed) return { valid: false, message: 'Password must read the same forwards and backwards' };
        }
        if (req.includes('birth year')) {
          if (!/\d{4}/.test(password)) return { valid: false, message: 'Password must include a 4-digit year' };
        }
        if (req.includes('repeating')) {
          for (let j = 0; j < password.length - 1; j++) {
            if (password[j] === password[j+1]) {
              return { valid: false, message: 'Password cannot have repeating characters' };
            }
          }
        }
        if (req.includes('password')) {
          if (!password.toLowerCase().includes('password')) {
            return { valid: false, message: 'Password must contain "password"' };
          }
        }
        if (req.includes('currency')) {
          const currencySymbols = /[$€£¥₹₽]/;
          let count = 0;
          for (let j = 0; j < password.length; j++) {
            if (currencySymbols.test(password[j])) count++;
          }
          if (count < 3) return { valid: false, message: 'Password must contain at least 3 currency symbols' };
        }
        if (req.includes('pronounceable')) {
          let pronounceable = true;
          for (let j = 0; j < password.length - 2; j++) {
            const isVowel1 = /[aeiou]/i.test(password[j]);
            const isVowel2 = /[aeiou]/i.test(password[j+1]);
            const isVowel3 = /[aeiou]/i.test(password[j+2]);
            if ((isVowel1 && isVowel2 && isVowel3) || (!isVowel1 && !isVowel2 && !isVowel3)) {
              pronounceable = false;
              break;
            }
          }
          if (!pronounceable) return { valid: false, message: 'Password must be pronounceable' };
        }
        if (req.includes('letter "e"')) {
          if (/e/i.test(password)) return { valid: false, message: 'Password cannot contain the letter "e"' };
        }
        if (req.includes('prime number')) {
          const isPrime = (num) => {
            for (let i = 2; i < num; i++) if (num % i === 0) return false;
            return num > 1;
          };
          if (!isPrime(password.length)) {
            return { valid: false, message: 'Password must have a prime number of characters (2, 3, 5, 7, 11, 13, etc.)' };
          }
        }
        if (req.includes('kanji')) {
          const kanjiRange = /[\u4e00-\u9faf]/;
          if (!kanjiRange.test(password)) {
            return { valid: false, message: 'Password must contain at least one Kanji character' };
          }
        }
        if (req.includes('mathematical')) {
          const mathSymbols = /[+\-*\/=^√∑∫πΔθ]/;
          let count = 0;
          for (let j = 0; j < password.length; j++) {
            if (mathSymbols.test(password[j])) count++;
          }
          if (count < 3) return { valid: false, message: 'Password must contain at least 3 mathematical symbols' };
        }
        if (req.includes('shift key')) {
          const shiftChars = /[A-Z~!@#$%^&*()_+{}:"<>?|]/;
          if (shiftChars.test(password)) {
            return { valid: false, message: 'Password cannot contain characters that require the shift key' };
          }
        }
        if (req.includes('entirely uppercase')) {
          if (password !== password.toUpperCase() || !/[A-Z]/.test(password)) {
            return { valid: false, message: 'Password must be entirely uppercase letters' };
          }
        }
        if (req.includes('mother')) {
          return { valid: false, message: 'How would we know your mother\'s maiden name?' };
        }
        if (req.includes('odd number')) {
          if (password.length % 2 === 0) {
            return { valid: false, message: 'Password must have an odd number of characters' };
          }
        }
        if (req.includes('movie quote')) {
            const movieQuotes = [
                'May the Force be with you',
                'I\'ll be back',
                'Here\'s looking at you, kid',
                'You can\'t handle the truth!',
                'I see dead people',
                'Life is like a box of chocolates',
                'To infinity and beyond!',
                'Houston, we have a problem'
            ];
          let hasQuote = false;
          for (const quote of movieQuotes) {
            if (password.toLowerCase().includes(quote)) {
              hasQuote = true;
              break;
            }
          }
          
          if (!hasQuote) {
            return { valid: false, message: 'Password must include a famous movie quote' };
          }
        }
      }
      
      return { valid: true };
    }
    
    function validateConfirmPassword(confirm) {
      if (!confirm) return { valid: false, message: 'Please confirm your password' };
      
      if (Math.random() < 0.08) {
        return { valid: false, message: 'Passwords do not match (or do they?)' };
      }
      
      if (confirm !== passwordInput.value) {
        return { valid: false, message: 'Passwords do not match' };
      }
      
      return { valid: true };
    }
    
    function validateBirthday(date) {
      if (!date) return { valid: false, message: 'Birthday is required' };
      
      const birthday = new Date(date);
      const now = new Date();
      
      if (isNaN(birthday.getTime())) {
        return { valid: false, message: 'Invalid date format' };
      }
      
      if (birthday > now) {
        return { valid: false, message: 'Are you from the future?' };
      }
      
      const age = Math.floor((now - birthday) / (365.25 * 24 * 60 * 60 * 1000));
      
      if (age < 18) {
        return { valid: false, message: 'You must be 18+ to use this form' };
      }
      
      if (age > 100) {
        return { valid: false, message: 'Are you really that old?' };
      }
      
      if (Math.random() < 0.1) {
        const randomReasons = [
          'We don\'t like people born on this day',
          'Our system doesn\'t accept birthdays from this month',
          'Sorry, try being born on a different day',
          'Birthday incompatible with our database'
        ];
        return { valid: false, message: randomReasons[Math.floor(Math.random() * randomReasons.length)] };
      }
      
      return { valid: true };
    }
    
    function validateCaptcha(answer) {
      if (!answer) return { valid: false, message: 'CAPTCHA answer is required' };
      
      if (Math.random() < 0.05) {
        return { valid: true };
      }
      
      if (answer === currentCaptchaAnswer && Math.random() < 0.1) {
        return { valid: false, message: 'Incorrect! Are you a robot?' };
      }
      
      if (answer !== currentCaptchaAnswer) {
        return { valid: false, message: 'Incorrect! Try again.' };
      }
      
      return { valid: true };
    }
    
    function showAutocomplete(input, fieldType) {
      clearTimeout(autocompleteTimeout);
      
      if (Math.random() > 0.4 || input.value.length < 2) {
        autocompleteDropdown.style.display = 'none';
        return;
      }
      
      const rect = input.getBoundingClientRect();
      autocompleteDropdown.style.width = rect.width + 'px';
      autocompleteDropdown.style.left = rect.left + window.scrollX + 'px';
      autocompleteDropdown.style.top = rect.bottom + window.scrollY + 'px';
      
      autocompleteDropdown.innerHTML = '';
      
      const suggestions = badAutocompletes[fieldType] || [];
      
      suggestions.forEach(suggestion => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.textContent = suggestion;
        
        item.addEventListener('click', () => {
          input.value = suggestion;
          autocompleteDropdown.style.display = 'none';
          validateInput(input, fieldType, fieldType === 'name' ? validateName : validateEmail);
        });
        
        autocompleteDropdown.appendChild(item);
      });
      
      autocompleteDropdown.style.display = 'block';
      
      autocompleteTimeout = setTimeout(() => {
        autocompleteDropdown.style.display = 'none';
      }, 3000);
    }
    
    function setupTermsSwitcher() {
      termsCheckbox.checked = false;
      
      termsSwitchTimeout = setTimeout(switchTermsText, 5000);
      
      termsLabel.addEventListener('click', (e) => {
        if (Math.random() < 0.5) {
          e.preventDefault();
          switchTermsText();
        }
      });
      
      document.addEventListener('click', (e) => {
        if (e.target !== termsCheckbox && e.target !== termsLabel && termsCheckbox.checked && Math.random() < 0.2) {
          termsCheckbox.checked = false;
        }
      });
    }
    
    function switchTermsText() {
      let newTermsText;
      do {
        newTermsText = crazyTermsTexts[Math.floor(Math.random() * crazyTermsTexts.length)];
      } while (newTermsText === termsLabel.textContent);
      
      termsLabel.textContent = newTermsText;
      
      termsCheckbox.checked = false;
      
      termsLabel.classList.add('shake');
      setTimeout(() => {
        termsLabel.classList.remove('shake');
      }, 500);
      
      clearTimeout(termsSwitchTimeout);
      termsSwitchTimeout = setTimeout(switchTermsText, 5000 + Math.random() * 5000);
    }
    
    function setupFormSubmission() {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isNameValid = validateName(nameInput.value).valid;
        const isEmailValid = validateEmail(emailInput.value).valid;
        const isPasswordValid = validatePassword(passwordInput.value).valid;
        const isConfirmValid = validateConfirmPassword(confirmInput.value).valid;
        const isBirthdayValid = validateBirthday(birthdayInput.value).valid;
        const isCaptchaValid = validateCaptcha(captchaInput.value).valid;
        
        if (!termsCheckbox.checked) {
          termsCheckbox.parentElement.querySelector('.error-message').textContent = 'You must agree to the terms';
          return;
        } else {
          termsCheckbox.parentElement.querySelector('.error-message').textContent = '';
        }
        
        if (Math.random() < 0.3) {
          const randomField = [nameInput, emailInput, passwordInput, confirmInput, birthdayInput, captchaInput][
            Math.floor(Math.random() * 6)
          ];
          const errorMessage = randomField.parentElement.querySelector('.error-message');
          errorMessage.textContent = 'Something went wrong. Try again!';
          return;
        }
        
        if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid && isBirthdayValid && isCaptchaValid) {
          formSubmitting = true;
          
          submitButton.classList.add('loading');
          submitButton.classList.add('loading-button');
          
          clearInterval(requirementsUpdateInterval);
          clearInterval(formRearrangeInterval);
          clearTimeout(termsSwitchTimeout);
          
          setTimeout(() => {
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            formSubmitting = false;
          }, 3000);
        }
      });
      
      submitButton.addEventListener('mouseenter', () => {
        if (Math.random() < 0.4) {
          const maxX = window.innerWidth - submitButton.offsetWidth;
          const maxY = window.innerHeight - submitButton.offsetHeight;
          
          const newX = Math.max(0, Math.min(maxX, Math.random() * maxX));
          const newY = Math.max(0, Math.min(maxY, Math.random() * maxY));
          
          submitButton.style.position = 'fixed';
          submitButton.style.left = newX + 'px';
          submitButton.style.top = newY + 'px';
          
          setTimeout(() => {
            submitButton.style.position = '';
            submitButton.style.left = '';
            submitButton.style.top = '';
          }, 2000);
        }
      });
    }
    
    initForm();
  });