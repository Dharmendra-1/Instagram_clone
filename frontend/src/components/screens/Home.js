import React from 'react';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      loginId: null,
      comment: '',
      userComment: [],
    };
  }

  getUser = async () => {
    try {
      const res = await fetch('http://localhost:4000/user/post');
      const parseData = await res.json();
      parseData.sort((a, b) => (a.pid < b.pid ? 1 : -1));

      this.setState({ userData: parseData });
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
    }
  };

  deletePost = async (pid) => {
    try {
      await fetch('http://localhost:4000/user/post/' + pid, {
        method: 'delete',
      });
      window.location.reload();
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
  };

  getComments = async () => {
    const response = await fetch('http://localhost:4000/user/getComment');
    const postComment = await response.json();
    console.log(postComment);
    this.setState({
      ...this.state,
      userComment: postComment,
    });
  };

  componentDidMount() {
    this.getUser();
    this.loginUserId();
    this.getComments();
  }

  render() {
    return (
      <div className='home'>
        {this.state.userData.map((data) => {
          if (data.pid) {
            return (
              <div className='card home-card' style={{}}>
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
                  <div className='likes'>
                    <i className='small material-icons'>favorite_border</i>
                    <br />
                    {data.like_count} likes
                  </div>
                  <div className='caption'>
                    <div
                      style={{ marginRight: 10 }}
                      onClick={() => this.goToUserProfile(data.id)}
                    >
                      {data.last_name}
                    </div>
                    <div style={{ fontWeight: 'normal' }}>{data.title}</div>
                  </div>
                  <div>
                    {this.state.userComment
                      .filter((obj) => obj.pid === data.pid)
                      .map((record) => {
                        return (
                          <h6 key={record.cid}>
                            <span style={{ fontWeight: '500' }}></span>{' '}
                            {record.comment}
                          </h6>
                        );
                      })}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        this.submitForm(data.pid);
                      }}
                    >
                      <input
                        type='text'
                        placeholder='add a comment'
                        value={this.state.comment}
                        onChange={(e) => {
                          this.setState({
                            ...this.state,
                            comment: e.target.value,
                          });
                        }}
                      />
                      <button type='submit'>Submit</button>
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
