import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import './index.css'

const App = ({ frequency = 10 }) => {
  // Handle Button Status To start or Stop Fetching Data
  const [isButtonActive, setIsButtonActive] = useState(false)

  // State to Handle instant acceleration values and also to re-rendering the component with useEffect
  const [sensorState, setSensorState] = useState('')

  //
  const handleAcceleration = useRef([])

  //
  const fallStatus = useRef('')

  // Define Our Accelerometer Object And memories it to avoid Fill the memories
  const accelerometer = useMemo(() => {
    return new window.Accelerometer({ frequency })
  }, [frequency])

  //
  const Accelerometer = useCallback(
    // Catch Acceleration Values
    (clean) => {
      if (!clean) {
        accelerometer.addEventListener('error', (event) => {
          // Handle runtime errors.
          if (event.error.name === 'NotAllowedError') {
            setSensorState('Access Denied')
          } else if (event.error.name === 'NotReadableError') {
            setSensorState('Cannot connect to the sensor.')
          }
        })
        accelerometer.addEventListener('reading', (event) => {
          setSensorState({
            x: event.target.x,
            y: event.target.y,
            z: event.target.z,
          })
        })
        accelerometer.start()
      }

      // Clean the memorie
      else {
        accelerometer.removeEventListener('error', (event) => {
          // Handle runtime errors.
        })
        accelerometer.removeEventListener('reading', (event) => {
          // Handle Data
        })
        accelerometer.stop()
      }
    },
    [accelerometer]
  )

  //
  useEffect(() => {
    if (isButtonActive) {
      Accelerometer(false)
    }

    return () => {
      if (isButtonActive) {
        Accelerometer(true)
      }
    }
  }, [isButtonActive, Accelerometer])

  //
  //
  const detectFall = () => {
    if (typeof sensorState === 'object') {
      const data = {}
      data.a = oneDecimalNumber(
        calcAcceleration(sensorState.x, sensorState.y, sensorState.z)
      )

      data.teta = oneDecimalNumber(
        calcAngle(sensorState.x, sensorState.y, sensorState.z)
      )
      if (data.teta > 55 && data.a > 19.6) {
        fallStatus.current = 'Fall Detected'
      }

      handleAcceleration.current.push(data)

      return (
        <div className='App'>
          <div className='control-aria'>
            <button
              className='btn'
              onClick={() => {
                setIsButtonActive(true)
              }}
            >
              Start
            </button>
            <button
              className='btn'
              onClick={() => {
                setIsButtonActive(false)
              }}
            >
              Stop
            </button>
          </div>
          <div className='live-data'>
            <div className='row-1'>
              <div>{`x : ${sensorState.x}`}</div>
              <div>{`y : ${sensorState.y}`}</div>
              <div>{`z : ${sensorState.z}`}</div>
            </div>
            <div className='row-1'>{`Fall Status : ${fallStatus.current}`}</div>
            <div className='row-1'>
              {handleAcceleration.current.map(({ a, teta }) => {
                return (
                  <div>
                    <div>{`A : ${a}`}</div>
                    <div>{`O : ${teta}`}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='App'>
        <div className='control-aria'>
          <button
            className='btn'
            onClick={() => {
              setIsButtonActive(true)
            }}
          >
            Start
          </button>
          <button
            className='btn'
            onClick={() => {
              setIsButtonActive(false)
            }}
          >
            Stop
          </button>
        </div>
        <div>{sensorState}</div>
      </div>
    )
  }

  //
  return <div>{getDeviceType(detectFall())}</div>
}

//
const getDeviceType = (script) => {
  const ua = navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Sorry our service is not available in Tablet :('
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return script || 'You are using a mobile'
  }
  return 'Sorry our service is not available in Laptop :('
}

//
const calcAcceleration = (valueOne, valueTwo, valueThree) => {
  return Math.sqrt(valueOne ** 2 + valueTwo ** 2 + valueThree ** 2)
}

//
const calcAngle = (valueOne, valueTwo, valueThree) => {
  // atan = arctan
  return (
    Math.atan(Math.sqrt(valueTwo ** 2 + valueThree ** 2) / valueOne) *
    (180 / Math.PI)
  )
}

//
const oneDecimalNumber = (num) => {
  return Math.round(num * 10) / 10
}

export default App
