import React from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';


function CommentModal(props){
	// const comments = props.comments.map((comment) => {
		return(
			<Modal 
			open={props.open}
			closeIcon
			onClose={props.closeCommentModal}
			// trigger={props.openCommentModal}
			>
				<Modal.Header>Post's Pic</Modal.Header>
				<Modal.Content image scrolling>
					<p> Comments will get displayed here </p>
				</Modal.Content>
			</Modal>
			)
	// })
}


export default CommentModal