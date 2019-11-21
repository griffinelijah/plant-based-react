import React, { Component } from 'react';
import CreatePostForm from '../CreatePostForm'

class PostContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			posts: []
		}
	}
	componentDidMount(){
		this.getPosts();
	}

	getPosts = async () => {
		try {//this will fetch all of the posts from our API
			const posts = await fetch(process.env.REACT_APP_API_URL + '/api/v1/posts/',
				{
					credentials: 'include'
				});
			//parsing the posts from the response 
			// console.log(posts);
			const parsedPosts = await posts.json();
			console.log(parsedPosts);
		} catch(err) {
			console.log(err);
		}
	}

	addPost = async (e, postFromForm) => {
		e.preventDefault()
		try{
			const createdPostRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/posts/', 
			{
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(postFromForm),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedRes = await createdPostRes.json()
			this.setState({posts: [...this.state.posts, parsedRes.data]})
		}
		catch(err){
			console.log(err);
		}
	}
	render(){
		return (
			<CreatePostForm addPost={this.addPost}/>
		)
	}
}

export default PostContainer