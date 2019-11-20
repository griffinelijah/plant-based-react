import React, { Component } from 'react';

class PostContainer extends Component {
	constructor(){
		super()
		this.state = {
			posts: []
		}
	}
	componentDidMount(){
		this.getPosts();
	}

	getPosts = async () => {
		try {//this will fetch all of the posts from our API
			console.log("this is mu url >>> ", process.env.REACT_APP_API_URL + "/api/v1/posts/");
			const posts = await fetch(process.env.REACT_APP_API_URL + '/api/v1/posts/');
			//parsing the posts from the response 
			console.log(posts);
			const parsedPosts = await posts.json();
			console.log(parsedPosts);
		} catch(err) {
			console.log(err);
		}
	}
	render(){
		return (
			<div>This is the PostContainer</div>
		)
	}
}

export default PostContainer