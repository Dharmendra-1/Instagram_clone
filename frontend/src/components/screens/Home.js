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

  deletePost = (id) => {
    if (id === this.state.loginId) {
      this.props.history.push(`/createpost`);
    } else {
      this.props.history.push(`/createpost`);
      // this.props.history.push(`/createpost`,{id}); use this instead
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
                  {data.id === this.loginId}
                  <i
                    className='material-icons'
                    style={{
                      float: 'right',
                    }}
                    onClick={() => this.deletePost()}
                  >
                    delete
                  </i>
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
