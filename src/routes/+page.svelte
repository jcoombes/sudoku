<script lang="ts">
    import { auth } from '../lib/firebase';
    import { userStore } from 'sveltefire';

    // import * from '$lib/firebase';

    let user = userStore(auth);
    console.log(user);
    user.subscribe(userStore(auth));
    // let user = 5;
</script>


<!-- {# if user}
<h1>Welcome to SvelteKit with SvelteFire {$user?.displayName}</h1>
{:else if } -->

{user}

{#if $user}
    <p>Hi {$user.uid}</p>
{:else}
    <p>Sign in...</p>
{/if}

<p>Noot?</p>