import React from "react";
import "./App.css";
// import { fetchGitHubUser } from "./redux/user/user.actions";
import { connect } from "react-redux";
import { fetchUserProfile } from "./redux/user/user.actions";
import { store } from "./store";

//now we have to introduce redux thunk to help us convert the returned function in our fetchUserProfile() below to an object as the reducer expects... remember reducers only receives objects...
//note that the returned function in the fetchUserProfile below is also a thunk.

class App extends React.Component {
  componentDidMount() {
    store.dispatch(fetchUserProfile());
    console.log(store.getState());
  }

  render() {
    const { error, loading, userDetails } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>
          <div>
            {userDetails.map((userDetail) => {
              return <div key={userDetail.id}>{userDetail.login}</div>;
            })}
          </div>
        </h1>
      </div>
    );
  }
}

//we need some stuffs from the redux store and we therefore use the mapStateToProps to grab them:
//Note that these items which we are grabbing from the redux store are from the initialState of our userReducer...that proves that the initial state of the reducer is what makes up the redux store...
const mapStateToProps = (state) => {
  return {
    userDetails: state.userReducer.userDetails,
    loading: state.userReducer.loading,
    error: state.userReducer.error,
  };
};

export default connect(mapStateToProps)(App);
