import { useRef, useEffect, useState } from 'react'
import './index.css'
import '@tensorflow/tfjs'
import * as facemash from '@tensorflow-models/face-landmarks-detection'
import Webcam from 'react-webcam'
import axios from 'axios'
import { Col, Container, Row } from 'react-bootstrap'

const App = () => {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  // const [url, setUrl] = useState()
  const [image, setImage] = useState()

  const handleClick = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    postFunc(imageSrc)
    // setUrl(imageSrc)
  }

  const postFunc = (img) => {
    console.log(img);
    axios
      .post('https://server-tapu.onrender.com/data', { img: img })
      .then(res => {
        alert(res.status)
      })
  }

  const getData = async () => {
    await axios.get('https://server-tapu.onrender.com/data').then(res => {
      setImage(res.data)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const runFacemesh = async () => {
    const net = await facemash.load(
      facemash.SupportedPackages.mediapipeFacemesh
    )
    setInterval(() => {
      // detect(net)
    }, 10)
  }

  // const detect = async net => {
  //   if (
  //     typeof webcamRef.current !== 'undefined' &&
  //     webcamRef.current !== null &&
  //     webcamRef.current.video.readyState === 4
  //   ) {
  //     // get video properties
  //     const video = webcamRef.current.video
  //     const videoWidth = webcamRef.current.video.videoWidth
  //     const videoHeight = webcamRef.current.video.videoHeight

  //     // set video width
  //     webcamRef.current.video.width = videoWidth
  //     webcamRef.current.video.height = videoHeight

  //     // set canvas width
  //     canvasRef.current.width = videoWidth
  //     canvasRef.current.height = videoHeight

  //     // detection
  //     const face = await net.estimateFaces({ input: video })
  //     // ctx get from canvas
  //     const ctx = canvasRef.current.getContext('2d')
  //     requestAnimationFrame(() => {
  //       drawMesh(face, ctx)
  //     })
  //   }
  // }

  useEffect(() => {
    runFacemesh()

    // eslint-disable-next-line
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <Webcam ref={webcamRef} className='webcam' />
        <canvas ref={canvasRef} className='canvas' />
        <button
          onClick={() => handleClick()}
          className='btn btn-primary cameraBtn'
        >
          Click ScreenShot
        </button>
      </header>
      <Container>
        <h1>Tasodifiy rasmlar😆</h1>
        <Row>
          {image?.map(item => {
            return (
              <Col lg={2}>
                <>
                  <img src={item?.img} alt='' className='imageScreen' />
                </>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}
export default App
