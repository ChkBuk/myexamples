import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WOW from 'wowjs/dist/wow.js';
import './Animate.css';
import './App.css';
import {
  Route,
  withRouter,
  Link,
  Switch
} from 'react-router-dom';

import { getCurrentUser,getAllBrands,getAllFamilys,getAllModels } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import PollList from '../poll/PollList';
import NewPoll from '../poll/NewPoll';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Brand from '../poll/Brand';
import BrandList from '../poll/BrandList';
import FamilyList from '../poll/FamilyList';
import ModelList from '../poll/ModelList';
import NewBrand from '../poll/NewBrand';
import NewFamily from '../poll/NewFamily';
import NewModel from '../poll/NewModel';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import AppFooter from '../common/AppFooter';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';
import { Layout, notification } from 'antd';


const  {Content}  = Layout;
const breakpoints = {
desktop: 1040,
tablet: 840,
mobile: 540
};

//var wow =new WOW.WOW().init();
var myWidth = 0, myHeight = 0;
window.onresize = displayWindowSize;
//window.onload = displayWindowSize;

function displayWindowSize() {
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
    // your size calculation code here
    //document.getElementById("dimensions").innerHTML = myWidth + "x" + myHeight;
};



class App extends Component {
  componentDidMount(){
    new WOW.WOW().init();

  }
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      selectValue: null,
      isAuthenticated: false,
      isLoading: false,
      brands : [],
      familys : [],
      models : []
    }

    this.searchSubmit = this.searchSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });

  }

  searchSubmit(e){
    console.log("Searching ");
    const s =e.target.value;
    alert(s);
  }

componentDidMount(){
  // for Brand LOV
  let promise;
    promise = getAllBrands(0, 50);
        if(!promise) {
            return;
        }


        promise
        .then(response => {
            const brands = this.state.brands.slice();
            this.setState({
                brands: brands.concat(response.content)
            })
          //  console.log('Here 3:'+brands);
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });

        // for Family LOV
        let familyPromise;
          familyPromise = getAllFamilys(0, 50);
              if(!familyPromise) {
                  return;
              }


              familyPromise
              .then(response => {
                  const familys = this.state.familys.slice();
                  this.setState({
                      familys: familys.concat(response.content)
                  })
                //  console.log('Here 3:'+brands);
              }).catch(error => {
                  this.setState({
                      isLoading: false
                  })
              });
              // for Model LOV
              let modelPromise;
                modelPromise = getAllModels(0, 50);
                    if(!modelPromise) {
                        return;
                    }


                    modelPromise
                    .then(response => {
                        const models = this.state.models.slice();
                        this.setState({
                            models: models.concat(response.content)
                        })
                      //  console.log('Here 3:'+brands);
                    }).catch(error => {
                        this.setState({
                            isLoading: false
                        })
                    });
}


loadCurrentUser() {
  this.setState({
    isLoading: true
  });
  getCurrentUser()
  .then(response => {
    this.setState({
      currentUser: response,
      isAuthenticated: true,
      isLoading: false
    });
    console.log(" 1 :"+this.state.isAuthenticated);
  }).catch(error => {
    this.setState({
      isLoading: false
    });
  });
}

componentWillMount() {
  this.loadCurrentUser();
}

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);
console.log(" 2 :"+this.state.isAuthenticated);
    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);

    notification[notificationType]({
      message: 'Polling App',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'Polling App',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }


  render() {
    console.log(" 3 :"+this.state.isAuthenticated);
    let brands = this.state.brands;
    let optionItems = brands.map((brand) =>
                <option value={brand.id} key={brand.id}>{brand.name}</option>
            );
    let familys = this.state.familys;
    let familyOptionItems = familys.map((family) =>
                <option key={family.id}>{family.name}</option>
            );
    let models = this.state.models;
    let modelOptionItems = models.map((model) =>
                <option key={model.id}>{model.name}</option>
            );


    if(this.state.isLoading ) {
      return <LoadingIndicator />
    }
    if(window.innerWidth > breakpoints.tablet){/* For Desktop*/
    return (
      <form onSubmit={this.searchSubmit}>
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated}
            currentUser={this.state.currentUser}
            onLogout={this.handleLogout} />

              <Content className="app-content">
              <div className="middle-content">

              <Switch>
                <Route exact path="/"
                  render={(props) => <div></div>}>
                </Route>
                <Route exact path="/brands"
                  render={(props) => <BrandList isAuthenticated={this.state.isAuthenticated}
                      currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route>
                <Route exact path="/familys"
                  render={(props) => <FamilyList isAuthenticated={this.state.isAuthenticated}
                      currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route>
                <Route exact path="/models"
                  render={(props) => <ModelList isAuthenticated={this.state.isAuthenticated}
                      currentUser={this.state.currentUser} handleLogout={this.handleLogout} {...props} />}>
                </Route>
                <Route path="/login"
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>
                <Route path="/users/:username"
                  render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/poll/new" component={NewPoll} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/brand/new" component={NewBrand} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/family/new" component={NewFamily} handleLogout={this.handleLogout}></PrivateRoute>
                <PrivateRoute authenticated={this.state.isAuthenticated} path="/model/new" component={NewModel} handleLogout={this.handleLogout}></PrivateRoute>
                <Route component={NotFound}></Route>
              </Switch>


                    <div id="logo" className="column">
                    </div>
                    <div id="description" className="column col-3 wow bounceIn animated" data-wow-duration="2s" data-wow-delay="1s"><h1>WE OFFER 100%</h1><h3>MONEY BACK GUARANTEE</h3>
                    <p>on all our quality products with hassle - free returns.
                    We believe you will be completely satisfied with your purchase.</p>
                    </div>
                    <div className="column app-content-img fadeIn animated" data-wow-duration="2s">
                      <img src={require("./3.png")} />
                    </div>
              </div>

             <div className="col-12" align="center">
             <div className="tabing">
                <div className="tab-content">
                   <div id="1" className="tab1 active">
                      <div className="flight-tab" align="center">
                         <div className="persent-one">
                            <i className="fa fa fa-caret-down" aria-hidden="true"></i>
                            <select className="textboxstyle" onChange={this.searchSubmit}><option value='-1'>Select Brand</option><option value ='0'>ALL</option>{optionItems}</select>
                         </div>

                         <div className="persent-one">
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                            <select className="textboxstyle"><option key='-1'>Select Family</option><option key='0'>ALL</option>{familyOptionItems}</select>
                         </div>
                         <div className="persent-one">
                            <i className="fa fa fa-caret-down" aria-hidden="true"></i>
                            <select className="textboxstyle"><option key='-1'>Select Model</option><option key='0'>ALL</option>{modelOptionItems}</select>
                         </div>
                         <div className="persent-one less-btn">
                            <input type="submit" name="submit" value="Search" className="btn btn-info cst-btn" id="srch"/>
                         </div>
                      </div>
                </div>
             </div>
             </div>

                  <div className="brands-image" align="center">

                      <img src={require("./images/brands/brother.png")} />
                      <img src={require("./images/brands/canon.png")} />
                      <img src={require("./images/brands/dell.png")} />
                      <img src={require("./images/brands/epson.png")} />
                      <img src={require("./images/brands/hp.png")} />
                      <img src={require("./images/brands/konica-minolta.png")} />
                      <img src={require("./images/brands/kyocer.png")} />
                      <img src={require("./images/brands/lanier.png")} />
                      <img src={require("./images/brands/lexmark.png")} />
                      <img src={require("./images/brands/oki.png")} />

                      <img src={require("./images/brands/panasonic.png")} />
                      <img src={require("./images/brands/richo.png")} />
                      <img src={require("./images/brands/samsung.png")} />
                      <img src={require("./images/brands/sharp.png")} />
                      <img src={require("./images/brands/toshiba.png")} />

                  </div>
                </div>
                </Content>
                  <AppFooter></AppFooter>
                </Layout>
</form>
    );
    }else if (window.innerWidth > breakpoints.mobile) {/* For mobile */
      return (
          <Layout className="app-container">
            <AppHeader isAuthenticated={this.state.isAuthenticated}
              currentUser={this.state.currentUser}
              onLogout={this.handleLogout} />

        <Content className="app-content">
        <div className="app-middle">

        <div className="col-3t menu">
            <div class="container">
                    <div class="row card-body py-2 mb-3 bg-dark twhite">
                      <h5><i class="fa fa-car"></i> Search Options</h5>
                    </div>
                    <div class="form-group">
                      <select class="form-control" id="conditionsselect1">
                        <option>Brand</option>
                        <option>New</option>
                        <option>Used</option>
                      </select>
                     </div>
                    <div class="form-group">
                      <select class="form-control" id="conditionsselect2">
                        <option>Family</option>
                        <option>Compact</option>
                        <option>Convertible</option>
                        <option>Coupe</option>
                        <option>Off-road</option>
                        <option>Sedan</option>
                      </select>
                     </div>
                    <div class="form-group">
                      <select class="form-control" id="make1">
                        <option>Model</option>
                        <option>Ford</option>
                        <option>Hyundai</option>
                        <option>Kia</option>
                        <option>Honda</option>
                        <option>Skoda</option>
                      </select>
                     </div>
                    <hr></hr>
                    <button type="btn" class="btn btn-primary">Find Now</button>
                    <button type="btn" class="btn btn-primary">Reset All</button>
                    <div class="pb-3"></div>
                </div>
        </div>

        <div className="col-6t">

              <div className="app-content-text-t">Toner & Cartridges<p>Instantly save 5% & free shiping</p></div>
              <div className="col-7t">
                    <img src={require("./2.png")} />
              </div>
        </div>
        </div>
        <div className="col-12">
        <div className="brands-image" >
            <img src={require("./images/brands/brother.png")} />
            <img src={require("./images/brands/canon.png")} />
            <img src={require("./images/brands/dell.png")} />
            <img src={require("./images/brands/epson.png")} />
            <img src={require("./images/brands/hp.png")} />

            <img src={require("./images/brands/konica-minolta.png")} />
            <img src={require("./images/brands/kyocer.png")} />
            <img src={require("./images/brands/lanier.png")} />
            <img src={require("./images/brands/lexmark.png")} />
            <img src={require("./images/brands/oki.png")} />

            <img src={require("./images/brands/panasonic.png")} />
            <img src={require("./images/brands/richo.png")} />
            <img src={require("./images/brands/samsung.png")} />
            <img src={require("./images/brands/sharp.png")} />
            <img src={require("./images/brands/toshiba.png")} />

        </div>
        </div>
            <div className="footer">
              <p id="dimensions">Footer</p>

            </div>
            </Content>
          </Layout>

      );
    } else if (window.innerWidth <= breakpoints.mobile) { /* For mobile */
      return (
          <Layout className="app-container">
            <AppHeader isAuthenticated={this.state.isAuthenticated}
              currentUser={this.state.currentUser}
              onLogout={this.handleLogout} />

              <Content className="app-content">

              <div className="app-content-img fadeInRight animated">
                <img src={require("./3.png")} />
              </div>
                <div className="col-12">
                  <div className="brands-image" >
                      <img src={require("./images/brands/brother.png")} />
                      <img src={require("./images/brands/canon.png")} />
                      <img src={require("./images/brands/dell.png")} />
                      <img src={require("./images/brands/epson.png")} />
                      <img src={require("./images/brands/hp.png")} />

                      <img src={require("./images/brands/konica-minolta.png")} />
                      <img src={require("./images/brands/kyocer.png")} />
                      <img src={require("./images/brands/lanier.png")} />
                      <img src={require("./images/brands/lexmark.png")} />
                      <img src={require("./images/brands/oki.png")} />

                      <img src={require("./images/brands/panasonic.png")} />
                      <img src={require("./images/brands/richo.png")} />
                      <img src={require("./images/brands/samsung.png")} />
                      <img src={require("./images/brands/sharp.png")} />
                      <img src={require("./images/brands/toshiba.png")} />

                  </div>
                </div>

                </Content>
                </Layout>

      );
    }
  }
}

export default withRouter(App);
