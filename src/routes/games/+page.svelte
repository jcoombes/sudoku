<script lang='ts'>
	import { Collection } from "sveltefire";
    let games;

</script>

<Collection ref={'games'} let:count let:data={games} >

    <p>Found {count} games.</p>
    {#each games as game}
      <div class='card'>
        <o>{game.created_at}</o>
        <p>{game.response}</p>
        <a href='/games/{game.id}'>{game.id}</a>
    </div>
    {/each}

    <p slot="loading">Loading...</p>
</Collection>