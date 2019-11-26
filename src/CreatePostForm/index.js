import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react'
import '../index.css'


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
			<div className='postForm'>
			<Segment>
				<h1>Create a Post</h1>
				<Form size='tiny'onSubmit={(e) => this.props.addPost(e, this.state)}>
					<Label>Title: </Label>
					<Form.Input type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
					<Label>Description: </Label>
					<Form.Input type='text' name='description' value={this.state.description} onChange={this.handleChange} />
					<Label>Image Link: </Label>
					<Form.Input type='text' name='image' value={this.state.image} onChange={this.handleChange}/>
					<Button type='submit' color='green'>Create Post</Button>
				</Form>
			</Segment>
			</div>
		)
	}
}

export default CreatePost