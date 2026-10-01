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
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		margin: 0.6rem 0;
		background: #fff;
		transition: box-shadow 0.15s;
	}
	.question[open] {
		box-shadow: 0 2px 10px rgba(124, 58, 237, 0.08);
		border-color: #ddd6fe;
	}
	summary {
		cursor: pointer;
		list-style: none;
		display: flex;
		gap: 0.75rem;
		align-items: center;
		padding: 0.75rem 1rem;
		font-weight: 600;
		color: #374151;
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
		background: #ede9fe;
		color: #6d28d9;
		display: grid;
		place-items: center;
		font-size: 0.9rem;
	}
	.answer {
		padding: 0 1rem 1rem 3.35rem;
		color: #4b5563;
		line-height: 1.7;
	}
	.answer :global(p) {
		margin: 0.5rem 0;
	}
</style>
