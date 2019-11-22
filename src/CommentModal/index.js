import React, { Component } from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';
import CommentList from '../CommentList'
import CreateCommentForm from '../CreateCommentForm'

//turning commendModal inot smart comment to hold everything from commentContainer and render modal 
class CommentModal extends Component {
	constructor(props){
		super(props)
		this.state = {
			comments: [],
			//this is the post that the comment belongs to
			post: [],
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
		try{
			const createdCommentRes = await fetch(process.env.REACT_APP_API_URL + '/api/v1/comments/', 
			{
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(commentFromForm),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedCommentRes = await createdCommentRes.json()
			this.setState({comments: [...this.state.comments, parsedCommentRes.data]})

		} catch(err) {
			console.log(err)
		}
	}
	
	render(){
		return(
			<React.Fragment>
				<Modal
					open={this.props.open}
					closeIcon
					onClose={this.props.closeCommentModal}
					addComment={this.addComment}
					// trigger={this.props.openCommentModal}
					>
					<Modal.Header>Comments</Modal.Header>
					<Modal.Content image scrolling>
						<CommentList />
						<CreateCommentForm addComment={this.addComment}/>
					</Modal.Content>
				</Modal>
				<CreateCommentForm
					addComment={this.addComment} 
					/>
				<CommentList
				/>
			</React.Fragment>
		)
	}
}




export default CommentModal