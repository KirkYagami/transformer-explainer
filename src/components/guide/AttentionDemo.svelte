<script lang="ts">
	// Hand-crafted attention weights for a classic example sentence.
	// GPT-2 is causal: each word can only look at itself and the words BEFORE it.
	let ending: 'tired' | 'wide' = 'tired';
	$: tokens = [
		'The',
		'animal',
		"didn't",
		'cross',
		'the',
		'street',
		'because',
		'it',
		'was',
		'too',
		ending
	];
	let selected = 7;

	// raw relevance scores (what Query·Key would produce), hand-picked for the story
	function scores(i: number, end: string): number[] {
		const s = Array.from({ length: i + 1 }, (_, j) => (j === i ? 1.2 : j === i - 1 ? 0.8 : 0));
		if (i === 7) {
			// "it": who is "it"? depends on the last word, which comes later... so here the model hedges
			s[1] = 2.4;
			s[5] = 1.6;
		}
		if (i === 10) {
			// the final word re-reads the sentence: "tired" fits the animal, "wide" fits the street
			if (end === 'tired') {
				s[1] = 3.0;
				s[7] = 2.2;
			} else {
				s[5] = 3.0;
				s[7] = 2.2;
			}
		}
		if (i === 5) s[3] = 1.8; // street <- cross
		if (i === 3) s[1] = 1.8; // cross <- animal (who crosses?)
		return s;
	}
	$: raw = scores(selected, ending);
	$: exps = raw.map((x) => Math.exp(x));
	$: sum = exps.reduce((a, b) => a + b, 0);
	$: weights = tokens.map((_, j) => (j <= selected ? exps[j] / sum : 0));
</script>

<div class="demo">
	<div class="demo-title">Try it: which earlier words does each word "look at"?</div>
	<p class="hint">
		Click a word. Darker = more attention. Greyed-out words are in the future — the model isn't
		allowed to look at them.
	</p>
	<div class="sentence">
		{#each tokens as t, j}
			<button
				class="w"
				class:sel={j === selected}
				class:future={j > selected}
				style="background: rgba(139, 92, 246, {j <= selected ? weights[j] * 1.6 : 0})"
				on:click={() => (selected = j)}
			>
				{t}
				{#if j <= selected}<span class="pct">{Math.round(weights[j] * 100)}%</span>{/if}
			</button>
		{/each}
	</div>
	<div class="controls">
		Change the last word:
		<button
			class="btn small"
			class:on={ending === 'tired'}
			on:click={() => ((ending = 'tired'), (selected = 10))}>tired</button
		>
		<button
			class="btn small"
			class:on={ending === 'wide'}
			on:click={() => ((ending = 'wide'), (selected = 10))}>wide</button
		>
	</div>
	<p class="hint">
		With <em>"tired"</em>, the last word pays most attention to <strong>animal</strong> (animals get
		tired). With <em>"wide"</em>, it focuses on <strong>street</strong> (streets are wide). The
		percentages always add up to 100% — attention is a way of
		<em>splitting a fixed budget of focus</em>.
		<br /><small
			>(These numbers are illustrative, hand-picked to show the idea; real GPT-2 heads are messier.)</small
		>
	</p>
</div>

<style>
	.sentence {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 0.8rem 0;
	}
	.w {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		padding: 0.3rem 0.55rem;
		border: 1px solid var(--g-border);
		border-radius: 0.4rem;
		font-size: 1rem;
		transition: background 0.2s;
	}
	.w.sel {
		outline: 2px solid #f59e0b;
	}
	.w.future {
		color: var(--g-border-strong);
		border-style: dashed;
	}
	.pct {
		font-size: 0.65rem;
		color: var(--g-text);
	}
	.controls {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		font-size: 0.9rem;
	}
</style>
