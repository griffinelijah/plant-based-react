import React, { Component } from 'react';
import PostList from '../PostList'
import CreatePostForm from '../CreatePostForm'
import { Grid, Button } from 'semantic-ui-react';
import EditPostModal from '../EditPostModal'
import CommentModal from '../CommentModal'
import CommentList from '../CommentList'



class PostContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			posts: [],
			postId: '',
			editModalIsOpen: false,
			//this can bee set to true to open the modal
			commentModalIsOpen: false,
			postToEdit: {
				title: '',
				description: '',
				image: '',
				id: '',
				loggedInUserEmail: this.props.userEmail
			}
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
			// console.log('\n this is parsed posts in getPosts');
			// console.log(parsedPosts);
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
			// console.log('\nthis is parsedRes in addPost');
			// console.log(parsedRes);
			// console.log('\nthis is parsedRes.data in addPost');
			// console.log(parsedRes.data);
			//parsedRes returns created object 
			//this is setting state to whatever posts were previously instate and the new post
			//posts are not being added into state, throwing error that objects are not valid as react child
			// if accessing single prop (parsedRes.data.title) error is avoid but not all info is stored in state
			// if passinig just parsedRes error is avoided but then are unable to map through posts in state to get individual keys/values
			this.setState({posts: [...this.state.posts, parsedRes.data]})
			// console.log('\nthis.state.posts from addPost');
			// console.log(this.state.posts);
		}
		catch(err){
			console.log(err);
		}
	}
	deletePost = async (idOfPost) => {
		const deletePostRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/posts/' + idOfPost, 
		{
			method: 'DELETE',
			credentials: 'include'
		})
		const deletePostResParsed = await deletePostRes.json()
		this.setState({
			//this sets state back to include all the posts except thhe post matchng the id of the post that was just deleted
			posts: this.state.posts.filter((post) => post.id !== idOfPost)
		})

	}

	//functioin to find post that will be edited in the updatePost
	editPost = (idOfPost) => {
		console.log(this.state.postToEdit);
		// if(this.state.postToEdit.loggedInUserEmail === this.props.userEmail){
			//tthis wll find a matching post Id from the posts in state
			const postToEdit = this.state.posts.find(post => post.id === idOfPost)
			this.setState({
				editModalIsOpen: true,
				postToEdit: {
					...postToEdit
				}
			})
		// } else {
		// 	console.log('You must be the owner of this post to edit it');
		// }
	}

	handleEditChange = (e) => {
		this.setState({
			postToEdit: {...this.state.postToEdit, [e.target.name]: e.target.value}
		})
	}

	updatePost = async (e) => {
		e.preventDefault();
		try {
			const apiUrl = process.env.REACT_APP_API_URL + '/api/v1/posts/' + this.state.postToEdit.id
			const updatedPostRes = await fetch(apiUrl, 
			{
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state.postToEdit),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const updatedPostResParsed = await updatedPostRes.json()
			//map over posts in state to find post matching id of updated post
			const newPostArrAfterUpdate = this.state.posts.map((post) => {
				//if id's do match update that post with the new post data from the res
				if(post.id === updatedPostResParsed.data.id){
					post = updatedPostResParsed.data
				} 
				return post
			})
			//set state to new arr defined above that contains all posts in state and edited post after updates are made
			this.setState({posts: newPostArrAfterUpdate})
			//closeModal is called after changes are updated in state
			this.closeModal()
		} catch(err){
			console.log(err);
		}
	}
	//this function wll open the commentModal on button click in postList
	openCommentModal = (postId) => {
		this.setState({
			postId: postId,
			commentModalIsOpen: true
		})
		console.log('\nthis is this.state.comments when opening the comment modal');
		console.log(this.state.comments);
	}
	//this functiono just closes the modal after updates are submitted
	closeModal = () => {
		this.setState({
			editModalIsOpen: false
		})
	}
		//this function will set modal state to false so it can be closed
	closeCommentModal = () => {
		this.setState({
			commentModalIsOpen: false
		})
	}

	render(){
		return (
			<Grid columns={3} 
		    divided textAlign='center' 
		    style={{ height: '100%' }} 
		    verticalAlign='top' 
		    stackable
		    >
	        <Grid.Row>
	          <Grid.Column>
	            <PostList 
	            posts={this.state.posts}
	            editPost={this.editPost}
	            deletePost={this.deletePost}
	            openCommentModal={this.openCommentModal}
	            // getComments={this.getComments}
	            //maybe have just modal open on button click and make fetch call when state of modalIsOpen changes ttrue?
	          />
	          </Grid.Column>

	          {
	          	this.state.commentModalIsOpen === true
	          	?
	          <Grid.Column>
	          	<CommentModal
	          	postId={this.state.postId} 
	          	openCommentModal={this.openCommentModal}
	          	open={this.state.commentModalIsOpen}
	          	closeCommentModal={this.closeCommentModal}
	          	/>
	          </Grid.Column>
	          :
	          null
	          }

	          <Grid.Column >
	           <CreatePostForm addPost={this.addPost}/>
	          </Grid.Column>
	          	<EditPostModal
	          	open={this.state.editModalIsOpen}
	          	updatePost={this.updatePost}
	          	postToEdit={this.state.postToEdit}
	          	closeModal={this.closeModal}
	          	handleEditChange={this.handleEditChange}
	          	/>
	        </Grid.Row>
        </Grid>
		)
	}
}

export default PostContainer