import React from 'react';
import { Modal } from 'react-bootstrap';
import M from 'materialize-css';
import { withRouter } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    const { setImage } = this.props;
    this.state = {
      userName: '',
      firstName: '',
      email: '',
      image: '',
      url: '',
      toggle: false,
      setImage,
      post: [],
      id: null,
      followers: [],
      following: [],
      toggleFollowers: false,
      toggleFollowing: false,
      followingList: [],
      followersList: [],
    };
  }

  postDetails = async () => {
    try {
      this.setState({ ...this.state, toggle: false });

      const data = new FormData();
      data.append('file', this.state.image);
      data.append('upload_preset', 'insta-clone');
      data.append('cloud_name', 'dg3xxjlfx');
      const response = await fetch(
        '	https://api.cloudinary.com/v1_1/dg3xxjlfx/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );

      const fileData = await response.json();
      M.toast({
        html: 'Profile image updated!',
        classes: '#43a047 green darken-1',
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);

      await fetch('/user/img', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: this.state.email, img: fileData.url }),
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  userData = async () => {
    try {
      const res = await fetch('/dashboard/', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      this.setState({
        userName: parseData.last_name,
        firstName: parseData.first_name,
        email: parseData.user_email,
        url: parseData.img,
        id: parseData.id,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  toggleModal = () => {
    if (this.state.toggle) {
      this.setState({ ...this.state, toggle: false });
    } else {
      this.setState({ ...this.state, toggle: true });
    }
  };

  postDeatils = async () => {
    try {
      const res = await fetch('/user/post');
      const postData = await res.json();
      let usefulData = postData.filter((obj) => obj.id === this.state.id);
      this.setState({
        post: usefulData,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  getFollowerDetails = async () => {
    try {
      const dataOfUser = await fetch('/user/followers');
      const res = await fetch('/user');

      const orginalData = await dataOfUser.json();
      const followingIds = [];
      const followerIds = [];

      const followings = orginalData.reduce((currArr, obj) => {
        if (obj.id === this.state.id) {
          if (obj.follow === 1) {
            currArr.push(obj);
          }
        }
        return currArr;
      }, []);
      followings.forEach((data) => followingIds.push(data.fid));

      const follower = orginalData.reduce((currArr, obj) => {
        if (obj.fid === this.state.id) {
          if (obj.follow === 1) {
            currArr.push(obj);
          }
        }
        return currArr;
      }, []);
      follower.forEach((data) => followerIds.push(data.id));

      this.setState({
        ...this.state,
        following: followings,
        followers: follower,
      });

      const parseData = await res.json();
      const followingUsers = parseData.filter((data) =>
        followingIds.includes(data.id)
      );

      const followerUsers = parseData.filter((data) =>
        followerIds.includes(data.id)
      );
      this.setState({
        ...this.state,
        followingList: followingUsers,
        followersList: followerUsers,
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleToggleFollowing = () => {
    if (this.state.toggleFollowing) {
      this.setState({ ...this.state, toggleFollowing: false });
    } else {
      this.setState({ ...this.state, toggleFollowing: true });
    }
  };

  handleToggleFollowers = () => {
    if (this.state.toggleFollowers) {
      this.setState({ ...this.state, toggleFollowers: false });
    } else {
      this.setState({ ...this.state, toggleFollowers: true });
    }
  };

  goToUserProfile = (pid) => {
    this.props.history.push('/profile/user');
    localStorage.setItem('userId', pid);
  };

  componentDidMount() {
    this.userData();
    setTimeout(() => {
      this.postDeatils();
    }, 200);
    this.getFollowerDetails();
  }

  render() {
    return (
      <div style={{ maxWidth: '953px', margin: '0px auto' }}>
        <div className='profile'>
          <div className='profile-image'>
            <section>
              <button onClick={this.toggleModal}>
                {this.state.url && <img alt='profile' src={this.state.url} />}
                {!this.state.url && (
                  <i type='file' className='small material-icons'>
                    add_a_photo
                  </i>
                )}
              </button>

              <Modal
                show={this.state.toggle}
                className='modal fade profile-pic-modal'
              >
                <Modal.Header className='modal-header'>
                  <Modal.Title>Upload Profile Picture</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <div className='file-field input-field browse'>
                    <div className='upload' onClick={this.postDetails}>
                      Upload Photo
                    </div>
                    <br />
                    <label className='custom-file-upload'>
                      <input
                        type='file'
                        onChange={(e) =>
                          this.setState({ image: e.target.files[0] })
                        }
                      />
                      Browse Files
                    </label>
                    <br />
                    <div className='cancel' onClick={this.toggleModal}>
                      Cancel
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </section>
          </div>
          <div className='userdetails'>
            <h4>{this.state.userName}</h4>
            <div className='user-stats'>
              <h6 style={{ display: 'flex' }}>
                <div style={{ fontWeight: 'bold' }}>
                  {(this.state.post.length &&
                    this.state.post[0].pid &&
                    this.state.post.length) ||
                    0}
                </div>
                <div>&nbsp;posts</div>
              </h6>
              <h6
                style={{ display: 'flex' }}
                onClick={this.handleToggleFollowers}
              >
                <div style={{ fontWeight: 'bold' }}>
                  {this.state.followers.length}
                </div>
                <div>&nbsp;followers</div>
              </h6>
              <h6
                style={{ display: 'flex' }}
                onClick={this.handleToggleFollowing}
              >
                <div style={{ fontWeight: 'bold' }}>
                  {this.state.following.length}
                </div>
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

        <div className='follow'>
          <Modal
            show={this.state.toggleFollowing}
            className='modal fade profile-pic-modal'
          >
            <Modal.Header>
              <div className='follow-head'>
                <div className='follow-title'>Following</div>
                <div>
                  <button onClick={this.handleToggleFollowing} type='btn'>
                    <i className='material-icons'>close</i>
                  </button>
                </div>
              </div>
            </Modal.Header>
            <div className='follow-body'>
              <br />
              {this.state.followingList.map((data) => {
                return (
                  <div
                    onClick={() => this.goToUserProfile(data.id)}
                    key={data.id}
                  >
                    {data.last_name}
                  </div>
                );
              })}
            </div>
          </Modal>
        </div>
        <div className='follow'>
          <Modal
            show={this.state.toggleFollowers}
            className='modal fade profile-pic-modal'
          >
            <Modal.Header>
              <div className='follow-head'>
                <div className='follow-title'>Followers</div>
                <div>
                  <button onClick={this.handleToggleFollowers} type='btn'>
                    <i className='material-icons'>close</i>
                  </button>
                </div>
              </div>
            </Modal.Header>
            <div className='follow-body'>
              <br />
              {this.state.followersList.map((data) => {
                return (
                  <div
                    onClick={() => this.goToUserProfile(data.id)}
                    key={data.id}
                  >
                    {data.last_name}
                  </div>
                );
              })}
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
