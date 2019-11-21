import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';

function PostList(props){
	//it's possibly posts are not being iterated over correctly and displaying each individual prop so its trying to render an entire object at once.
	console.log('\nthis is props.post in PostList');
	console.log(props.posts);
	const posts = props.posts.map((post) => {
		return(
			<Card key={post.id} >
				<Image src={post.image} wrapped ui={false} />
				<Card.Content>
					<Card.Header>{post.title}</Card.Header>
					<Card.Meta>
						<span className='user'>{post.user.username}</span>
					</Card.Meta>
					<Card.Description>{post.description}</Card.Description>
					<Card.Description><a href={post.image}>image</a></Card.Description>
				</Card.Content>
				<Card.Content extra>
					<Button onClick={() => props.deletePost(post.id)}>Delete Post</Button>
					<Button onClick={() => props.editPost(post.id)}>Edit Post</Button>
					<Button onClick={() => props.addComment(post.id)}>Comments</Button>
				</Card.Content>
			</Card>	
		)
	})
	console.log(posts);
	return (
		<Card.Group>
			{posts} 
		</Card.Group>
	)
}

export default PostList