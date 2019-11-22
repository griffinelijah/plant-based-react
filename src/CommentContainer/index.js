import React, { Component } from 'react';
import { Button, Label, Header, Modal, Comment} from 'semantic-ui-react';
// import CommentList from'../CommentList'
import CommentModal from '../CommentModal'


//turn iinto smart component that holds all state for comments
//move getComments fnuction to this component
//keep function in postcontainer just to open modal
class CommentContainer extends Component {
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
		this.getComments();
	}
	//this function will set modal state to false so it can be closed
	closeCommentModal = () => {
		this.setState({
			commentModalIsOpen: false
		})
	}

	//this functioin will make a fetch call retrieve only comments belonging to ths post, we will use this to render a comment list
	getComments = async (idOfPost) => {
		//retrieve all comments that match the post id grabbed when selecting comments button a post
		//if this.state.commentModalIsOpen === true then we will make the fetch call
		//this gives us thee route for this post that the comments belong to
		if(this.state.commentModalIsOpen === true){
			const postForTheseComments = await fetch(process.env.REACT_APP_API_URL + '/api/v1/comments/' + idOfPost, 
			{
				credentials: 'include'
			})
			console.log('\n this is postForTheseComments in getComments');
			console.log(postForTheseComments);
			const postForTheseCommentsParsed = await postForTheseComments.json()
			console.log('\n these are postForTheseCommentsParsed');
			console.log(postForTheseCommentsParsed);
			this.setState({
				comments: [...this.state.comments, postForTheseCommentsParsed.data]
			})
		} else {
			this.setState({
				comments: [...this.state.comments]
			})
		}
	}
	//when tryingg to render the comment modal, browser just crashes.
	render(){
		return(
			<div>
				<CommentModal 
					open={this.state.commentModalIsOpen}
					closeCommentModal={this.closeCommentModal}
					comments={this.state.comments} />
			</div>
		)
	}
}


export default CommentContainer
