import React from 'react';
import M from 'materialize-css';

class CreatePost extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      body: '',
      img: '',
      id: '',
    };
  }

  postDetails = async () => {
    try {
      const data = new FormData();
      data.append('file', this.state.img);
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
      await fetch('/user/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.state.title,
          body: this.state.body,
          img: fileData.url,
          id: this.state.id,
        }),
      });

      setTimeout(() => {
        window.location.reload();
      }, 500);
      M.toast({
        html: 'New post created',
        classes: '#43a047 green darken-1',
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserId = async () => {
    const res = await fetch('/dashboard/', {
      method: 'POST',
      headers: { jwt_token: localStorage.token },
    });
    const parseData = await res.json();
    this.setState({ id: parseData.id });
  };

  componentDidMount() {
    this.getUserId();
  }

  render() {
    return (
      <div className='card input-field create-post'>
        <button
          className='btn check-it right'
          onClick={() => this.postDetails()}
        >
          <i className='large material-icons check'>check</i>
        </button>
        <div className='file-field input-field browse'>
          <div className='btn #64b5f6 blue darken-1'>
            <span>Browse Files</span>
            <input
              type='file'
              onChange={(e) => this.setState({ img: e.target.files[0] })}
            />
          </div>
          <div className='file-path-wrapper'>
            <input className='file-path validate' type='text' />
          </div>
        </div>
        <input
          type='text'
          placeholder='Write a caption...'
          value={this.state.title}
          onChange={(e) => this.setState({ title: e.target.value })}
        />
        <input
          type='text'
          placeholder='#tag'
          value={this.state.body}
          onChange={(e) => this.setState({ body: e.target.value })}
        />
      </div>
    );
  }
}

export default CreatePost;
