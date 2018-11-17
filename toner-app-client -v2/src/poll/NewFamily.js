import React, { Component } from 'react';
import { createFamily } from '../util/APIUtils';
import { MAX_CHOICES, POLL_QUESTION_MAX_LENGTH, POLL_CHOICE_MAX_LENGTH } from '../constants';
import './NewPoll.css';
import { Form, Input, Button, Icon, Select, Col, notification } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input

class NewFamily extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                text: ''
            },
            brand_id : {
                text: ''
            }
        };
        this.handleBrandChange= this.handleBrandChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit(event) {
        event.preventDefault();
      //  console.log('image: '+this.state.brand_id.text);
        const familyData = {
            name: this.state.name.text,
            brand: {id : this.state.brand_id.text}
        //    band_id: this.state.band_id
        };

        createFamily(familyData)
        .then(response => {
            this.props.history.push("/");
        }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create family.');
            } else {
                notification.error({
                    message: 'Polling App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });
    }
    validateName = (nameText) => {
        if(nameText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter the Family name!'
            }
        } else if (nameText.length > POLL_QUESTION_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too long (Maximum ${POLL_QUESTION_MAX_LENGTH} characters allowed)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        //console.log(value);
        this.setState({
          name: {
              text: value,
              ...this.validateName(value)
          }
      });

    }
    handleBrandChange(event) {
        const value = event.target.value;
        console.log(value);
        this.setState({
          brand_id: {
              text: value,
              ...this.validateName(value)
          }
      });

    }

    isFormInvalid() {
        if(this.state.name.validateStatus !== 'success') {
            return true;
        }
    }


    render() {

        return (
            <div className="new-poll-container">
                <h1 className="page-title">Create Family</h1>
                <div className="new-poll-content">
                    <Form onSubmit={this.handleSubmit} className="create-poll-form">
                        <FormItem validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg} className="poll-form-row">
                        <TextArea
                            placeholder="Enter family name"
                            style = {{ fontSize: '16px' }}
                            autosize={{ minRows: 3, maxRows: 6 }}
                            name = "name"
                            value = {this.state.name.text}
                            onChange = {this.handleNameChange} />
                        <input
                            placeholder="Enter brand id"
                            type="text"
                            name = "brand_id"
                            value = {this.state.brand_id.text}
                            className="form-control"
                            onChange = {this.handleBrandChange} />
                        </FormItem>


                        <FormItem className="poll-form-row">
                            <Button type="primary"
                                htmlType="submit"
                                size="large"
                                disabled={this.isFormInvalid()}
                                className="create-poll-form-button">Create Family</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}


export default NewFamily;
