<script lang="ts">
	// One artificial neuron: weighted sum + bias, then an activation function.
	let x1 = 0.8,
		x2 = -0.4,
		w1 = 1.5,
		w2 = 2.0,
		b = 0.1;
	let act: 'none' | 'relu' | 'gelu' = 'gelu';
	const gelu = (z: number) =>
		0.5 * z * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (z + 0.044715 * z ** 3)));
	$: z = x1 * w1 + x2 * w2 + b;
	$: y = act === 'none' ? z : act === 'relu' ? Math.max(0, z) : gelu(z);
	const fn = (z: number) => (act === 'none' ? z : act === 'relu' ? Math.max(0, z) : gelu(z));
	$: path = Array.from({ length: 81 }, (_, k) => {
		const zz = -4 + k * 0.1;
		return `${k === 0 ? 'M' : 'L'}${(zz + 4) * 25},${100 - fn(zz) * 20}`;
	}).join(' ');
</script>

<div class="demo">
	<div class="demo-title">Try it: a single "neuron"</div>
	<div class="row">
		<div class="controls">
			<label
				>input x₁ = {x1.toFixed(1)}
				<input type="range" min="-2" max="2" step="0.1" bind:value={x1} /></label
			>
			<label
				>input x₂ = {x2.toFixed(1)}
				<input type="range" min="-2" max="2" step="0.1" bind:value={x2} /></label
			>
			<label
				>weight w₁ = {w1.toFixed(1)}
				<input type="range" min="-3" max="3" step="0.1" bind:value={w1} /></label
			>
			<label
				>weight w₂ = {w2.toFixed(1)}
				<input type="range" min="-3" max="3" step="0.1" bind:value={w2} /></label
			>
			<label
				>bias b = {b.toFixed(1)}
				<input type="range" min="-2" max="2" step="0.1" bind:value={b} /></label
			>
			<div class="pick">
				Activation:
				{#each ['none', 'relu', 'gelu'] as a}
					<button class="btn small" class:on={act === a} on:click={() => (act = a)}
						>{a === 'none' ? 'none' : a.toUpperCase()}</button
					>
				{/each}
			</div>
		</div>
		<div class="result">
			<code>
				z = {x1.toFixed(1)}×{w1.toFixed(1)} + {x2.toFixed(1)}×{w2.toFixed(1)} + {b.toFixed(1)} =
				<strong>{z.toFixed(2)}</strong>
			</code>
			<code
				>output = {act === 'none' ? 'z' : act.toUpperCase() + '(z)'} =
				<strong>{y.toFixed(2)}</strong></code
			>
			<svg viewBox="-5 0 210 140" class="curve">
				<line x1="0" y1="100" x2="200" y2="100" style="stroke:var(--g-border)" />
				<line x1="100" y1="0" x2="100" y2="140" style="stroke:var(--g-border)" />
				<path d={path} fill="none" stroke="#8b5cf6" stroke-width="2.5" />
				{#if z > -4 && z < 4}
					<circle cx={(z + 4) * 25} cy={100 - y * 20} r="5" fill="#f59e0b" />
				{/if}
			</svg>
		</div>
	</div>
	<p class="hint">
		Weights decide <em>how much each input matters</em> (negative weight = "this input argues against").
		The activation bends the line: GELU (used by GPT-2) mostly lets positive signals through and squashes
		negative ones toward zero. Without that bend, stacking layers would be pointless — many straight
		lines combined are still just one straight line.
	</p>
</div>

<style>
	.row {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
	}
	.controls {
		flex: 1;
		min-width: 240px;
	}
	label {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		font-size: 0.85rem;
		margin: 0.25rem 0;
	}
	.pick {
		display: flex;
		gap: 0.4rem;
		align-items: center;
		font-size: 0.85rem;
		margin-top: 0.5rem;
	}
	.result {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		min-width: 240px;
	}
	.curve {
		width: 220px;
		height: 150px;
	}
</style>
