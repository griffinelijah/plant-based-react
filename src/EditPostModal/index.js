import React from 'react';
import { Form, Button, Label, Header, Modal } from 'semantic-ui-react';

function EditPostModal(props){
	return(
		<Modal open={props.open} closeIcon onClose={props.closeModal}>
			<Header> Edit Post</Header>
			<Modal.Content>
				<Form onSubmit={props.updatePost}>
					<Label>Title: </Label>
					<Form.Input
						type='text'
						name='title'
						value={props.postToEdit.title}
						onChange={props.handleEditChange}
					/>
					<Form.Input
						type='text'
						name='description'
						value={props.postToEdit.description}
						onChange={props.handleEditChange}
					/>
					<Form.Input
						type='text'
						name='image'
						value={props.postToEdit.image}
						onChange={props.handleEditChange}
					/>
					<Modal.Actions>
					<Button type='submit'>Submit Changes</Button>
					</Modal.Actions>
				</Form>
			</Modal.Content>
		</Modal>
	)
}

export default EditPostModal