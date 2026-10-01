<script lang="ts">
	const terms: [string, string][] = [
		[
			'Activation function',
			'A "bend" applied after a weighted sum (e.g. GELU, ReLU) so the network can learn non-straight-line patterns.'
		],
		[
			'Attention',
			'The step where each token builds a weighted blend of information from earlier tokens, based on relevance.'
		],
		[
			'Attention head',
			'One of several independent attention computations run in parallel. GPT-2 small has 12 per block.'
		],
		[
			'Backpropagation',
			'The method for working out how each parameter should change to reduce the error.'
		],
		[
			'Bias',
			'An extra learned number added after a weighted sum, letting a neuron shift its output up or down.'
		],
		[
			'BPE (Byte-Pair Encoding)',
			'The algorithm that decided how GPT-2 splits text into tokens by merging frequent pairs.'
		],
		[
			'Causal mask',
			'Blocks each token from attending to later tokens, so the model cannot peek at the answer.'
		],
		[
			'Context window',
			'The maximum number of tokens the model can look at at once (1,024 for GPT-2).'
		],
		['Dimension', 'How many numbers are in a vector. GPT-2 small uses 768.'],
		[
			'Dot product',
			'Multiply two vectors number-by-number and add it all up. Big = similar direction.'
		],
		[
			'Dropout',
			'Randomly zeroing some values during training to prevent over-reliance on any single one. Off during generation.'
		],
		[
			'Embedding',
			'The vector (list of numbers) that represents a token. Looked up from a learned table.'
		],
		['GELU', "The smooth activation function used in GPT-2's MLP."],
		[
			'GPT',
			'Generative Pre-trained Transformer — a model that generates text by next-token prediction.'
		],
		[
			'Gradient descent',
			'Repeatedly nudging parameters a little in the direction that reduces the error.'
		],
		['Greedy decoding', 'Always picking the single most likely next token (top-k = 1).'],
		[
			'Hallucination',
			'Fluent, confident output that is false — a side effect of predicting likely text rather than verified facts.'
		],
		['Inference', 'Using a trained model to make predictions. Parameters are frozen.'],
		['Key (K)', 'The vector a token "advertises" so others can judge its relevance in attention.'],
		[
			'KV cache',
			"Saving Keys and Values of earlier tokens so generation doesn't recompute them each step."
		],
		[
			'Layer normalization',
			'Rescaling a vector to have average 0 and spread 1 (then a learned stretch/shift), to keep numbers stable.'
		],
		['Logit', 'A raw, unnormalised score for a possible next token, before softmax.'],
		[
			'Loss',
			"A number measuring how wrong the model's prediction was. Training tries to make it small."
		],
		['Matrix', 'A grid (table) of numbers with rows and columns.'],
		[
			'MLP / feed-forward network',
			'Layers of neurons that process each token on its own: 768 → 3,072 → 768 in GPT-2.'
		],
		['Model', 'A fixed recipe of computations plus millions of learned numbers (parameters).'],
		[
			'Multi-head attention',
			'Running several attention heads in parallel and combining their outputs.'
		],
		[
			'Neuron',
			'Computes a weighted sum of its inputs plus a bias, then applies an activation function.'
		],
		[
			'Parameter / weight',
			'One of the learned numbers inside the model. GPT-2 small has ~124 million.'
		],
		[
			'Positional embedding',
			"A learned vector added to each token's embedding to encode its position in the text."
		],
		[
			'Probability',
			'A number from 0 to 1 (0%–100%) saying how likely something is. All options add up to 1.'
		],
		['Prompt', 'The text you give the model to continue.'],
		['Query (Q)', 'The vector a token uses to "ask" which other tokens are relevant to it.'],
		[
			'Residual connection',
			'Adding a layer\'s input back to its output (x + f(x)), creating the "residual stream".'
		],
		['Sampling', 'Choosing the next token randomly according to the predicted probabilities.'],
		[
			'Self-supervised learning',
			'Training where the labels come from the data itself — here, the actual next word.'
		],
		['Softmax', 'Turns a list of scores into positive percentages that add up to 100%.'],
		['Temperature', 'Divides logits before softmax: low = predictable, high = more random.'],
		[
			'Token',
			'A chunk of text (word or word-piece) the model reads and writes. GPT-2 knows 50,257 of them.'
		],
		['Tokenizer', 'The tool that converts text to token IDs and back.'],
		[
			'Top-k / top-p',
			'Limit sampling to the k most likely tokens, or to the smallest set whose probabilities add to p.'
		],
		[
			'Training',
			'The process of tuning all parameters by playing the next-token guessing game on huge amounts of text.'
		],
		[
			'Transformer',
			'A neural network design built from attention + MLP blocks, introduced in 2017.'
		],
		[
			'Transformer block',
			'One layer of LayerNorm → attention → add, LayerNorm → MLP → add. GPT-2 small stacks 12.'
		],
		['Value (V)', 'The information a token hands over when another token attends to it.'],
		['Vector', 'A list of numbers. Picture it as an arrow or a point in space.'],
		['Vocabulary', 'The full set of tokens the model knows.']
	];
	let filter = '';
	$: shown = terms.filter(([t, d]) => (t + ' ' + d).toLowerCase().includes(filter.toLowerCase()));
</script>

<input
	class="search"
	type="search"
	placeholder="Search {terms.length} terms…"
	bind:value={filter}
/>
<dl>
	{#each shown as [t, d]}
		<dt>{t}</dt>
		<dd>{d}</dd>
	{/each}
</dl>
{#if shown.length === 0}<p>No matches.</p>{/if}

<style>
	.search {
		width: 100%;
		border: 1px solid var(--g-border-strong);
		border-radius: 0.5rem;
		padding: 0.5rem 0.8rem;
		margin-bottom: 1rem;
	}
	dl {
		display: grid;
		grid-template-columns: minmax(9rem, 30%) 1fr;
		gap: 0.5rem 1rem;
	}
	dt {
		font-weight: 700;
		color: var(--g-accent-strong);
	}
	dd {
		color: var(--g-text-2);
		margin: 0;
	}
	@media (max-width: 600px) {
		dl {
			grid-template-columns: 1fr;
		}
		dd {
			margin-bottom: 0.6rem;
		}
	}
</style>
