// PETALAS
const petalsContainer = document.querySelector('.petals-container');

function createPetal() {
  const petal = document.createElement('div');
  petal.classList.add('petal');
  petal.style.left = Math.random() * window.innerWidth + 'px';
  petal.style.animationDuration = (4 + Math.random() * 3) + 's';
  petal.style.width = (15 + Math.random() * 25) + 'px';
  petal.style.height = petal.style.width;
  petalsContainer.appendChild(petal);
  setTimeout(() => petal.remove(), 8000);
}

setInterval(createPetal, 180);

// FOGOS DE ARTIFÍCIO
const canvas = document.getElementById('fireworks');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let fireworks = [];

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = Math.random() * (canvas.height / 2);
    this.particles = [];
    this.exploded = false;
  }

  update() {
    if (!this.exploded) {
      this.y -= 4;
      if (this.y <= this.targetY) this.explode();
    } else {
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.alpha -= 0.02;
      });
      this.particles = this.particles.filter(p => p.alpha > 0);
    }
  }

  explode() {
    this.exploded = true;
    const colors = ['#ff0040','#ffcc00','#00ffcc','#ff66ff','#66ff66'];
    for(let i = 0; i < 30; i++) {
      this.particles.push({
        x: this.x,
        y: this.y,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }
}

function animateFireworks() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.05) fireworks.push(new Firework());

  fireworks.forEach(fw => {
    fw.update();
    if (fw.exploded) {
      fw.particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(animateFireworks);
}

animateFireworks();
