// import React, { Component } from 'react'
// import { Input, Menu } from 'semantic-ui-react'

// class MenuContainer extends Component {
//   constructor(props){
//     super(props)
//     this.state = { activeItem: 'home' }

//   }

//   buttonAction = () => {
//     if(this.state.activeItem === 'home'){
//       console.log('home');
//     } else if(this.state.activeItem === 'create post'){
//       console.log('create post');
//     } else if(this.state.activeItem === 'logout'){
//       this.props.logout()
//     }
//   }

//   handleItemClick = (e, { name }) => this.setState({ activeItem: name }, this.buttonAction)
  

//   render() {
//     const { activeItem } = this.state

//     return (
//       <Menu secondary>
//         <Menu.Item
//           name='home'
//           active={activeItem === 'home'}
//           onClick={this.handleItemClick}
//         />
//         <Menu.Item
//           name='create post'
//           active={activeItem === 'create post'}
//           onClick={this.handleItemClick}
//         />
//         <Menu.Item
//           name='logout'
//           active={activeItem === 'logout'}
//           onClick={this.handleItemClick} 
//         />
//       </Menu>
//     )
//   }
// }

// export default MenuContainer