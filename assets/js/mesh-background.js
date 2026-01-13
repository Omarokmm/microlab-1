/**
 * Smooth Particle Network Animation
 * Professional background animation for Micro Dental Lab
 */

document.addEventListener('DOMContentLoaded', function () {
    // Create canvas
    let canvas = document.getElementById('mesh-background');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'mesh-background';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.backgroundColor = '#0a0a0a'; // Professional dark background
        document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration - Professional subtle style
    const particleCount = 40; // Fewer particles since they're bigger
    const connectionDistance = 120; // Shorter connections
    const particleColor = '#c84a00'; // Rust color
    const lineColor = '#c84a00';

    // Particle class
    class Particle {
        constructor() {
            this.reset();
            // Start at random position
            this.x = Math.random() * width;
            this.y = Math.random() * height;
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 1 + 1; // Small: 1-2px base
        }

        update() {
            // Move particle
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Keep within bounds
            this.x = Math.max(0, Math.min(width, this.x));
            this.y = Math.max(0, Math.min(height, this.y));
        }

        draw() {
            // Draw tooth icon shape
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.fillStyle = particleColor;

            const s = this.size * 2; // Small scale for subtle effect

            // Tooth shape
            ctx.beginPath();
            ctx.moveTo(-s * 0.4, -s * 0.3);
            ctx.lineTo(s * 0.4, -s * 0.3);
            ctx.quadraticCurveTo(s * 0.5, -s * 0.2, s * 0.4, 0);
            ctx.lineTo(s * 0.2, s * 0.5);
            ctx.lineTo(-s * 0.2, s * 0.5);
            ctx.lineTo(-s * 0.4, 0);
            ctx.quadraticCurveTo(-s * 0.5, -s * 0.2, -s * 0.4, -s * 0.3);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        }
    }

    // Resize handler
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Reset particles on resize
        particles.forEach(p => p.reset());
    }

    window.addEventListener('resize', resize);

    // Initialize particles
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.5;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = 1 - (distance / connectionDistance);
                    ctx.globalAlpha = opacity * 0.3;

                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        ctx.globalAlpha = 1;

        requestAnimationFrame(animate);
    }

    // Start
    resize();
    initParticles();
    animate();
});
