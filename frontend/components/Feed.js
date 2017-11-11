import React from 'react';
import axios from 'axios';
import Post from './Post';

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/post/all`)
          .then((resp) => {
              if (resp.data.success === true) {
                  this.setState({
                      posts: this.state.posts.concat(resp.data.posts)
                  });
              }
          })
          .catch((err) => {
              console.log('Getting posts error', err);
          });
    }

    render() {
        return(
          <div>
            {this.state.posts.map((post) => <Post post={post}/>)}
          </div>
        );
    }
}

export default Feed;
