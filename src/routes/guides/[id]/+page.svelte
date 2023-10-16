<script lang='ts'>
	import { goto } from '$app/navigation';
    import { page } from '$app/stores';
	import { firestore } from '$lib/firebase';
    import { doc, setDoc, serverTimestamp } from "firebase/firestore";
    import { SignedIn, docStore, Doc, Collection, userStore } from "sveltefire";


    // const docRef = "guides/" + page.params.id;
    // console.log(docRef);
    // $: guidestore;

    let guide: string = "";
    async function modifyGuide(db, page, user, guide) {
        await setDoc(doc(db, "guides", page.params.id), {
            text: guide,
            uid: user.uid,
            updatedAt: serverTimestamp(),
        })

        // goto('games/' + page.params.id);
    }
</script>

<SignedIn let:auth let:user>
    <Doc ref={'guides/' + $page.params.id} let:data>
        <h1>{user.email}</h1>
        <input bind:value={guide}>
        {#if guide != ""}
        <h1>{guide}</h1>
        {:else}
        <h1>{data.text}</h1>
        {/if}
        <button on:click={modifyGuide(firestore, $page, user, guide)}>Save Guide</button>   
        
        <div class='card-new'>
            <a href={'/games/new/' + $page.params.id}><p>Let's try out this prompt!</p></a>
        </div>
    </Doc>

</SignedIn>