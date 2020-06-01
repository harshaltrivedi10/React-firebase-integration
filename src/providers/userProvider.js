import React, { Component, createContext } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = { user: null };

  unsubsribeFromAuth = null;

  componentDidMount = async () => {
    try {
      this.unsubsribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);
          userRef.onSnapshot((snapshot) => {
            this.setState({ user: { uid: snapshot.id, ...snapshot.data() } });
          });
        }

        this.setState({ user: userAuth });
      });
    } catch (error) {
      console.log('In userProvider', error.message);
    }
  };

  componentWillUnmount = () => {
    this.unsubsribeFromAuth();
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

export default UserProvider;
