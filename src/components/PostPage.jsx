import React, { Component } from 'react';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';
import { withRouter } from 'react-router-dom';
import Post from './Post';
import Comments from './Comments';
import withUser from './withUser';

class PostPage extends Component {
  state = { post: null, comments: [] };

  get postId() {
    return this.props.match.params.id;
  }

  get postRef() {
    return firestore.doc(`/posts/${this.postId}`);
  }

  get commentsRef() {
    return this.postRef.collection('comments');
  }

  unsubscribeFromPost = [];
  unsubscribeFromComments = [];

  componentDidMount = async () => {
    this.unsubscribeFromPost = this.postRef.onSnapshot((snapshot) => {
      const post = collectIdsAndDocs(snapshot);
      this.setState({ post });
    });

    this.unsubscribeFromComments = this.commentsRef.onSnapshot((snapshot) => {
      const comments = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ comments });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromPost();
    this.unsubscribeFromComments();
  };

  createComment = (comment) => {
    const { user } = this.props;
    // console.log(this.props);
    this.commentsRef.add({
      ...comment,
      user
    });
  };

  render() {
    const { post, comments } = this.state;
    // if (!loaded) return <p>Loading…</p>;
    return (
      <section>
        {post && <Post {...post} />}
        {/* <h1>{post}</h1> */}
        <Comments comments={comments} onCreate={this.createComment} />
        {/* <footer>
          <Link to="/">&larr; Back</Link>
        </footer> */}
      </section>
    );
  }
}

export default withRouter(withUser(PostPage));
