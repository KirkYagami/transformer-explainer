<script lang="ts">
	// Clickable overview of the whole pipeline; each box jumps to its chapter.
	export let highlight = '';
	const stages = [
		{
			id: 'tokens',
			label: 'Text → Tokens',
			sub: 'chop text into pieces',
			color: 'var(--g-indigo-tint)'
		},
		{
			id: 'embedding',
			label: 'Tokens → Vectors',
			sub: 'look up 768 numbers each',
			color: 'var(--g-violet-tint)'
		},
		{
			id: 'position',
			label: '+ Position',
			sub: 'remember word order',
			color: 'var(--g-violet-tint)'
		},
		{
			id: 'attention',
			label: 'Attention',
			sub: 'words share information',
			color: 'var(--g-blue-tint)',
			block: true
		},
		{
			id: 'mlp',
			label: 'MLP',
			sub: 'each word "thinks" alone',
			color: 'var(--g-blue-tint)',
			block: true
		},
		{
			id: 'output',
			label: 'Vectors → Probabilities',
			sub: 'score all 50,257 tokens',
			color: 'var(--g-green-tint)'
		},
		{
			id: 'generation',
			label: 'Pick & repeat',
			sub: 'one token at a time',
			color: 'var(--g-amber-tint)'
		}
	];
</script>

<div class="pipeline">
	{#each stages as s, i}
		{#if s.id === 'attention'}<div class="block-label">
				Transformer block × 12 (same recipe, different learned numbers)
			</div>{/if}
		<a
			href="#{s.id}"
			class="stage"
			class:in-block={s.block}
			class:hl={highlight === s.id}
			style="background:{s.color}"
		>
			<span class="n">{i + 1}</span>
			<span class="l">{s.label}</span>
			<span class="s">{s.sub}</span>
		</a>
		{#if i < stages.length - 1}<div class="arrow">↓</div>{/if}
	{/each}
</div>

<style>
	.pipeline {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 1.2rem auto;
		max-width: 420px;
	}
	.stage {
		display: grid;
		grid-template-columns: 1.8rem 1fr;
		width: 100%;
		padding: 0.5rem 0.8rem;
		border-radius: 0.6rem;
		text-decoration: none;
		color: var(--g-text);
		border: 2px solid transparent;
	}
	.stage:hover,
	.hl {
		border-color: #8b5cf6;
	}
	.in-block {
		box-shadow: inset 0 0 0 1px #93c5fd;
	}
	.n {
		grid-row: span 2;
		font-weight: 700;
		color: var(--g-accent);
		align-self: center;
	}
	.l {
		font-weight: 700;
	}
	.s {
		font-size: 0.8rem;
		color: var(--g-text-2);
	}
	.arrow {
		color: var(--g-text-4);
		line-height: 1.2;
	}
	.block-label {
		font-size: 0.75rem;
		color: var(--g-blue-text);
		font-weight: 600;
		margin-bottom: 0.2rem;
	}
</style>
