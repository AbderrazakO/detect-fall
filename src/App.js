import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const App = ({ frequency = 10 }) => {
  // Handle Button Status To start or Stop Fetching Data
  const [isButtonActive, setIsButtonActive] = useState(false)

  // State to Handle instant acceleration values and also to re-rendering the component with useEffect
  const [sensorState, setSensorState] = useState('')

  //
  const handleAcceleration = useRef([])

  //
  const fallStatus = useRef(false)

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

      data.t = handleAcceleration.current.length
      if (data.teta > 55 && data.a > 19.6) {
        fallStatus.current = true
      }

      handleAcceleration.current.push(data)

      const chart = () => {
        let chartData
        if (handleAcceleration.current.length <= 20) {
          chartData = handleAcceleration.current
        } else {
          chartData = handleAcceleration.current.slice(
            handleAcceleration.current.length - 21,
            handleAcceleration.current.length - 1
          )
        }
        return (
          <>
            <ResponsiveContainer width='90%' height={250}>
              <LineChart
                className='chart'
                data={chartData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='t' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey='a' stroke='#8884d8' />
              </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width='90%' height={250}>
              <LineChart
                className='chart'
                data={chartData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='t' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey='teta' stroke='#82ca9d' />
              </LineChart>
            </ResponsiveContainer>
          </>
        )
      }

      return (
        <>
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
            <button
              className='btn'
              onClick={() => {
                setIsButtonActive(false)
                setSensorState('')
                handleAcceleration.current = []
                fallStatus.current = false
              }}
            >
              Reset
            </button>
          </div>
          <div className='live-data'>
            <div className='row'>
              <div className='item'>{`x : ${oneDecimalNumber(
                sensorState.x
              )}`}</div>
              <div className='item'>{`y : ${oneDecimalNumber(
                sensorState.y
              )}`}</div>
              <div className='item'>{`z : ${oneDecimalNumber(
                sensorState.z
              )}`}</div>
            </div>
            <div className='row'>
              <div
                className={`${fallStatus.current}`}
              >{`Device is falling : ${fallStatus.current}`}</div>
            </div>
            <div className='draw'>{chart()}</div>
          </div>
        </>
      )
    }

    return (
      <>
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
      </>
    )
  }

  //
  return <div>{getDeviceType(detectFall())}</div>
}

//
const getDeviceType = (script) => {
  const ua = navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Sorry our service is not available for Tablet :('
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return script || 'You are using a mobile'
  }
  return 'Sorry our service is not available for Laptop :('
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
