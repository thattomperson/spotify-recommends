<div class="flex">
  <audio 
    bind:this={audio}
		bind:paused
    on:play={stopOthers}
		on:playing={update}
		on:paused={update}
		on:timeupdate={update}
    src={src}
    preload="metadata"
  ></audio>
  <button class="btn" on:click={toggle}>
    <Icon icon={paused ? faPlay : faPause } />
  </button>
  <progress max="1" value={progress} />
</div>

<style>
.flex {
  grid-column-end: 3;
  grid-column-start: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex progress {
    flex-grow: 1;
    height: 8px;
    border: 1px solid var(--color);
}

progress[value]::-webkit-progress-bar {
  background-color: transparent;
}

progress[value]::-webkit-progress-value {
  background-color: var(--color);;
}
</style>

<script context="module">
	const elements = new Set();

	export function stopAll() {
		elements.forEach(element => {
			element.pause();
		});
	}
</script>

<script>
  import { onMount } from 'svelte';
  import Icon from 'fa-svelte';
  import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

  export let src

	onMount(() => {
		elements.add(audio);
		return () => elements.delete(audio);
  });
  
  function stopOthers() {
		elements.forEach(element => {
			if (element !== audio) element.pause();
		});
  }
  
  function update() {
    console.log(audio.currentTime)
    progress = audio.currentTime / audio.duration;
  }

  function toggle() {
    console.log(paused, audio)
    paused ? audio.play() : audio.pause()
  }

  let audio;
  let paused = true;
  let progress = 0;
</script>
