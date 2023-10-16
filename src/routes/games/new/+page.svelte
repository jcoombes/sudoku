<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
	import { firestore } from '$lib/firebase';
  import { SignedIn, Doc } from "sveltefire";
  import { addDoc, serverTimestamp, collection, Firestore } from "firebase/firestore";
  import type { User } from "firebase/auth";

  $: result = "";

  let messages = [{role: "system", content: "You are a helpful assistant."}, {role: "user", content: "Can you continue to add another type of frog to this list? [tree frog, ]?"}]
  let messagesString: string = JSON.stringify(messages, null, 4);
  let turn: number = 0;

  async function saveNewGame(db: Firestore, user: User, game: string) {
      return await addDoc(collection(db, "games"), {
          messages: game,
          uid: user.uid,
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
          solved: false,
      })
  }

  async function callServerFunction() {

    if (turn > 0) { messages = [...messages, {role: "user", content: "Continue"}]}
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: messages,
      })
    });

    turn++;

    const resultObject = await response.json();

    result = resultObject?.body?.result;
    messages = resultObject?.body?.messages;
    messagesString = JSON.stringify(resultObject?.body?.messages, null, 2);
  }
</script>

{#if turn > 4}
  <button on:click={callServerFunction} disabled>Call Server Function</button>
  <SignedIn let:auth let:user>
    <button on:click={() => {saveNewGame(firestore, user, messagesString)}}>Save New Game</button>
  </SignedIn>
  <div class='card-new'>
    <a href='/'><p>Main Menu</p></a>
  </div>
{:else}
  <button on:click={callServerFunction}>Call Server Function</button>
{/if}
<p>Turn {turn}<p>
<p>{result}</p>
<hr/>
<hr/>
<code><pre>{messagesString}</pre></code>