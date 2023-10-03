<script lang='ts'>
    import { page } from '$app/stores';
	import { firestore } from '$lib/firebase';
    import { addDoc, serverTimestamp, collection, Firestore } from "firebase/firestore";
    import { SignedIn } from "sveltefire";
    import type {  User } from "firebase/auth";

    let guide: string = "";

    async function newGuide(db: Firestore, user: User, guide: string) {
        await addDoc(collection(db, "guides"), {
            text: guide,
            uid: user.uid,
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp(),
        })
    }
</script>

<SignedIn let:auth let:user>
    <h1>{user.email}</h1>
    <input bind:value={guide}>
    <h1>{guide}</h1>
    <button on:click={() => {newGuide(firestore, user, guide)}}>Create New Guide</button>
</SignedIn>