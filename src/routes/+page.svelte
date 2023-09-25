<script lang='ts'>
    import { SignedIn, SignedOut } from 'sveltefire';
    import { signInWithEmailAndPassword } from "firebase/auth";
    import { signOut } from "firebase/auth";
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import { User } from "sveltefire";
    import { Collection } from 'sveltefire';
    import { Doc } from 'sveltefire';
	import { documentId } from 'firebase/firestore';

    let email: string;
    let password: string;
</script>

<SignedIn let:auth let:user>
    <h1>Cybernetically Enhanced and Signed in.</h1>
    <h1>{user.uid}</h1>

    <button on:click={() => signOut(auth)}>Sign Out</button>
</SignedIn>

<SignedIn let:user>
    
    <p>Howdy, {user.uid}</p>

    <!-- 📜 Get a Firestore document owned by a user in Proompts collection -->
    <Collection ref={`guides`} let:data={guides}>
        <h3>Guides!</h3>
        {#each guides as guide}
            {#if user.uid === guide.uid}
                <div>
                    <h2>{guide.id}</h2>
                    <h3>{guide.text}</h3>

                    <!-- 💬 Get all the games played under that guide -->
                    <Collection ref={`games`} let:data={games}>
                        <h5>Games!</h5>
                        {#each games as game}
                            {#if guide.id === game.guideID}
                                <div>
                                    <p>{game.id}</p>
                                    <p>{game.response}</p>
                                    <p>Solved: {game.solved}</p>
                                </div>
                            {/if}
                        {/each}
                    </Collection>
                </div>
            {/if}
        {/each}
    </Collection>

</SignedIn>


<SignedOut let:auth>
    You must be signed in to see this!
    <input bind:value={email}/>
    <input bind:value={password}/>
    <button on:click={() => signInWithEmailAndPassword(auth, email, password)}>Sign In</button>
</SignedOut>

<SignedOut let:auth>
    Alternately, you can create a new account.
    <button on:click={() => createUserWithEmailAndPassword(auth, email, password)}>Sign Up</button>
</SignedOut>


