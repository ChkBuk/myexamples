import React, { Component } from 'react';
import { getAllBrands, getUserCreatedPolls, getUserVotedPolls } from '../util/APIUtils';
import Brand from './Brand';
import { castVote } from '../util/APIUtils';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon, notification } from 'antd';
import { POLL_LIST_SIZE } from '../constants';
import { withRouter } from 'react-router-dom';
import './PollList.css';

class BrandList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false
        };
        this.loadBrandList = this.loadBrandList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

 loadBrandList(page = 0, size = POLL_LIST_SIZE) {
        let promise;
        if(this.props.username) {
            if(this.props.type === 'USER_CREATED_POLLS') {
                promise = getUserCreatedPolls(this.props.username, page, size);
            } else if (this.props.type === 'USER_VOTED_POLLS') {
                promise = getUserVotedPolls(this.props.username, page, size);
            }
        } else {
            promise = getAllBrands(page, size);
        }

        if(!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
        .then(response => {
            const brands = this.state.brands.slice();
        //    console.log('here 2  :'+brands);
            this.setState({
                brands: brands.concat(response.content),
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

    }

    componentWillMount() {
        this.loadBrandList();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                brands: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                isLoading: false
            });
            this.loadBrandList();
        }
    }

    handleLoadMore() {
        this.loadBrandList(this.state.page + 1);
    }

    render() {
        const brandViews = [];
        this.state.brands.forEach((brand, brandIndex) => {
            brandViews.push(<Brand
                key={brand.id}
                brand={brand}
              />)
        });
//console.log('heres  :'+this.state.brands.length);
        return (
            <div className="polls-container">
                {brandViews}
                {
                    !this.state.isLoading && this.state.brands.length === 0 ? (
                        <div className="no-brands-found">
                            <span>No Brands Found.</span>
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

export default withRouter(BrandList);
