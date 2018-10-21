import React, { Component } from 'react';
import './Poll.css';
import { Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';

import { Radio, Button } from 'antd';


class Brand extends Component {

      render() {
      let image = 'data:image/jpeg;base64, '+this.props.brand.image;
          return (
            <div className="poll-content">
                <div className="poll-header">
                    <div className="poll-question">
                        {this.props.brand.name}
                    </div>
                    <div>
                        <img src={image}/>
                    </div>
                </div>
            </div>
        );
      }
    }


export default Brand;
