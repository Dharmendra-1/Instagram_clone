import React from 'react';
import { withRouter } from 'react-router-dom';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: Number(localStorage.getItem('userId')),
      userName: '',
      firstName: '',
      url: 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
      post: [],
      follow: 0, //take from database later
      loginId: null,
      following: [],
      followers: [],
    };
  }
  count = 1;
  loginUserId = async () => {
    try {
      const res = await fetch('/dashboard/', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();

      this.setState({
        loginId: parseData.id,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  getDefaultFollow = async (id, fid) => {
    try {
      const res = await fetch('/user/defaultFollow/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          fid,
        }),
      });
      const followerValue = await res.json();
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
      const res = await fetch('/user/profile/img/', {
        method: 'POST',
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
      const res = await fetch('/user/post/');
      const postData = await res.json();

      let posts = postData.filter((obj) => obj.id === this.state.userId);

      this.setState({
        ...this.state,
        post: posts,
        userName: posts[0].last_name,
        firstName: posts[0].first_name,
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
    setTimeout(() => {
      this.getFollowerDetails();
    }, 500);
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
        await fetch('/user/follow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: this.state.loginId,
            fid: this.state.userId,
            follow: fol,
          }),
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  getFollowerDetails = async () => {
    const dataOfUser = await fetch('/user/followers');
    const orginalData = await dataOfUser.json();
    const followings = orginalData.reduce((currArr, obj) => {
      if (obj.id === this.state.userId) {
        if (obj.follow === 1) {
          currArr.push(obj);
        }
      }
      return currArr;
    }, []);

    const follower = orginalData.reduce((currArr, obj) => {
      if (obj.fid === this.state.userId) {
        if (obj.follow === 1) {
          currArr.push(obj);
        }
      }
      return currArr;
    }, []);

    this.setState({
      ...this.state,
      following: followings,
      followers: follower,
    });
  };

  componentDidMount() {
    this.loginUserId();
    this.userDetails();
    this.postDeatils();
    this.getFollowerDetails();
  }

  componentDidUpdate() {
    if (this.state.loginId && this.count) {
      this.count = 0;
      this.getDefaultFollow(this.state.loginId, this.state.userId);
    }
  }

  render() {
    return (
      <div style={{ maxWidth: '953px', margin: '0px auto' }}>
        <div className='profile'>
          <div className='profile-image1'>
            <section>
              <img alt='profile' src={this.state.url} />
            </section>
          </div>
          <div className='userdetails'>
            <h4>
              {this.state.userName}
              {!this.state.follow ? (
                <button
                  className='btn waves-effect waves-light #2196f3 blue'
                  onClick={this.handleFollow}
                >
                  <h4>Follow</h4>
                </button>
              ) : (
                <button
                  className='btn waves-effect waves-light unfollow'
                  onClick={this.handleFollow}
                >
                  <i className='medium material-icons'>person_outline</i>
                  <i className='small material-icons'>check</i>
                </button>
              )}
            </h4>
            <div className='user-stats'>
              <h6 style={{display:'flex'}}>
                <div style={{fontWeight:'bold'}}>{(this.state.post.length &&
                  this.state.post[0].pid &&
                  this.state.post.length) ||
                  0}</div>
                <div>&nbsp;posts</div>
              </h6>
              <h6 style={{display:'flex'}}>
                <div style={{fontWeight:'bold'}}>{this.state.followers.length}</div>
                <div>&nbsp;followers</div>
              </h6>
              <h6 style={{display:'flex'}}>
                <div style={{fontWeight:'bold'}}>{this.state.following.length}</div>
                <div>&nbsp;following</div>
              </h6>
            </div>
            <p>{this.state.firstName}</p>
          </div>
        </div>
        <div className='gallery'>
          {this.state.post.map((obj) => {
            if (obj.img) {
              return (
                <div key={obj.pid} className='item-container'>
                  <img className='item' src={obj.img} alt='post' />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(UserProfile);
