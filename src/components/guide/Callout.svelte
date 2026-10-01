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
		background: #fffbeb;
		border-color: #f59e0b;
	}
	.analogy .label {
		color: #b45309;
	}
	.key {
		background: #f5f3ff;
		border-color: #8b5cf6;
	}
	.key .label {
		color: #6d28d9;
	}
	.warning {
		background: #fef2f2;
		border-color: #ef4444;
	}
	.warning .label {
		color: #b91c1c;
	}
	.math {
		background: #f0f9ff;
		border-color: #0ea5e9;
	}
	.math .label {
		color: #0369a1;
	}
</style>
