import React, { Component } from 'react';
import { Button, Comment, Form, Header} from 'semantic-ui-react';

class CreateComment extends Component {
	constructor(){
		super()
		this.state = {
			user: '',
			body: '',
			post: ''
		}
	}
	render(){
		return (
			<Form onSubmit={(e) => this.props.addComment(e, this.state)}>
				<Label>Comment: </Label>
				<Form.Input type='text' name='body' value={this.state.body}/>
				<Button type='submit'>Create Comment</Button>
			</Form>
		)
	}
}

export default CreateComment;