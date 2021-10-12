import React from 'react';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    const { userId } = this.props;
    this.state = {
      userId,
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
    this.state.userId(id);
    if (id === this.state.loginId) {
      this.props.history.push(`/profile`);
    } else {
      this.props.history.push(`/profile/user`);
    }
  };

  deletePost = (id) => {
    this.state.userId(id);
    if (id === this.state.loginId) {
      this.props.history.push(`/createpost`);
    } else {
      this.props.history.push(`/createpost`);
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
                <div>
                  <h5
                    style={{ display: 'inline' }}
                    onClick={() => this.goToUserProfile(data.id)}
                  >
                    {data.last_name}
                  </h5>
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
                <div className='card-image'>
                  <img src={data.img} alt='post' />
                </div>
                <div>
                  <span>likes:</span>
                  {data.like_count}
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ marginRight: 10 }}>{data.last_name}</div>
                  <div style={{ fontWeight: 'normal' }}>{data.title}</div>
                </div>

                <div>{data.comment} </div>
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
