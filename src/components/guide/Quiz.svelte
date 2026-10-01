<script lang="ts">
	// A single multiple-choice "check your understanding" question.
	export let question: string;
	export let options: string[];
	export let answer: number;
	export let explanation: string;
	let picked: number | null = null;
</script>

<div class="quiz">
	<div class="title">✅ Check your understanding</div>
	<p class="question">{question}</p>
	<div class="options">
		{#each options as opt, i}
			<button
				class="option"
				class:correct={picked !== null && i === answer}
				class:wrong={picked === i && i !== answer}
				on:click={() => (picked = i)}
			>
				{opt}
			</button>
		{/each}
	</div>
	{#if picked !== null}
		<p class="feedback" class:ok={picked === answer}>
			<strong>{picked === answer ? 'Correct!' : 'Not quite.'}</strong>
			{explanation}
		</p>
	{/if}
</div>

<style>
	.quiz {
		background: var(--g-surface);
		border: 1px dashed var(--g-border-strong);
		border-radius: 0.75rem;
		padding: 1rem 1.2rem;
		margin: 1.5rem 0;
	}
	.title {
		font-weight: 700;
		color: var(--g-green-text);
		font-size: 0.9rem;
	}
	.question {
		font-weight: 600;
		margin: 0.4rem 0 0.8rem;
	}
	.options {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.option {
		text-align: left;
		padding: 0.5rem 0.8rem;
		border: 1px solid var(--g-border);
		background: var(--g-bg);
		border-radius: 0.5rem;
	}
	.option:hover {
		border-color: #a78bfa;
	}
	.correct {
		background: var(--g-green-wash);
		border-color: #10b981;
	}
	.wrong {
		background: var(--g-red-wash);
		border-color: #ef4444;
	}
	.feedback {
		margin-top: 0.8rem;
		color: var(--g-red-text);
	}
	.feedback.ok {
		color: var(--g-green-text);
	}
</style>
