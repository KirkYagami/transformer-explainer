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
		background: #f9fafb;
		border: 1px dashed #d1d5db;
		border-radius: 0.75rem;
		padding: 1rem 1.2rem;
		margin: 1.5rem 0;
	}
	.title {
		font-weight: 700;
		color: #059669;
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
		border: 1px solid #e5e7eb;
		background: #fff;
		border-radius: 0.5rem;
	}
	.option:hover {
		border-color: #a78bfa;
	}
	.correct {
		background: #ecfdf5;
		border-color: #10b981;
	}
	.wrong {
		background: #fef2f2;
		border-color: #ef4444;
	}
	.feedback {
		margin-top: 0.8rem;
		color: #b91c1c;
	}
	.feedback.ok {
		color: #047857;
	}
</style>
