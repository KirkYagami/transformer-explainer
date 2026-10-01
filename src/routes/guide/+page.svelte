<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import Question from '~/components/guide/Question.svelte';
	import Callout from '~/components/guide/Callout.svelte';
	import Quiz from '~/components/guide/Quiz.svelte';
	import Pipeline from '~/components/guide/Pipeline.svelte';
	import TokenizerDemo from '~/components/guide/TokenizerDemo.svelte';
	import WordMapDemo from '~/components/guide/WordMapDemo.svelte';
	import DotProductDemo from '~/components/guide/DotProductDemo.svelte';
	import AttentionDemo from '~/components/guide/AttentionDemo.svelte';
	import QKVDemo from '~/components/guide/QKVDemo.svelte';
	import NeuronDemo from '~/components/guide/NeuronDemo.svelte';
	import NormDemo from '~/components/guide/NormDemo.svelte';
	import SoftmaxDemo from '~/components/guide/SoftmaxDemo.svelte';
	import GenerationDemo from '~/components/guide/GenerationDemo.svelte';
	import TrainingDemo from '~/components/guide/TrainingDemo.svelte';
	import Glossary from '~/components/guide/Glossary.svelte';

	const chapters = [
		{ id: 'start', title: 'Start here' },
		{ id: 'big-picture', title: '1. The big picture' },
		{ id: 'numbers', title: '2. Why numbers?' },
		{ id: 'tokens', title: '3. Tokens' },
		{ id: 'embedding', title: '4. Embeddings (vectors)' },
		{ id: 'position', title: '5. Word order' },
		{ id: 'attention', title: '6. Attention' },
		{ id: 'mlp', title: '7. The MLP' },
		{ id: 'glue', title: '8. Residuals & LayerNorm' },
		{ id: 'stack', title: '9. Stacking 12 blocks' },
		{ id: 'output', title: '10. Picking the next word' },
		{ id: 'generation', title: '11. Writing whole sentences' },
		{ id: 'training', title: '12. How did it learn?' },
		{ id: 'myths', title: '13. Big questions & myths' },
		{ id: 'shapes', title: '14. Cheat sheet: shapes' },
		{ id: 'glossary', title: '15. Glossary' },
		{ id: 'next', title: 'Where next?' }
	];

	let active = 'start';
	let progress = 0;
	onMount(() => {
		const obs = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) active = e.target.id;
			},
			{ rootMargin: '-20% 0px -70% 0px' }
		);
		chapters.forEach((c) => {
			const el = document.getElementById(c.id);
			if (el) obs.observe(el);
		});
		const onScroll = () => {
			const h = document.documentElement;
			progress = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			obs.disconnect();
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>

<svelte:head>
	<title>Transformers from Zero — A Beginner's Guide</title>
	<meta
		name="description"
		content="A from-scratch, no-prerequisites guide to how Transformers like GPT work, with interactive demos."
	/>
</svelte:head>

<div class="progress" style="width:{progress}%"></div>

<div class="guide">
	<nav class="toc">
		<a class="home" href="{base}/">← Back to the visualization</a>
		<div class="toc-title">Contents</div>
		{#each chapters as c}
			<a href="#{c.id}" class:active={active === c.id}>{c.title}</a>
		{/each}
	</nav>

	<article>
		<!-- ============================== START ============================== -->
		<section id="start">
			<p class="eyebrow">Transformer Explainer · Beginner's Guide</p>
			<h1>Transformers from Zero</h1>
			<p class="lead">
				How does ChatGPT-style AI actually turn your words into an answer? This guide explains every
				piece of the <a href="{base}/">Transformer Explainer</a> diagram assuming you know
				<strong>nothing</strong> about AI, programming or advanced math. If you can add and multiply, you
				can follow along.
			</p>
			<div class="howto">
				<div><strong>📖 Read in order.</strong> Each chapter builds on the last.</div>
				<div><strong>🖱️ Play with every demo.</strong> They're small on purpose.</div>
				<div><strong>❓ Open the questions.</strong> They're the ones beginners actually ask.</div>
				<div><strong>🧮 Math boxes are optional.</strong> Skip them freely — the ideas are in the text.</div>
			</div>
			<Question q="Do I need to know programming or calculus?">
				<p>
					No. Everything here is explained with pictures, everyday analogies, and at most multiplication
					and addition. Where a formula appears, it's in a blue "optional math" box with a plain-English
					translation next to it.
				</p>
			</Question>
			<Question q="How long will this take?">
				<p>
					About 60–90 minutes if you read everything and play with the demos. You can stop at any
					chapter; the table of contents on the left remembers where things are.
				</p>
			</Question>
			<Question q="What's the difference between this guide and the main visualization?">
				<p>
					The <a href="{base}/">main visualization</a> runs a real AI model (GPT-2) live in your browser
					and shows every number flowing through it. It's amazing — but it can be overwhelming if you
					don't know what you're looking at. This guide is the "what am I looking at?" companion. At the
					end of each chapter we tell you exactly which part of the visualization it explains.
				</p>
			</Question>
		</section>

		<!-- ============================== 1. BIG PICTURE ============================== -->
		<section id="big-picture">
			<h2>1. The big picture</h2>
			<p>
				Let's start with the single most important sentence in this whole guide:
			</p>
			<Callout kind="key">
				<p>
					<strong>A text-generating Transformer does exactly one thing: given some text, it guesses
						what small piece of text comes next.</strong>
				</p>
				<p>That's it. Everything else — essays, code, poems, chat — is that one trick, repeated.</p>
			</Callout>
			<p>
				You've used a weaker version of this for years: the word suggestions above your phone keyboard.
				Type "See you" and it suggests "tomorrow", "soon", "later". A Transformer is that idea, made
				enormously better: it considers <em>all</em> of the text so far, not just the last word or two,
				and it has learned from a gigantic amount of writing.
			</p>
			<Pipeline />
			<p>
				The diagram above is the whole journey your text takes. Don't worry about the words yet; every
				box gets its own chapter. Click any box to jump there.
			</p>

			<Question q="What does 'Transformer' mean? Does it have anything to do with the robots?">
				<p>
					Nothing to do with robots! It's just the name a team of Google researchers gave their design
					in a 2017 paper titled <em>"Attention Is All You Need"</em>. The model <em>transforms</em> one
					sequence (your text) into a richer version of itself, step by step. The name stuck.
				</p>
			</Question>
			<Question q="What is a 'model'? Is it a program?">
				<p>
					A model is a big mathematical recipe with millions of adjustable numbers in it — think of an
					enormous sound mixing desk with millions of knobs. The <em>recipe</em> (the order of steps) is
					written by humans. The <em>knob settings</em> are not: they were found automatically by
					training (chapter 12). These knob settings are called <strong>parameters</strong> or
					<strong>weights</strong>.
				</p>
				<p>
					So yes, it runs as a program, but no human wrote rules like "after 'peanut butter' say
					'jelly'". That behaviour is hidden in the knob settings.
				</p>
			</Question>
			<Question q="What is GPT-2, and why does this site use an 'old' model?">
				<p>
					GPT-2 is a model OpenAI released in 2019. GPT stands for <strong>G</strong>enerative (it
					generates text) <strong>P</strong>re-trained (it learned from lots of text before being used)
					<strong>T</strong>ransformer (its design). The small version used here has
					<strong>124 million</strong> parameters.
				</p>
				<p>
					Modern models (GPT-4, Claude, Llama, Gemini…) are far bigger and have extra tricks, but the
					core blueprint is the same one you'll learn here. GPT-2 small is just small enough to run
					inside your web browser, which is why the visualization can show you real numbers.
				</p>
			</Question>
			<Question q="'124 million parameters' — what does that number actually mean?">
				<p>
					It means the model contains 124 million individual decimal numbers (like
					<code>0.0213</code> or <code>-1.47</code>) that were tuned during training. Stored on disk,
					that's about 500 MB. For comparison, GPT-3 has 175 <em>billion</em>. More knobs = more capacity
					to store patterns, but also more computation per word.
				</p>
			</Question>
			<Question q="When I click 'Generate' in the visualization, is the model learning from me?">
				<p>
					No. There are two completely separate phases:
				</p>
				<ul>
					<li>
						<strong>Training</strong> (done once, long ago, on big computers): the knobs get tuned.
					</li>
					<li>
						<strong>Inference</strong> (what you do in the visualization): the knobs are frozen; the
						model just uses them to make predictions.
					</li>
				</ul>
				<p>Nothing you type changes the model. Refresh the page and it's exactly the same.</p>
			</Question>
			<Quiz
				question="At its core, what is a text-generating Transformer trying to do?"
				options={[
					'Look up the answer in a database of facts',
					'Guess the next small piece of text, given the text so far',
					'Translate your text into computer code',
					'Search the internet for similar sentences'
				]}
				answer={1}
				explanation="Everything a GPT-style model does comes from repeatedly predicting the next token. There's no database lookup or web search inside the model itself."
			/>
		</section>

		<!-- ============================== 2. NUMBERS ============================== -->
		<section id="numbers">
			<h2>2. Why does everything become numbers?</h2>
			<p>
				A computer chip can only do arithmetic: add, multiply, compare. It has no idea what "cat" means.
				So the very first job of any AI that handles language is to turn words into numbers — and, at
				the very end, to turn numbers back into words.
			</p>
			<p>
				But we can't just number words alphabetically (aardvark = 1, abacus = 2, …). Those numbers
				would be meaningless: "cat" and "kitten" would be far apart, while "cat" and "catastrophe" would
				be neighbours. We need numbers that <em>capture meaning</em>. The next two chapters show how
				Transformers do that: first chop text into pieces (<strong>tokens</strong>), then give each piece
				a list of meaningful numbers (an <strong>embedding</strong>).
			</p>
			<Question q="What's a 'vector'? It sounds scary.">
				<p>
					A vector is just <strong>a list of numbers</strong>. <code>[3, 7]</code> is a vector with 2
					numbers. <code>[0.2, -1.1, 0.5, 4.0]</code> is a vector with 4 numbers. That's it.
				</p>
				<p>
					A list of 2 numbers can be drawn as a point (or an arrow) on a flat map: go 3 right, 7 up. A
					list of 3 numbers is a point in a room. GPT-2 uses lists of <strong>768</strong> numbers — we
					can't picture 768 directions, but the math works exactly the same as in 2D. Whenever you see a
					vector in this guide, picture an arrow on a map.
				</p>
			</Question>
			<Question q="And a 'matrix'?">
				<p>
					A matrix is a <strong>grid (table) of numbers</strong> — rows and columns, like a spreadsheet.
					A table with 3 rows and 4 columns has "shape (3, 4)". In the visualization, every coloured
					rectangle made of little cells is a matrix.
				</p>
				<p>
					You'll often see a list of vectors stacked into a matrix: if your prompt has 6 tokens and each
					has 768 numbers, you get a 6 × 768 table — one row per token.
				</p>
			</Question>
			<Question q="What does 'multiplying by a matrix' do, in plain words?">
				<p>
					It's a recipe for making a new list of numbers out of an old one. Each new number is a
					<em>weighted mix</em> of all the old numbers: "take 0.3 of the first, minus 1.2 of the second,
					plus 0.5 of the third…". The matrix stores all those mixing amounts.
				</p>
				<p>
					Almost everything a Transformer does is this: <strong>mix numbers with learned
						amounts</strong>. The magic is entirely in what those amounts are.
				</p>
			</Question>
		</section>

		<!-- ============================== 3. TOKENS ============================== -->
		<section id="tokens">
			<h2>3. Tokens: chopping text into pieces</h2>
			<p>
				Before anything else, your text is cut into small chunks called <strong>tokens</strong>. A token
				is often a whole common word (<code>the</code>, <code>data</code>), but rarer words get split
				into pieces (<code>empowers</code> → <code>emp</code> + <code>owers</code>). Each token in GPT-2's
				dictionary has an ID number between 0 and 50,256.
			</p>
			<TokenizerDemo />
			<Question q="Why not just use whole words?">
				<p>
					There are too many words! Every name, typo, slang term, product name and word in every
					language would need an entry — millions of them — and the model would still meet words it has
					never seen ("Zorblax"). With sub-word pieces, <em>any</em> text can be built from a fixed set of
					50,257 pieces, like Lego bricks.
				</p>
			</Question>
			<Question q="Then why not just use single letters?">
				<p>
					That would work, but text would become very long (one token per letter), and the model would
					waste a lot of effort re-learning that <code>t-h-e</code> spells "the". Common chunks give a
					good middle ground: short sequences, but nothing is ever "unknown".
				</p>
			</Question>
			<Question q="Who decided how words are split?">
				<p>
					An algorithm called <strong>Byte-Pair Encoding (BPE)</strong>, run once on a huge pile of text
					before the model was trained. It starts with single characters and repeatedly glues together
					the pair of pieces that appears together most often (<code>t</code>+<code>h</code> →
					<code>th</code>, <code>th</code>+<code>e</code> → <code>the</code>, …) until it has 50,257
					pieces. So common words end up as one token, rare ones as several.
				</p>
			</Question>
			<Question q="Why is the space attached to the start of a token?">
				<p>
					GPT-2's tokenizer treats a leading space as part of the word: <code>␣cat</code> and
					<code>cat</code> are <em>different</em> tokens with different IDs. That's how the model knows
					where words begin, without needing a separate "space" token. It's also why
					<code>Hello</code> and <code>␣Hello</code> look the same to you but different to the model.
				</p>
			</Question>
			<Question q="Is a token the same as a word? How many words is 1,000 tokens?">
				<p>
					Not quite. For ordinary English, a rule of thumb is <strong>1 token ≈ ¾ of a word</strong>, so
					1,000 tokens ≈ 750 words. Other languages, code, and numbers usually use more tokens per word.
				</p>
			</Question>
			<Question q="Does the token ID number (like 6060) mean anything?">
				<p>
					No — it's just a row number in a big table, like a locker number. Token 6060 isn't "bigger" or
					"more important" than token 12. The meaning comes in the next step, when we use the ID to fetch
					that token's vector.
				</p>
			</Question>
			<p class="see-it">
				👀 <strong>In the visualization:</strong> the words in the very first column on the left are the
				tokens. Hover over the <em>Embedding</em> block to see their IDs.
			</p>
		</section>

		<!-- ============================== 4. EMBEDDING ============================== -->
		<section id="embedding">
			<h2>4. Embeddings: giving each token a meaning</h2>
			<p>
				The model has a giant table called the <strong>token embedding matrix</strong>: one row for each
				of the 50,257 tokens, and each row holds 768 numbers. To "embed" a token, the model simply looks
				up its row. Token ID 6060 → grab row 6060 → now you have 768 numbers that describe that token.
			</p>
			<Callout kind="analogy">
				<p>
					Imagine describing every food with numbers: <code>[sweetness, crunchiness, temperature,
						price, …]</code>. Apple might be <code>[7, 8, 3, 2]</code>, ice cream <code>[9, 1, 0, 4]</code>.
					Foods that are alike get similar lists. An embedding is the same idea — except the model
					invented its own 768 "properties" during training, and most of them don't have neat human
					names.
				</p>
			</Callout>
			<WordMapDemo />
			<Question q="Who chose those 768 numbers for each token?">
				<p>
					Nobody, directly. At the start of training they were random. During training, every time the
					model made a bad prediction, the numbers were nudged slightly to make the prediction better.
					After billions of nudges, tokens that are used in similar ways ended up with similar vectors.
					The meaning <em>emerges</em> from usage.
				</p>
			</Question>
			<Question q="What does each of the 768 numbers mean? Is number 42 'is it an animal'?">
				<p>
					Usually there's no clean answer. Meanings are typically spread across many numbers at once,
					and each number takes part in many meanings. Researchers in a field called
					<em>interpretability</em> are actively working on decoding them. Think of it more as a
					<em>direction</em> in the space meaning something (like "male → female" in the demo) than any
					single number.
				</p>
			</Question>
			<Question q="Why 768? Why not 10 or a million?">
				<p>
					It's a design choice (called the <strong>model dimension</strong> or <em>d_model</em>). More
					numbers = more room to store subtle distinctions, but more computation and more knobs to train.
					GPT-2 small uses 768; GPT-2 XL uses 1,600; very large modern models use 10,000+. 768 also
					divides nicely into 12 heads of 64 (see chapter 6).
				</p>
			</Question>
			<Question q="How do we measure if two vectors are 'similar'?">
				<p>
					With the <strong>dot product</strong>: multiply the lists number-by-number and add up the
					results. If two arrows point the same way, you get a big positive number. At right angles,
					about zero. Opposite, negative. This one operation is the heart of attention, so it's worth
					playing with:
				</p>
				<DotProductDemo />
			</Question>
			<Question q="The embedding matrix has 50,257 × 768 numbers. Isn't that a lot?">
				<p>
					Yes — about <strong>38.6 million</strong> numbers, nearly a third of GPT-2 small's 124 million
					parameters! It's just a lookup table, though, so using it is very fast.
				</p>
			</Question>
		</section>

		<!-- ============================== 5. POSITION ============================== -->
		<section id="position">
			<h2>5. Word order: positional embeddings</h2>
			<p>
				<em>"Dog bites man"</em> and <em>"Man bites dog"</em> contain the exact same tokens. But they
				mean very different things! As you'll see, attention by itself treats its input like a
				<em>bag</em> of tokens — it has no built-in sense of order. So we must stamp each token with its
				position.
			</p>
			<p>
				GPT-2 has a second table, the <strong>positional embedding matrix</strong>, with one row of 768
				numbers for each position 0, 1, 2, … up to 1,023. The model simply <strong>adds</strong> the
				position's vector to the token's vector, number by number:
			</p>
			<div class="equation">
				final embedding of "bites" in slot 1 = (vector for "bites") + (vector for "position 1")
			</div>
			<Question q="Doesn't adding the numbers mess up the word's meaning?">
				<p>
					Surprisingly, not much. With 768 numbers there's plenty of room: the model learns to keep
					"what" and "where" information in mostly different directions of the space, so they can share
					one vector without trampling each other — like writing in two different colours on the same
					page.
				</p>
			</Question>
			<Question q="Why can GPT-2 only handle 1,024 tokens?">
				<p>
					Because its position table only has 1,024 rows — it simply has no vector for position 1,024 or
					beyond. That limit is called the <strong>context window</strong>. Newer models use cleverer
					position schemes (like "RoPE") and much longer windows.
				</p>
			</Question>
			<Question q="Did someone design the position vectors by hand?">
				<p>
					In GPT-2, no — they were learned during training, just like the token embeddings. (The
					original 2017 Transformer used fixed sine-wave patterns instead. Both work.)
				</p>
			</Question>
			<p class="see-it">
				👀 <strong>In the visualization:</strong> click the <em>Embedding</em> block to expand it. You'll
				see token embedding + positional encoding = final embedding, for each token in your prompt.
			</p>
			<Quiz
				question="Why does the model need positional embeddings?"
				options={[
					'To make the vectors longer',
					'Because otherwise "dog bites man" and "man bites dog" would look identical to attention',
					'To count how many tokens there are',
					'To translate the text'
				]}
				answer={1}
				explanation="Attention mixes tokens without caring about their order, so position information must be added into each token's vector."
			/>
		</section>

		<!-- ============================== 6. ATTENTION ============================== -->
		<section id="attention">
			<h2>6. Attention: letting words talk to each other</h2>
			<p>
				Right now each token's vector only knows about <em>itself</em> (and its position). But meaning
				depends on context. "Bank" means something different in "river bank" and "bank account". In
				<em>"The animal didn't cross the street because it was too tired"</em>, what does "it" refer to?
			</p>
			<p>
				<strong>Self-attention</strong> is the step where every token gathers information from the other
				tokens around it, and updates its own vector to include that context.
			</p>
			<AttentionDemo />

			<h3>Query, Key, Value — the library analogy</h3>
			<Callout kind="analogy">
				<p>
					You walk into a library with a <strong>question</strong> in mind ("books about dogs"). That's
					your <strong>Query</strong>. Every book has a <strong>label</strong> on its spine describing
					what it's about. That's its <strong>Key</strong>. You compare your question to each label to
					decide how relevant each book is. Then you read the <strong>contents</strong> of the most
					relevant books — that's the <strong>Value</strong> — and combine what you learned.
				</p>
			</Callout>
			<p>For each token, the model makes three new vectors by multiplying its embedding by three learned matrices:</p>
			<ul class="bullets">
				<li><strong>Query (Q)</strong> — "What am I looking for?" (e.g. "it" might look for "a noun that could be my referent")</li>
				<li><strong>Key (K)</strong> — "What do I offer / what am I about?" (e.g. "animal" advertises "I'm a living noun")</li>
				<li><strong>Value (V)</strong> — "If you pick me, here's the information I'll hand over."</li>
			</ul>
			<p>Then, for each token:</p>
			<ol class="bullets">
				<li>Compare its Query with every token's Key using the dot product → a <em>relevance score</em>.</li>
				<li>Hide (mask) any token that comes <em>later</em> in the text.</li>
				<li>Turn the scores into percentages that add to 100% (softmax).</li>
				<li>Take a weighted blend of the Values using those percentages.</li>
			</ol>
			<QKVDemo />

			<Question q="Why three different vectors? Why not just compare the embeddings directly?">
				<p>
					Because "what I'm looking for" and "what I am" are different things. The word "it" is
					<em>looking for</em> a noun, but it <em>is</em> a pronoun. Separate Query and Key vectors let
					each token ask one thing while advertising another. And Value separates "what I'm about" (used
					for matching) from "what I'll actually share" (the content passed along).
				</p>
			</Question>
			<Question q="Where do the Q, K and V matrices come from?">
				<p>
					They're learned during training, like everything else. Each is a 768 × 768 grid of numbers
					per layer (split among the heads). Nobody programs "pronouns should look for nouns" — that
					pattern emerges because it helps predict the next word.
				</p>
			</Question>
			<Question q="What is the 'mask'? Why can't words look ahead?">
				<p>
					GPT-2 is trained to predict the <em>next</em> word. If each position could peek at the words
					after it, it would be cheating — the answer would be right there! So scores for future tokens
					are set to −∞ (minus infinity), which softmax turns into exactly 0%. In the visualization,
					that's the empty upper-right triangle of the attention matrix. This is called a
					<strong>causal mask</strong>.
				</p>
				<p>
					A side effect: in our demo, the word "it" can't yet know whether the sentence will end with
					"tired" or "wide". Only the later word can resolve it — exactly what you saw.
				</p>
			</Question>
			<Question q="What is softmax?">
				<p>
					A small formula that turns any list of scores into percentages that add up to 100%, while
					keeping the order (biggest score → biggest percentage). It works by raising <em>e</em>
					(≈ 2.718) to the power of each score, which makes everything positive and exaggerates the
					differences, and then dividing each by the total.
				</p>
				<Callout kind="math">
					<p>
						softmax(xᵢ) = e<sup>xᵢ</sup> / (e<sup>x₁</sup> + e<sup>x₂</sup> + … + e<sup>xₙ</sup>)
					</p>
					<p>Scores [2, 1, 0] → [7.39, 2.72, 1] → divide by 11.11 → [66%, 24%, 9%].</p>
				</Callout>
			</Question>
			<Question q="Why divide by √64 (the 'scaling')?">
				<p>
					A dot product of two long lists adds up many products, so it can get large just because the
					lists are long. Large scores make softmax extremely "spiky" (one token gets ~100%, the rest
					~0%), which makes learning hard. Dividing by the square root of the vector length (√64 = 8 in
					GPT-2) keeps scores in a reasonable range.
				</p>
			</Question>
			<Question q="What is 'multi-head' attention? Why 12 heads?">
				<p>
					Instead of one big attention, GPT-2 runs <strong>12 smaller ones side by side</strong>, each
					with its own Q, K, V matrices working on 64 numbers (12 × 64 = 768). Each head can specialise
					in a different kind of relationship: one might track "which noun does this pronoun refer
					to", another "what was the previous word", another "matching quotation marks". Afterwards
					their 12 outputs are glued back together into 768 numbers and mixed by one more matrix.
				</p>
				<Callout kind="analogy">
					<p>
						Like a team of 12 editors each reading the same sentence with a different job: one checks
						grammar, one checks who's who, one checks tone. Then they combine their notes.
					</p>
				</Callout>
			</Question>
			<Question q="Is attention the same as human attention or focus?">
				<p>
					Only loosely. It's a borrowed word for "a weighted average where the weights are computed from
					the data". It doesn't imply awareness. The model computes attention for every token,
					automatically, every time.
				</p>
			</Question>
			<Question q="Why was attention such a big deal?">
				<p>
					Older language models (called RNNs) read text one word at a time, passing a small "memory"
					forward, so information from far back faded away and training was slow. Attention lets every
					token look directly at every earlier token in one step, and all positions can be computed at
					the same time on a GPU. That made it possible to train on vastly more text.
				</p>
			</Question>
			<p class="see-it">
				👀 <strong>In the visualization:</strong> the <em>Attention</em> part of each Transformer block.
				Click it to see the Q, K, V vectors, the masked attention matrix (darker = more attention) and
				the head selector. Hover over tokens to see what each one attends to.
			</p>
			<Quiz
				question="In attention, what is the Query–Key dot product used for?"
				options={[
					'To look up the token ID',
					'To decide how relevant each earlier token is to the current one',
					'To pick the final output word',
					'To normalise the numbers'
				]}
				answer={1}
				explanation="Query·Key gives a relevance score; softmax turns those into percentages; the percentages decide how much of each token's Value gets blended in."
			/>
		</section>

		<!-- ============================== 7. MLP ============================== -->
		<section id="mlp">
			<h2>7. The MLP: each token thinks on its own</h2>
			<p>
				After attention, each token's vector contains context from its neighbours. Now the
				<strong>MLP</strong> (Multi-Layer Perceptron, also called the feed-forward network) processes each
				token <em>separately</em> to refine what it means. If attention is the group discussion, the MLP
				is each person going away to think it over.
			</p>
			<p>It's made of artificial <strong>neurons</strong>. Here's one:</p>
			<NeuronDemo />
			<p>
				GPT-2's MLP takes each token's 768 numbers, feeds them into <strong>3,072 neurons</strong> (4×
				wider), applies GELU, then squeezes the result back down to 768 numbers.
			</p>
			<Question q="What's a 'neuron' here? Is it like a brain cell?">
				<p>
					Very loosely inspired by one, but much simpler: it's just "multiply each input by a weight, add
					them up, add a bias, then bend the result with an activation function". The demo above is
					literally the whole thing.
				</p>
			</Question>
			<Question q="Why expand to 3,072 and then shrink back to 768?">
				<p>
					Expanding gives the model lots of room — 3,072 separate "detectors", each of which can fire for
					some pattern (e.g. "this is a word about sports", "this is inside a quotation"). Shrinking back
					to 768 lets the result fit into the same-sized vector so the next block can use it.
				</p>
			</Question>
			<Question q="If attention already mixes information, why do we need an MLP at all?">
				<p>
					Attention mostly <em>moves</em> information between tokens (it's a weighted average). It's
					not good at transforming it in complicated ways. The MLP, with its non-linear activation, does
					the heavy "processing". Researchers have found that a lot of a model's factual knowledge (e.g.
					"Paris is in France") seems to be stored in MLP weights. In fact, the MLPs hold about two-thirds
					of the parameters inside each block.
				</p>
			</Question>
			<Question q="What's an activation function and why is GELU used?">
				<p>
					It's the "bend" after the weighted sum. Without a bend, any stack of layers collapses into one
					simple straight-line relationship, and the network couldn't learn complex patterns. ReLU ("cut
					negatives to 0") is the simplest bend; GELU is a smooth version of it that tends to train a bit
					better, so GPT-2 uses it.
				</p>
			</Question>
			<p class="see-it">
				👀 <strong>In the visualization:</strong> the <em>MLP</em> part of each block. Click it to see
				768 → 3,072 → 768.
			</p>
		</section>

		<!-- ============================== 8. GLUE ============================== -->
		<section id="glue">
			<h2>8. The glue: residual connections & layer normalization</h2>
			<p>
				Two small supporting pieces appear around attention and the MLP in every block. They don't get
				much attention (ha), but without them deep Transformers wouldn't train at all.
			</p>
			<h3>Residual connections ("skip connections")</h3>
			<p>
				Instead of <em>replacing</em> a token's vector with the attention output, the model
				<strong>adds</strong> the output onto the original: <code>new = old + attention(old)</code>. Same
				for the MLP.
			</p>
			<Callout kind="analogy">
				<p>
					Think of a shared document. Each layer doesn't rewrite the document from scratch — it adds
					margin notes. The original text is always still there, and each layer only has to contribute
					an <em>improvement</em>. This running "document" is often called the <strong>residual
						stream</strong>.
				</p>
			</Callout>
			<Question q="Why does adding back the input help?">
				<p>
					Two reasons. (1) A layer that has nothing useful to add can just output ~0 and do no harm. (2)
					During training, the error signal can flow straight back through the additions to early
					layers. Without these shortcuts, signals in very deep networks fade away and early layers stop
					learning.
				</p>
			</Question>
			<h3>Layer normalization</h3>
			<p>
				Before attention and before the MLP, each token's vector is <strong>normalized</strong>: shifted
				so its average is 0 and scaled so its spread is 1.
			</p>
			<NormDemo />
			<Question q="Why normalize? What goes wrong without it?">
				<p>
					As numbers pass through many layers and keep getting added together, some can grow huge while
					others shrink tiny. Huge numbers make softmax spiky and make training unstable (like a
					microphone feeding back). Normalizing keeps every layer's inputs in a predictable, comfortable
					range.
				</p>
			</Question>
			<Question q="What is 'dropout'? I saw it in the visualization.">
				<p>
					During <em>training only</em>, dropout randomly switches off some numbers (sets them to 0) so
					the model can't rely too heavily on any single one — like practising a team sport with random
					players benched so everyone learns to contribute. When generating text (what you're doing),
					dropout is turned off.
				</p>
			</Question>
			<p class="see-it">
				👀 <strong>In the visualization:</strong> the curved lines skipping around attention and the MLP
				are the residual connections. Click "LayerNorm", "Dropout" or "Residual" labels for their details.
			</p>
		</section>

		<!-- ============================== 9. STACK ============================== -->
		<section id="stack">
			<h2>9. Stacking 12 blocks</h2>
			<p>
				One <strong>Transformer block</strong> = LayerNorm → Attention → add back → LayerNorm → MLP → add
				back. GPT-2 small stacks <strong>12 of these blocks</strong>, one after another. Every block has
				the exact same structure but its own learned numbers.
			</p>
			<Question q="Why repeat the same thing 12 times? Wouldn't one big block do?">
				<p>
					Each pass refines the understanding a bit more, building on the last. Research suggests early
					blocks handle simple things (grammar, nearby words), middle blocks build up meaning (who did
					what), and late blocks focus on "what word should come next". It's like reading a sentence
					several times, noticing deeper things each time. Deep stacks of moderate blocks turn out to
					learn better than one giant block.
				</p>
			</Question>
			<Question q="Does the vector size change between blocks?">
				<p>
					No. Every block takes in one 768-number vector per token and gives back one 768-number vector
					per token. That's what makes stacking easy — the blocks are like interchangeable train
					carriages.
				</p>
			</Question>
			<Question q="Where are all 124 million parameters, then?">
				<p>Roughly:</p>
				<ul>
					<li>Token embeddings: ~38.6 M</li>
					<li>Position embeddings: ~0.8 M</li>
					<li>Each block: ~7.1 M (≈ 2.4 M attention + ≈ 4.7 M MLP) × 12 blocks ≈ 85 M</li>
					<li>Final layer norm: tiny</li>
				</ul>
				<p>
					(The output layer reuses the token embedding matrix — see the next chapter — so it adds no new
					parameters.)
				</p>
			</Question>
			<p class="see-it">
				👀 <strong>In the visualization:</strong> the stack of greyed-out blocks behind the first one. Use
				the arrows to step through blocks 1 to 12.
			</p>
		</section>

		<!-- ============================== 10. OUTPUT ============================== -->
		<section id="output">
			<h2>10. Picking the next word</h2>
			<p>
				After 12 blocks, we take the vector of the <strong>last token only</strong> — it has gathered
				context from everything before it — and turn it into a prediction:
			</p>
			<ol class="bullets">
				<li>
					<strong>Linear layer:</strong> compare the vector with all 50,257 token embeddings (dot
					products again!), giving one raw score per possible next token. These raw scores are called
					<strong>logits</strong>.
				</li>
				<li><strong>Softmax:</strong> turn the 50,257 scores into probabilities that add to 100%.</li>
				<li><strong>Sampling:</strong> pick one token, guided by those probabilities.</li>
			</ol>
			<SoftmaxDemo />
			<Question q="Why only use the last token's vector?">
				<p>
					Because we're predicting what comes <em>after</em> the last token, and thanks to attention its
					vector already contains information from all earlier tokens. (During training, every position
					predicts its own next token simultaneously — a great efficiency trick.)
				</p>
			</Question>
			<Question q="Why not always pick the most likely word?">
				<p>
					You can (that's "greedy" decoding: set top-k to 1). But it tends to produce repetitive, dull,
					sometimes looping text: "I think that I think that I think…". Allowing a bit of randomness
					makes writing more natural and varied. That's also why the same prompt can give different
					answers each time.
				</p>
			</Question>
			<Question q="What is temperature, exactly?">
				<p>
					Before softmax, every logit is divided by the temperature. Dividing by a small number (e.g. 0.2)
					stretches the gaps between scores so the leader dominates. Dividing by a large number (e.g. 2)
					shrinks the gaps so everything becomes more equally likely. Temperature 1 = leave scores as
					they are.
				</p>
			</Question>
			<Question q="What are top-k and top-p?">
				<p>
					Safety rails for randomness. <strong>Top-k</strong>: only consider the k most likely tokens and
					ignore the rest. <strong>Top-p</strong> (nucleus sampling): keep the smallest group of top
					tokens whose probabilities add up to at least p (e.g. 90%). Both stop the model from picking
					something absurd from the long tail of 50,000 unlikely tokens.
				</p>
			</Question>
			<Question q="Does the model ever 'know' it's right?">
				<p>
					No. A probability of 80% means "in text like this, this kind of continuation was common",
					not "I have checked this is true". That's a big reason models can state false things
					confidently (see chapter 13).
				</p>
			</Question>
			<p class="see-it">
				👀 <strong>In the visualization:</strong> the rightmost column, "Probabilities". Use the
				Temperature slider and Sampling options at the top and watch the bars change.
			</p>
		</section>

		<!-- ============================== 11. GENERATION ============================== -->
		<section id="generation">
			<h2>11. Writing whole sentences: the loop</h2>
			<p>
				The model only ever produces <strong>one token</strong> per run. To write a sentence, we repeat:
			</p>
			<ol class="bullets">
				<li>Run the whole model on the text so far.</li>
				<li>Pick the next token.</li>
				<li>Stick it on the end of the text.</li>
				<li>Go back to step 1. Stop at a length limit or a special "end" token.</li>
			</ol>
			<GenerationDemo />
			<Question q="So for a 500-word answer, the model runs ~700 times?">
				<p>
					Yes! That's why long answers take a while and appear word by word. (Real systems save
					intermediate results from earlier steps — called a <strong>KV cache</strong> — so they don't
					redo all the work for old tokens each time.)
				</p>
			</Question>
			<Question q="Can the model go back and fix an earlier word?">
				<p>
					No. Once a token is chosen it's part of the input for everything after it. The model can only
					keep going — which is why one bad early choice can send an answer off track.
				</p>
			</Question>
			<Question q="How does it know when to stop?">
				<p>
					Either it hits a maximum length we set, or it generates a special
					<code>&lt;|endoftext|&gt;</code> token, which it learned appears at the end of documents.
				</p>
			</Question>
		</section>

		<!-- ============================== 12. TRAINING ============================== -->
		<section id="training">
			<h2>12. How did it learn all those numbers?</h2>
			<p>
				Everything so far assumed the 124 million numbers were already "good". Here's how they got that
				way — with one beautifully simple game, played billions of times:
			</p>
			<ol class="bullets">
				<li>Take a real piece of text from the training data (GPT-2 used ~40 GB of web pages).</li>
				<li>Hide the next token and ask the model to predict it.</li>
				<li>
					Measure how wrong it was. If the true next word got only 1% probability, that's a big error;
					if it got 90%, a small one. (This error is called the <strong>loss</strong>.)
				</li>
				<li>
					Work out, for every one of the 124 million knobs, which direction to nudge it to reduce the
					error a tiny bit (this calculation is called <strong>backpropagation</strong>).
				</li>
				<li>Nudge them all a tiny bit (<strong>gradient descent</strong>). Repeat.</li>
			</ol>
			<TrainingDemo />
			<Question q="Nobody labelled the data? How does it know the right answers?">
				<p>
					The text labels itself! In any sentence, the "right answer" for each position is simply the
					word that actually came next. That's why this is called <strong>self-supervised</strong>
					learning, and why it can use enormous amounts of ordinary text.
				</p>
			</Question>
			<Question q="How can just predicting the next word teach grammar, facts, and reasoning?">
				<p>
					Because to predict the next word <em>well</em>, those things help. To continue "The capital of
					France is", knowing facts helps. To continue a math problem, doing the math helps. To continue
					dialogue, tracking who's speaking helps. The training pressure rewards any internal skill
					that makes predictions better, so the model gradually picks such skills up.
				</p>
			</Question>
			<Question q="How long does training take?">
				<p>
					GPT-2 small can now be reproduced in hours on modern hardware; it took far longer in 2019.
					Today's largest models take months on thousands of specialised chips and cost many millions
					of dollars — which is why training is done once and the resulting model is reused.
				</p>
			</Question>
			<Question q="What's the difference between GPT-2 and ChatGPT?">
				<p>
					GPT-2 is a <strong>base model</strong>: it just continues text. Ask it a question and it might
					continue with more questions! Chat assistants start from a (much bigger) base model and then
					get extra training: on examples of helpful conversations ("instruction tuning") and with human
					feedback on which answers are better (e.g. RLHF). The Transformer architecture underneath is
					the same idea you've just learned.
				</p>
			</Question>
		</section>

		<!-- ============================== 13. MYTHS ============================== -->
		<section id="myths">
			<h2>13. Big questions & common myths</h2>
			<Callout kind="warning" title="Myth: “It looks things up in a database.”">
				<p>
					There's no database of sentences inside. Everything the model "knows" is spread across those
					124 million numbers, in compressed, blurry form. It's more like a very well-read person's
					memory than a library.
				</p>
			</Callout>
			<Callout kind="warning" title="Myth: “It understands words the way I do.”">
				<p>
					It has never seen a cat or tasted an apple. Its notion of "cat" is entirely about how the
					token is used alongside other tokens. Whether that counts as "understanding" is a genuine,
					unresolved debate — but it's definitely different from human experience.
				</p>
			</Callout>
			<Callout kind="warning" title="Myth: “It remembers our previous conversations.”">
				<p>
					The model itself has no memory between runs. In chat apps, the earlier conversation is simply
					pasted back into the input each time (which is why the context window matters).
				</p>
			</Callout>
			<Callout kind="warning" title="Myth: “Its probabilities are a measure of truth.”">
				<p>
					The model predicts what text <em>is likely to look like</em>, not what is true. When it hasn't
					seen enough relevant data, it still produces fluent, confident text — this is called a
					<strong>hallucination</strong>.
				</p>
			</Callout>
			<Question q="Why is it bad at counting letters (e.g. 'how many r's in strawberry')?">
				<p>
					Because it never sees letters! It sees pieces like <code>str</code> + <code>aw</code> +
					<code>berry</code>, each turned into a vector of 768 numbers. Spelling details are only
					indirectly encoded. Try "strawberry" in the tokenizer demo in chapter 3.
				</p>
			</Question>
			<Question q="Why is it weird with arithmetic on big numbers?">
				<p>
					Same reason: numbers get chopped into inconsistent chunks (try <code>1234567</code> in the
					tokenizer), so digit positions aren't lined up neatly the way they are for you on paper.
				</p>
			</Question>
			<Question q="Does the model 'think' before answering?">
				<p>
					Each token gets a fixed amount of computation: exactly one pass through 12 blocks. There's no
					separate hidden planning step in GPT-2. (Some newer systems are trained to write out
					"reasoning" tokens first, which gives them more passes to work things out.)
				</p>
			</Question>
			<Question q="Is it the same model that does images, audio, protein folding…?">
				<p>
					The same <em>architecture</em> (with different tokens and training data). Images get cut into
					patches, audio into short slices, proteins into amino acids — then embeddings, attention, MLPs
					and so on work just like for text.
				</p>
			</Question>
		</section>

		<!-- ============================== 14. SHAPES ============================== -->
		<section id="shapes">
			<h2>14. Cheat sheet: following the numbers</h2>
			<p>
				If you open the visualization's expanded views, you'll see shapes like <code>(6, 768)</code>. Here's
				what each one is, for a prompt of <strong>n</strong> tokens in GPT-2 small:
			</p>
			<div class="table-wrap">
				<table class="shapes">
					<thead><tr><th>Step</th><th>Shape</th><th>In words</th></tr></thead>
					<tbody>
						<tr><td>Token IDs</td><td><code>(n)</code></td><td>one ID per token</td></tr>
						<tr><td>Token embedding table</td><td><code>(50257, 768)</code></td><td>a row for every possible token</td></tr>
						<tr><td>Position embedding table</td><td><code>(1024, 768)</code></td><td>a row for every possible position</td></tr>
						<tr><td>Embeddings (input to block 1)</td><td><code>(n, 768)</code></td><td>768 numbers per token</td></tr>
						<tr><td>Q, K, V (all heads)</td><td><code>(n, 768)</code> each</td><td>split into 12 heads of <code>(n, 64)</code></td></tr>
						<tr><td>Attention scores, per head</td><td><code>(n, n)</code></td><td>each token's relevance to each token (upper triangle masked)</td></tr>
						<tr><td>Attention output</td><td><code>(n, 768)</code></td><td>12 heads × 64 glued back together</td></tr>
						<tr><td>MLP hidden layer</td><td><code>(n, 3072)</code></td><td>4× wider</td></tr>
						<tr><td>Block output</td><td><code>(n, 768)</code></td><td>same as input, so blocks can stack</td></tr>
						<tr><td>Logits (last token)</td><td><code>(50257)</code></td><td>one score per possible next token</td></tr>
						<tr><td>Probabilities</td><td><code>(50257)</code></td><td>add up to 1 (100%)</td></tr>
					</tbody>
				</table>
			</div>
			<Callout kind="math" title="🧮 Optional: the whole thing in five lines">
				<p><code>x = TokenEmbed[ids] + PosEmbed[0..n]</code></p>
				<p>repeat 12 times:</p>
				<p>&nbsp;&nbsp;<code>x = x + Attention(LayerNorm(x))</code></p>
				<p>&nbsp;&nbsp;<code>x = x + MLP(LayerNorm(x))</code></p>
				<p><code>probs = softmax(LayerNorm(x)[last] · TokenEmbedᵀ / temperature)</code></p>
				<p>
					where Attention = softmax(QKᵀ/√64 + mask)·V per head, and MLP = GELU(x·W₁ + b₁)·W₂ + b₂.
					If you can read this now, you understand GPT-2.
				</p>
			</Callout>
		</section>

		<!-- ============================== 15. GLOSSARY ============================== -->
		<section id="glossary">
			<h2>15. Glossary</h2>
			<Glossary />
		</section>

		<!-- ============================== NEXT ============================== -->
		<section id="next">
			<h2>Where next?</h2>
			<p>You now know every box in the diagram. The best next step is to see it all running for real:</p>
			<a class="cta" href="{base}/">Open the live Transformer Explainer →</a>
			<p>Suggested things to try there, now that you know what they mean:</p>
			<ul class="bullets">
				<li>Type a prompt and watch the probability bars. Then change one word and see what moves.</li>
				<li>Click the Embedding block and find the token + position = final embedding addition.</li>
				<li>Open Attention, switch between heads, and look for a head that always attends to the previous token.</li>
				<li>Crank the temperature to 2 and generate a few times. Then try 0.1.</li>
				<li>Open the book icon (bottom-right) for a guided tour of the visualization itself.</li>
			</ul>
			<p class="small">
				This guide is part of a fork of
				<a href="https://github.com/poloclub/transformer-explainer" target="_blank" rel="noreferrer">Transformer Explainer</a>
				by the Polo Club of Data Science at Georgia Tech.
			</p>
		</section>
	</article>
</div>

<style lang="scss">
	:global(html) {
		scroll-behavior: smooth;
	}
	.progress {
		position: fixed;
		top: 0;
		left: 0;
		height: 3px;
		background: linear-gradient(90deg, #8b5cf6, #3b82f6);
		z-index: 10;
	}
	.guide {
		display: grid;
		grid-template-columns: 250px minmax(0, 760px);
		gap: 3rem;
		justify-content: center;
		padding: 2rem 1.5rem 6rem;
		color: #1f2937;
		background: #fff;
	}
	.toc {
		position: sticky;
		top: 1.5rem;
		align-self: start;
		display: flex;
		flex-direction: column;
		font-size: 0.88rem;
		max-height: calc(100vh - 3rem);
		overflow-y: auto;
		a {
			color: #6b7280;
			padding: 0.25rem 0.6rem;
			border-left: 2px solid #f3f4f6;
			text-decoration: none;
			&:hover {
				color: #6d28d9;
			}
			&.active {
				color: #6d28d9;
				border-left-color: #8b5cf6;
				font-weight: 600;
			}
		}
		.home {
			border: none;
			color: #6d28d9;
			font-weight: 600;
			margin-bottom: 1rem;
		}
	}
	.toc-title {
		font-weight: 700;
		text-transform: uppercase;
		font-size: 0.75rem;
		letter-spacing: 0.05em;
		color: #9ca3af;
		margin-bottom: 0.4rem;
	}
	section {
		padding-top: 2.5rem;
		scroll-margin-top: 1rem;
	}
	article {
		line-height: 1.75;
		font-size: 1.02rem;
		:global(p) {
			margin: 0.8rem 0;
		}
		:global(a) {
			color: #6d28d9;
			text-decoration: underline;
		}
		:global(code) {
			background: #f3f4f6;
			padding: 0.05rem 0.3rem;
			border-radius: 0.25rem;
			font-size: 0.9em;
		}
		:global(ul:not(.bullets)) {
			list-style: disc;
			padding-left: 1.3rem;
		}
	}
	.bullets {
		padding-left: 1.4rem;
		list-style: disc;
		li {
			margin: 0.35rem 0;
		}
	}
	ol.bullets {
		list-style: decimal;
	}
	.eyebrow {
		color: #8b5cf6;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-size: 0.8rem;
	}
	h1 {
		font-size: 2.6rem;
		font-weight: 800;
		line-height: 1.15;
	}
	h2 {
		font-size: 1.75rem;
		font-weight: 800;
		margin-bottom: 0.5rem;
		padding-top: 1rem;
		border-top: 1px solid #f3f4f6;
	}
	h3 {
		font-size: 1.2rem;
		font-weight: 700;
		margin: 1.5rem 0 0.4rem;
	}
	.lead {
		font-size: 1.2rem;
		color: #4b5563;
	}
	.howto {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.6rem;
		margin: 1.5rem 0;
		div {
			background: #f9fafb;
			border-radius: 0.6rem;
			padding: 0.7rem 0.9rem;
			font-size: 0.92rem;
		}
	}
	.equation {
		text-align: center;
		background: #f5f3ff;
		padding: 0.8rem;
		border-radius: 0.5rem;
		font-weight: 600;
		color: #4c1d95;
	}
	.see-it {
		background: #ecfeff;
		border-radius: 0.6rem;
		padding: 0.7rem 1rem;
		font-size: 0.95rem;
	}
	.table-wrap {
		overflow-x: auto;
	}
	.shapes {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
		th,
		td {
			text-align: left;
			padding: 0.4rem 0.6rem;
			border-bottom: 1px solid #f3f4f6;
		}
		th {
			color: #6b7280;
		}
	}
	.cta {
		display: inline-block;
		background: #7c3aed;
		color: #fff !important;
		text-decoration: none !important;
		padding: 0.7rem 1.3rem;
		border-radius: 999px;
		font-weight: 700;
		margin: 0.5rem 0 1rem;
	}
	.small {
		font-size: 0.85rem;
		color: #6b7280;
	}

	/* shared styles for the interactive demos */
	article :global(.demo) {
		border: 1px solid #e5e7eb;
		border-radius: 0.9rem;
		padding: 1rem 1.2rem;
		margin: 1.5rem 0;
		background: #fcfcfd;
		overflow-x: auto;
	}
	article :global(.demo-title) {
		font-weight: 700;
		color: #6d28d9;
		margin-bottom: 0.4rem;
	}
	article :global(.demo .hint) {
		font-size: 0.9rem;
		color: #4b5563;
	}
	article :global(.btn) {
		background: #7c3aed;
		color: #fff;
		border-radius: 0.5rem;
		padding: 0.4rem 0.9rem;
		font-size: 0.9rem;
		font-weight: 600;
	}
	article :global(.btn:disabled) {
		opacity: 0.4;
	}
	article :global(.btn.ghost) {
		background: #fff;
		color: #6d28d9;
		border: 1px solid #c4b5fd;
	}
	article :global(.btn.small) {
		background: #fff;
		color: #374151;
		border: 1px solid #d1d5db;
		padding: 0.2rem 0.6rem;
	}
	article :global(.btn.small.on) {
		background: #ede9fe;
		border-color: #8b5cf6;
		color: #5b21b6;
	}
	article :global(input[type='range']) {
		accent-color: #7c3aed;
	}

	@media (max-width: 900px) {
		.guide {
			grid-template-columns: minmax(0, 1fr);
			gap: 0;
			padding: 1rem 16px 4rem;
		}
		.toc {
			display: none;
		}
		.howto {
			grid-template-columns: 1fr;
		}
		h1 {
			font-size: 2rem;
		}
	}
</style>
