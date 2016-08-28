import React from 'react';
import ContactInfo from './ContactInfo';
import update from 'react-addons-update';

import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';

export default class Contact extends React.Component {
	constructor(props) {
	        super(props);
	        this.state = {
	        		selectedKey: -1,
	        		keyword: '',
	            contactData: [
	                {name: "David", phone: "010-0000-0004"},
	                {name: "Charlie", phone: "010-0000-0003"},
	                {name: "Betty", phone: "010-0000-0002"},
	                {name: "Abet", phone: "010-0000-0001"}
	            ]
	        };
	        this.handleChange = this.handleChange.bind(this);
	        this.handleClick = this.handleClick.bind(this);

	        this.handleCreate = this.handleCreate.bind(this);
	        this.handleRemove = this.handleRemove.bind(this);
	        this.handleEdit = this.handleEdit.bind(this);
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

	    handleCreate(contact){
	    	this.setState({
	    			contactData:update(
	    				this.state.contactData,
	    			{		//배열 형태로 전달
	    				$push: [contact]
	    			})
	    	});
	    }
	    handleRemove(){
	    	this.setState({
	    		selectedKey:-1,
	    			contactData:update(
	    				this.state.contactData,
	    			{
	    				$splice: [[this.state.selectedKey,1]]
	    			})
	    	});
	    }
	    handleEdit(name, phone){
	    	this.setState({
	    			contactData:update(
	    				this.state.contactData,
	    			{
	    				[this.state.selectedKey]: {
	    					name:{$set:name},
	    					phone:{$set:phone}
	    				}
	    			})
	    	});
	    }

	    componentWillMount() {
        // 컴포넌트를 가장 처음 그리기 전, contactData 의 값이 존재한다면
        // setState 를 통하여 저장되있던 값을 불러온다
        let contactData = localStorage.contactData;

        if(contactData) {
            this.setState({
                contactData: JSON.parse(contactData)
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // state 가 변경 될 때 마다, 만약에 state 가 새롭다면
        // localStorage 에 현 contactData 의 데이터를 저장한다
        if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
             localStorage.contactData = JSON.stringify(this.state.contactData);
        }

    }

    render() {
        const mapToComponents = (data) => {
            data.sort((a,b)=> {a.name > b.name});
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
                            //겉에 함수를 씌워준다.
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
	                  contact={this.state.contactData[this.state.selectedKey]} onRemove={this.handleRemove}  onEdit={this.handleEdit}/>
	                <ContactCreate onCreate={this.handleCreate}/>
	            </div>
	        );
	    }
  }