<script lang="ts">
	// kind: analogy | key | warning | math
	export let kind: 'analogy' | 'key' | 'warning' | 'math' = 'analogy';
	export let title = '';
	const labels = {
		analogy: '💡 Everyday analogy',
		key: '🔑 Key idea',
		warning: '⚠️ Common misconception',
		math: '🧮 Optional: the math'
	};
</script>

<div class="callout {kind}">
	<div class="label">{title || labels[kind]}</div>
	<div class="body"><slot /></div>
</div>

<style>
	.callout {
		border-left: 4px solid;
		border-radius: 0.5rem;
		padding: 0.9rem 1.1rem;
		margin: 1.2rem 0;
		line-height: 1.7;
	}
	.label {
		font-weight: 700;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		margin-bottom: 0.35rem;
	}
	.body :global(p) {
		margin: 0.4rem 0;
	}
	.analogy {
		background: var(--g-amber-wash);
		border-color: #f59e0b;
	}
	.analogy .label {
		color: var(--g-amber-text);
	}
	.key {
		background: var(--g-violet-wash);
		border-color: #8b5cf6;
	}
	.key .label {
		color: var(--g-accent);
	}
	.warning {
		background: var(--g-red-wash);
		border-color: #ef4444;
	}
	.warning .label {
		color: var(--g-red-text);
	}
	.math {
		background: var(--g-sky-wash);
		border-color: #0ea5e9;
	}
	.math .label {
		color: var(--g-sky-text);
	}
</style>
