import React from 'react';
// import M from 'materialize-css'
// import { useHistory } from 'react-router-dom';
class CreatePost extends React.Component {
  render() {
    return (
      <div className='card input-field create-post' >
        <input
          type='text'
          placeholder='title'
          // value={title}
          // onChange={(e)=>setTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='body'
          //  value={body}
          // onChange={(e)=>setBody(e.target.value)}
        />
        <div className='file-field input-field'>
          <div className='btn #64b5f6 blue darken-1'>
            <span>Uplaod Image</span>
            {/* <input type="file" onChange={(e)=>setImage(e.target.files[0])} /> */}
          </div>
          <div className='file-path-wrapper'>
            <input className='file-path validate' type='text' />
          </div>
        </div>
        <button
          className='btn waves-effect waves-light #64b5f6 blue darken-1'
          // onClick={()=>postDetails()}
        >
          Submit post
        </button>
      </div>
    );
  }
}

export default CreatePost;
