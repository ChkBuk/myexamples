import React, { Component } from 'react';
import { createModel } from '../util/APIUtils';
import { MAX_CHOICES, POLL_QUESTION_MAX_LENGTH, POLL_CHOICE_MAX_LENGTH } from '../constants';
import './NewPoll.css';
import { Form, Input, Button, Icon, Select, Col, notification } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input

class NewModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                text: ''
            },
            brand_id : {
                text: ''
            },
            family_id : {
                text: ''
            },
            normal_price : {
                text: ''
            },
            wholesale_price : {
                text: ''
            },
            wholesale_qtn : {
                text: ''
            },
            iscompatible : {
                text: ''
            }
        };
        this.handleWHPriceChange = this.handleWHPriceChange.bind(this);
        this.handleWHQuantityChange = this.handleWHQuantityChange.bind(this);
        this.handleIsCompatibleChange = this.handleIsCompatibleChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
        this.handleFamilyChange= this.handleFamilyChange.bind(this);
        this.handleBrandChange= this.handleBrandChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }



    handleSubmit(event) {
        event.preventDefault();
      //  console.log('image: '+this.state.brand_id.text);
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
    //  console.log(image);
        const modelData = {
            name: this.state.name.text,
            brand: {id : this.state.brand_id.text},
            family: {id : this.state.family_id.text},
            normal_price: this.state.normal_price.text,
            wholesale_price: this.state.wholesale_price.text,
            wholesale_qtn: this.state.wholesale_qtn.text,
            iscompatible:this.state.iscompatible.text,
            image : image
        //    band_id: this.state.band_id
        };

        createModel(modelData)
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
        this.setState({
          brand_id: {
              text: value,
              ...this.validateName(value)
          }
      });
    }
    handleFamilyChange(event) {
        const value = event.target.value;
        this.setState({
          family_id: {
              text: value,
              ...this.validateName(value)
          }
      });
    }
    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({
          normal_price: {
              text: value,
              ...this.validateName(value)
          }});
    }


    handleWHPriceChange(event) {
        const value = event.target.value;
        this.setState({
          wholesale_price: {
              text: value,
              ...this.validateName(value)
          }
      });
    }
    handleWHQuantityChange(event) {
        const value = event.target.value;
        this.setState({
          wholesale_qtn: {
              text: value,
              ...this.validateName(value)
          }
      });
    }
    handleIsCompatibleChange(event) {
        const value = event.target.value;
        this.setState({
          iscompatible: {
              text: value,
              ...this.validateName(value)
          }
      });
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
    isFormInvalid() {
        if(this.state.name.validateStatus !== 'success') {
            return true;
        }
    }


    render() {

        return (
            <div className="new-poll-container">
                <h1 className="page-title">Create Model</h1>
                <div className="new-poll-content">
                    <Form onSubmit={this.handleSubmit} className="create-poll-form">
                        <FormItem validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg} className="poll-form-row">
                        <TextArea
                            placeholder="Enter model name"
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
                        <input
                            placeholder="Enter family id"
                            type="text"
                            name = "family_id"
                            value = {this.state.family_id.text}
                            className="form-control"
                            onChange = {this.handleFamilyChange} />
                        <input
                            placeholder="Enter price"
                            type="text"
                            name = "normal_price"
                            value = {this.state.normal_price.text}
                            className="form-control"
                            onChange = {this.handlePriceChange} />
                        <input
                            placeholder="Enter whole sale price"
                            type="text"
                            name = "wholesale_price"
                            value = {this.state.wholesale_price.text}
                            className="form-control"
                            onChange = {this.handleWHPriceChange} />
                        <input
                            placeholder="Enter whole sale quantity"
                            type="text"
                            name = "wholesale_qtn"
                            value = {this.state.wholesale_qtn.text}
                            className="form-control"
                            onChange = {this.handleWHQuantityChange} />
                        <input
                            placeholder="Is compatible? Y/N"
                            type="text"
                            name = "iscompatible"
                            value = {this.state.iscompatible.text}
                            className="form-control"
                            onChange = {this.handleIsCompatibleChange} />
                        <input type="file" className="form-control" onChange ={this._handleImageChange} />
                        </FormItem>


                        <FormItem className="poll-form-row">
                            <Button type="primary"
                                htmlType="submit"
                                size="large"
                                disabled={this.isFormInvalid()}
                                className="create-poll-form-button">Create Model</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}


export default NewModel;
