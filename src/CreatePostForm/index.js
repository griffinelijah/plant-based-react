import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react'

class CreatePost extends Component {
	constructor(){
		super()
		this.state = {
			user: '',
			title: '',
			description: '',
			image: ''
		}
	}

	handleChange = (e) => {
		this.setState({[e.currentTarget.name]: e.target.value})
	}
	render(){
		return(
			<Segment>
				<h1>Create a Post</h1>
				<Form onSubmit={(e) => this.props.addPost(e, this.state)}>
					<Label>Title: </Label>
					<Form.Input type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
					<Label>Description: </Label>
					<Form.Input type='text' name='description' value={this.state.description} onChange={this.handleChange}/>
					<Label>Image: </Label>
					<Form.Input type='text' name='image' value={this.state.image} onChange={this.handleChange}/>
					<Button type='submit'>Create Post</Button>
				</Form>
			</Segment>
		)
	}
}

export default CreatePost