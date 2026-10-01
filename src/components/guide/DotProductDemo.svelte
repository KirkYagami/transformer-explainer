<script lang="ts">
	// Two arrows the reader can rotate; shows how the dot product measures "agreement".
	let angleA = 30;
	let angleB = 70;
	let lenA = 1;
	let lenB = 1;
	const R = 110,
		C = 130;
	const rad = (d: number) => (d * Math.PI) / 180;
	$: a = [lenA * Math.cos(rad(angleA)), lenA * Math.sin(rad(angleA))];
	$: b = [lenB * Math.cos(rad(angleB)), lenB * Math.sin(rad(angleB))];
	$: dot = a[0] * b[0] + a[1] * b[1];
	$: verdict =
		dot > 0.7 * lenA * lenB
			? 'pointing the same way → very similar / very relevant'
			: dot > 0.15
				? 'somewhat aligned → a bit related'
				: dot > -0.15
					? 'at right angles → unrelated'
					: 'pointing opposite ways → opposites';
</script>

<div class="demo">
	<div class="demo-title">Try it: the dot product = "how much do two arrows agree?"</div>
	<div class="row">
		<svg viewBox="0 0 260 260" class="plot">
			<circle cx={C} cy={C} r={R} fill="none" style="stroke:var(--g-border)" />
			<line x1="10" y1={C} x2="250" y2={C} style="stroke:var(--g-muted)" />
			<line x1={C} y1="10" x2={C} y2="250" style="stroke:var(--g-muted)" />
			<line
				x1={C}
				y1={C}
				x2={C + a[0] * R}
				y2={C - a[1] * R}
				stroke="#8b5cf6"
				stroke-width="4"
				stroke-linecap="round"
			/>
			<line
				x1={C}
				y1={C}
				x2={C + b[0] * R}
				y2={C - b[1] * R}
				stroke="#f59e0b"
				stroke-width="4"
				stroke-linecap="round"
			/>
			<text x={C + a[0] * R + 4} y={C - a[1] * R} style="fill:var(--g-accent)">A</text>
			<text x={C + b[0] * R + 4} y={C - b[1] * R} style="fill:var(--g-amber-text)">B</text>
		</svg>
		<div class="controls">
			<label>Direction of A <input type="range" min="0" max="360" bind:value={angleA} /></label>
			<label
				>Length of A <input type="range" min="0.2" max="1" step="0.05" bind:value={lenA} /></label
			>
			<label>Direction of B <input type="range" min="0" max="360" bind:value={angleB} /></label>
			<label
				>Length of B <input type="range" min="0.2" max="1" step="0.05" bind:value={lenB} /></label
			>
			<div class="calc">
				A = [{a[0].toFixed(2)}, {a[1].toFixed(2)}]<br />
				B = [{b[0].toFixed(2)}, {b[1].toFixed(2)}]<br />
				A·B = {a[0].toFixed(2)}×{b[0].toFixed(2)} + {a[1].toFixed(2)}×{b[1].toFixed(2)} =
				<strong>{dot.toFixed(2)}</strong>
			</div>
			<p class="verdict">{verdict}</p>
		</div>
	</div>
</div>

<style>
	.row {
		display: flex;
		gap: 1.5rem;
		flex-wrap: wrap;
		align-items: center;
	}
	.plot {
		width: 240px;
		height: 240px;
	}
	.controls {
		flex: 1;
		min-width: 240px;
	}
	label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		font-size: 0.9rem;
		margin: 0.3rem 0;
	}
	.calc {
		font-family: ui-monospace, monospace;
		font-size: 0.85rem;
		background: var(--g-muted);
		border-radius: 0.4rem;
		padding: 0.5rem;
		margin-top: 0.6rem;
	}
	.verdict {
		font-weight: 600;
		color: var(--g-accent);
		margin-top: 0.5rem;
	}
</style>
