<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const theme = ref<'dark' | 'light'>('dark')
const isAnimating = ref(false)
let touchStartY = 0
let wheelTimeout: number | undefined
const themeBtn = ref<HTMLButtonElement | null>(null)

const themeVarsLight: Record<string, string> = {
	'--bg': '#ffffff',
	'--text': '#111827',
	'--muted': '#6b7280',
	'--surface': '#ffffff',
	'--surface-hover': '#f3f4f6',
	'--border': '#e5e7eb',
}
const themeVarsDark: Record<string, string> = {
	'--bg': '#000000',
	'--text': '#f3f4f6',
	'--muted': '#d1d5db',
	'--surface': '#000000',
	'--surface-hover': '#0a0a0a',
	'--border': '#262626',
}

function getSections(): HTMLElement[] {
	return Array.from(document.querySelectorAll('main section')) as HTMLElement[]
}

function getCurrentSectionIndex(sections: HTMLElement[]): number {
	const scrollY = window.scrollY
	let closestIdx = 0
	let closestDist = Infinity
	for (let i = 0; i < sections.length; i++) {
		const el = sections[i]!
		const top = el.offsetTop
		const dist = Math.abs(top - scrollY)
		if (dist < closestDist) {
			closestDist = dist
			closestIdx = i
		}
	}
	return closestIdx
}

function scrollToSection(targetIdx: number) {
	const sections = getSections()
	if (targetIdx < 0 || targetIdx >= sections.length) return
	isAnimating.value = true
	const el = sections[targetIdx]!
	el.scrollIntoView({ behavior: 'smooth', block: 'start' })
	window.clearTimeout(wheelTimeout)
	wheelTimeout = window.setTimeout(() => {
		isAnimating.value = false
	}, 700)
}

function applyTheme(next: 'dark' | 'light') {
	const root = document.documentElement
	if (next === 'dark') {
		root.classList.add('dark')
		root.setAttribute('data-theme', 'dark')
	} else {
		root.classList.remove('dark')
		root.removeAttribute('data-theme')
	}
	localStorage.setItem('theme', next)
	theme.value = next
}

function toggleTheme() {
	const next: 'dark' | 'light' = theme.value === 'dark' ? 'light' : 'dark'
	const btn = themeBtn.value
	const rect = btn?.getBoundingClientRect()
	const cx = rect ? rect.left + rect.width / 2 : window.innerWidth - 24
	const cy = rect ? rect.top + rect.height / 2 : 24
	runThemeReveal(next, cx, cy)
}

onMounted(() => {
	const saved = (localStorage.getItem('theme') as 'dark' | 'light' | null)
	const initial: 'dark' | 'light' = saved ?? 'dark'
	applyTheme(initial)

	const onWheel = (e: WheelEvent) => {
		if (isAnimating.value) { e.preventDefault(); return }
		const sections = getSections()
		if (sections.length === 0) return
		const current = getCurrentSectionIndex(sections)
		if (Math.abs(e.deltaY) < 16) return
		e.preventDefault()
		const next = e.deltaY > 0 ? Math.min(current + 1, sections.length - 1) : Math.max(current - 1, 0)
		if (next !== current) scrollToSection(next)
	}

	const onKey = (e: KeyboardEvent) => {
		if (isAnimating.value) { e.preventDefault(); return }
		const keysDown = ['ArrowDown','PageDown',' '] as const
		const keysUp = ['ArrowUp','PageUp'] as const
		if ([...keysDown, ...keysUp].includes(e.key as any)) {
			e.preventDefault()
			const sections = getSections()
			const current = getCurrentSectionIndex(sections)
			const next = (keysDown as readonly string[]).includes(e.key)
				? Math.min(current + 1, sections.length - 1)
				: Math.max(current - 1, 0)
			if (next !== current) scrollToSection(next)
		}
	}

	const onTouchStart = (e: TouchEvent) => {
		touchStartY = e.touches[0]?.clientY ?? 0
	}
	const onTouchEnd = (e: TouchEvent) => {
		if (isAnimating.value) return
		const endY = e.changedTouches[0]?.clientY ?? touchStartY
		const delta = touchStartY - endY
		if (Math.abs(delta) < 24) return
		const sections = getSections()
		const current = getCurrentSectionIndex(sections)
		const next = delta > 0 ? Math.min(current + 1, sections.length - 1) : Math.max(current - 1, 0)
		if (next !== current) scrollToSection(next)
	}

	window.addEventListener('wheel', onWheel, { passive: false })
	window.addEventListener('keydown', onKey, { passive: false })
	window.addEventListener('touchstart', onTouchStart, { passive: true })
	window.addEventListener('touchend', onTouchEnd, { passive: true })

	onUnmounted(() => {
		window.removeEventListener('wheel', onWheel as any)
		window.removeEventListener('keydown', onKey as any)
		window.removeEventListener('touchstart', onTouchStart as any)
		window.removeEventListener('touchend', onTouchEnd as any)
	})
})

function runThemeReveal(next: 'dark' | 'light', cx: number, cy: number) {
    // Reduced motion: switch immediately
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
        applyTheme(next)
        return
    }

    // Capture old theme vars before flipping
    const oldVars = theme.value === 'dark' ? themeVarsDark : themeVarsLight
    const nextVars = next === 'dark' ? themeVarsDark : themeVarsLight

    // Flip theme so underlying UI updates and remains visible
    applyTheme(next)

    // Add radial wipe overlay showing a tinted version of the OLD theme,
    // with a transparent hole that expands from the button to reveal the NEW theme.
    const overlay = document.createElement('div')
    overlay.style.position = 'fixed'
    overlay.style.inset = '0'
    overlay.style.zIndex = '9999'
    overlay.style.pointerEvents = 'none'
    // Old theme tinted background to keep content visible but simulate old look
    const oldBg = oldVars['--bg'] ?? '#000000'
    const rgba = hexToRgba(oldBg, 0.92)
    overlay.style.background = rgba
    // Create a mask hole that will expand (transparent center reveals new theme)
    overlay.style.setProperty('--r', '0px')
    const mask = `radial-gradient(circle var(--r) at ${cx}px ${cy}px, transparent 0, transparent var(--r), black calc(var(--r) + 1px))`
    ;(overlay.style as any).maskImage = mask
    ;(overlay.style as any).webkitMaskImage = mask
    document.body.appendChild(overlay)

    // Compute max radius to cover viewport from click center
    const maxX = Math.max(cx, window.innerWidth - cx)
    const maxY = Math.max(cy, window.innerHeight - cy)
    const radius = Math.hypot(maxX, maxY)

    // Animate mask radius with rAF for broad support
    const duration = 800
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const start = performance.now()
    const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = ease(t)
        overlay.style.setProperty('--r', `${radius * eased}px`)
        if (t < 1) requestAnimationFrame(tick)
        else overlay.remove()
    }
    requestAnimationFrame(tick)
}

function hexToRgba(hex: string, alpha: number): string {
    const h = hex.replace('#','')
    const bigint = parseInt(h.length === 3 ? h.split('').map(c=>c+c).join('') : h, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
</script>

<template>
  <div class="min-h-screen bg-[var(--bg)] text-[var(--text)]">
    <!-- Navbar -->
    <header class="fixed inset-x-0 top-0 z-50 bg-[var(--bg)] backdrop-blur border-b border-[var(--border)]">
      <nav class="px-4 sm:px-6 lg:px-8 h-14 grid grid-cols-3 items-center">
        <!-- Left: Name -->
        <a href="#home" class="font-semibold tracking-tight link-gradient">Bas</a>

        <!-- Middle: Menu -->
        <ul class="flex items-center justify-center gap-4 text-sm">
          <li><a href="#home" class="link-gradient">About</a></li>
          <li><a href="#projects" class="link-gradient">Projects</a></li>
          <li><a href="#tech" class="link-gradient">Tech</a></li>
          <li><a href="#contact" class="link-gradient">Contact</a></li>
        </ul>

        <!-- Right: Resume + Theme -->
        <div class="flex items-center justify-end gap-2">
          <a href="/resume.pdf" download class="inline-flex items-center rounded-md px-3 py-1.5 text-sm btn-accent">
            Download Résumé
          </a>
          <button ref="themeBtn" type="button" @click="toggleTheme" class="inline-flex items-center rounded-md border border-[var(--border)] px-2.5 py-1.5 text-sm hover:bg-[var(--surface-hover)]">
            <span v-if="theme === 'dark'">☾</span>
            <span v-else>☀</span>
          </button>
        </div>
      </nav>
    </header>

    <main id="home" class="pt-14">
      <!-- Hero -->
      <section class="min-h-[calc(100svh-3.5rem)] flex scroll-mt-14">
        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center w-full">
          <h1 class="display-heading text-5xl sm:text-6xl tracking-tight">Hi, I'm <span class="text-gradient-anim">Bas</span></h1>
          <p class="mt-4 text-lg text-[var(--muted)] max-w-2xl">
            I build clean, performant web experiences. Explore my work, the tech I enjoy,
            and ways to get in touch below.
          </p>
          <p class="mt-4 text-[var(--muted)] max-w-3xl">
            I'm a developer focused on modern frontend stacks and thoughtful UX. I enjoy
            turning ideas into products with maintainable code, strong design systems, and
            a focus on performance.
          </p>
          <div class="mt-8 flex gap-3">
            <a href="#projects" class="inline-flex items-center rounded-md px-4 py-2 btn-accent">View Projects</a>
            <a href="#contact" class="inline-flex items-center rounded-md border px-4 py-2 btn-outline-accent">Contact Me</a>
          </div>
        </div>
      </section>

      <!-- Projects -->
      <section id="projects" class="scroll-mt-16 border-t border-[var(--border)] scroll-mt-14">
        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 min-h-[calc(100svh-3.5rem)] py-16 w-full">
          <h2 class="text-2xl font-semibold tracking-tight">Projects</h2>
          <div class="mt-6 grid gap-6 sm:grid-cols-2">
            <article class="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
              <h3 class="font-semibold">Project One</h3>
              <p class="mt-2 text-sm text-[var(--muted)]">Brief description of what this project does and why it matters.</p>
              <div class="mt-4 flex gap-3">
                <a href="#" class="text-purple-600 hover:underline text-sm">Live</a>
                <a href="#" class="text-purple-600 hover:underline text-sm">Code</a>
              </div>
            </article>
            <article class="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
              <h3 class="font-semibold">Project Two</h3>
              <p class="mt-2 text-sm text-[var(--muted)]">Another project overview highlighting stack and key features.</p>
              <div class="mt-4 flex gap-3">
                <a href="#" class="text-purple-600 hover:underline text-sm">Live</a>
                <a href="#" class="text-purple-600 hover:underline text-sm">Code</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="tech" class="scroll-mt-16 border-t border-[var(--border)] bg-[var(--surface)] scroll-mt-14">
        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 min-h-[calc(100svh-3.5rem)] py-16 w-full">
          <h2 class="text-2xl font-semibold tracking-tight">Tech</h2>
          <ul class="mt-4 flex flex-wrap gap-2 text-sm text-[var(--text)]">
            <li class="rounded-full border border-[var(--border)] px-3 py-1 bg-[var(--surface-hover)]">Vue</li>
            <li class="rounded-full border border-[var(--border)] px-3 py-1 bg-[var(--surface-hover)]">TypeScript</li>
            <li class="rounded-full border border-[var(--border)] px-3 py-1 bg-[var(--surface-hover)]">Vite</li>
            <li class="rounded-full border border-[var(--border)] px-3 py-1 bg-[var(--surface-hover)]">Tailwind CSS</li>
          </ul>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="scroll-mt-16 border-t border-[var(--border)] scroll-mt-14">
        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 min-h-[calc(100svh-3.5rem)] py-16 w-full">
          <h2 class="text-2xl font-semibold tracking-tight">Contact</h2>
          <p class="mt-4 text-[var(--muted)]">Want to collaborate or have a question? Reach out:</p>
          <form class="mt-6 grid gap-4 max-w-lg">
            <input type="text" placeholder="Your name" class="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <input type="email" placeholder="Your email" class="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <textarea placeholder="Message" rows="4" class="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <button type="button" class="inline-flex items-center rounded-md px-4 py-2 w-max btn-accent">Send</button>
          </form>
        </div>
      </section>
    </main>

    <footer class="border-t border-[var(--border)] bg-[var(--surface)]">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-500 dark:text-gray-400">
        © {{ new Date().getFullYear() }} Bas. All rights reserved.
      </div>
    </footer>
  </div>
  
</template>

<style scoped></style>
