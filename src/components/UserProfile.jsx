import React, { Component } from 'react';
import { auth, firestore, storage } from '../firebase';

class UserProfile extends Component {
  state = { displayName: '' };
  imageInput = null;

  get uid() {
    return auth.currentUser.uid;
  }

  get userRef() {
    return firestore.doc(`users/${this.uid}`);
  }

  get file() {
    return this.imageInput && this.imageInput.files[0];
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { displayName } = this.state;
    // change the display name by first grabbing the user and changing it.

    if (displayName) {
      this.userRef.update({ displayName });
    }

    if (this.file) {
      storage
        .ref()
        .child('user-profile')
        .child(this.uid)
        .child(this.file.name)
        .put(this.file)
        .then((response) => {
          return response.ref.getDownloadURL();
        })
        .then((photoURL) => {
          this.userRef.update({ photoURL });
        });
    }
  };

  render() {
    const { displayName } = this.state;
    return (
      <section className="UserProfile">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="displayName"
            value={displayName}
            id="displayName"
            onChange={this.handleChange}
            placeholder="Display Name"
          />
          <input
            type="file"
            ref={(ref) => (this.imageInput = ref)}
            name="ImageInput"
            id="ImageInput"
          />
          <input type="submit" className="update" />
        </form>
      </section>
    );
  }
}

export default UserProfile;
