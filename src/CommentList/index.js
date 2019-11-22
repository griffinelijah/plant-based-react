import React from 'react';
import { Comment, Button, Header} from 'semantic-ui-react'

//this will let use render a list of all comments on a post
function CommentList(props){
	let comments
	if (props.comments !== undefined){
		comments = props.comments.map((comment) => {
			return(
				<div>
					<span>{comment.body} </span>
				</div>
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


	
	
