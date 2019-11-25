import React, { Component } from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';
import CommentList from '../CommentList'
import CreateCommentForm from '../CreateCommentForm'
import '../index.css'

//turning commendModal inot smart comment to hold everything from commentContainer and render modal 
class CommentModal extends Component {
	constructor(props){
		super(props)
		this.state = {
			comments: [],
			//information for updating comment is gathered here bfore storing in comment state
			commentToEdit: {
				body: ''
			}
		}
	}
	componentDidMount(){
		// this.getComments();
	}

	//this functioin will make a fetch call retrieve only comments belonging to ths post, we will use this to render a comment list
	getComments = async (idOfPost) => {
		//retrieve all comments that match the post id grabbed when selecting comments button a post
		//if this.state.commentModalIsOpen === true then we will make the fetch call
		//this gives us thee route for this post that the comments belong to
			const postForTheseComments = await fetch(process.env.REACT_APP_API_URL + '/api/v1/comments/' + idOfPost, 
			{
				credentials: 'include'
			})
			// console.log('\n this is postForTheseComments in getComments');
			// console.log(postForTheseComments);
			const postForTheseCommentsParsed = await postForTheseComments.json()
			// console.log('\n these are postForTheseCommentsParsed');
			// console.log(postForTheseCommentsParsed);
			this.setState({
				comments: [...this.state.comments, postForTheseCommentsParsed.data]
		})
	} 

	//this will make an ajax call to the api to create aa comment
	addComment = async (e, commentFromForm) => {
		//prevent form from refreshing page
		e.preventDefault()
		console.log('we are in addComment in commentModal')
		try{
			const createdCommentRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/comments/' + this.props.postId, 
			{
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(commentFromForm),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log('\nthis is createdCommentRes in addComment');
			console.log(createdCommentRes)
			const parsedCommentRes = await createdCommentRes.json()
			console.log('\nthis is parsedCommentRes in addComment');
			console.log(parsedCommentRes);
			this.setState({comments: [...this.state.comments, parsedCommentRes.data]})
		} catch(err) {
			console.log(err)
		}
	}

	deleteComment = async (commentid) => {
		const deletedCommentRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/comments/' +
			commentid, 
			{
				method: 'DELETE',
				credentials: 'include'
			})
		const deletedCommentResParsed = await deletedCommentRes.json()
		this.setState({
			comments: this.state.comments.filter((comment) => comment.id !== commentid)
		})
	}
	render(){
		console.log('\nthis is state after fetch call before render');
		console.log(this.state);
		return(
			<React.Fragment>
				<Modal
					open={this.props.open}
					closeIcon
					onClose={this.props.closeCommentModal}
					>
					<Modal.Header>Comments</Modal.Header>
					<Modal.Content image scrolling className='commentModal'>
						<div className='commentList'>
							<CommentList 
							deleteComment={this.deleteComment}
							comments={this.state.comments} />
						</div>
							<CreateCommentForm addComment={this.addComment}/>
					</Modal.Content>
				</Modal>
			</React.Fragment>
		)
	}
}




export default CommentModal