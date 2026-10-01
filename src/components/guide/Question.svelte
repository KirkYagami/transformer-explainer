<script lang="ts">
	// A collapsible "You might be wondering..." question with a beginner-friendly answer.
	export let q: string;
	export let open = false;
</script>

<details class="question" bind:open>
	<summary><span class="q-mark">?</span><span class="q-text">{q}</span></summary>
	<div class="answer"><slot /></div>
</details>

<style>
	.question {
		border: 1px solid var(--g-border);
		border-radius: 0.75rem;
		margin: 0.6rem 0;
		background: var(--g-bg);
		transition: box-shadow 0.15s;
	}
	.question[open] {
		box-shadow: 0 2px 10px rgba(124, 58, 237, 0.08);
		border-color: var(--g-violet-line);
	}
	summary {
		cursor: pointer;
		list-style: none;
		display: flex;
		gap: 0.75rem;
		align-items: center;
		padding: 0.75rem 1rem;
		font-weight: 600;
		color: var(--g-text);
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary::after {
		content: '+';
		margin-left: auto;
		font-size: 1.25rem;
		color: #8b5cf6;
	}
	.question[open] summary::after {
		content: '–';
	}
	.q-mark {
		flex: none;
		width: 1.6rem;
		height: 1.6rem;
		border-radius: 999px;
		background: var(--g-violet-tint);
		color: var(--g-accent);
		display: grid;
		place-items: center;
		font-size: 0.9rem;
	}
	.answer {
		padding: 0 1rem 1rem 3.35rem;
		color: var(--g-text-2);
		line-height: 1.7;
	}
	.answer :global(p) {
		margin: 0.5rem 0;
	}
</style>
