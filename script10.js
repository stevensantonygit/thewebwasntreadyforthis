       // Create confetti effect
       function createConfetti() {
        const confettiCount = 200;
        const container = document.body;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 5 + 5;
            const colors = ['#ff3366', '#33cc99', '#6633cc', '#ffcc00', '#66cc33'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Apply styles
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.left = `${left}%`;
            confetti.style.backgroundColor = color;
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.animationDelay = `${delay}s`;
            
            container.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }
    }

    // Create sparkles for header
    function animateHeaderSparkles() {
        const sparkles = document.querySelectorAll('.header-sparkle');
        sparkles.forEach(sparkle => {
            setInterval(() => {
                const size = Math.random() * 3 + 3;
                sparkle.style.width = `${size}px`;
                sparkle.style.height = `${size}px`;
            }, 2000);
        });
    }

    // Create particles
    function createParticles() {
        const container = document.getElementById('particles');
        const colors = ['#ff3366', '#33cc99', '#6633cc', '#ffcc00', '#66cc33'];
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 15 + 5;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.backgroundColor = color;
            particle.style.borderRadius = '50%';
            particle.style.animationDuration = `${duration}s`;
            
            container.appendChild(particle);
        }
    }

    // Animate stat counters
    function animateStats() {
        const daysCompleted = document.getElementById('days-completed');
        const challengesPassed = document.getElementById('challenges-passed');
        const patienceScore = document.getElementById('patience-score');
        const frustrationSurvived = document.getElementById('frustration-survived');
        
        let daysCount = 0;
        let challengesCount = 0;
        let patienceCount = 0;
        let frustrationCount = 0;
        
        const daysInterval = setInterval(() => {
            daysCount++;
            daysCompleted.textContent = daysCount;
            if (daysCount >= 10) clearInterval(daysInterval);
        }, 200);
        
        const challengesInterval = setInterval(() => {
            challengesCount++;
            challengesPassed.textContent = challengesCount;
            if (challengesCount >= 42) clearInterval(challengesInterval);
        }, 50);
        
        const patienceInterval = setInterval(() => {
            patienceCount++;
            patienceScore.textContent = `${patienceCount}%`;
            if (patienceCount >= 83) clearInterval(patienceInterval);
        }, 30);
        
        const frustrationInterval = setInterval(() => {
            frustrationCount += 0.1;
            frustrationSurvived.textContent = `${frustrationCount.toFixed(1)}/10`;
            if (frustrationCount >= 9.8) clearInterval(frustrationInterval);
        }, 100);
    }

    // Handle dark mode toggle
    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌓';
        });
    }

    // Handle rating stars
    function setupRatingStars() {
        const stars = document.querySelectorAll('.rating-star');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.getAttribute('data-rating'));
                stars.forEach(s => {
                    const sRating = parseInt(s.getAttribute('data-rating'));
                    if (sRating <= rating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });
    }

    // Run all animations and setup functions
    window.addEventListener('load', () => {
        createConfetti();
        animateHeaderSparkles();
        createParticles();
        animateStats();
        setupThemeToggle();
        setupRatingStars();
        
        // Progressively reveal elements
        const progressBars = document.querySelectorAll('.progress-bar');
        setTimeout(() => {
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }, 500);
        
        // Add some sparkles to achievement cards
        const achievementCards = document.querySelectorAll('.achievement-card');
        achievementCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                for (let i = 0; i < 5; i++) {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'sparkle';
                    
                    const left = Math.random() * 100;
                    const top = Math.random() * 100;
                    
                    sparkle.style.left = `${left}%`;
                    sparkle.style.top = `${top}%`;
                    
                    card.appendChild(sparkle);
                    
                    setTimeout(() => {
                        sparkle.remove();
                    }, 2000);
                }
            });
        });
    });