import React, { Component } from 'react';
import { getAllModels, getUserCreatedPolls, getUserVotedPolls } from '../util/APIUtils';
import Model from './Model';
import { castVote } from '../util/APIUtils';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon, notification } from 'antd';
import { POLL_LIST_SIZE } from '../constants';
import { withRouter } from 'react-router-dom';
import './PollList.css';

class ModelList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            models: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false
        };
        this.loadModelList = this.loadModelList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    loadModelList(page = 0, size = POLL_LIST_SIZE) {
        let promise;
        if(this.props.username) {
            if(this.props.type === 'USER_CREATED_POLLS') {
                promise = getUserCreatedPolls(this.props.username, page, size);
            } else if (this.props.type === 'USER_VOTED_POLLS') {
                promise = getUserVotedPolls(this.props.username, page, size);
            }
        } else {
            promise = getAllModels(page, size);
        }

        if(!promise) {

            return;
        }

        this.setState({
            isLoading: true
        });

        promise
        .then(response => {
            const models = this.state.models.slice();
            console.log('models  :'+models);
            this.setState({
                models: models.concat(response.content),
                page: response.page,
                size: response.size,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                last: response.last,
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });
//console.log('heres  :');
    }

    componentWillMount() {
        this.loadModelList();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                models: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                isLoading: false
            });
            this.loadModelList();
        }
    }

    handleLoadMore() {
        this.loadModelList(this.state.page + 1);
    }

    render() {
        const modelViews = [];
        this.state.models.forEach((model, modelIndex) => {
            modelViews.push(<Model
                key={model.id}
                model={model}
              />)
        });

        return (
            <div className="polls-container">
                {modelViews}
                {
                    !this.state.isLoading && this.state.models.length === 0 ? (
                        <div className="no-polls-found">
                            <span>No Toner Models Found.</span>
                        </div>
                    ): null
                }
                {
                    !this.state.isLoading && !this.state.last ? (
                        <div className="load-more-polls">
                            <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                                <Icon type="plus" /> Load more
                            </Button>
                        </div>): null
                }
                {
                    this.state.isLoading ?
                    <LoadingIndicator />: null
                }
            </div>
        );
    }
}

export default withRouter(ModelList);
