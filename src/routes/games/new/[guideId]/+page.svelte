<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
      import { firestore } from '$lib/firebase';
    import { SignedIn, Doc } from "sveltefire";
    import { addDoc, serverTimestamp, collection, Firestore } from "firebase/firestore";
    import type { User } from "firebase/auth";
	import { text } from '@sveltejs/kit';
	import Sudoku from '$lib/Sudoku';
	import DemoSudoku from '$lib/Sudoku';
  
    $: result = "";
    let guidePrompt: {"text":string} = {text: "Can you add a frog to the froglist: [tree frog]"};

    $: messages = [{role: "system", content: "You are a helpful assistant."}, {role: "user", content: guidePrompt.text}]
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
  
    async function callServerFunction(guidePrompt: string) {
      messages[1].content = guidePrompt
      messages = [...messages, 
      {
        role: "system", 
        content: new DemoSudoku().printProblem()
      }
      ];
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


<SignedIn let:auth let:user>
  <Doc ref={'guides/' + $page.params.guideId} let:data={guidePrompt}>
      <h1>{guidePrompt.text}</h1>
  
      {#if turn > 4}
        <button on:click={() => {callServerFunction(guidePrompt.text)}} disabled>Call Server Function</button>
        <SignedIn let:auth let:user>
          <button on:click={() => {saveNewGame(firestore, user, messagesString)}}>Save New Game</button>
        </SignedIn>
        <div class='card-new'>
          <a href='/'><p>Main Menu</p></a>
        </div>
      {:else}
        <button on:click={() => {callServerFunction(guidePrompt.text)}}>Call Server Function</button>
      {/if}
      <p>Turn {turn}<p>
      <p>{result}</p>
      <hr/>
      <hr/>
      <pre>{messagesString}</pre>

  </Doc>
</SignedIn>