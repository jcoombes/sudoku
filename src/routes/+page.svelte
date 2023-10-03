<script lang='ts'>
    import { SignedIn, SignedOut } from 'sveltefire';
    import { signInWithEmailAndPassword } from "firebase/auth";
    import { signOut } from "firebase/auth";


    let email: string;
    let password: string;
</script>


<SignedIn let:user let:auth>
    Howdy {user.email}
    <div class='card'><a href='/guides'>Guides</a></div>
    <div class='card'><a href='/games'>Games</a></div>
    <div class='card'><a href='/signout'>Sign Out</a></div>
    <button on:click={() => {signOut(auth)}}>Sign Out</button>
</SignedIn>