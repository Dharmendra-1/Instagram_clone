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
      follow: 0, //take from database later
      loginId: null,
    };
  }
  count = 1;
  loginUserId = async () => {
    try {
      const res = await fetch('http://localhost:4000/dashboard/', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      console.log(parseData.id);

      this.setState({
        loginId: parseData.id,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  getDefaultFollow = async (id, fid) => {
    try {
      const res = await fetch('http://localhost:4000/user/defaultFollow/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          fid,
        }),
      });
      const followerValue = await res.json();
      console.log(followerValue[0].follow);
      this.setState({
        ...this.state,
        follow: followerValue[0].follow,
      });
    } catch (err) {
      console.log(err);
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
    this.followerDetails();
    if (this.state.follow === 1) {
      this.setState({ ...this.state, follow: 0 });
    } else {
      this.setState({ ...this.state, follow: 1 });
    }
  };

  followerDetails = async () => {
    if (this.state.loginId !== null) {
      let fol;
      if (this.state.follow === 0) {
        fol = 1;
      } else {
        fol = 0;
      }
      try {
        const res = await fetch('http://localhost:4000/user/follow', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: this.state.loginId,
            fid: this.state.userId,
            follow: fol,
          }),
        });
        const allFollower = await res.json();

        allFollower.forEach((obj) => {
          if (this.state.loginId === obj.id) {
            if (obj.follow === 1) {
              this.following += 1;
            }
          }
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  componentDidMount() {
    this.loginUserId();
    this.userDetails();
    this.postDeatils();
  }
  componentDidUpdate() {
    if (this.state.loginId && this.count) {
      this.count = 0;
      this.getDefaultFollow(this.state.loginId, this.state.userId);
    }
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
              <h6>{this.following}</h6>
            </div>
            {!this.state.follow && (
              <button onClick={this.handleFollow}> Follow </button>
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
