import React from 'react';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      loginId: null,
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
      const res = await fetch('http://localhost:4000/user/post/' + pid, {
        method: 'delete',
      });
      const parseData = await res.json();
      console.log(parseData);
      window.location.reload(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  dolike = async (id, pid) => {
    try {
      const likes = await fetch('http://localhost:4000/user/getLike', {
        method: 'GET',
        mode: 'cors',
      });

      const likeData = await likes.json();

      likeData.map(async (data) => {
        console.log(data);
        if (data.id === this.state.loginId && data.pid === pid) {
          const unlike = await fetch('http://localhost:4000/user/unlike', {
            method: 'put',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: this.state.loginId, pid }),
          });

          const unlikeData = await unlike.json();
          console.log(unlikeData);
        }
      });
      if (id !== this.state.loginId) {
        const like = await fetch('http://localhost:4000/user/like', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: this.state.loginId, pid }),
        });
        const likeData = await like.json();
        console.log(likeData);
      }

      // window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  componentDidMount() {
    this.getUser();
    this.loginUserId();
  }
  render() {
    return (
      <div className='home'>
        {this.state.userData.map((data) => {
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
                  <div className='likes'>
                    <i
                      onClick={() => this.dolike(data.id, data.pid)}
                      className='small material-icons'
                    >
                      favorite_border
                    </i>
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
                    {data.comment}

                    {/* {item.comments.map((record) => {
                  return (
                    <h6 key={record._id}>
                      <span style={{ fontWeight: '500' }}>
                        {record.postedBy.name}
                      </span>{' '}
                      {record.text}
                    </h6>
                  );
                })} */}
                    <form

                    // onSubmit={(e) => {
                    //   e.preventDefault();
                    //   makeComment(e.target[0].value, item._id);
                    // }}
                    >
                      <input type='text' placeholder='add a comment' />
                    </form>
                  </div>
                </div>
              </div>
            );
          } else {
            return <div key={data.pid}></div>;
          }
        })}
      </div>
    );
  }
}

export default withRouter(Home);
