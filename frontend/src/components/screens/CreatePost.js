import React from 'react';

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
      console.log(fileData.url);

      await fetch('http://localhost:4000/user/post', {
        method: 'POST',
        mode: 'cors',
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
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserId = async () => {
    const res = await fetch('http://localhost:4000/dashboard/', {
      method: 'POST',
      headers: { jwt_token: localStorage.token },
    });
    const parseData = await res.json();
    console.log(parseData);
    this.setState({ id: parseData.id });
  };

  componentDidMount() {
    this.getUserId();
  }

  render() {
    return (
      <div className='card input-field create-post' >
        <input
          type='text'
          placeholder='title'
          value={this.state.title}
          onChange={(e) => this.setState({ title: e.target.value })}
        />
        <input
          type='text'
          placeholder='body'
          value={this.state.body}
          onChange={(e) => this.setState({ body: e.target.value })}
        />
        <div className='file-field input-field'>
          <div className='btn #64b5f6 blue darken-1'>
            <span>Uplaod Image</span>
            <input
              type='file'
              onChange={(e) => this.setState({ img: e.target.files[0] })}
            />
          </div>
          <div className='file-path-wrapper'>
            <input className='file-path validate' type='text' />
          </div>
        </div>
        <button
          className='btn waves-effect waves-light #64b5f6 blue darken-1'
          onClick={() => this.postDetails()}
        >
          Submit post
        </button>
      </div>
    );
  }
}

export default CreatePost;
