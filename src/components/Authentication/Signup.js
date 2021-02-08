import React, {useCallback} from 'react';
import AuthBgImage from "../../assets/images/auth_bg.jpg";
import Logo from "../../assets/images/logo.svg";
import AuthInput from "./AuthInput";
import {useHistory} from "react-router";
import {constants} from "../../helpers/constants";
import useForm from "../../hooks/Forms/useForm";
import useApi from "../../api/useApi";
import AuthButton from "./AuthButton";
import useInfo from "../../hooks/Forms/useInfo";
import {formData} from "../../helpers/utils";

const Signup = (props) => {
  const history = useHistory();
  const {handleValue, data} = useForm({fullName: {}, email: {}, password: {}, con_password: {}});
  const {post, loading} = useApi();
  const [info, setInfo] = useInfo();

  function goToLogin() {
    history.push(constants.ROUTES.LOGIN);
  }

  const getData = useCallback(() => {
    const res = {};
    for(let key in data) {
      if(data.hasOwnProperty(key) && key !== 'serverErr')
        res[key] = data[key];
    }
    return res;
  }, [data]);

  function handleSignup() {
    post(constants.ENDPOINTS.SIGNUP, formData(getData()))
      .then(res => {
        console.log('[Signup.js || Line no. 34 ....]', res.data);
        if(res.data.type === 'error') {
          setInfo({key: res.data.errorKey, message: res.data.message, type: 'error'});
        } else {
          setInfo({key: 'successInfo', message: res.data.message, type: 'success'});
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <div className="auth_modal-side_bar">
        <div className="auth_modal-side_bar-slider">
          <div className="auth_modal-side_bar-slider-images">
            <div className="auth_modal-side_bar-slider-image">
              <img src={AuthBgImage} alt="" />
            </div>
            <div className="auth_modal-side_bar-slider-image">
              <img src={AuthBgImage} alt=""/>
            </div>
            <div className="auth_modal-side_bar-slider-image">
              <img src={AuthBgImage} alt=""/>
            </div>
            <div className="auth_modal-side_bar-slider-image">
              <img src={AuthBgImage} alt=""/>
            </div>
            <div className="auth_modal-side_bar-slider-image">
              <img src={AuthBgImage} alt=""/>
            </div>
          </div>
          <div className="auth_modal-side_bar-slider-pagination">
            <div className="auth_modal-side_bar-slider-pagination-item"/>
            <div className="auth_modal-side_bar-slider-pagination-item"/>
            <div className="auth_modal-side_bar-slider-pagination-item active"/>
            <div className="auth_modal-side_bar-slider-pagination-item"/>
            <div className="auth_modal-side_bar-slider-pagination-item"/>
          </div>
        </div>
        <div className="auth_modal-side_bar-content pv-100">
          <div className="row flexCentered heading_2 white mt-100">
            <p>Welcome Back</p>
          </div>
          <div className="row flexCentered mt-20 auth_modal-side_bar-content-desc">
            <p>To keep connected with us. Please login with your personal info</p>
          </div>
          <div className="row flexCentered auth_modal-side_bar-content-action">
            <div className="generic_btn pink" onClick={goToLogin}>
              <div className="generic_btn-label">
                <p>Log in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="auth_modal-main pv-50 ph-50">
        <div className="row justifyEnd">
          <div className="logo flexCentered">
            <div className="logo-img">
              <img src={Logo} alt="DND-Todo"/>
            </div>
            <div className="logo-label">
              <p>DND-Todo</p>
            </div>
          </div>
        </div>
        <div className="mh-60 relative">
          <div className="row flexCentered mt-40 heading_1">
            <p>Try it for free, Today!</p>
          </div>
          <div className="row flexCentered mv-40">
            <div className="row_item autoWidth mr-50 pointer">
              <div className="social_media-icon">
                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.67188 18.5C8.67188 16.6668 9.17694 14.9496 10.0544 13.4792V7.2421H3.81729C1.34183 10.457 0 14.3752 0 18.5C0 22.6248 1.34183 26.5429 3.81729 29.7579H10.0544V23.5208C9.17694 22.0504 8.67188 20.3332 8.67188 18.5V18.5Z"
                    fill="#FBBD00"/>
                  <path
                    d="M18.5 28.3281L14.1641 32.6641L18.5 37C22.6249 37 26.5429 35.6582 29.7579 33.1827V26.9523H23.5274C22.0442 27.8329 20.3197 28.3281 18.5 28.3281V28.3281Z"
                    fill="#0F9D58"/>
                  <path
                    d="M10.0544 23.5208L3.81729 29.7579C4.3074 30.3944 4.84108 31.004 5.41855 31.5815C8.91274 35.0757 13.5585 37 18.5 37V28.3281C14.9139 28.3281 11.7708 26.3972 10.0544 23.5208Z"
                    fill="#31AA52"/>
                  <path
                    d="M37 18.5C37 17.3745 36.8981 16.2468 36.6971 15.1485L36.5344 14.2597H18.5V22.9316H27.2768C26.4245 24.627 25.114 26.0103 23.5274 26.9523L29.7578 33.1828C30.3943 32.6927 31.0039 32.159 31.5815 31.5815C35.0756 28.0873 37 23.4415 37 18.5V18.5Z"
                    fill="#3C79E6"/>
                  <path
                    d="M25.4496 11.5504L26.216 12.3169L32.348 6.185L31.5815 5.41855C28.0873 1.92436 23.4416 0 18.5 0L14.1641 4.33594L18.5 8.67188C21.1251 8.67188 23.5932 9.69414 25.4496 11.5504Z"
                    fill="#CF2D48"/>
                  <path
                    d="M18.5 8.67188V0C13.5585 0 8.91274 1.92436 5.41848 5.41848C4.841 5.99595 4.30732 6.60551 3.81721 7.2421L10.0543 13.4792C11.7708 10.6028 14.9139 8.67188 18.5 8.67188V8.67188Z"
                    fill="#EB4132"/>
                </svg>
              </div>
            </div>
            <div className="row_item autoWidth mr-50 pointer">
              <div className="social_media-icon">
                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M33.653 0H3.34695C1.4985 0 0 1.4985 0 3.34695V33.653C0 35.5015 1.4985 37 3.34695 37H33.653C35.5015 37 37 35.5015 37 33.653V3.34695C37 1.4985 35.5015 0 33.653 0ZM11.4494 31.9482C11.4494 32.4862 11.0133 32.9222 10.4754 32.9222H6.32923C5.79127 32.9222 5.35522 32.4862 5.35522 31.9482V14.5678C5.35522 14.0299 5.79127 13.5938 6.32923 13.5938H10.4754C11.0133 13.5938 11.4494 14.0299 11.4494 14.5678V31.9482ZM8.40229 11.9555C6.22694 11.9555 4.46344 10.1919 4.46344 8.0166C4.46344 5.84125 6.22694 4.07775 8.40229 4.07775C10.5776 4.07775 12.3411 5.84125 12.3411 8.0166C12.3411 10.1919 10.5777 11.9555 8.40229 11.9555ZM33.1169 32.0267C33.1169 32.5213 32.7159 32.9222 32.2214 32.9222H27.7723C27.2777 32.9222 26.8767 32.5213 26.8767 32.0267V23.8743C26.8767 22.6581 27.2335 18.545 23.6985 18.545C20.9565 18.545 20.4004 21.3603 20.2887 22.6238V32.0267C20.2887 32.5213 19.8878 32.9222 19.3931 32.9222H15.0901C14.5955 32.9222 14.1945 32.5213 14.1945 32.0267V14.4894C14.1945 13.9948 14.5955 13.5938 15.0901 13.5938H19.3931C19.8877 13.5938 20.2887 13.9948 20.2887 14.4894V16.0057C21.3054 14.4799 22.8164 13.3022 26.0336 13.3022C33.1577 13.3022 33.1169 19.9579 33.1169 23.6149V32.0267Z"
                    fill="#0077B7"/>
                </svg>
              </div>
            </div>
            <div className="row_item autoWidth pointer">
              <div className="social_media-icon">
                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M32.014 0H4.98586C2.2323 0 0 2.23219 0 4.98582V32.014C0 34.7676 2.23221 36.9998 4.98586 36.9998H18.316L18.3388 23.7781H14.9037C14.4573 23.7781 14.095 23.4171 14.0933 22.9707L14.0768 18.7088C14.0751 18.26 14.4385 17.8952 14.8873 17.8952H18.3161V13.7771C18.3161 8.99811 21.2349 6.3959 25.4981 6.3959H28.9964C29.444 6.3959 29.8069 6.75876 29.8069 7.20643V10.8001C29.8069 11.2476 29.4442 11.6104 28.9968 11.6106L26.85 11.6116C24.5315 11.6116 24.0826 12.7133 24.0826 14.3301V17.8953H29.177C29.6625 17.8953 30.0391 18.3192 29.9819 18.8012L29.4767 23.0631C29.4284 23.471 29.0825 23.7783 28.6719 23.7783H24.1053L24.0826 37H32.0142C34.7678 37 37 34.7678 37 32.0143V4.98582C36.9999 2.23219 34.7677 0 32.014 0Z"
                    fill="#475993"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="row mv-30">
            <div className="row_item flexCentered mr-10">
              <div className="generic_separator" />
            </div>
            <div className="row_item nowrap black-30 account-separator">
              <p>Or Sign up with new dnd-todo's account</p>
            </div>
            <div className="row_item flexCentered ml-10">
              <div className="generic_separator" />
            </div>
          </div>
          <div className="auth_modal-main-error_msg" style={{
            opacity: info.message ? 1 : 0,
            color: info.key === 'successInfo' ? '#23CD90' : '#ff1400'
          }}>
            <span>{info.message ? info.message : ''}</span>
          </div>
          <div className="row mv-40">
            <AuthInput
              label="Full Name"
              type="text"
              id="fullName"
              name="fullName"
              isInvalid={info.key === 'fullName'}
              onChange={(value) => handleValue("fullName", value)}
              required
            />
          </div>
          <div className="row mv-40">
            <AuthInput
              label="Email Address"
              type="text"
              id="email"
              name="email"
              isInvalid={info.key === 'email'}
              onChange={(value) => handleValue("email", value)}
              required
            />
          </div>
          <div className="row mv-40">
            <AuthInput
              label="Password"
              type="password"
              id="password"
              // isInvalid
              name="password"
              isInvalid={info.key === 'password'}
              onChange={(value) => handleValue("password", value)}
              required
              containerStyle={{marginRight: '20px'}}
            />
            <AuthInput
              label="Confirm Password"
              type="password"
              id="con_password"
              // isInvalid
              name="con_password"
              isInvalid={info.key === 'con_password'}
              onChange={(value) => handleValue("con_password", value)}
              required
            />
          </div>
          <div className="row flex spaceBetween mb-60">
            <div className="row_item autoWidth">
              <input type="checkbox" id="staySignedIn"/>
              <label className="ml-10 semiBold black-60 pointer" htmlFor="staySignedIn">Stay Signed In</label>
            </div>
            <div className="row_item autoWidth flexCentered pointer">
              <div className="row_item-icon">
                <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM8 16C6.9 16 6 15.1 6 14C6 12.9 6.9 12 8 12C9.1 12 10 12.9 10 14C10 15.1 9.1 16 8 16ZM11.1 7H4.9V5C4.9 3.29 6.29 1.9 8 1.9C9.71 1.9 11.1 3.29 11.1 5V7Z"
                    fill="#ADADAD"/>
                </svg>
              </div>
              <div className="row_item-label nowrap ml-10 success">
                <p>Forgot Password?</p>
              </div>
            </div>
          </div>
          <div className="row">
            <AuthButton
              handleClick={handleSignup}
              loading={loading}
              label="Sign up"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
