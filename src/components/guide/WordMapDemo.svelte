<script lang="ts">
	// A toy 2-D "embedding space". Real GPT-2 uses 768 numbers per token; we use 2 so we can draw it.
	type Word = { w: string; x: number; y: number; group: string };
	const words: Word[] = [
		{ w: 'king', x: 8, y: 8.5, group: 'people' },
		{ w: 'queen', x: 4, y: 8.5, group: 'people' },
		{ w: 'man', x: 8, y: 6, group: 'people' },
		{ w: 'woman', x: 4, y: 6, group: 'people' },
		{ w: 'prince', x: 8.6, y: 7.6, group: 'people' },
		{ w: 'cat', x: 13, y: 3, group: 'animals' },
		{ w: 'dog', x: 14, y: 2.2, group: 'animals' },
		{ w: 'kitten', x: 12.5, y: 3.8, group: 'animals' },
		{ w: 'puppy', x: 14.6, y: 3.2, group: 'animals' },
		{ w: 'apple', x: 2.5, y: 1.5, group: 'food' },
		{ w: 'banana', x: 1.6, y: 2.4, group: 'food' },
		{ w: 'bread', x: 3.4, y: 0.8, group: 'food' },
		{ w: 'run', x: 12, y: 8.5, group: 'actions' },
		{ w: 'walk', x: 13, y: 9, group: 'actions' },
		{ w: 'jump', x: 12.6, y: 7.8, group: 'actions' }
	];
	const colors: Record<string, string> = {
		people: '#8b5cf6',
		animals: '#f59e0b',
		food: '#10b981',
		actions: '#3b82f6'
	};
	const W = 560,
		H = 330,
		sx = (x: number) => 20 + (x / 16) * (W - 40),
		sy = (y: number) => H - 20 - (y / 10) * (H - 40);

	let selected: Word | null = words[5];
	let showArith = false;

	$: neighbors = selected
		? words
				.filter((d) => d !== selected)
				.map((d) => ({ ...d, dist: Math.hypot(d.x - selected!.x, d.y - selected!.y) }))
				.sort((a, b) => a.dist - b.dist)
				.slice(0, 3)
		: [];
	const get = (w: string) => words.find((d) => d.w === w)!;
	const king = get('king'),
		man = get('man'),
		woman = get('woman');
	const res = { x: king.x - man.x + woman.x, y: king.y - man.y + woman.y };
</script>

<div class="demo">
	<div class="demo-title">Try it: a toy map of word meanings</div>
	<p class="hint">
		Click any word. Its closest neighbours are the words the "model" thinks are most similar.
	</p>
	<svg viewBox="0 0 {W} {H}" class="map">
		<defs>
			<marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
				<path d="M0,0 L8,4 L0,8 z" fill="#ef4444" />
			</marker>
		</defs>
		<rect x="0" y="0" width={W} height={H} style="fill:var(--g-surface)" rx="8" />
		{#if selected}
			{#each neighbors as n}
				<line
					x1={sx(selected.x)}
					y1={sy(selected.y)}
					x2={sx(n.x)}
					y2={sy(n.y)}
					stroke="#c4b5fd"
					stroke-dasharray="4 3"
				/>
			{/each}
		{/if}
		{#if showArith}
			<line
				x1={sx(man.x)}
				y1={sy(man.y)}
				x2={sx(woman.x)}
				y2={sy(woman.y)}
				stroke="#ef4444"
				stroke-width="2"
				marker-end="url(#arr)"
			/>
			<line
				x1={sx(king.x)}
				y1={sy(king.y)}
				x2={sx(res.x) + 8}
				y2={sy(res.y)}
				stroke="#ef4444"
				stroke-width="2"
				marker-end="url(#arr)"
			/>
		{/if}
		{#each words as d}
			<g
				class="word"
				on:click={() => (selected = d)}
				role="button"
				tabindex="0"
				on:keydown={() => (selected = d)}
			>
				<circle cx={sx(d.x)} cy={sy(d.y)} r={selected === d ? 7 : 5} fill={colors[d.group]} />
				<text x={sx(d.x) + 9} y={sy(d.y) + 4} font-weight={selected === d ? 700 : 400}>{d.w}</text>
			</g>
		{/each}
	</svg>
	{#if selected}
		<p class="hint">
			Closest to <strong>{selected.w}</strong>: {neighbors.map((n) => n.w).join(', ')}. Its
			"embedding" here is just <code>[{selected.x}, {selected.y}]</code>.
		</p>
	{/if}
	<button class="btn" on:click={() => (showArith = !showArith)}>
		{showArith ? 'Hide' : 'Show'} the famous trick: king − man + woman = ?
	</button>
	{#if showArith}
		<p class="hint">
			The arrow from <em>man</em> to <em>woman</em> is the "make it female" direction. Start at
			<em>king</em>, move in that same direction, and you land on… <strong>queen</strong>.
			Directions in this space can carry meaning!
		</p>
	{/if}
</div>

<style>
	.map {
		width: 100%;
		max-width: 640px;
		height: auto;
		display: block;
		margin: 0.5rem 0;
	}
	.word {
		cursor: pointer;
	}
	text {
		font-size: 13px;
		fill: var(--g-text);
	}
</style>
