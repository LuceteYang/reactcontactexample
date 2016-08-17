import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';

export default class Contact extends React.Component {
	constructor(props) {
	        super(props);
	        this.state = {
	        		selectedKey: -1,
	        		keyword: '',
	            contactData: [
	                {name: "Abet", phone: "010-0000-0001"},
	                {name: "Betty", phone: "010-0000-0002"},
	                {name: "Charlie", phone: "010-0000-0003"},
	                {name: "David", phone: "010-0000-0004"}
	            ]
	        };
	        this.handleChange = this.handleChange.bind(this);
	        this.handleClick = this.handleClick.bind(this);
	    }
	    handleClick(key){
	    	this.setState({
	    		selectedKey: key
	    	});
	    }

	    handleChange(e){
	    	this.setState({
	    		keyword:e.target.value
	    	});
	    }
    render() {
        const mapToComponents = (data) => {
            data.sort();
            data = data.filter(
                (contact) => {
                    return contact.name.toLowerCase()
                        .indexOf(this.state.keyword.toLowerCase()) > -1;
                }
            );
            return data.map((contact, i) => {
                return (<ContactInfo
                            contact={contact}
                            key={i}
                            onClick={() => this.handleClick(i)}/>);
            });
        };
	        return(
	            <div>
	                <h1>Contacts</h1>
	                <input
	                	name="keyword"
	                	placeholder="Search"
	                	value={this.state.keyword}
	                	onChange={this.handleChange}
	                />
	                <div>{mapToComponents(this.state.contactData)}</div>
	                <ContactDetails
	                	isSelected={this.state.selectedKey != -1}
	                  contact={this.state.contactData[this.state.selectedKey]}/>
	            </div>
	        );
	    }
  }