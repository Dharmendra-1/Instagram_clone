import React from 'react';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    const { userId } = this.props;

    this.state = {
      userId,
      userName: '',
      firstName: '',
      url: 'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png',
      post: [],
      follow: false, //take from database later
    };
  }

  toggleModal = () => {
    if (this.state.toggle) {
      this.setState({ ...this.state, toggle: false });
    } else {
      this.setState({ ...this.state, toggle: true });
    }
  };

  userDetails = async () => {
    try {
      const res = await fetch('http://localhost:4000/user/profile/img/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: this.state.userId }),
      });
      const profilePic = await res.json();
      if (profilePic[0].img) {
        this.setState({
          ...this.state,
          url: profilePic[0].img,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  postDeatils = async () => {
    try {
      const res = await fetch('http://localhost:4000/user/post/');
      const postData = await res.json();

      let posts = postData.filter((obj) => obj.id === this.state.userId);
      this.setState({
        ...this.state,
        post: posts,
        userName: posts[0].last_name,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  handleFollow = () => {
    if (this.state.follow) {
      this.setState({ ...this.state, follow: false });
    } else {
      this.setState({ ...this.state, follow: true });
    }
  };
  componentDidMount() {
    this.userDetails();
    this.postDeatils();
  }

  render() {
    return (
      <div style={{ maxWidth: '550px', margin: '0px auto' }}>
        <div className='profile'>
          <div className='profile-image'>
            <section>
              <img alt='profile' src={this.state.url} />
            </section>
          </div>
          <div>
            <h4>{this.state.userName}</h4>
            <div className='user-stats'>
              <h6>{this.state.post.length} posts</h6>
              <h6>0 followers</h6>
              <h6>0 following</h6>
            </div>
            {!this.state.follow && (
              <button onClick={this.handleFollow}>Follow</button>
            )}
            {this.state.follow && (
              <button onClick={this.handleFollow}>Unfollow</button>
            )}
          </div>
        </div>
        <div className='gallery'>
          {this.state.post.map((obj) => {
            return (
              <img className='item' key={obj.pid} src={obj.img} alt='post' />
            );
          })}
        </div>
      </div>
    );
  }
}

export default UserProfile;
