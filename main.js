$(document).ready(() => {
    // TODO: Add pagination over on the PHP scripts

    // Get all the posts from the API
    const getPosts = $.ajax({
        url: 'http://localhost/api/post/read.php',
        method: 'GET',
        dataType: 'JSON'
    });
    
    // ERRORS: IF CLICK HAPPENS OUTSIDE OF THE POST DATA, IT WILL RETURN NULL.
    getPosts.done(postsData => {
        let posts = postsData.data;
        // initialize output
        let output = '';
        // loop through each post, extract all data to output
        posts.forEach(post => {
            output += `<article class="post" data-postid=${post.id}>
            <h1>${post.title}</h1>
            <p>${post.body.substr(0, 50)}</p>
            <small>Posted by <strong>${post.author}</strong> in <strong>${post.category_name}</strong></small><br>
            <a id="delete-btn" class="delete-btn btn btn-outline-danger" href='#'>Delete</a>
            </article>`;
        });
        
        // Set the #posts ID to the output
        $('#posts').html(output);
        
        // Select all delete buttons, when clicked, run the deletePost func
        $('#delete-btn').click(deletePost)

        // Select all posts, listen for a click event onto each
        $('.post').click(getSinglePost)
    });
    // End of get all posts
    
    // Listen for a submit on the create post form
    $('#createForm').submit(createPost);

    $('#updateForm').submit(updatePost);
    
    // Create post
    function createPost() {
        
        // Get values of all the input fields
        let postTitle = $('#postTitle').val();
        let postAuthor = $('#postAuthor').val();
        let postMessage = $('#postMessage').val();
        let postCategory = $('#postCategory').val();
        
        
        // Turn the values into an object
        let postDetail = {
            title: postTitle,
            author: postAuthor,
            body: postMessage,
            category_id: postCategory
        }
        // Convert the object to JSON
        let postData = JSON.stringify(postDetail);
        
        $.ajax({
            url: 'http://localhost/api/post/create_post.php',
            method: 'POST',
            data: postData
        });
    };
    
    // Get single post
    function getSinglePost() {
        const postView = $('#post');

        let postID = $(this).attr('data-postid');

        $.ajax({
            url: 'http://localhost/api/post/read_singular_post.php?id=' + postID,
            method: 'GET',
            dataType: 'JSON'
        }).done(post => {
            let output = '';
            output = `<article class="singular-post" id="singlePost">
            <h1>${post.title}</h1>
            <p>${post.body}</p>
            
            <div class="post-footer">
            <small>Posted by: <strong>${post.author}</strong></small>
            <small>Posted in: <strong>${post.category_name}</strong></small><br>
            <button type="button" class="btn btn-outline-primary update-btn" data-toggle="modal" data-target="#updatePostModal">
                Update
            </button>
            <input type="hidden" id="postID" value=${post.id}>
            </div>
            `;

            $('#post').html(output);
        });
    };

    // Update post function
    function updatePost(e) {

        // TODO: Add the original post values to the form, rather than having to type out from scratch.
        // Get values of all the input fields
        let postTitle = $('#updatePostTitle').val();
        let postAuthor = $('#updatePostAuthor').val();
        let postMessage = $('#updatePostMessage').val();
        let postId = $('#postID').val();

        let updatePostData = JSON.stringify({
            id: postId,
            title: postTitle,
            author: postAuthor,
            body: postMessage
        });

        $.ajax({
            url: 'http://localhost/api/post/update_post.php',
            method: 'PUT',
            data: updatePostData
        });
    };

    function deletePost(e) {
        // Get the post id from the clicked post
        let postID = e.target.parentNode.dataset.postid;
        
        deleteJson = JSON.stringify({id: postID});
        // Send the ajax request
        $.ajax({
            url: 'http://localhost/api/post/delete_post.php',
            method: 'POST',
            data: deleteJson
        }).done(_ => {
            alert('Post deleted!');
            // Refresh the page once deleted
            window.location.reload();
        });
    };
});