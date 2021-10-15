import React from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      loginId: null,
      comment: '',
      userComment: [],
      postLike: [],
      // toggleLike: false,
      toggleComments: false,
      pid: null,
      userLike: [],
      following: [],
      showData: [],
    };
  }

  getUser = async () => {
    try {
      const res = await fetch('http://localhost:4000/user/post');
      const parseData = await res.json();
      parseData.sort((a, b) => (a.pid < b.pid ? 1 : -1));
      this.setState({ userData: parseData });

      //console.log(this.state.userData);
    } catch (err) {
      console.error(err.message);
    }
  };

  loginUserId = async () => {
    try {
      const res = await fetch('http://localhost:4000/dashboard/', {
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

  goToUserProfile = (id) => {
    if (id === this.state.loginId) {
      this.props.history.push(`/profile`);
    } else {
      this.props.history.push(`/profile/user`, { id });
      localStorage.setItem('userId', id);
    }
  };

  deletePost = async (pid) => {
    try {
      await fetch('http://localhost:4000/user/comment/' + pid, {
        method: 'delete',
      });

      await fetch('http://localhost:4000/user/like/' + pid, {
        method: 'delete',
      });

      await fetch('http://localhost:4000/user/post/' + pid, {
        method: 'delete',
      });

      this.getUser();
      setTimeout(() => {
        this.getFollowerDetails();
      }, 200);
    } catch (err) {
      console.error(err.message);
    }
  };

  submitForm = async (pid) => {
    await fetch('http://localhost:4000/user/comment', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: this.state.comment,
        id: this.state.loginId,
        pid: pid,
      }),
    });

    this.setState({ ...this.state, comment: '' });
  };

  getComments = async () => {
    try {
      const response = await fetch('http://localhost:4000/user/getComment');
      const postComment = await response.json();
      this.setState({
        ...this.state,
        userComment: postComment,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  dolike = async (pid) => {
    try {
      await fetch('http://localhost:4000/user/like', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: this.state.loginId, pid }),
      });
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  getLike = async () => {
    try {
      const response = await fetch('http://localhost:4000/user/getLike');
      const postLikes = await response.json();
      const like = postLikes
        .filter((likes) => likes.id === this.state.loginId)
        .map((data) => data.pid);
      this.setState({
        ...this.state,
        postLike: postLikes,
        userLike: like,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  getFollowerDetails = async () => {
    const dataOfUser = await fetch('http://localhost:4000/user/followers');
    const orginalData = await dataOfUser.json();
    const followings = orginalData.reduce((currArr, obj) => {
      if (obj.id === this.state.loginId) {
        if (obj.follow === 1) {
          currArr.push(obj);
        }
      }
      return currArr;
    }, []);

    this.setState({
      ...this.state,
      following: followings,
    });

    let idOfMatch = [this.state.loginId];
    this.state.following.forEach((obj) => {
      idOfMatch.push(obj.id);
      idOfMatch.push(obj.fid);
    });

    const filterData = this.state.userData.filter((obj) => {
      if (idOfMatch.indexOf(obj.id) !== -1) {
        return obj;
      }
      return null;
    });

    this.setState({
      ...this.state,
      showData: filterData,
    });
  };

  // handleLike()
  handleComments = (pid) => {
    if (this.state.toggleComments) {
      this.setState({ ...this.state, pid, toggleComments: false });
    } else {
      this.setState({ ...this.state, pid, toggleComments: true });
    }
  };

  componentDidMount() {
    this.getUser();
    this.loginUserId();
    this.getComments();
    this.getLike();
    setTimeout(() => {
      this.getFollowerDetails();
    }, 200);
  }

  render() {
    return (
      <div className='home'>
        {this.state.showData.map((data) => {
          if (data.pid) {
            return (
              <div key={data.pid} className='card home-card' style={{}}>
                <div className='postheadername'>
                  <h5
                    style={{ display: 'inline' }}
                    onClick={() => this.goToUserProfile(data.id)}
                  >
                    {data.last_name}
                  </h5>
                  {data.id === this.state.loginId ? (
                    <i
                      className='material-icons'
                      style={{
                        float: 'right',
                      }}
                      onClick={() => this.deletePost(data.pid)}
                    >
                      delete
                    </i>
                  ) : null}
                </div>
                <div className='imgsize'>
                  <img className='card-image' src={data.img} alt='post' />
                </div>

                <div className='likeandcomment'>
                  <div className='lc-icons'>
                    <div className='likes'>
                      {this.state.userLike.includes(data.pid) ? (
                        <i
                          onClick={() => {
                            this.dolike(data.pid);
                            setTimeout(() => {
                              this.getLike();
                            }, 200);
                          }}
                          className='small material-icons'
                          style={{ color: 'red' }}
                        >
                          favorite
                        </i>
                      ) : (
                        <i
                          onClick={() => {
                            this.dolike(data.pid);
                            setTimeout(() => {
                              this.getLike();
                            }, 200);
                          }}
                          className='small material-icons'
                        >
                          favorite_border{' '}
                        </i>
                      )}
                      {
                        this.state.postLike.filter(
                          (obj) => obj.pid === data.pid
                        ).length
                      }{' '}
                      likes
                    </div>
                    <div onClick={() => this.handleComments(data.pid)}>
                      <i className='small material-icons'>comment</i>
                    </div>
                  </div>
                  <div className='caption'>
                    <div
                      className='captionuser'
                      style={{ marginRight: 10 }}
                      onClick={() => this.goToUserProfile(data.id)}
                    >
                      {data.last_name}
                    </div>
                    <div style={{ fontWeight: 'normal' }}>{data.title}</div>
                  </div>

                  <div className='showcomment'>
                    {
                      this.state.userComment
                        .filter((obj) => obj.pid === data.pid)
                        .map((record) => {
                          return (
                            <h6
                              key={record.cid}
                              className='username'
                              onClick={() => this.goToUserProfile(record.id)}
                            >
                              <span style={{ fontWeight: 'bold' }}>
                                {' '}
                                {record.last_name}
                              </span>
                              <span>&nbsp;&nbsp;&nbsp;{record.comment}</span>
                            </h6>
                          );
                        })
                        .reverse()[0]
                    }
                  </div>

                  <Modal
                    show={this.state.toggleComments}
                    animation={false}
                    className='comment-modal'
                  >
                    <Modal.Header className='modal-header'>
                      <Modal.Title>comments</Modal.Title>
                      <button className='btn' onClick={this.handleComments}>
                        <i className='material-icons'>close</i>
                      </button>
                    </Modal.Header>
                    <Modal.Body className='showcomment'>
                      <div className='modal-comment'>
                        {this.state.userComment
                          .filter((obj) => obj.pid === this.state.pid)
                          .map((record) => {
                            return (
                              <h6
                                key={record.cid}
                                className='username'
                                onClick={() => this.goToUserProfile(record.id)}
                              >
                                <span style={{ fontWeight: 'bold' }}>
                                  {' '}
                                  {record.last_name}
                                </span>
                                <span>&nbsp;&nbsp;&nbsp;{record.comment}</span>
                              </h6>
                            );
                          })}
                      </div>
                      <div className='comment'>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (this.state.comment !== '') {
                              this.submitForm(this.state.pid);
                              setTimeout(() => {
                                this.getComments();
                              }, 200);
                            }
                          }}
                        >
                          <div className='commentsection'>
                            <textarea
                              aria-label='Add a comment…'
                              placeholder='Add a comment…'
                              value={this.state.comment}
                              onChange={(e) => {
                                this.setState({
                                  ...this.state,
                                  comment: e.target.value,
                                });
                              }}
                            ></textarea>
                            <button className='btn' type='submit'>
                              POST
                            </button>
                          </div>
                        </form>
                      </div>
                    </Modal.Body>
                  </Modal>

                  <div className='comment'>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (this.state.comment !== '') {
                          this.submitForm(data.pid);
                          setTimeout(() => {
                            this.getComments();
                          }, 200);
                        }
                      }}
                    >
                      {!this.state.toggleComments && (
                        <div className='commentsection'>
                          <textarea
                            aria-label='Add a comment…'
                            placeholder='Add a comment…'
                            value={this.state.comment}
                            onChange={(e) => {
                              this.setState({
                                ...this.state,
                                comment: e.target.value,
                              });
                            }}
                          ></textarea>
                          <button className='btn' type='submit'>
                            POST
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  }
}

export default withRouter(Home);
