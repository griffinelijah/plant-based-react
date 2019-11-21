import React, { Component } from 'react';
import PostList from '../PostList'
import CreatePostForm from '../CreatePostForm'
import { Grid } from 'semantic-ui-react';


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
			console.log('\n this is parsed posts in getPosts');
			console.log(parsedPosts);
		} catch(err) {
			console.log(err);
		}
	}

	addPost = async (e, postFromForm) => { 
		e.preventDefault()
		try{
			//create a post through the post route in the api
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
			console.log('\nthis is parsedRes in addPost');
			console.log(parsedRes);
			console.log('\nthis is parsedRes.data in addPost');
			console.log(parsedRes.data);
			//parsedRes returns created object 
			//this is setting state to whatever posts were previously instate and the new post
			//posts are not being added into state, throwing error that objects are not valid as react child
			// if accessing single prop (parsedRes.data.title) error is avoid but not all info is stored in state
			// if passinig just parsedRes error is avoided but then are unable to map through posts in state to get individual keys/values
			this.setState({posts: [...this.state.posts, parsedRes.data]})
			console.log('\nthis.state.posts from addPost');
			console.log(this.state.posts);
		}
		catch(err){
			console.log(err);
		}
	}
	render(){
		return (
			<Grid columns={2} 
		    divided textAlign='center' 
		    style={{ height: '100%' }} 
		    verticalAlign='top' 
		    stackable
		    >
	        <Grid.Row>
	          <Grid.Column >
	            <PostList 
	            posts={this.state.posts}/>
	          </Grid.Column>
	          <Grid.Column >
	           <CreatePostForm addPost={this.addPost}/>
	          </Grid.Column>
	          	
	        </Grid.Row>
        </Grid>
		)
	}
}

export default PostContainer