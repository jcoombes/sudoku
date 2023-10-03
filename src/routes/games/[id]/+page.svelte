<script lang='ts'>
	import { goto } from '$app/navigation';
    import { page } from '$app/stores';
	import { firestore } from '$lib/firebase';
    import { doc, setDoc, serverTimestamp } from "firebase/firestore";
    import { SignedIn, docStore, Doc, Collection, userStore } from "sveltefire";
</script>

<SignedIn let:auth let:user>
    <Doc ref={'games/' + $page.params.id} let:data>
        <h1>{user.email}</h1>
        <h1>{data.text}</h1>
    </Doc>
</SignedIn>