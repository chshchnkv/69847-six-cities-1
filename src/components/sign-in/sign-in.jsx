import React from "react";
import PropTypes from "prop-types";
import {getCityInfoById} from "../../utils";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  render() {
    const {
      cities = [],
      currentCityId = -1,
    } = this.props;

    const {
      name: cityName = ``
    } = getCityInfoById(cities, currentCityId);

    return (
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={this._handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required=""/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required=""/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{cityName}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    );
  }

  _handleSubmit(event) {
    const {onSubmit} = this.props;
    event.preventDefault();

    onSubmit(event.target[`email`].value, event.target[`password`].value);
  }
}

SignIn.propTypes = {
  currentCityId: PropTypes.number.isRequired,
  cities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    location: PropTypes.shape({
      longitude: PropTypes.number,
      latitude: PropTypes.number,
      zoom: PropTypes.number
    })
  })),
  onSubmit: PropTypes.func.isRequired
};

export default SignIn;
