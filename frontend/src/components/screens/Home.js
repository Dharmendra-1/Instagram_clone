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
      const res = await fetch('http://localhost:4000/user/home');
      const parseData = await res.json();
      this.setState({ userData: parseData });
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
          if (data.first_name) {
            return (
              <div key={data.id} className='card home-card'>
                <h5>{data.profile + ' ' + data.first_name}</h5>
                <div className='card-image'>
                  <img src={data.image_url} alt='post' />
                </div>
                <div>
                  <span>likes:</span>
                  {data.like}
                </div>
                <div>{data.first_name + ' ' + data.caption}</div>
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
