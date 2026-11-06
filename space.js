/**
 * Space-themed interactive canvas animations for the portfolio hero:
 * - ACTIVE ONLY IN DARK MODE: In light/bright mode, canvas is completely clear with 0 stars visible.
 * - Realistic Starfield / Dust Particles: Bright, luminous stars with atmospheric shimmer,
 *   diffraction flares on prominent stars, and depth layering.
 * - Gentle Constellation Lines: Faint connections between nearby stars, interactively
 *   connecting to the cursor with magnetic dust attraction.
 * - Frequent Realistic Shooting Stars: Brilliant meteors with a hot diamond nucleus,
 *   dual-layer ionised trail, radial corona glow, and shedding stardust sparks.
 */

export function setupSpaceAnimation() {
  const hero = document.getElementById("home");
  const canvas = document.getElementById("space-canvas");
  if (!hero || !canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animId = null;
  let particles = [];
  let shootingStars = [];
  let stardustSparks = [];
  let nextShootingStarTime = performance.now() + 600;

  const mouse = {
    x: -9999,
    y: -9999,
    active: false,
    radius: 140,
  };

  function isDarkMode() {
    return document.documentElement.dataset.theme === "dark";
  }

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    if (!isDarkMode()) {
      clearCanvas();
      return;
    }

    initParticles();
    if (reducedMotion.matches) {
      renderStatic();
    }
  }

  function clearCanvas() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function initParticles() {
    // Dynamic particle count based on screen area: ~45 on small mobile, ~88 on desktop
    const targetCount = Math.max(
      42,
      Math.min(88, Math.floor((width * height) / 12500)),
    );

    particles = [];
    for (let i = 0; i < targetCount; i++) {
      const isBright = Math.random() < 0.25; // 25% prominent bright stars
      const hasFlare = isBright && Math.random() < 0.45; // Optical cross flare on brightest stars

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // Slow peaceful cosmic drift
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        size: isBright
          ? Math.random() * 1.1 + 1.4 // 1.4px - 2.5px
          : Math.random() * 0.9 + 0.6, // 0.6px - 1.5px
        baseAlpha: isBright
          ? Math.random() * 0.35 + 0.65 // 0.65 - 1.0 (bright, luminous)
          : Math.random() * 0.35 + 0.3, // 0.3 - 0.65 (distant background)
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.015 + Math.random() * 0.025,
        twinkleHarmonic: 1.8 + Math.random() * 1.2,
        isBright,
        hasFlare,
        // Type 0: Pure bright white, Type 1: Soft rose/pink accent, Type 2: Lilac starlight
        type: Math.random() < 0.5 ? 0 : Math.random() < 0.82 ? 1 : 2,
      });
    }
  }

  function spawnShootingStar() {
    // Spawn across upper/top-right region (above and surrounding the orbital sculpture)
    const startX = width * (0.52 + Math.random() * 0.44);
    const startY = height * (0.02 + Math.random() * 0.26);
    // Angle: downward and leftward (~135° to 148° diagonal sweep)
    const angle = Math.PI * (0.74 + (Math.random() - 0.5) * 0.14);
    const speed = 8.5 + Math.random() * 4.5;
    const length = 130 + Math.random() * 75;
    const isMajor = Math.random() < 0.3; // Major brilliant meteor

    shootingStars.push({
      x: startX,
      y: startY,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      speed,
      length,
      width: isMajor ? 2.2 : 1.6,
      life: 0,
      maxLife: Math.floor(42 + Math.random() * 18),
      isMajor,
    });
  }

  const darkPalette = {
    star0: "255, 255, 255", // Brilliant diamond white
    star1: "250, 195, 210", // Luminous rose/pink accent
    star2: "228, 165, 195", // Soft lilac starlight
    glow: "243, 185, 200",
    flare: "255, 240, 248",
    line: "243, 185, 200",
    cursorLine: "243, 185, 200",
    trailOuter: "243, 185, 200",
    trailCore: "255, 255, 255",
    headCore: "255, 255, 255",
    spark: "255, 220, 235",
    lineMaxDist: 88,
    lineBaseAlpha: 0.16,
  };

  function renderStatic() {
    clearCanvas();
    if (!isDarkMode()) return;

    ctx.scale(dpr, dpr);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const rgb =
        p.type === 0
          ? darkPalette.star0
          : p.type === 1
            ? darkPalette.star1
            : darkPalette.star2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, ${p.baseAlpha})`;
      ctx.fill();
    }
  }

  function frame(timestamp) {
    // If not in dark mode, hero hidden, or tab hidden: do not run animation loop
    if (!isDarkMode()) {
      clearCanvas();
      animId = null;
      return;
    }

    if (hero.hidden || document.visibilityState === "hidden") {
      animId = null;
      return;
    }

    if (reducedMotion.matches) {
      renderStatic();
      animId = null;
      return;
    }

    clearCanvas();
    ctx.scale(dpr, dpr);

    // 1. Update and render starfield stars
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around bounds seamlessly
      if (p.x < -12) p.x = width + 12;
      else if (p.x > width + 12) p.x = -12;
      if (p.y < -12) p.y = height + 12;
      else if (p.y > height + 12) p.y = -12;

      // Realistic compound starlight scintillation
      p.twinklePhase += p.twinkleSpeed;
      const shimmer =
        Math.sin(p.twinklePhase) * 0.28 +
        Math.sin(p.twinklePhase * p.twinkleHarmonic) * 0.14;
      const currentAlpha = Math.max(
        0.18,
        Math.min(1, p.baseAlpha + shimmer),
      );

      const rgb =
        p.type === 0
          ? darkPalette.star0
          : p.type === 1
            ? darkPalette.star1
            : darkPalette.star2;

      // Core star point
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, ${currentAlpha})`;
      ctx.fill();

      // Atmospheric starlight glow halo for bright stars
      if (p.isBright) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${darkPalette.glow}, ${currentAlpha * 0.18})`;
        ctx.fill();

        // Delicate optical cross flare for prominent stars
        if (p.hasFlare && currentAlpha > 0.65) {
          const flareLen = p.size * 3.5;
          const flareAlpha = currentAlpha * 0.3;
          ctx.beginPath();
          ctx.moveTo(p.x - flareLen, p.y);
          ctx.lineTo(p.x + flareLen, p.y);
          ctx.moveTo(p.x, p.y - flareLen);
          ctx.lineTo(p.x, p.y + flareLen);
          ctx.strokeStyle = `rgba(${darkPalette.flare}, ${flareAlpha})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }
    }

    // 2. Gentle Constellation Lines between nearby stars
    const maxDist = darkPalette.lineMaxDist;
    const maxDistSq = maxDist * maxDist;

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / maxDist) * darkPalette.lineBaseAlpha;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${darkPalette.line}, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    // 3. Interactive Constellation Lines to Mouse Cursor
    if (mouse.active) {
      const mRadius = mouse.radius;
      const mRadiusSq = mRadius * mRadius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < mRadiusSq) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / mRadius) * 0.35;

          // Glowing interactive line from cursor to star
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(${darkPalette.cursorLine}, ${alpha})`;
          ctx.lineWidth = 0.95;
          ctx.stroke();

          // Subtle magnetic attraction
          const force = (1 - dist / mRadius) * 0.22;
          p.x += (mouse.x - p.x) * force * 0.04;
          p.y += (mouse.y - p.y) * force * 0.04;
        }
      }
    }

    // 4. Stardust sparks shedding from shooting stars
    for (let i = stardustSparks.length - 1; i >= 0; i--) {
      const spark = stardustSparks[i];
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.life++;

      const pLife = spark.life / spark.maxLife;
      const sparkAlpha = (1 - pLife) * 0.75;

      ctx.beginPath();
      ctx.arc(spark.x, spark.y, spark.size * (1 - pLife * 0.4), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${darkPalette.spark}, ${sparkAlpha})`;
      ctx.fill();

      if (spark.life >= spark.maxLife) {
        stardustSparks.splice(i, 1);
      }
    }

    // 5. Frequent Realistic Shooting Stars (Meteors)
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      s.x += s.dx;
      s.y += s.dy;
      s.life++;

      const progress = s.life / s.maxLife;
      // Fast brilliant ramp-in, sustained intensity, smooth atmospheric decay
      const opacity =
        progress < 0.15
          ? progress / 0.15
          : Math.pow(Math.max(0, 1 - (progress - 0.15) / 0.85), 1.25);

      // Trail vector
      const currentTrailLength = s.length * Math.min(1, s.life / 7);
      const normDx = s.dx / s.speed;
      const normDy = s.dy / s.speed;
      const tailX = s.x - normDx * currentTrailLength;
      const tailY = s.y - normDy * currentTrailLength;

      // Shedding stardust sparks
      if (Math.random() < 0.38) {
        stardustSparks.push({
          x: s.x - normDx * (Math.random() * 25) + (Math.random() - 0.5) * 2,
          y: s.y - normDy * (Math.random() * 25) + (Math.random() - 0.5) * 2,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          life: 0,
          maxLife: Math.floor(18 + Math.random() * 16),
          size: Math.random() * 1.1 + 0.6,
        });
      }

      ctx.save();

      // Outer luminous ionised trail
      const gradOuter = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      gradOuter.addColorStop(0, `rgba(${darkPalette.trailOuter}, 0)`);
      gradOuter.addColorStop(
        0.65,
        `rgba(${darkPalette.trailOuter}, ${opacity * 0.55})`,
      );
      gradOuter.addColorStop(
        1,
        `rgba(${darkPalette.trailOuter}, ${opacity * 0.95})`,
      );

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = gradOuter;
      ctx.lineWidth = s.width * (s.isMajor ? 1.6 : 1.3);
      ctx.stroke();

      // Inner white-hot brilliant core streak (front 55% of trail)
      const coreTailX = s.x - normDx * (currentTrailLength * 0.55);
      const coreTailY = s.y - normDy * (currentTrailLength * 0.55);
      const gradCore = ctx.createLinearGradient(coreTailX, coreTailY, s.x, s.y);
      gradCore.addColorStop(0, `rgba(${darkPalette.trailCore}, 0)`);
      gradCore.addColorStop(
        1,
        `rgba(${darkPalette.trailCore}, ${opacity})`,
      );

      ctx.beginPath();
      ctx.moveTo(coreTailX, coreTailY);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = gradCore;
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // Radial corona flare around meteor head
      const coronaRadius = s.isMajor ? 10 : 7;
      const gradCorona = ctx.createRadialGradient(
        s.x,
        s.y,
        0,
        s.x,
        s.y,
        coronaRadius,
      );
      gradCorona.addColorStop(
        0,
        `rgba(${darkPalette.headCore}, ${opacity * 0.95})`,
      );
      gradCorona.addColorStop(
        0.4,
        `rgba(${darkPalette.trailOuter}, ${opacity * 0.5})`,
      );
      gradCorona.addColorStop(1, `rgba(${darkPalette.trailOuter}, 0)`);

      ctx.beginPath();
      ctx.arc(s.x, s.y, coronaRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradCorona;
      ctx.fill();

      // Diamond nucleus head
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.isMajor ? 2.3 : 1.7, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${darkPalette.headCore}, ${opacity})`;
      ctx.shadowColor = `rgba(${darkPalette.trailOuter}, ${opacity})`;
      ctx.shadowBlur = s.isMajor ? 14 : 9;
      ctx.fill();

      ctx.restore();

      if (s.life >= s.maxLife) {
        shootingStars.splice(i, 1);
      }
    }

    // Schedule and spawn shooting stars more often (every 1.8s to 3.8s)
    if (timestamp >= nextShootingStarTime) {
      spawnShootingStar();
      // Occasional twin meteor (22% chance of another one following quickly)
      if (Math.random() < 0.22) {
        setTimeout(() => {
          if (isDarkMode() && !hero.hidden && !reducedMotion.matches) {
            spawnShootingStar();
          }
        }, 320 + Math.random() * 250);
      }
      nextShootingStarTime =
        timestamp + 1800 + Math.random() * 2000;
    }

    animId = requestAnimationFrame(frame);
  }

  function startAnimation() {
    if (!isDarkMode() || animId || reducedMotion.matches || hero.hidden) return;
    animId = requestAnimationFrame(frame);
  }

  function stopAnimation() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  function onMouseMove(e) {
    if (!isDarkMode()) return;
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  }

  function onMouseLeave() {
    mouse.active = false;
  }

  hero.addEventListener("mousemove", onMouseMove, { passive: true });
  hero.addEventListener("mouseleave", onMouseLeave, { passive: true });
  window.addEventListener("resize", resize, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden || !isDarkMode()) {
      stopAnimation();
    } else if (!hero.hidden) {
      startAnimation();
    }
  });

  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) {
      stopAnimation();
      renderStatic();
    } else if (isDarkMode() && !hero.hidden) {
      startAnimation();
    }
  });

  // Watch for view navigation changes (hidden attribute)
  const viewObserver = new MutationObserver(() => {
    if (hero.hidden || !isDarkMode()) {
      stopAnimation();
    } else {
      resize();
      startAnimation();
    }
  });
  viewObserver.observe(hero, { attributes: true, attributeFilter: ["hidden"] });

  // Watch for theme changes on html (data-theme)
  const themeObserver = new MutationObserver(() => {
    if (isDarkMode()) {
      if (!hero.hidden && !reducedMotion.matches) {
        resize();
        startAnimation();
      }
    } else {
      stopAnimation();
      clearCanvas();
    }
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  resize();
  if (isDarkMode()) {
    startAnimation();
  } else {
    clearCanvas();
  }
}
