<script lang="ts">
	// Gradient descent on a one-knob "model": walk downhill on the error curve.
	let w = -2;
	let lr = 0.2;
	let steps = 0;
	const target = 3;
	const loss = (x: number) => (x - target) ** 2 / 4 + 0.3;
	const grad = (x: number) => (x - target) / 2;
	const X = (x: number) => ((x + 4) / 14) * 400;
	const Y = (l: number) => 180 - l * 9;
	const path = Array.from({ length: 141 }, (_, k) => {
		const x = -4 + k * 0.1;
		return `${k ? 'L' : 'M'}${X(x)},${Y(loss(x))}`;
	}).join(' ');
	function step() {
		w = w - lr * grad(w) * 2;
		steps++;
	}
	function reset() {
		w = Math.random() * 12 - 4;
		steps = 0;
	}
</script>

<div class="demo">
	<div class="demo-title">Try it: learning = walking downhill on the "error" curve</div>
	<svg viewBox="0 -10 400 200" class="plot">
		<path d={path} fill="none" stroke="#8b5cf6" stroke-width="2.5" />
		<line x1={X(target)} y1="0" x2={X(target)} y2="185" stroke="#10b981" stroke-dasharray="4 3" />
		<text x={X(target) + 4} y="10" fill="#047857" font-size="11">best setting</text>
		<circle cx={X(w)} cy={Y(loss(w))} r="8" fill="#f59e0b" />
		<text x="0" y="198" font-size="11" fill="#6b7280">← knob (one parameter) →</text>
	</svg>
	<div class="row">
		<button class="btn" on:click={step}>Take one learning step</button>
		<button class="btn ghost" on:click={reset}>Random start</button>
		<label>Step size (learning rate): {lr.toFixed(2)} <input type="range" min="0.05" max="1.9" step="0.05" bind:value={lr} /></label>
	</div>
	<p class="hint">
		Steps: <strong>{steps}</strong> · knob = <strong>{w.toFixed(2)}</strong> · error = <strong>{loss(w).toFixed(3)}</strong>.
		Each step looks at the slope under the ball and moves a little bit downhill. Try a huge step size (≈1.9):
		the ball overshoots and bounces around — a real problem in training! GPT-2 does exactly this, but with
		124 million knobs at once, and the "error" is <em>how surprised it was by the real next word</em>.
	</p>
</div>

<style>
	.plot {
		width: 100%;
		max-width: 520px;
		height: auto;
	}
	.row {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
		align-items: center;
	}
	label {
		font-size: 0.85rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
