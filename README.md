# Detect Fall Usin Accelerometer & Web APIs

## Overview

An accelerometer is a device that allows you to measure and analyse linear and angular acceleration ( the rate of change of an object’s velocity ) and takes measurements in one, two or three planes, this function is essential for many devices and systems whether it's to detect if a system is falling to detect seismic activity or to flip your phone to snooze \
There are two types of acceleration forces:

- Static forces are forces that are constantly being applied to the object (such as friction or gravity).
- Dynamic forces are “moving” forces applied to the object at various rates (such as vibration, or the force exerted on a ball).

\
In this project we build a fall-detection systems, that we can use in our smart phone to resolve the problem of falls among the elderly.
\
Technologies used :

- ReactJs
- Sass
- Web APIs
- Recharts

## Setup

Clone the project

```bash
git clone https://github.com/AbderrazakO/detect-fall.git
```

Install dependencies:

```bash
npm i
```

Start the server:

```bash
npm start
```

## Development

### Sensor Web APIs

The Sensor API is a set of interfaces built on a common design that exposes device sensors to the web platform in a consistent manner, and the accelerometer API is one of them .
\
The Generic Sensor API specification defines a sensor interface, but you never use it as a web developer. Instead, use one of its subclasses to get a particular type of sensor data. For example, the accelerometer interface returns the device's acceleration along all three axes when reading.
\
 The sensor may or may not correspond exactly to the physical device sensor. For example, a gyroscope interface corresponds exactly to a physical device interface. Alternatively, the AbsoluteOrientationSensor interface provides algorithmically aggregated information from two or more device sensors. These sensor types are called low level and high level. The latter type of sensor is also called a fusion sensor (or virtual or synthetic sensor).
\
For more information :
<a href="https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs">MDN Sensor Web API</a>
| Sensor | Utilitie |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AbsoluteOrientationSensor | Describes the device's physical orientation in relation to the Earth's reference coordinate system. |
| Accelerometer | Provides the acceleration applied to the device along all three axes. |
| AmbientLightSensor | Returns the current light level or illuminance of the ambient light around the hosting device. |
| GravitySensor | Provides the gravity applied to the device along all three axes. |
| Gyroscope | Provides the angular velocity of the device along all three axes. |
| LinearAccelerationSensor | Provides the acceleration applied to the device along all three axes, but without the contribution of gravity. |
| Magnetometer | Provides information about the magnetic field as detected by the device's primary magnetometer sensor. |
| OrientationSensor | The base class for the AbsoluteOrientationSensor. This interface cannot be used directly, instead it provides properties and methods accessed by interfaces that inherit from it. |
| RelativeOrientationSensor | Describes the device's physical orientation without regard to the Earth's reference coordinate system. |

### Using Accelerometer Sensor

The code below work also for :

- GravitySensor
- Gyroscope
- LinearAccelerationSensor
- Magnetometer
  You need hust to change Accelerometer keyword to sensor name that you want

#### Vanilla JS

You can get acceleration values using the code below

```tsx
let acl = new Accelerometer({ frequency: 60 })
acl.addEventListener('reading', () => {
  console.log('Acceleration along the X-axis ' + acl.x)
  console.log('Acceleration along the Y-axis ' + acl.y)
  console.log('Acceleration along the Z-axis ' + acl.z)
})

acl.start()
```

#### React JS

First of all we gonna need two variable :

- One to handle Button status
- The second to handle sensor status or acceleration values

```tsx
// Handle Button Status To start or Stop Fetching Data
const [isButtonActive, setIsButtonActive] = useState(false)

// State to Handle instant acceleration values and also to re-rendering the component with useEffect
const [sensorState, setSensorState] = useState('')
```

Then were gonna create a new accelerometer object and memoized it using useMemo to avoid create new object after every re-rendering

```tsx
const accelerometer = useMemo(() => {
  return new window.Accelerometer({ frequency }) // Notice that the frequency values is between 0 and 60 hz
}, [frequency])
```

To avoid unnecessary renders we use useCallback in which we set our logic to handle accelerometer status or acceleration values after an eventListener or to cleanup the eventListener

```tsx
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
```

And the last thing we need to add a side effect

```tsx
useEffect(() => {
  if (isButtonActive) {
    Accelerometer(false) // Add Event
  }

  return () => {
    if (isButtonActive) {
      Accelerometer(true) // Remove Event
    }
  }
}, [isButtonActive, Accelerometer])
```

### Fall Detect
