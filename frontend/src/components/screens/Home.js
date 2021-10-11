import React from 'react';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: [],
    };
  }
  getUser = async () => {
    try {
      const res = await fetch('http://localhost:4000/user/post');
      const parseData = await res.json();
      this.setState({ userData: parseData.reverse() });
    } catch (err) {
      console.error(err.message);
    }
  };
  componentDidMount() {
    this.getUser();
  }
  render() {
    return (
      <div className='home'>
        {this.state.userData.map((data) => {
          if (data.pid) {
            return (
              <div key={data.pid} className='card home-card'>
                <h5>{data.last_name}</h5>
                <div className='card-image'>
                  <img src={data.img} alt='post' />
                </div>
                <div>
                  <span>likes:</span>
                  {data.like}
                </div>
                <div>{data.last_name + ' ' + data.title}</div>
                <div>{data.body}</div>
                <div>{data.comments} </div>
              </div>
            );
          } else {
            return <div key={data.id}></div>;
          }
        })}
      </div>
    );
  }
}

export default withRouter(Home);
