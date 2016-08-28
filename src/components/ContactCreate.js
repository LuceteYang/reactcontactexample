import React from 'react';
// var React = require('react');
import Contact from './Contact'

class ContactCreate extends React.Component {
	constructor(props){
		super(props);
		this.state = {
				name: "",
        phone: ""
		}
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	handleChange(e){
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

  handleClick(){
  	const contact = {
  		name : this.state.name,
  		phone: this.state.phone
  	};
  	this.props.onCreate(contact);
      // this.props.onInsert(this.state.name, this.state.phone);
      this.setState({
          name: "",
          phone: ""
      });
		this.nameInput.focus();
  }
  handleKeyPress(e) {
        if(e.charCode==13) {
            this.handleClick();
        }
    }
	render(){
		return (
				<div>
					<h2>Create Contact</h2>
					<p>
						<input type="text" name="name" placeholder ="name" value={this.state.name} onChange={this.handleChange.bind(this)}
						  ref={ (ref) => { this.nameInput = ref } }/>
						<input type="text" name="phone" placeholder ="phone" value={this.state.phone} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress}/>
						</p>
				<button onClick={this.handleClick.bind(this)} >Create</button>
				</div>
			);
	}
}

export default ContactCreate;
// module.export = App;