import React from 'react';
import { Comment, Button, Header} from 'semantic-ui-react'

//this will let use render a list of all comments on a post
function CommentList(props){
	let comments
	if (props.comments !== undefined){
		comments = props.comments.map((comment) => {
			return(
				<Comment.Group key={comment.id}>
			    <Header as='h3' dividing>
			    </Header>
		    <Comment>
		      <Comment.Content>
		        <Comment.Author as='a'>{comment.user.username}</Comment.Author>
		        <Comment.Text>{comment.body}</Comment.Text>
		        <Button onClick={() => props.deleteComment(comment.id)}>Delete Comment</Button>
		      </Comment.Content>
		    </Comment>
		    </Comment.Group>
			)
		})
	} else {
		comments = null 
	}
	return(
		<div>
			{ comments }
		</div>
	)
}

 
export default CommentList;


	
	
