document.addEventListener('DOMContentLoaded', function () {
    // Disable default cursor on all elements
    document.querySelectorAll('*').forEach(el => {
        el.style.cursor = 'none';
    });

    // Get cursor elements and settings
    const mainCursor = document.getElementById('main-cursor');
    const cursorText = document.getElementById('cursor-text');
    const statusMessage = document.getElementById('status-message');

    // Settings toggles
    const toggleFollowers = document.getElementById('toggle-followers');
    const toggleTrails = document.getElementById('toggle-trails');
    const toggleSneezing = document.getElementById('toggle-sneezing');
    const toggleMagnetic = document.getElementById('toggle-magnetic');

    // Track cursor position
    let cursorX = 0;
    let cursorY = 0;

    // Arrays to store various cursor elements
    let followerCursors = [];
    let trailCursors = [];
    let sneezeParticles = [];

    // Follower cursors configuration
    const followerCount = 5;
    const followerColors = [
        '#ff3366', '#33cc99', '#6633cc', '#cc9933', '#3366ff'
    ];

    // Create follower cursors
    for (let i = 0; i < followerCount; i++) {
        const follower = document.createElement('div');
        follower.className = 'follower-cursor';
        follower.style.backgroundColor = followerColors[i % followerColors.length];
        document.body.appendChild(follower);

        followerCursors.push({
            element: follower,
            x: 0,
            y: 0,
            delay: (i + 1) * 80, // Increasing delay for each follower
            lastUpdate: 0
        });
    }

    // Function to show a status message
    function showStatusMessage(message, type = 'success') {
        statusMessage.textContent = message;
        statusMessage.className = `status-message ${type} visible`;

        setTimeout(() => {
            statusMessage.className = 'status-message';
        }, 3000);
    }

    // Function to update the main cursor position
    function updateMainCursorPosition(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;

        mainCursor.style.left = `${cursorX - 12}px`;
        mainCursor.style.top = `${cursorY - 12}px`;
    }

    // Function to update follower cursors
    function updateFollowerCursors() {
        if (!toggleFollowers.checked) {
            followerCursors.forEach(follower => {
                follower.element.style.opacity = '0';
            });
            return;
        }

        const now = Date.now();

        followerCursors.forEach(follower => {
            follower.element.style.opacity = '0.7';

            if (now - follower.lastUpdate > follower.delay) {
                follower.x = cursorX;
                follower.y = cursorY;
                follower.lastUpdate = now;
            }

            follower.element.style.left = `${follower.x - 8}px`;
            follower.element.style.top = `${follower.y - 8}px`;
        });
    }

    // Function to create a cursor trail
    function createCursorTrail() {
        if (!toggleTrails.checked || Math.random() > 0.15) return;

        const trail = document.createElement('div');
        trail.className = 'trail-cursor';
        trail.style.left = `${cursorX - 4}px`;
        trail.style.top = `${cursorY - 4}px`;
        trail.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        document.body.appendChild(trail);

        trailCursors.push({
            element: trail,
            createdAt: Date.now()
        });

        // Fade out and remove old trails
        setTimeout(() => {
            trail.style.opacity = '0';
            setTimeout(() => {
                try {
                    document.body.removeChild(trail);
                    trailCursors = trailCursors.filter(t => t.element !== trail);
                } catch (e) {
                    // Element might have been removed already
                }
            }, 2000);
        }, 10000);
    }

    // Function to make cursor sneeze
    function cursorSneeze() {
        if (!toggleSneezing.checked) return;

        const particleCount = Math.floor(Math.random() * 15) + 10;

        // Show sneeze text
        cursorText.textContent = "ACHOO!";
        cursorText.style.left = `${cursorX}px`;
        cursorText.style.top = `${cursorY}px`;
        cursorText.classList.add('show');

        setTimeout(() => {
            cursorText.classList.remove('show');
        }, 1000);

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'sneeze-particle';

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 80 + 20;
            const particleX = cursorX + Math.cos(angle) * distance;
            const particleY = cursorY + Math.sin(angle) * distance;

            particle.style.left = `${cursorX - 3}px`;
            particle.style.top = `${cursorY - 3}px`;
            particle.style.backgroundColor = `hsl(${Math.random() * 60 + 180}, 70%, 60%)`;
            document.body.appendChild(particle);

            const particleObject = {
                element: particle,
                targetX: particleX,
                targetY: particleY,
                x: cursorX,
                y: cursorY,
                progress: 0
            };

            sneezeParticles.push(particleObject);
        }

        showStatusMessage("Your cursor just sneezed! Bless you!", 'error');
    }

    // Function to update sneeze particles
    function updateSneezeParticles() {
        const removeParticles = [];

        sneezeParticles.forEach(particle => {
            particle.progress += 0.05;

            if (particle.progress >= 1) {
                removeParticles.push(particle);
                return;
            }

            const easedProgress = easeOutCubic(particle.progress);

            particle.x = particle.x + (particle.targetX - particle.x) * 0.1;
            particle.y = particle.y + (particle.targetY - particle.y) * 0.1;

            particle.element.style.left = `${particle.x - 3}px`;
            particle.element.style.top = `${particle.y - 3}px`;
            particle.element.style.opacity = `${1 - easedProgress}`;
        });

        // Remove completed particles
        removeParticles.forEach(particle => {
            try {
                document.body.removeChild(particle.element);
            } catch (e) {
                // Element might have been removed already
            }
            sneezeParticles = sneezeParticles.filter(p => p !== particle);
        });
    }

    // Easing function
    function easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
    }

    // Function to handle magnetic elements
    function handleMagneticElements() {
        if (!toggleMagnetic.checked) {
            document.querySelectorAll('.attractable, .repellable').forEach(el => {
                el.style.transform = 'translate(0, 0)';
            });
            return;
        }

        document.querySelectorAll('.attractable').forEach(el => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distX = cursorX - centerX;
            const distY = cursorY - centerY;
            const distance = Math.sqrt(distX * distX + distY * distY);

            if (distance < 150) {
                const strength = Math.max(0, (150 - distance) / 150);
                const moveX = distX * strength * 0.4;
                const moveY = distY * strength * 0.4;

                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                el.style.transform = 'translate(0, 0)';
            }
        });

        document.querySelectorAll('.repellable').forEach(el => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distX = cursorX - centerX;
            const distY = cursorY - centerY;
            const distance = Math.sqrt(distX * distX + distY * distY);

            if (distance < 150) {
                const strength = Math.max(0, (150 - distance) / 150);
                const moveX = -distX * strength * 1.5;
                const moveY = -distY * strength * 1.5;

                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                el.style.transform = 'translate(0, 0)';
            }
        });
    }

    // Doodle area functionality
    const doodleArea = document.getElementById('doodle-area');
    let isDrawing = false;
    let lastDrawX = 0;
    let lastDrawY = 0;

    function startDrawing(e) {
        const rect = doodleArea.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            isDrawing = true;
            lastDrawX = e.clientX - rect.left;
            lastDrawY = e.clientY - rect.top;
        }
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function doDoodle(e) {
        if (!isDrawing) return;

        const rect = doodleArea.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {

            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;

            drawLine(lastDrawX, lastDrawY, currentX, currentY);

            lastDrawX = currentX;
            lastDrawY = currentY;
        } else {
            isDrawing = false;
        }
    }

    function drawLine(x1, y1, x2, y2) {
        const line = document.createElement('div');
        line.className = 'doodle-line';

        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1);

        line.style.width = `${length}px`;
        line.style.height = '3px';
        line.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 50%)`;
        line.style.transformOrigin = '0 0';
        line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}rad)`;

        doodleArea.appendChild(line);
    }

    // Set up obstacle course
    const obstacleArea = document.getElementById('obstacle-area');
    const targetCount = 6;
    let hitTargets = 0;

    function createObstacleCourse() {
        obstacleArea.innerHTML = '';
        hitTargets = 0;

        for (let i = 0; i < targetCount; i++) {
            const target = document.createElement('div');
            target.className = 'floating-target';
            target.textContent = i + 1;
            target.dataset.index = i + 1;
            target.style.backgroundColor = 'rgba(200, 200, 200, 0.7)';

            const posX = 50 + Math.random() * (obstacleArea.clientWidth - 100);
            const posY = 50 + Math.random() * (obstacleArea.clientHeight - 100);

            target.style.left = `${posX}px`;
            target.style.top = `${posY}px`;

            target.addEventListener('mouseover', function () {
                if (this.classList.contains('hit')) return;

                this.classList.add('hit');
                this.style.backgroundColor = 'rgba(102, 204, 51, 0.7)';

                hitTargets++;

                if (hitTargets === targetCount) {
                    showStatusMessage("Congratulations! You've hit all targets!");
                    setTimeout(createObstacleCourse, 2000);
                }
            });

            obstacleArea.appendChild(target);
        }
    }

    // Event listeners for cursor movements
    document.addEventListener('mousemove', (e) => {
        updateMainCursorPosition(e);
        handleMagneticElements();
        doDoodle(e);
    });

    document.addEventListener('mousedown', startDrawing);
    document.addEventListener('mouseup', stopDrawing);
    document.addEventListener('mouseleave', stopDrawing);

    toggleFollowers.addEventListener('change', function () {
        if (this.checked) {
            showStatusMessage("Follower cursors enabled");
        } else {
            showStatusMessage("Follower cursors disabled", "error");
        }
    });

    toggleTrails.addEventListener('change', function () {
        if (this.checked) {
            showStatusMessage("Cursor trails enabled");
        } else {
            showStatusMessage("Cursor trails disabled", "error");
            // Remove existing trails when disabled
            trailCursors.forEach(trail => {
                try {
                    document.body.removeChild(trail.element);
                } catch (e) {
                    // Element might have been removed already
                }
            });
            trailCursors = [];
        }
    });

    toggleSneezing.addEventListener('change', function () {
        if (this.checked) {
            showStatusMessage("Cursor sneezing enabled");
        } else {
            showStatusMessage("Cursor sneezing disabled", "error");
            // Remove existing sneeze particles when disabled
            sneezeParticles.forEach(particle => {
                try {
                    document.body.removeChild(particle.element);
                } catch (e) {
                    // Element might have been removed already
                }
            });
            sneezeParticles = [];
        }
    });

    toggleMagnetic.addEventListener('change', function () {
        if (this.checked) {
            showStatusMessage("Magnetic elements enabled");
        } else {
            showStatusMessage("Magnetic elements disabled", "error");
            // Reset positions of all magnetic elements
            document.querySelectorAll('.attractable, .repellable').forEach(el => {
                el.style.transform = 'translate(0, 0)';
            });
        }
    });

    // Schedule random cursor sneezes
    function scheduleNextSneeze() {
        const delay = Math.random() * 15000 + 5000; // Between 5-20 seconds
        setTimeout(() => {
            if (toggleSneezing.checked) {
                cursorSneeze();
            }
            scheduleNextSneeze();
        }, delay);
    }

    // Main animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Update all cursor elements
        updateFollowerCursors();
        createCursorTrail();
        updateSneezeParticles();
    }

    // Initialize the page
    function init() {
        createObstacleCourse();
        scheduleNextSneeze();
        animate();

        // Initial status message
        setTimeout(() => {
            showStatusMessage("Welcome to Cursor Chaos! Move your cursor around to experience the madness.");
        }, 1000);

        // Add click event listeners to buttons
        document.querySelectorAll('.magnetic-button').forEach(button => {
            button.addEventListener('click', function () {
                showStatusMessage("You actually managed to click a button! Amazing cursor skills!");
            });
        });
    }

    // Start everything
    init();
});