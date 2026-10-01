<script lang="ts">
	// Logits -> probabilities with temperature, top-k, and sampling.
	const candidates = [
		{ w: ' learn', logit: 4.1 },
		{ w: ' understand', logit: 3.6 },
		{ w: ' explore', logit: 3.2 },
		{ w: ' see', logit: 2.4 },
		{ w: ' create', logit: 1.9 },
		{ w: ' banana', logit: -1.5 }
	];
	let temperature = 1;
	let topK = 6;
	let sampled: string | null = null;
	let history: string[] = [];

	$: scaled = candidates.map((c) => c.logit / temperature);
	$: kept = candidates
		.map((c, i) => ({ ...c, i }))
		.sort((a, b) => b.logit - a.logit)
		.slice(0, topK)
		.map((c) => c.i);
	$: exps = scaled.map((s, i) => (kept.includes(i) ? Math.exp(s) : 0));
	$: total = exps.reduce((a, b) => a + b, 0);
	$: probs = exps.map((e) => e / total);

	function sample() {
		let r = Math.random();
		for (let i = 0; i < probs.length; i++) {
			r -= probs[i];
			if (r <= 0 && probs[i] > 0) {
				sampled = candidates[i].w;
				break;
			}
		}
		history = [sampled!, ...history].slice(0, 12);
	}
</script>

<div class="demo">
	<div class="demo-title">Try it: from raw scores to a choice</div>
	<p class="hint">Prompt: <em>"Data visualization empowers users to …"</em></p>
	<table>
		<thead>
			<tr
				><th>Next token</th><th>Raw score (logit)</th><th>÷ temperature</th><th>Probability</th></tr
			>
		</thead>
		<tbody>
			{#each candidates as c, i}
				<tr class:dropped={!kept.includes(i)}>
					<td><code>{c.w.replace(' ', '␣')}</code></td>
					<td>{c.logit.toFixed(1)}</td>
					<td>{scaled[i].toFixed(2)}</td>
					<td class="bar-cell">
						<div class="bar" style="width:{(probs[i] * 100).toFixed(1)}%"></div>
						<span>{(probs[i] * 100).toFixed(1)}%</span>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="controls">
		<label>
			Temperature: <strong>{temperature.toFixed(2)}</strong>
			<input type="range" min="0.1" max="3" step="0.05" bind:value={temperature} />
		</label>
		<label>
			Top-k (keep only the best k): <strong>{topK}</strong>
			<input type="range" min="1" max="6" step="1" bind:value={topK} />
		</label>
		<button class="btn" on:click={sample}>🎲 Roll the dice (sample a token)</button>
	</div>
	{#if sampled}
		<p class="hint">
			Picked: <strong>{sampled.replace(' ', '␣')}</strong> &nbsp; Recent rolls: {history.join(' ·')}
		</p>
	{/if}
	<p class="hint">
		Notice: low temperature (≈0.1) makes the top choice win almost every time — predictable, a bit
		boring. High temperature (≈3) flattens everything, so even <em>"banana"</em> gets a real chance
		— creative, but risky. Top-k = 1 means "always pick the best one" (called <em>greedy</em> decoding).
	</p>
</div>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
	}
	th,
	td {
		text-align: left;
		padding: 0.3rem 0.5rem;
		border-bottom: 1px solid var(--g-muted);
	}
	th {
		color: var(--g-text-3);
		font-weight: 600;
	}
	.bar-cell {
		position: relative;
		width: 40%;
	}
	.bar {
		position: absolute;
		left: 0;
		top: 20%;
		height: 60%;
		background: #c4b5fd;
		border-radius: 3px;
		transition: width 0.2s;
	}
	.bar-cell span {
		position: relative;
		padding-left: 0.3rem;
	}
	.dropped {
		opacity: 0.35;
	}
	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: 1.2rem;
		align-items: center;
		margin-top: 0.8rem;
	}
	label {
		display: flex;
		flex-direction: column;
		font-size: 0.85rem;
	}
</style>
