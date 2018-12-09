
import 'bootstrap/dist/css/bootstrap.min.css';
//import { SafeAreaView } from 'react-navigation';
import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import pollIcon from '../poll.svg';
import { Layout, Menu, Dropdown, Icon } from 'antd';


const Header = Layout.Header;
const breakpoints = {
desktop: 1040,
tablet: 840,
mobile: 540
};

class AppHeader extends Component {


    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick({ key }) {
      if(key === "logout") {
        this.props.onLogout();
      }
    }

    render() {
        let menuItems;
        if(this.props.currentUser) {
          menuItems = [
            <Menu.Item key="/">
              <Link to="/">
                <Icon type="home" className="nav-icon" />
              </Link>
            </Menu.Item>,
            <Menu.Item key="/profile" className="profile-menu">
                <ProfileDropdownMenu
                  currentUser={this.props.currentUser}
                  handleMenuClick={this.handleMenuClick}/>
            </Menu.Item>
          ];
        } else {
          menuItems = [
            <Menu.Item key="/login">
              <Link to="/login">Login</Link>
            </Menu.Item>,
            <Menu.Item key="/signup">
              <Link to="/signup">Signup</Link>
            </Menu.Item>
          ];
        }
//if(window.innerWidth > breakpoints.tablet){/* For Desktop*/
        return (
        <Header className="app-header">
            <div className="sub-header-1">

                  <div className="phone-div">
                      <span className="fa fa-phone-square"><a href="#">(+65) 81132922</a></span>
                  </div>
                  <div className="breadcrumb-div">
                      <Menu
                        className="app-menu"
                        mode="horizontal"
                        selectedKeys={[this.props.location.pathname]}
                        style={{ lineHeight: '58px' }} >
                          {menuItems}
                      </Menu>
                   </div>

             </div>

          </Header>
        );

    }
}

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="user-info" className="dropdown-item" disabled>
        <div className="user-full-name-info">
          {props.currentUser.name}
        </div>
        <div className="username-info">
          @{props.currentUser.username}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" className="dropdown-item">
        <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" className="dropdown-item">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={dropdownMenu}
      trigger={['click']}
      getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
      <a className="ant-dropdown-link">
         <Icon type="user" className="nav-icon" style={{marginRight: 0}} /> <Icon type="down" />
      </a>
    </Dropdown>
  );
}


export default withRouter(AppHeader);
