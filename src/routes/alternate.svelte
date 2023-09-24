<!-- <script>
	const { Collection } = require("sveltefire");

</script>
<FirebaseApp {auth} {firestore}>
    <User let:user>
        <p>Signed in as {user.displayName}</p>

        <Doc ref={`posts/${user.uid}`} let:data={post} let:ref={postRef}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>

            <Collection
              ref={`${postRef.path}/comments`}
              let:data={comments}
            >
              <h2>Comments</h2>

              {#each comments as comment}
                <aside>
                    <h4>{comment.title}</h4>
                </aside>
              {/each}

              <div slot="loading">Loading comments...</div>
        </Collection>

        <div slot="loading">Loading blog post...</div>
        </Doc>
    </User>
</FirebaseApp> -->