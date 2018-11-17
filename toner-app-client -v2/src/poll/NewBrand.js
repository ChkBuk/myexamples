import React, { Component } from 'react';
import { createBrand } from '../util/APIUtils';
import { MAX_CHOICES, POLL_QUESTION_MAX_LENGTH, POLL_CHOICE_MAX_LENGTH } from '../constants';
import './NewPoll.css';
import { Form, Input, Button, Icon, Select, Col, notification } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input

class NewBrand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                text: ''
            }
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
    }



    handleSubmit(event) {
        event.preventDefault();
        const data = this.state.imagePreviewUrl.split(',')[1];
        var raw = window.atob(data);
        var rawlength = raw.length;
        var array = new Uint8Array(new ArrayBuffer(rawlength));

        for(var i=0;  i<rawlength;i++){
          array[i] = raw.charCodeAt(i);
        }
        var image = [];
        for(var i=0;  i<rawlength;i++){
          image.push((array[i]));
        }
      //  console.log('image: '+image);
        const brandData = {
            name: this.state.name.text,
            image : image
        };

        createBrand(brandData)
        .then(response => {
            this.props.history.push("/");
        }).catch(error => {
            if(error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create brand.');
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
                errorMsg: 'Please enter the Brand name!'
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


    isFormInvalid() {
        if(this.state.name.validateStatus !== 'success') {
            return true;
        }
    }

_handleImageChange(e){
  let reader = new FileReader();
  let file = e.target.files[0];
//  console.log('file :'+file);
  reader.onloadend =()=>{
    this.setState({
      file : file,
      imagePreviewUrl : reader.result
    });
  }
  reader.readAsDataURL(file);
}
    render() {

        return (
            <div className="new-poll-container">
                <h1 className="page-title">Create Brand</h1>
                <div className="new-poll-content">
                    <Form onSubmit={this.handleSubmit} className="create-poll-form">
                        <FormItem validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg} className="poll-form-row">
                        <TextArea
                            placeholder="Enter brand name"
                            style = {{ fontSize: '16px' }}
                            autosize={{ minRows: 3, maxRows: 6 }}
                            name = "name"
                            value = {this.state.name.text}
                            onChange = {this.handleNameChange} />
                            <input type="file" className="form-control" onChange ={this._handleImageChange} />
                        </FormItem>


                        <FormItem className="poll-form-row">
                            <Button type="primary"
                                htmlType="submit"
                                size="large"
                                disabled={this.isFormInvalid()}
                                className="create-poll-form-button">Create Brand</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}


export default NewBrand;
