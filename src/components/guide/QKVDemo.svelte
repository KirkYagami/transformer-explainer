<script lang="ts">
	// A fully worked, tiny attention calculation with 3 tokens and 2-number vectors.
	const tokens = ['I', 'love', 'pizza'];
	// Query/Key/Value vectors (in a real model these come from multiplying embeddings by learned matrices)
	const Q = [
		[1, 0],
		[0, 1],
		[1, 1]
	];
	const K = [
		[1, 0],
		[0.5, 1],
		[1, 1.5]
	];
	const V = [
		[1, 0],
		[0, 2],
		[3, 1]
	];
	let i = 2;
	const scale = Math.sqrt(2);
	$: raw = K.map((k, j) => (j <= i ? (Q[i][0] * k[0] + Q[i][1] * k[1]) / scale : -Infinity));
	$: ex = raw.map((r) => (r === -Infinity ? 0 : Math.exp(r)));
	$: s = ex.reduce((a, b) => a + b, 0);
	$: w = ex.map((e) => e / s);
	$: out = [0, 1].map((d) => V.reduce((acc, v, j) => acc + w[j] * v[d], 0));
	const f = (x: number) => (x === -Infinity ? '−∞' : x.toFixed(2));
	const vec = (v: number[]) => `[${v.map((x) => x.toFixed(2)).join(', ')}]`;
</script>

<div class="demo">
	<div class="demo-title">Worked example: attention by hand (3 tokens, 2 numbers each)</div>
	<p class="hint">
		Pick which token is "asking" (the Query). Every step below is plain multiplication and addition.
	</p>
	<div class="pick">
		{#each tokens as t, j}
			<button class="btn small" class:on={j === i} on:click={() => (i = j)}>{t}</button>
		{/each}
	</div>
	<ol class="steps">
		<li>
			<strong>Query of "{tokens[i]}"</strong> (what it's looking for): <code>{vec(Q[i])}</code>
		</li>
		<li>
			<strong>Score against each Key</strong> (dot product, then ÷ √2 ≈ 1.41 to keep numbers tame):
			<table>
				<thead
					><tr><th>token</th><th>Key</th><th>score</th><th>after softmax</th><th>Value</th></tr
					></thead
				>
				<tbody>
					{#each tokens as t, j}
						<tr class:masked={j > i}>
							<td>{t}</td>
							<td><code>{vec(K[j])}</code></td>
							<td>{j > i ? 'masked (future)' : f(raw[j])}</td>
							<td><strong>{(w[j] * 100).toFixed(0)}%</strong></td>
							<td><code>{vec(V[j])}</code></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</li>
		<li>
			<strong>Blend the Values</strong> using those percentages:
			<code>
				{tokens.map((t, j) => `${w[j].toFixed(2)}×${vec(V[j])}`).join(' + ')} = {vec(out)}
			</code>
		</li>
		<li>
			That blended vector <code>{vec(out)}</code> is the new, <em>context-aware</em> representation
			of "{tokens[i]}".
		</li>
	</ol>
</div>

<style>
	.pick {
		display: flex;
		gap: 0.4rem;
		margin: 0.5rem 0;
	}
	.steps {
		padding-left: 1.2rem;
		list-style: decimal;
		line-height: 1.8;
	}
	.steps li {
		margin: 0.5rem 0;
	}
	table {
		border-collapse: collapse;
		font-size: 0.85rem;
		margin-top: 0.3rem;
	}
	th,
	td {
		padding: 0.2rem 0.6rem;
		border-bottom: 1px solid var(--g-muted);
		text-align: left;
	}
	.masked {
		opacity: 0.35;
	}
</style>
