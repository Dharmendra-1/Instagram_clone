import React from 'react';
import { Modal } from 'react-bootstrap';

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
      window.location.reload();

      await fetch('http://localhost:4000/user/img', {
        method: 'POST',
        mode: 'cors',
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
      const res = await fetch('http://localhost:4000/dashboard/', {
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
      const res = await fetch('http://localhost:4000/user/post');
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
    const dataOfUser = await fetch('http://localhost:4000/user/followers');
    const orginalData = await dataOfUser.json();
    const followings = orginalData.reduce((currArr, obj) => {
      if (obj.id === this.state.id) {
        if (obj.follow === 1) {
          currArr.push(obj);
        }
      }
      return currArr;
    }, []);

    const follower = orginalData.reduce((currArr, obj) => {
      if (obj.fid === this.state.id) {
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
                animation={false}
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
                    <br/>
                    <label className='custom-file-upload'>
                      <input
                        type='file'
                        onChange={(e) =>
                          this.setState({ image: e.target.files[0] })
                        }
                      />
                      Browse Files
                    </label>
                    <br/>
                    <div className='cancel' onClick={this.toggleModal}>Cancel</div>
                  </div>
                </Modal.Body>
              </Modal>
            </section>
          </div>
          <div className='userdetails'>
            <h4>{this.state.userName}</h4>
            <div className='user-stats'>
              <h6>
                {(this.state.post.length &&
                  this.state.post[0].pid &&
                  this.state.post.length) ||
                  0}{' '}
                posts
              </h6>
              <h6>{this.state.followers.length} followers</h6>
              <h6>{this.state.following.length} following</h6>
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

export default Profile;
