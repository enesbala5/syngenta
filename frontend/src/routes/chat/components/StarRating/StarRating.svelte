<script lang="ts">
	const handleChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		rating = target.value ? Number(target.value) : undefined;
		console.log('New star rating: ' + rating);
	};

	interface Props {
		rating: number | undefined;
	}

	let { rating = $bindable() }: Props = $props();
</script>

<form class="rating" onchange={handleChange}>
	<label>
		<input type="radio" name="stars" value={1} />
		<span class="icon">★</span>
	</label>
	<label>
		<input type="radio" name="stars" value={2} />
		<span class="icon">★</span>
		<span class="icon">★</span>
	</label>
	<label>
		<input type="radio" name="stars" value={3} />
		<span class="icon">★</span>
		<span class="icon">★</span>
		<span class="icon">★</span>
	</label>
	<label>
		<input type="radio" name="stars" value={4} />
		<span class="icon">★</span>
		<span class="icon">★</span>
		<span class="icon">★</span>
		<span class="icon">★</span>
	</label>
	<label>
		<input type="radio" name="stars" value={5} />
		<span class="icon">★</span>
		<span class="icon">★</span>
		<span class="icon">★</span>
		<span class="icon">★</span>
		<span class="icon">★</span>
	</label>
</form>

<style>
	.rating {
		display: inline-block;
		position: relative;
		height: 50px;
		line-height: 45px;
		font-size: 50px;
	}

	.rating label {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		cursor: pointer;
	}

	.rating label:last-child {
		position: static;
	}

	.rating label:nth-child(1) {
		z-index: 5;
	}

	.rating label:nth-child(2) {
		z-index: 4;
	}

	.rating label:nth-child(3) {
		z-index: 3;
	}

	.rating label:nth-child(4) {
		z-index: 2;
	}

	.rating label:nth-child(5) {
		z-index: 1;
	}

	.rating label input {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}

	.rating label .icon {
		float: left;
		color: transparent;
	}

	.rating label:last-child .icon {
		color: #e8e5d9;
	}

	.rating:not(:hover) label input:checked ~ .icon,
	.rating:hover label:hover input ~ .icon {
		color: #ffd700;
	}

	.rating label input:focus:not(:checked) ~ .icon:last-child {
		color: #e8e5d9;
		text-shadow: 0 0 5px #ffd700;
	}
</style>
