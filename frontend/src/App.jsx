
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VideoPlayer from './videoPlayer'
import { useRef } from 'react'
import axios from "axios";

function App() {

const [videoLink,setVideoLink]=useState("");



  const handleFileChange=async(event)=>{
    const file=event.target.files[0];
   
     const formData = new FormData();
     formData.append('file', file);
    try{
      const { data } = await axios.post(
        "http://localhost:4000/upload",
       formData,  { headers: {
        'Content-Type': 'multipart/form-data'
    },},
      
      );
      console.log(data);
      
      setVideoLink(data.videoUrl);
    }catch(error){
      console.log(error);
    }

  }
  const playerRef = useRef(null)
  // const videoLink = "http://localhost:4000/uploads/courses/1b133726-2631-4539-99ca-b655af58ab34/index.m3u8"
console.log(videoLink);
  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL"
      }
    ]
  }
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };




  return (
    <>
       {/* <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Select Video
            </label>
            <input
              type="file"
              
              onChange={handleFileChange}
              style={{ width: "100%" }}
            />
          </div>  */}
       <div className="file-upload-container">
        <label htmlFor="fileInput" className="custom-file-upload">
            Select Video
        </label>
        <input type="file" id="fileInput" onChange={handleFileChange} className="file-input"/> 
       
 </div> 
      <div>
        <h1>Video player</h1>
      </div>
      <VideoPlayer
      options={videoPlayerOptions}
      onReady={handlePlayerReady}
      />
    </>
  )
}

export default App
