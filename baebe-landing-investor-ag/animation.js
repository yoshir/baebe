// animation.js – Defender-style Animation Engine

// Sprite Data (1 = pixel, 0 = empty)
const SPRITES = {
    ship: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    thruster: [
        // Frame 1
        [
            [1, 0, 0],
            [1, 1, 0],
            [1, 1, 1],
            [1, 1, 0],
            [1, 0, 0]
        ],
        // Frame 2
        [
            [0, 0, 0],
            [1, 0, 0],
            [1, 1, 0],
            [1, 0, 0],
            [0, 0, 0]
        ],
        // Frame 3
        [
            [1, 1, 0],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 0]
        ]
    ],
    alien: [
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 0, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 1, 1, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 0, 0, 0, 0, 1, 0]
    ],
    lander: [
        [0, 0, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 0],
        [1, 1, 0, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0, 1, 0],
        [1, 0, 0, 1, 0, 0, 1]
    ],
    crystal: [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0]
    ],
    asteroid: [
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 1, 1, 0],
        [0, 1, 1, 1, 0]
    ],
    powerup: [
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0]
    ],
    mothership: [
        [0, 0, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 0, 0, 1],
        [1, 0, 0, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0, 1, 1, 0]
    ]
};

class DefenderGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // Handle resize
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.initTerrain();
        });

        this.entities = [];
        this.particles = [];
        this.stars = [];
        this.terrain = [];
        this.textLines = [];

        this.camera = {
            x: 0,
            targetX: 0,
            locked: false
        };

        this.frame = 0;
        this.isPlaying = false;
        this.isLooping = false;
        this.isMoving = false; // Track if player is moving for thruster animation
        this.onSlideComplete = null; // Callback for when player reaches screen edge
        this.onIntroComplete = null; // Callback for when intro sequence finishes
        this.currentScene = null;

        // Slide positioning system
        this.SLIDE_SPACING = 2500;
        // Start first slide at 1200 to allow for intro fly-in
        this.slidePositions = Array.from({ length: 10 }, (_, i) => 1200 + i * this.SLIDE_SPACING);
        this.currentSlideIndex = 0;
        this.allSlideTexts = []; // Store all slide text content

        this.colors = {
            bg: '#000000',
            ship: '#ffffff',
            enemy: '#00ff00', // Green for aliens
            terrain: '#cd5c5c', // Mars red/orange
            laser: '#ff0000',
            crystal: '#00ffff',
            star: '#ffffff'
        };

        this.initStars();
        this.initTerrain();

        // Input Handling
        this.keys = {};
        window.addEventListener('keydown', (e) => this.keys[e.code] = true);
        window.addEventListener('keyup', (e) => this.keys[e.code] = false);

        // Game State Machine
        this.GAME_STATES = {
            SPLASH: 'SPLASH',
            BUILD_TERRAIN: 'BUILD_TERRAIN',
            TELEPORT: 'TELEPORT',
            PLAYING: 'PLAYING'
        };
        this.currentState = this.GAME_STATES.SPLASH;
        this.stateTimer = 0;
        this.buildProgress = 0; // 0 to 1 for terrain build
    }

    initStars() {
        this.stars = [];
        // Sparse starfield
        for (let i = 0; i < 30; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                // Parallax speed: slower than terrain (which is ~2)
                speed: Math.random() * 0.5 + 0.1,
                size: Math.random() > 0.9 ? 2 : 1,
                visible: false // Hidden initially
            });
        }
    }

    initTerrain() {
        // Initialize with starting terrain
        this.terrain = [];
        this.lastTerrainX = 0;

        // Force flat platform for start
        const startPlatformWidth = 400;
        const platformHeight = this.height - 100;

        for (let x = 0; x <= startPlatformWidth; x += 40) {
            this.terrain.push({ x, y: platformHeight });
            this.lastTerrainX = x;
        }

        // Generate rest of initial view
        // Massive initial generation to be safe
        this.generateTerrainChunk(startPlatformWidth + 40, this.width * 10);
    }

    generateTerrainChunk(startX, endX) {
        // Get last height or start at default
        let h = this.terrain.length > 0 ?
            this.terrain[this.terrain.length - 1].y :
            this.height - 100;

        // Generate terrain in 40px segments
        for (let x = startX; x <= endX; x += 40) {
            if (Math.random() > 0.5) {
                h += (Math.random() - 0.5) * 40;
            }
            // Constrain to bottom 150px
            h = Math.max(this.height - 150, Math.min(this.height - 10, h));
            this.terrain.push({ x, y: h });
            this.lastTerrainX = x;
        }
    }

    updateTerrain() {
        // Generate terrain ahead of camera
        // AGGRESSIVE BUFFER: 5x width + 2000px extra
        const cameraRight = this.camera.x + this.width * 5 + 2000;

        // Always ensure we have terrain ahead
        if (this.lastTerrainX < cameraRight) {
            this.generateTerrainChunk(this.lastTerrainX + 40, cameraRight);
        }

        // FAILSAFE: If terrain count is low, force generation from last point
        if (this.terrain.length < 50) {
            const lastPoint = this.terrain[this.terrain.length - 1];
            if (lastPoint) {
                this.generateTerrainChunk(lastPoint.x + 40, lastPoint.x + this.width * 5);
            } else {
                // Total failure recovery
                this.generateTerrainChunk(this.camera.x, this.camera.x + this.width * 5);
            }
        }

        // Remove terrain far behind camera to save memory
        // Keep 2 screens behind just in case
        const cameraLeft = this.camera.x - this.width * 2;
        this.terrain = this.terrain.filter(t => t.x > cameraLeft);
    }

    loadAllSlides(slidesData) {
        // Load all slide text content at once and position them
        this.allSlideTexts = [];
        this.textLines = [];

        const MAX_CHARS_PER_LINE = 60; // Adjust based on font size and screen width

        slidesData.forEach((slide, index) => {
            const slideX = this.slidePositions[index];
            const lines = slide.content.split('\n').filter(l => l.trim() !== '');
            let yOffset = 150;

            lines.forEach(line => {
                const trimmed = line.trim();
                let type = 'p';
                let text = trimmed;

                // Determine type and clean text
                if (trimmed.startsWith('•')) {
                    type = 'li';
                    text = trimmed.substring(1).trim();
                } else if (trimmed.includes(':') && !trimmed.startsWith('•')) {
                    type = 'h3';
                }

                // Text Wrapping Logic
                const words = text.split(' ');
                let currentLine = '';
                let wrappedLines = [];

                if (type === 'li') {
                    // Indent wrapped lines for list items
                    words.forEach((word, i) => {
                        const testLine = currentLine + (i === 0 ? '' : ' ') + word;
                        if (testLine.length > MAX_CHARS_PER_LINE) {
                            wrappedLines.push(currentLine);
                            currentLine = '  ' + word; // Indent subsequent lines
                        } else {
                            currentLine = testLine;
                        }
                    });
                    wrappedLines.push(currentLine);
                } else {
                    // Normal wrapping
                    words.forEach((word, i) => {
                        const testLine = currentLine + (i === 0 ? '' : ' ') + word;
                        if (testLine.length > MAX_CHARS_PER_LINE) {
                            wrappedLines.push(currentLine);
                            currentLine = word;
                        } else {
                            currentLine = testLine;
                        }
                    });
                    wrappedLines.push(currentLine);
                }

                // Add each wrapped line to textLines
                wrappedLines.forEach((wrappedLine, i) => {
                    this.textLines.push({
                        text: (type === 'li' && i === 0 ? '• ' : '') + wrappedLine,
                        type: type,
                        // FIX: Position text at slide position (will be centered when camera is at slideX)
                        x: slideX, // Text centered when camera.x = slideX
                        y: yOffset,
                        slideIndex: index
                    });

                    // Spacing for next line
                    yOffset += 30; // Standard line height
                });

                // Extra spacing after the block
                yOffset += type === 'h3' ? 30 : 15;
            });
        });

        // Initialize player at start position
        this.player = {
            x: this.width * 0.33, // Start at left bound to avoid jump
            y: this.height - 150, // Start above ground
            vx: 0,
            vy: 0,
            width: 42,
            height: 24,
            color: this.colors.ship,
            visible: false, // Hidden initially
            thrusterFrame: 0,
            lastShot: 0,
            facingRight: true
        };

        // Start Sequence State
        this.currentState = this.GAME_STATES.SPLASH;
        this.stateTimer = 0;
        this.introMode = false;
        this.introFrames = 0;

        // Reset camera
        this.camera.x = 0;
        this.camera.lastX = 0;

        // Start at first slide
        this.navigateToSlide(0, false);

        // OVERRIDE for Intro: Force camera to 0 so we can fly TO the first slide
        this.camera.x = 0;
        this.camera.lastX = 0;

        this.isPlaying = true;

        // Start the game loop
        if (!this.isLooping) {
            this.loop();
        }
    }

    navigateToSlide(slideIndex, smooth = true) {
        if (slideIndex < 0 || slideIndex >= this.slidePositions.length) return;

        this.currentSlideIndex = slideIndex;
        const targetX = this.slidePositions[slideIndex];

        if (smooth) {
            // Smooth camera pan
            this.cameraPanTarget = targetX;
            this.cameraPanning = true;
        } else {
            // Instant jump (only for initial load)
            this.camera.x = targetX;
            this.camera.lastX = targetX;
            // Position player at start on first load
            if (!this.player) {
                this.player = {
                    x: 50,
                    y: this.height - 100,
                    vx: 0,
                    vy: 0,
                    width: 42,
                    height: 24,
                    color: this.colors.ship,
                    visible: true,
                    thrusterFrame: 0,
                    lastShot: 0,
                    facingRight: true
                };
            }
        }
    }

    stop() {
        this.isPlaying = false;
    }

    spawnAlien(x, y) {
        this.entities.push({
            type: 'alien',
            x: x,
            y: y,
            width: 24,
            height: 21,
            vx: -2,
            vy: 0,
            color: this.colors.enemy,
            behavior: 'attack'
        });
    }

    update() {
        if (!this.isPlaying) return;

        this.stateTimer++;

        // --- STATE MACHINE UPDATE ---
        switch (this.currentState) {
            case this.GAME_STATES.SPLASH:
                // Show "OPTIMAL ANARCHY" for 3 seconds (180 frames)
                if (this.stateTimer > 180) {
                    this.currentState = this.GAME_STATES.BUILD_TERRAIN;
                    this.stateTimer = 0;
                    this.buildProgress = 0;
                }
                return; // Don't run game logic

            case this.GAME_STATES.BUILD_TERRAIN:
                // Animate terrain drawing from left to right
                this.buildProgress += 0.01; // 100 frames to build

                // Fade in stars
                if (this.stateTimer % 5 === 0) {
                    const hiddenStar = this.stars.find(s => !s.visible);
                    if (hiddenStar) hiddenStar.visible = true;
                }

                if (this.buildProgress >= 1) {
                    this.buildProgress = 1;
                    this.currentState = this.GAME_STATES.TELEPORT;
                    this.stateTimer = 0;
                    this.teleporting = true;
                }
                return; // Don't run game logic

            case this.GAME_STATES.TELEPORT:
                // Teleport Sequence
                // Beam particles
                if (this.frame % 2 === 0) {
                    this.particles.push({
                        x: this.player.x + Math.random() * this.player.width,
                        y: 0,
                        vx: 0,
                        vy: 15 + Math.random() * 5, // Fast down
                        life: 30,
                        color: '#00ffff',
                        size: 2
                    });
                }

                // Flicker player visibility
                if (this.stateTimer > 60) {
                    this.player.visible = this.frame % 4 < 2;
                }

                // End teleport
                if (this.stateTimer > 120) {
                    this.teleporting = false;
                    this.player.visible = true;
                    this.currentState = this.GAME_STATES.PLAYING;
                    this.introMode = true; // Start auto-fly
                    this.player.vx = 3; // Set initial velocity for intro

                    // Explosion effect on landing
                    this.createExplosion(this.player.x + this.player.width / 2, this.player.y + this.player.height, '#00ffff');

                    // Trigger Intro Complete Callback
                    if (this.onIntroComplete) {
                        this.onIntroComplete();
                    }
                }

                // Update particles so beam works
                this.particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life--;
                });
                this.particles = this.particles.filter(p => p.life > 0);
                this.frame++;
                return; // Don't run other game logic
        }

        // --- PLAYING STATE LOGIC ---

        // Update terrain chunks
        this.updateTerrain();

        // Intro animation - auto-fly and slide in first text
        if (this.introMode) {
            this.introFrames++;
            // Auto-fly forward for ~5 seconds (300 frames at 60fps)
            if (this.introFrames < 300) {
                this.camera.x += 4; // Fly 1200px in 300 frames
                this.camera.lastX = this.camera.x;
                this.isMoving = true; // Show thruster
            } else {
                // End intro mode, give control to player
                this.introMode = false;
                this.player.vx = 0;
            }
        }

        // Smooth camera panning (for Next/Prev buttons)
        if (this.cameraPanning && this.cameraPanTarget !== undefined) {
            const diff = this.cameraPanTarget - this.camera.x;
            if (Math.abs(diff) < 5) {
                // Close enough - snap to target and stop panning
                this.camera.x = this.cameraPanTarget;
                this.camera.lastX = this.cameraPanTarget;
                this.cameraPanning = false;
                this.cameraPanTarget = undefined;
            } else {
                // Continue smooth interpolation
                this.camera.x += diff * 0.1;
                this.camera.lastX = this.camera.x;
            }
        }

        // Update Player (Simple Directional Controls)
        const speed = 5;
        this.isMoving = false;

        if (this.keys['ArrowUp']) {
            this.player.y -= speed;
            this.isMoving = true;
        }
        if (this.keys['ArrowDown']) {
            this.player.y += speed;
            this.isMoving = true;
        }
        if (this.keys['ArrowLeft']) {
            this.player.x -= speed;
            this.player.facingRight = false;
            this.isMoving = true;
        }
        if (this.keys['ArrowRight']) {
            this.player.x += speed;
            this.player.facingRight = true;
            this.isMoving = true;
        }

        // Constrain Player to 2/3rds of screen in either direction
        const leftBound = this.width * 0.33;  // 1/3 from left
        const rightBound = this.width * 0.67; // 2/3 from left
        this.player.x = Math.max(leftBound, Math.min(rightBound, this.player.x));
        this.player.y = Math.max(0, Math.min(this.height - this.player.height, this.player.y));

        // Camera Logic
        let targetScrollSpeed = 0;

        // Only allow player to control camera if not currently panning to a slide AND not in intro mode
        if (!this.cameraPanning && !this.introMode) {
            // Player at right boundary - camera follows forward
            if (this.player.x >= rightBound - 50) { // Start easing earlier
                // Calculate easing factor (0 to 1) based on how close to edge
                const dist = this.player.x - (rightBound - 50);
                const maxDist = 50;
                const ease = Math.min(1, dist / maxDist);
                targetScrollSpeed = speed * 0.8 * ease;
            }

            // BACKWARD SCROLLING REMOVED AS REQUESTED
            // The user specifically asked to "find the backing up code and delete it"
            // to prevent showing empty terrain.

            // Smoothly interpolate current scroll speed to target
            // Initialize currentScrollSpeed if not exists
            if (this.currentScrollSpeed === undefined) this.currentScrollSpeed = 0;

            // Linear interpolation for smooth acceleration/deceleration
            this.currentScrollSpeed += (targetScrollSpeed - this.currentScrollSpeed) * 0.1;

            // Snap to 0 if very small
            if (Math.abs(this.currentScrollSpeed) < 0.01) this.currentScrollSpeed = 0;

            // REMOVED: Snap logic that was causing terrain cutoff
            // Player can now fly freely past all slides

            // Apply camera movement
            this.camera.x += this.currentScrollSpeed;

            // Don't let camera go negative
            if (this.camera.x < 0) {
                this.camera.x = 0;
                this.currentScrollSpeed = 0;
            }
        }

        // Check if player has reached the edge of the screen to advance slide
        if (this.onSlideComplete) {
            // Right edge - advance to next slide
            if (this.player.x >= this.width - this.player.width - 5) {
                this.onSlideComplete('next');
            }
            // Left edge - go to previous slide
            else if (this.player.x <= 5 && this.camera.x > 0) {
                this.onSlideComplete('prev');
            }
        }

        // Thruster animation (only when moving)
        if (this.isMoving) {
            if (this.frame % 3 === 0) {
                this.player.thrusterFrame = (this.player.thrusterFrame + 1) % 3;
            }
        }

        // Shooting
        if (this.keys['Space'] && this.frame - this.player.lastShot > 10) {
            const laserVx = this.player.facingRight ? 15 : -15;
            const laserX = this.player.facingRight ?
                this.player.x + this.player.width + this.camera.x :
                this.player.x + this.camera.x - 20;

            this.entities.push({
                type: 'laser',
                x: laserX,
                y: this.player.y + this.player.height / 2,
                width: 20,
                height: 2,
                vx: laserVx,
                color: this.colors.laser
            });
            this.player.lastShot = this.frame;
        }

        // Boost (Shift)
        if (this.keys['ShiftLeft'] || this.keys['ShiftRight']) {
            if (!this.camera.locked) {
                this.camera.x += 6;
            }
        }

        // Scene specific updates
        if (this.currentScene === 'Liftoff') {
            // Auto-fly up initially
            if (this.frame < 60 && this.player.y > this.height / 2) this.player.y -= 2;
        }
        if (this.currentScene === 'Hyperspace') {
            targetScrollSpeed = 20;
            this.createParticles(this.player.x, this.player.y + 10, '#00ffff', 2);
        }
        if (this.currentScene === 'Shield Activation') {
            // Shield effect
            if (this.frame % 5 === 0) {
                this.createParticles(this.player.x + this.player.width, this.player.y + this.player.height / 2, '#00ffff', 1);
            }
        }

        // Update Stars (Parallax - based on camera movement)
        const cameraDelta = this.camera.x - (this.camera.lastX || 0);
        this.camera.lastX = this.camera.x;

        this.stars.forEach(star => {
            // Stars move slower than camera (parallax effect)
            star.x -= cameraDelta * 0.3;
            if (star.x < 0) star.x = this.width;
            if (star.x > this.width) star.x = 0;
        });

        // Update Terrain (moves with camera)
        if (this.currentScene !== 'Ascension') {
            this.terrain.forEach(point => {
                point.x -= cameraDelta;
            });
            // Recycle terrain
            if (this.terrain[0].x < -40) {
                this.terrain.shift();
                const lastX = this.terrain[this.terrain.length - 1].x;
                // Blocky terrain logic
                let newH = this.terrain[this.terrain.length - 1].y;
                if (Math.random() > 0.7) {
                    newH += (Math.random() - 0.5) * 60;
                }
                // Constrain to bottom 150px
                newH = Math.max(this.height - 150, Math.min(this.height - 10, newH));
                this.terrain.push({ x: lastX + 40, y: newH });
            }
        }

        // Update Entities
        this.entities.forEach(ent => {
            if (ent.type === 'alien') {
                // Attack logic
                ent.x += ent.vx;
                ent.y += Math.sin(this.frame / 10) * 2; // Bobbing

                // Swoop attack
                if (Math.abs(ent.x - this.player.x) < 300 && Math.abs(ent.x - this.player.x) > 50) {
                    ent.y += (this.player.y - ent.y) * 0.03;
                }
            } else if (ent.type === 'lander') {
                // Lander logic
                ent.x += ent.vx;
                ent.y += Math.cos(this.frame / 20) * 1;
            } else if (ent.vx) {
                ent.x += ent.vx;
            }

            // Wingmen follow player
            if (ent.type === 'wingman') {
                ent.x = this.player.x + ent.offsetX + this.camera.x; // World coords
                ent.y = this.player.y + ent.offsetY;
            }

            // Collision detection (simple AABB)
            // Convert entity world x to screen x for collision with player
            const entScreenX = ent.x - this.camera.x;
            const entRect = { ...ent, x: entScreenX };

            if (this.checkCollision(this.player, entRect)) {
                if (ent.type === 'crystal' || ent.type === 'powerup') {
                    ent.collected = true;
                    this.createExplosion(entScreenX, ent.y, ent.color);
                }
                if ((ent.type === 'debris' || ent.type === 'alien' || ent.type === 'asteroid' || ent.type === 'lander') && this.player.shield) {
                    ent.destroyed = true;
                    this.createExplosion(entScreenX, ent.y, '#ffffff');
                }
            }

            // Laser collisions
            if (ent.type === 'laser') {
                this.entities.forEach(target => {
                    if (target !== ent && !target.destroyed && !target.collected && target.type !== 'laser' && target.type !== 'wingman' && target.type !== 'powerup' && target.type !== 'crystal') {
                        // Both are in world coords
                        if (this.checkCollision(ent, target)) {
                            ent.destroyed = true;
                            target.destroyed = true;
                            this.createExplosion(target.x - this.camera.x, target.y, target.color || '#fff');
                        }
                    }
                });
            }
        });

        // Remove collected/destroyed entities
        this.entities = this.entities.filter(e => !e.collected && !e.destroyed && e.x - this.camera.x > -100);

        // Update Particles
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
        });
        this.particles = this.particles.filter(p => p.life > 0);

        this.frame++;
        // Infinite loop now
        // if (this.frame > 300) { this.isPlaying = false; }
    }

    draw() {
        // Clear
        this.ctx.fillStyle = this.colors.bg;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // --- SPLASH SCREEN ---
        if (this.currentState === this.GAME_STATES.SPLASH) {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '32px "Press Start 2P"';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('OPTIMAL ANARCHY', this.width / 2, this.height / 2);

            this.ctx.font = '16px "Press Start 2P"';
            this.ctx.fillStyle = '#00ffff';
            this.ctx.fillText('CORP', this.width / 2, this.height / 2 + 40);
            return;
        }

        // Draw Stars
        this.ctx.fillStyle = this.colors.star;
        this.stars.forEach(star => {
            if (this.currentState === this.GAME_STATES.BUILD_TERRAIN && !star.visible) return;

            if (this.currentScene === 'Hyperspace') {
                this.ctx.fillRect(star.x, star.y, 20, 1); // Streak
            } else {
                this.ctx.fillRect(star.x, star.y, star.size, star.size);
            }
        });

        // Draw Terrain
        if (this.currentScene !== 'Ascension' && this.currentScene !== 'Hyperspace') {
            this.ctx.strokeStyle = this.currentScene === 'Neon City Run' ? '#00ff00' : this.colors.terrain;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();

            // Handle Build Animation
            let drawLimit = this.terrain.length;
            if (this.currentState === this.GAME_STATES.BUILD_TERRAIN) {
                drawLimit = Math.floor(this.terrain.length * this.buildProgress);
            }

            if (drawLimit > 0) {
                this.ctx.moveTo(this.terrain[0].x, this.terrain[0].y);
                // Draw blocky terrain
                for (let i = 1; i < drawLimit; i++) {
                    this.ctx.lineTo(this.terrain[i].x, this.terrain[i - 1].y); // Horizontal
                    this.ctx.lineTo(this.terrain[i].x, this.terrain[i].y);   // Vertical
                }
                this.ctx.stroke();
            }
        }

        // Draw Teleport Beam
        if (this.currentState === this.GAME_STATES.TELEPORT) {
            this.ctx.save();
            this.ctx.fillStyle = `rgba(0, 255, 255, ${Math.random() * 0.3})`;
            this.ctx.fillRect(this.player.x, 0, this.player.width, this.player.y + this.player.height);
            this.ctx.restore();
        }

        // Draw Player
        if (this.player.visible) {
            // Flip ship based on direction
            this.ctx.save();
            if (!this.player.facingRight) {
                this.ctx.scale(-1, 1);
                this.ctx.translate(-this.player.x * 2 - this.player.width, 0);
            }

            this.drawSprite(SPRITES.ship, this.player.x, this.player.y, this.player.color, 3);

            // Draw Thruster (only when moving)
            if (this.isMoving && this.currentScene !== 'Ascension') {
                const tFrame = SPRITES.thruster[this.player.thrusterFrame];
                // Thruster always at the BACK of ship
                // When facing right, back is left side. When facing left, back is right side.
                const thrusterX = this.player.facingRight ? this.player.x - 9 : this.player.x + this.player.width - 3;
                this.drawSprite(tFrame, thrusterX, this.player.y + 9, '#ffaa00', 3);
            }

            this.ctx.restore();

            // Shield
            if (this.player.shield) {
                this.ctx.strokeStyle = '#00ffff';
                this.ctx.beginPath();
                this.ctx.arc(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2, 30, 0, Math.PI * 2);
                this.ctx.stroke();
            }
        }

        // Draw Entities
        if (this.currentState === this.GAME_STATES.PLAYING) {
            this.entities.forEach(ent => {
                const screenX = ent.x - this.camera.x;
                if (screenX < -50 || screenX > this.width + 50) return; // Cull offscreen

                if (ent.type === 'wingman') {
                    this.drawSprite(SPRITES.ship, screenX, ent.y, this.colors.ship, 2); // Smaller wingmen
                } else if (ent.type === 'alien') {
                    this.drawSprite(SPRITES.alien, screenX, ent.y, ent.color, 3);
                } else if (ent.type === 'lander') {
                    this.drawSprite(SPRITES.lander, screenX, ent.y, ent.color, 3);
                } else if (ent.type === 'crystal') {
                    this.drawSprite(SPRITES.crystal, screenX, ent.y, ent.color, 3);
                } else if (ent.type === 'asteroid') {
                    this.drawSprite(SPRITES.asteroid, screenX, ent.y, ent.color, 4);
                } else if (ent.type === 'powerup') {
                    this.drawSprite(SPRITES.powerup, screenX, ent.y, ent.color, 3);
                } else if (ent.type === 'mothership') {
                    this.drawSprite(SPRITES.mothership, screenX, ent.y, ent.color, 10); // Giant mothership
                } else {
                    this.ctx.fillStyle = ent.color || '#fff';
                    this.ctx.fillRect(screenX, ent.y, ent.width || 10, ent.height || 10);
                }
            });

            // Draw Text
            this.ctx.textAlign = 'center'; // Center text
            this.textLines.forEach(line => {
                const screenX = line.x - this.camera.x;
                if (screenX < -500 || screenX > this.width + 500) return; // Increased cull buffer

                this.ctx.fillStyle = '#0ff';
                if (line.type === 'h3') {
                    this.ctx.font = '24px "Press Start 2P"';
                    this.ctx.fillStyle = '#ff0';
                } else {
                    this.ctx.font = '14px "Press Start 2P"';
                }

                if (line.type === 'li') {
                    // For list items, we still want them left-aligned relative to the block, 
                    // but the block is centered. 
                    // A simple hack is to draw them slightly offset if we want strict left alignment,
                    // but centering everything looks better for this style.
                    this.ctx.fillText('• ' + line.text, screenX, line.y);
                } else {
                    this.ctx.fillText(line.text, screenX, line.y);
                }
            });
        }

        // Draw Particles
        this.particles.forEach(p => {
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(p.x, p.y, p.size || 2, p.size || 2);
        });
    }

    drawSprite(sprite, x, y, color, scale = 1) {
        this.ctx.fillStyle = color;
        for (let r = 0; r < sprite.length; r++) {
            for (let c = 0; c < sprite[r].length; c++) {
                if (sprite[r][c] === 1) {
                    this.ctx.fillRect(x + c * scale, y + r * scale, scale, scale);
                }
            }
        }
    }

    loop() {
        if (!this.isPlaying) {
            this.isLooping = false;
            return;
        }
        this.isLooping = true;
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }

    createParticles(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 20 + Math.random() * 20,
                color: color
            });
        }
    }

    createExplosion(x, y, color) {
        // More particles for bigger boom
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10, // Faster explosion
                vy: (Math.random() - 0.5) * 10,
                life: 30 + Math.random() * 20,
                color: Math.random() > 0.5 ? color : '#ffffff', // Mix with white
                size: Math.random() * 3 + 1
            });
        }
    }

    checkCollision(rect1, rect2) {
        // Simple AABB
        const r1w = rect1.width || 30;
        const r1h = rect1.height || 10;
        const r2w = rect2.width || 10;
        const r2h = rect2.height || 10;

        return (rect1.x < rect2.x + r2w &&
            rect1.x + r1w > rect2.x &&
            rect1.y < rect2.y + r2h &&
            rect1.y + r1h > rect2.y);
    }
}

// Export for use in investor-portal.js
window.DefenderGame = DefenderGame;
