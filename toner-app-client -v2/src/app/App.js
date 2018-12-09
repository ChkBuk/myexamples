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

import { searchModes,getCurrentUser,getAllBrands,getAllFamilys,getFamilysByBrandId,getModelsByFamilyId,getModelsByBrandId,getAllModels,getModelsById } from '../util/APIUtils';
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
import { Form,Layout, notification ,Input, Button, Icon} from 'antd';
import { Footer, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import InputRange from 'react-input-range';

const  {Content}  = Layout;
const breakpoints = {
desktop: 1040,
tablet: 840,
mobile: 540
};

var myWidth = 0, myHeight = 0;
window.onresize = displayWindowSize;
//window.onload = displayWindowSize;

function displayWindowSize() {
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
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
      models : [],
      searchResult :[]
    }

    this.changeFamilyLOV = this.changeFamilyLOV.bind(this);
    this.changeBrandLOV = this.changeBrandLOV.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });

  }

  handleSubmit(e) {
    e.preventDefault();
    let selectedBrandId = parseInt(this.brandOption.value);
    let selectedFamilydId = parseInt(this.familyOption.value);
    let selectedModelId = parseInt(this.modelOption.value);


    let searchPromise;

    if(selectedBrandId===0 && selectedFamilydId===0 && selectedModelId===0){
      searchPromise = getAllModels(0,50);
    }else if(selectedBrandId >= 0 && selectedFamilydId > 0 && selectedModelId===0){
      searchPromise = getModelsByFamilyId(selectedFamilydId,0,50);
    }else if(selectedBrandId >= 0 && selectedFamilydId >= 0 && selectedModelId > 0){
      searchPromise = getModelsById(selectedModelId,0,50);
    }else if(selectedBrandId > 0 && selectedFamilydId === 0 && selectedModelId === 0){
      searchPromise = getModelsByBrandId(selectedBrandId,0,50);
    }else{
      console.log('Please select...!');
        searchResult : [];
    }




    if(!searchPromise) {
        return;
    }
    searchPromise
    .then(response => {
        const searchResult = [];
        this.setState({
            searchResult: searchResult.concat(response.content)
        })
      //  console.log('Here 3:'+brands);
    }).catch(error => {
        this.setState({
            isLoading: false
        })
    });
 }

  changeBrandLOV(e){
    const s =e.target.value;
  let familyPromise:[];
   if(s>0){ // Brand = ALL
      familyPromise = getFamilysByBrandId(s,0,50);
    }else if(s===0){
      familyPromise = getAllFamilys(0,50);
    }else{

    }
          if(!familyPromise) {
              return;
          }


          familyPromise
          .then(response => {
              const familys = [];
              this.setState({
                  familys: familys.concat(response.content)
              })
            //  console.log('Here 3:'+brands);
          }).catch(error => {
              this.setState({
                  isLoading: false
              })
          });
  }
  changeFamilyLOV(e){
    const s2 =e.target.value;
    let modelPromise;
   if(s2>0){ // Famimly = ALL
      modelPromise = getModelsByFamilyId(s2,0,50);
    }else if(s2===0){
      modelPromise = getModelsByBrandId(0,50);
    }else{
      modelPromise = getAllModels(0,50);
    }
          if(!modelPromise) {
              return;
          }
          modelPromise
          .then(response => {
              const models = [];
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

        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });
//console.log('Here 3...........:');
        // for Family LOV

        let familyPromise;
          familyPromise = getAllFamilys(0,50);
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
  //console.log(" here ...."+this.state.isAuthenticated);
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
    //console.log(" 1 :"+this.state.isAuthenticated);
  }).catch(error => {
    this.setState({
      isLoading: false
    });
    //  console.log(" 2 :"+this.state.isAuthenticated);
  });
}

componentWillMount() {
  this.loadCurrentUser();
}

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);
//console.log(" 2 :"+this.state.isAuthenticated);
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

  state = {
       search : ""
   }
   renderModel = model =>{
       const {search} = this.state;
       var code = model.id
       let image = 'data:image/jpeg;base64, '+model.image;
      // console.log("ABCD...."+code);    Footer, Card, CardBody, CardImage, CardTitle, CardText
       return <div className="col-md-3" style={{ marginTop : '10px' }}>
           <Card>
               <CardBody>
                   <p className=""><img src={image} alt={model.id} /></p>
               </CardBody>
               <CardText>
                 <div className="brandname">{model.brand.name} - {model.name}</div>
                 <div className="modelname"></div>
                 <div className="price">SGD {model.normal_price}</div>
                 <div className="last-row">
                         <div className="cart"><input type="button" value="Add to cart"/></div>
                         <div className="wholesalepriceqtn">Wholesale Price/Qtn: SGD {model.wholesale_price}/{model.wholesale_qtn}</div>
                         <div className="iscompatible">Compatible : {model.iscompatible}</div>

                 </div>
               </CardText>
           </Card>
       </div>
   }
   searchHandler = e =>{
       this.setState({ search : e.target.value });
   }
  render(){


  //  console.log(":"+this.state.isAuthenticated);
    let brands = this.state.brands;
    let brandOptionItems = brands.map((brand) =>
                <option value={brand.id} key={brand.id}>{brand.name}</option>
            );
    let familys = this.state.familys;
    let familyOptionItems = familys.map((family) =>
                <option value={family.id} key={family.id}>{family.name}</option>
            );
    let models = this.state.models;
    let modelOptionItems = models.map((model) =>
                <option value={model.id} key={model.id}>{model.name}</option>
            );

  const {search} = this.state;
  let searchResult = this.state.searchResult;
  let filteredSearchResult = searchResult;
  var modelList = [];
  for (var key in searchResult) {
    modelList.push(searchResult[key]);
  }

  if(this.state.search !=  null){
    //console.log("search :"+(this.state.search).toLowerCase());
    filteredSearchResult =  modelList.filter( model =>{
           return (model.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) || (model.normal_price >= search);
         })

  }

    if(this.state.isLoading ) {
      return <LoadingIndicator />
    }
  //  if(window.innerWidth > breakpoints.tablet){/* For Desktop*/
    return (
      <form onSubmit={this.handleSubmit}>
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
                            <select ref = {(input)=> this.brandOption = input} className="textboxstyle" onChange={this.changeBrandLOV}><option value='-1'>Select Brand</option><option value ='0'>ALL</option>{brandOptionItems}</select>
                         </div>

                         <div className="persent-one">
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                            <select ref = {(input)=> this.familyOption = input} className="textboxstyle" onChange={this.changeFamilyLOV}><option value='-1'>Select Family</option><option value ='0'>ALL</option>{familyOptionItems}</select>
                         </div>
                         <div className="persent-one">
                            <i className="fa fa fa-caret-down" aria-hidden="true"></i>
                            <select ref = {(input)=> this.modelOption = input} className="textboxstyle"><option value='-1'>Select Model</option><option value='0'>ALL</option>{modelOptionItems}</select>
                         </div>
                         <div className="persent-one less-btn">
                            <input type="submit" name="submit" value="Search" className="btn btn-info cst-btn" id="srch"/>
                         </div>
                      </div>
                </div>
             </div>
             </div>

                 <main style={{marginTop: '4rem'}}>
                       <div className="container">
                           <div className="row">
                               <div className="col"></div>
                               <div className="col">
                                   <Input label="Search Model" icon="search" onChange={this.searchHandler}/>
                               </div>
                               <div className="col"></div>
                           </div>
                           <div className="row">
                               {
                                   filteredSearchResult.map( model =>{
                                       return this.renderModel(model)
                                   })
                               }
                           </div>
                       </div>
                   </main>

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

  }
}

export default withRouter(App);
