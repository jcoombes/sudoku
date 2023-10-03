<script lang='ts'>
	import { Collection, SignedIn } from "sveltefire";
    import { documentId } from "firebase/firestore";
    import { firestore } from "$lib/firebase";
    let guides;
</script>

<SignedIn let:user>
    <h1>{user.email}</h1>
    <Collection ref={'guides'} let:count let:data={guides} >

        <p>Found {count} guides.</p>
        {#each guides as guide}
        <div class='card'>
            <a href='/guides/{guide.id}'><p>{guide.updatedAt.toDate().toISOString()}</p></a>
            <p>{guide.text}</p>
        </div>
        {/each}
        <div class='card-new'>
            <a href='/guides/new'><p>+ New Guide</p></a>
        </div>

        <p slot="loading">Loading...</p>
    </Collection>
</SignedIn>