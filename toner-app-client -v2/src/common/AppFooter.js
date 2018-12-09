
import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { Layout } from 'antd';
import { Col, Container, Row, Footer } from 'mdbreact';
import './Footer.css';
import StickyFooter from 'react-sticky-footer';
const breakpoints = {
desktop: 1040,
tablet: 840,
mobile: 540
};
class AppFooter extends Component {
    render() {
      if(window.innerWidth > breakpoints.tablet){/* For Desktop*/
        return (
             <Footer className="footer">
                <div class="container">
                  <div class="row">
                    <div class="col-md-3 col-sm-6 footer-col">
                      <div id="logo-footer" className="column">
                      </div>
                      <p>Syne Biz is one of a leading Printers,Toner & Catridge supplying company in Singapore over the 25 years.</p>

                    </div>
                    <div class="col-md-3 col-sm-6 footer-col">
                      <h6 class="heading7">General Links</h6>
                      <ul class="footer-ul">
                        <li><a href="#"> About Us</a></li>
                        <li><a href="#"> Privacy Policy</a></li>
                        <li><a href="#"> Terms & Conditions</a></li>
                        <li><a href="#"> Products</a></li>
                        <li><a href="#"> Ranking</a></li>
                        <li><a href="#"> Frequently Ask Questions</a></li>
                      </ul>
                    </div>
                    <div class="col-md-3 col-sm-6 footer-col">
                      <h6 class="heading7">Contact Us</h6>
                      <div class="post">
                      <p><i class="fa fa-map-pin"></i>Syne Biz, 10 Anson Road,#10-11 International Plaza, Singapore 079903</p>
                      <p><i class="fa fa-phone"></i> Phone (Singapore) : (+65) 811 329 22</p>
                      <p><i class="fa fa-envelope"></i> E-mail : info@syneb.com</p>
                     </div>
                     </div>
                    <div class="col-md-3 col-sm-6 footer-col">
                      <h6 class="heading7">Social Media</h6>
                      <ul class="footer-social">
                        <li><i class="fa fa-linkedin social-icon linked-in" aria-hidden="true"></i></li>
                        <li><i class="fa fa-facebook social-icon facebook" aria-hidden="true"></i></li>
                        <li><i class="fa fa-twitter social-icon twitter" aria-hidden="true"></i></li>
                        <li><i class="fa fa-google-plus social-icon google" aria-hidden="true"></i></li>
                      </ul>
                    </div>
                   </div>
                  </div>
             </Footer>

        );
      }else if (window.innerWidth > breakpoints.mobile) {/* For tablet */
        return (
          <Footer></Footer>
        );
      }else if (window.innerWidth <= breakpoints.mobile) { /* For mobile */
        return (

            <StickyFooter>

            </StickyFooter>

        );
      }
    }
}

export default withRouter(AppFooter);
