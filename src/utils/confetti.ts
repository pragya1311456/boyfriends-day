/**
 * High-performance Canvas confetti and romantic hearts particle engine
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  type: 'heart' | 'star' | 'ribbon' | 'circle';
  opacity: number;
  decay: number;
  wobble: number;
  wobbleSpeed: number;
}

class RomanticParticleEngine {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private animationFrameId: number | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
    }
  }

  private initCanvas() {
    if (document.getElementById('romantic-confetti-canvas')) return;
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'romantic-confetti-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
  }

  private resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  public popperBlast() {
    this.initCanvas();
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Left popper blast (shooting up and right)
    this.addBurst(width * 0.1, height * 0.85, 55, 65, -15);
    // Right popper blast (shooting up and left)
    this.addBurst(width * 0.9, height * 0.85, 55, -65, -15);

    this.startLoop();
  }

  public burstAt(x: number, y: number, count = 40) {
    this.initCanvas();
    this.addBurst(x, y, count, 0, -20);
    this.startLoop();
  }

  private addBurst(originX: number, originY: number, count: number, biasX: number, biasY: number) {
    const colors = [
      '#c62845', '#e63946', '#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff', '#ffd166', '#ff85a1'
    ];
    const types: Array<'heart' | 'star' | 'ribbon' | 'circle'> = ['heart', 'heart', 'star', 'ribbon', 'ribbon'];

    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI) - (Math.PI / 2) + (biasX > 0 ? 0.3 : biasX < 0 ? -0.3 : 0);
      const speed = 12 + Math.random() * 22;

      this.particles.push({
        x: originX,
        y: originY,
        vx: (Math.cos(angle) * speed) + (biasX * 0.12),
        vy: -Math.abs(Math.sin(angle) * speed) + (biasY * 0.3) - 5,
        size: 8 + Math.random() * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: 1,
        decay: 0.006 + Math.random() * 0.009,
        wobble: 0,
        wobbleSpeed: 0.05 + Math.random() * 0.08
      });
    }
  }

  private startLoop() {
    if (!this.animationFrameId) {
      this.loop();
    }
  }

  private loop = () => {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.x += p.vx + Math.sin(p.wobble) * 1.5;
      p.y += p.vy;
      p.vy += 0.45; // gravity
      p.vx *= 0.98; // drag
      p.wobble += p.wobbleSpeed;
      p.rotation += p.rotationSpeed;
      p.opacity -= p.decay;

      if (p.opacity <= 0 || p.y > this.canvas.height + 40) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);

      this.ctx.fillStyle = p.color;

      if (p.type === 'heart') {
        this.drawHeart(this.ctx, p.size);
      } else if (p.type === 'star') {
        this.drawStar(this.ctx, p.size);
      } else if (p.type === 'ribbon') {
        this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationFrameId = requestAnimationFrame(this.loop);
    } else {
      this.animationFrameId = null;
    }
  };

  private drawHeart(ctx: CanvasRenderingContext2D, size: number) {
    const s = size * 0.5;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.2, s * 0.4, 0, s * 1.3);
    ctx.bezierCurveTo(s * 1.2, s * 0.4, s, -s * 0.5, 0, s * 0.3);
    ctx.fill();
  }

  private drawStar(ctx: CanvasRenderingContext2D, size: number) {
    const points = 5;
    const outerRadius = size * 0.6;
    const innerRadius = size * 0.25;
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }
}

export const romanticConfetti = new RomanticParticleEngine();
