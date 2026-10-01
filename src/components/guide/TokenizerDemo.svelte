<script lang="ts">
	import { onMount } from 'svelte';

	let text = 'Data visualization empowers users to understand unbelievably complex things.';
	let tokenizer: any = null;
	let failed = false;
	let pieces: { text: string; id: number }[] = [];

	const palette = [
		'var(--g-violet-tint)',
		'var(--g-blue-tint)',
		'var(--g-green-tint)',
		'var(--g-amber-tint)',
		'var(--g-pink-tint)',
		'var(--g-sky-tint)'
	];

	onMount(async () => {
		try {
			const { AutoTokenizer } = await import('@xenova/transformers');
			tokenizer = await AutoTokenizer.from_pretrained('Xenova/gpt2');
		} catch (e) {
			failed = true;
		}
	});

	$: if (tokenizer) {
		const ids: number[] = tokenizer.encode(text);
		pieces = ids.map((id) => ({ id, text: tokenizer.decode([id]) }));
	}

	$: words = text.trim() ? text.trim().split(/\s+/).length : 0;
</script>

<div class="demo">
	<div class="demo-title">Try it: the real GPT-2 tokenizer</div>
	<textarea bind:value={text} rows="2" placeholder="Type anything…" />
	{#if failed}
		<p class="note">
			Couldn't download the tokenizer (are you offline?). The idea: text gets chopped into common
			chunks.
		</p>
	{:else if !tokenizer}
		<p class="note">Loading GPT-2's vocabulary…</p>
	{:else}
		<div class="tokens">
			{#each pieces as p, i}
				<span class="tok" style="background:{palette[i % palette.length]}" title="Token ID {p.id}">
					<span class="t">{p.text.replace(/ /g, '␣')}</span>
					<span class="id">{p.id}</span>
				</span>
			{/each}
		</div>
		<p class="stats">
			<strong>{text.length}</strong> characters → <strong>{words}</strong> words →
			<strong>{pieces.length}</strong> tokens. (<code>␣</code> marks a space — it's part of the token!)
		</p>
	{/if}
	<p class="hint">
		Things to try: a rare word like <em>"antidisestablishmentarianism"</em>, your name, an emoji 🎉,
		a number like <em>"1234567"</em>, or the same word with and without a capital letter.
	</p>
</div>

<style>
	textarea {
		width: 100%;
		border: 1px solid var(--g-border-strong);
		border-radius: 0.5rem;
		padding: 0.6rem;
		font-size: 1rem;
	}
	.tokens {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		margin-top: 0.8rem;
	}
	.tok {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		border-radius: 0.35rem;
		padding: 0.2rem 0.4rem;
		font-family: ui-monospace, monospace;
	}
	.t {
		font-size: 0.95rem;
		white-space: pre;
	}
	.id {
		font-size: 0.65rem;
		color: var(--g-text-3);
	}
	.stats,
	.note,
	.hint {
		font-size: 0.9rem;
		color: var(--g-text-2);
		margin-top: 0.6rem;
	}
</style>
