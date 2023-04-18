import { useRef, useEffect, useState } from 'react'
import './index.css'
import '@tensorflow/tfjs'
import * as facemash from '@tensorflow-models/face-landmarks-detection'
import Webcam from 'react-webcam'
import axios from 'axios'
import { Col, Container, Row } from 'react-bootstrap'
const phone = require('./img/IMG_7094.PNG')

const App = () => {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  // const [url, setUrl] = useState()
  const [image, setImage] = useState()
  console.log('Hello ')

  const handleClick = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    postFunc(imageSrc)
    // setUrl(imageSrc)
  }

  const postFunc = img => {
    console.log(img)
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
    await facemash.load(facemash.SupportedPackages.mediapipeFacemesh)
    setInterval(() => {
      // detect(net)
    }, 10)
  }

  useEffect(() => {
    runFacemesh()

    // eslint-disable-next-line
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='phoneCam'>
          <Webcam ref={webcamRef} className='webcam' />
          <img src={phone} alt='' className='phone' />
          <canvas ref={canvasRef} className='canvas' />
          <button
            onClick={() => handleClick()}
            className='btn btn-primary cameraBtn'
          >
            Click ScreenShot
          </button>
        </div>
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
