import React from 'react';
import { Comment, Button, Header} from 'semantic-ui-react'

//this will let use render a list of all comments on a post
function CommentList(props){
	const comments = props.comments.map((comment) => {
		return(
			<div>
				<span>{comment.body} </span>
			</div>
		)
	})
}

 
export default CommentList;


	
	
