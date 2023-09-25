<!-- +layout.svelte -->
<script lang="ts">

  import {app, firestore, auth, storage} from '$lib/firebase';
  import { FirebaseApp } from 'sveltefire';

</script>

<FirebaseApp {auth} {firestore} {storage}>
  <slot />

</FirebaseApp>