<script lang="ts">
	// A toy "language model" that only looks at the last word, to show the generate-one-token-at-a-time loop.
	const table: Record<string, [string, number][]> = {
		The: [
			['cat', 0.4],
			['dog', 0.35],
			['weather', 0.25]
		],
		cat: [
			['sat', 0.5],
			['slept', 0.3],
			['ran', 0.2]
		],
		dog: [
			['barked', 0.5],
			['ran', 0.3],
			['slept', 0.2]
		],
		weather: [
			['is', 0.7],
			['was', 0.3]
		],
		sat: [
			['on', 0.8],
			['quietly', 0.2]
		],
		slept: [
			['on', 0.5],
			['all', 0.3],
			['.', 0.2]
		],
		ran: [
			['away', 0.5],
			['to', 0.3],
			['.', 0.2]
		],
		barked: [
			['at', 0.6],
			['loudly', 0.2],
			['.', 0.2]
		],
		is: [
			['sunny', 0.5],
			['cold', 0.3],
			['nice', 0.2]
		],
		was: [
			['sunny', 0.4],
			['cold', 0.4],
			['nice', 0.2]
		],
		on: [
			['the', 0.9],
			['a', 0.1]
		],
		the: [
			['mat', 0.4],
			['sofa', 0.3],
			['cat', 0.2],
			['dog', 0.1]
		],
		a: [
			['mat', 0.6],
			['sofa', 0.4]
		],
		at: [
			['the', 0.8],
			['a', 0.2]
		],
		to: [
			['the', 0.9],
			['a', 0.1]
		],
		all: [['day', 1]],
		away: [['.', 1]],
		quietly: [['.', 1]],
		loudly: [['.', 1]],
		sunny: [['.', 1]],
		cold: [['.', 1]],
		nice: [['.', 1]],
		mat: [['.', 1]],
		sofa: [['.', 1]],
		day: [['.', 1]]
	};
	let words = ['The'];
	$: last = words[words.length - 1];
	$: options = table[last] ?? [];
	$: done = last === '.';

	function step() {
		let r = Math.random();
		for (let k = 0; k < options.length; k++) {
			r -= options[k][1];
			if (r <= 0 || k === options.length - 1) {
				words = [...words, options[k][0]];
				return;
			}
		}
	}
	function reset() {
		words = ['The'];
	}
</script>

<div class="demo">
	<div class="demo-title">Try it: generation is a loop</div>
	<div class="text">
		{#each words as w, k}<span class:new={k === words.length - 1 && k > 0}>{w} </span>{/each}
	</div>
	{#if !done}
		<div class="probs">
			<div class="h">Model's prediction for what comes after "{last}":</div>
			{#each options as [w, p]}
				<div class="prow">
					<span class="w">{w}</span><span class="bar" style="width:{p * 200}px"></span>{Math.round(
						p * 100
					)}%
				</div>
			{/each}
		</div>
	{/if}
	<div class="btns">
		<button class="btn" on:click={step} disabled={done}
			>➕ Predict &amp; append the next token</button
		>
		<button class="btn ghost" on:click={reset}>Start over</button>
	</div>
	<p class="hint">
		Each click = one full run of the model. The chosen token is glued onto the text, and the <em
			>whole</em
		>
		thing is fed back in to predict the next one. This toy only looks at the last word; GPT-2 looks at
		<em>all</em> previous tokens (up to 1,024 of them) through attention — that's what lets it stay on
		topic.
	</p>
</div>

<style>
	.text {
		font-size: 1.3rem;
		font-family: Georgia, serif;
		padding: 0.6rem 0.8rem;
		background: var(--g-bg);
		border: 1px solid var(--g-border);
		border-radius: 0.5rem;
		min-height: 2.8rem;
	}
	.new {
		background: var(--g-amber-tint);
		border-radius: 3px;
	}
	.probs {
		margin: 0.7rem 0;
	}
	.h {
		font-size: 0.85rem;
		color: var(--g-text-3);
	}
	.prow {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
	}
	.prow .w {
		width: 5rem;
		font-family: ui-monospace, monospace;
	}
	.prow .bar {
		height: 0.7rem;
		background: #c4b5fd;
		border-radius: 2px;
	}
	.btns {
		display: flex;
		gap: 0.5rem;
	}
</style>
