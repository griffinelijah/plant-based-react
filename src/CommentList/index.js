import React from 'react';
import { Comment, Button, Header, Icon} from 'semantic-ui-react'

//this will let use render a list of all comments on a post
function CommentList(props){
	let comments
	if (props.comments !== undefined){
		console.log(props.comments, 'this is props.comments');
		comments = props.comments.map((comment) => {
			return(
				<Comment.Group key={comment.id}>
			    <Header as='h3' dividing>
			    </Header>
		    <Comment>
		    <Comment.Avatar src='https://png.pngtree.com/png-vector/20190418/ourlarge/pngtree-vector-soil-plant-icon-png-image_949990.jpg' />
		      <Comment.Content>
		        <Comment.Author as='a'>{comment.user.username}</Comment.Author>
		        <Comment.Metadata>{comment.post.created}</Comment.Metadata>
		        <Comment.Text>{comment.body}</Comment.Text>
		        <Button icon size='mini'onClick={() => props.deleteComment(comment.id)}><Icon name='trash alternate'/></Button>
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


	
	
