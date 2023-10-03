<!-- +layout.svelte -->
<script lang="ts">


  import {app, firestore, auth, storage} from '$lib/firebase';
  import { FirebaseApp } from 'sveltefire';
  import { SignedIn, SignedOut } from 'sveltefire';
  import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

  let email: string;
  let password: string;

</script>

<FirebaseApp {auth} {firestore} {storage}>
  <slot />

  <SignedOut let:auth>
    You must be signed in to see this!
    <br>
    <input bind:value={email}/>
    <input bind:value={password}/>
    <button on:click={() => signInWithEmailAndPassword(auth, email, password)}>Sign In</button>

    <br>
    Alternately, you can create a new account.
    <button on:click={() => createUserWithEmailAndPassword(auth, email, password)}>Sign Up</button>
</SignedOut>







</FirebaseApp>