<script lang="ts">
	// Layer normalization on a short vector: subtract the mean, divide by the spread.
	let values = [12, -3, 40, 7, 0.5, -20];
	function shuffle() {
		values = values.map(() => Math.round((Math.random() * 120 - 60) * 10) / 10);
	}
	$: mean = values.reduce((a, b) => a + b, 0) / values.length;
	$: std = Math.sqrt(values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length) || 1;
	$: normed = values.map((v) => (v - mean) / std);
	$: maxAbs = Math.max(...values.map(Math.abs), 1);
</script>

<div class="demo">
	<div class="demo-title">Try it: layer normalization</div>
	<div class="cols">
		<div>
			<div class="h">Before (wild numbers)</div>
			{#each values as v}
				<div class="bar-row">
					<span
						class="bar"
						style="width:{(Math.abs(v) / maxAbs) * 100}%; background:{v < 0
							? '#fca5a5'
							: '#c4b5fd'}"
					></span><span>{v.toFixed(1)}</span>
				</div>
			{/each}
			<div class="stat">average {mean.toFixed(1)}, spread {std.toFixed(1)}</div>
		</div>
		<div>
			<div class="h">After (calm numbers)</div>
			{#each normed as v}
				<div class="bar-row">
					<span
						class="bar"
						style="width:{(Math.abs(v) / 2.5) * 100}%; background:{v < 0 ? '#fca5a5' : '#c4b5fd'}"
					></span><span>{v.toFixed(2)}</span>
				</div>
			{/each}
			<div class="stat">average 0.0, spread 1.0</div>
		</div>
	</div>
	<button class="btn" on:click={shuffle}>Shuffle in new random numbers</button>
	<p class="hint">
		No matter how big or small the inputs, the outputs always land in the same comfortable range —
		but their
		<em>pattern</em> (which ones are bigger than others) is kept. (The real LayerNorm then also multiplies
		and shifts by two learned vectors, γ and β, so the model can re-stretch things if it wants.)
	</p>
</div>

<style>
	.cols {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}
	.h {
		font-weight: 600;
		font-size: 0.85rem;
		margin-bottom: 0.3rem;
	}
	.bar-row {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.8rem;
		font-family: ui-monospace, monospace;
		height: 1.3rem;
	}
	.bar {
		display: inline-block;
		height: 0.8rem;
		border-radius: 2px;
		max-width: 75%;
	}
	.stat {
		font-size: 0.8rem;
		color: var(--g-text-3);
		margin-top: 0.3rem;
	}
</style>
