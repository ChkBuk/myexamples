import React, { Component } from 'react';
import { getAllFamilys, getUserCreatedPolls, getUserVotedPolls } from '../util/APIUtils';
import Family from './Family';
import { castVote } from '../util/APIUtils';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon, notification } from 'antd';
import { POLL_LIST_SIZE } from '../constants';
import { withRouter } from 'react-router-dom';
import './PollList.css';

class FamilyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            familys: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false
        };
        this.loadFamilyList = this.loadFamilyList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    loadFamilyList(page = 0, size = POLL_LIST_SIZE) {
        let promise;
        if(this.props.username) {
            if(this.props.type === 'USER_CREATED_POLLS') {
                promise = getUserCreatedPolls(this.props.username, page, size);
            } else if (this.props.type === 'USER_VOTED_POLLS') {
                promise = getUserVotedPolls(this.props.username, page, size);
            }
        } else {
            promise = getAllFamilys(page, size);

        }

        if(!promise) {

            return;
        }

        this.setState({
            isLoading: true
        });

        promise
        .then(response => {
            const familys = this.state.familys.slice();
            console.log('familys  :'+familys);
            this.setState({
                familys: familys.concat(response.content),
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
console.log('heres  :');
    }

    componentWillMount() {
        this.loadFamilyList();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                familys: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                isLoading: false
            });
            this.loadFamilyList();
        }
    }

    handleLoadMore() {
        this.loadFamilyList(this.state.page + 1);
    }

    render() {
        const familyViews = [];
        this.state.familys.forEach((family, familyIndex) => {
            familyViews.push(<Family
                key={family.id}
                family={family}
              />)
        });

        return (
            <div className="polls-container">
                {familyViews}
                {
                    !this.state.isLoading && this.state.familys.length === 0 ? (
                        <div className="no-polls-found">
                            <span>No Toner Families Found.</span>
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

export default withRouter(FamilyList);
