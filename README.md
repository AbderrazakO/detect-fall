# Detect Fall Usin Accelerometer & Web APIs

## Overview

An accelerometer is a device that allows you to measure and analyse linear and angular acceleration ( the rate of change of an object’s velocity ) and takes measurements in one, two or three planes, this function is essential for many devices and systems whether it's to detect if a system is falling to detect seismic activity or to flip your phone to snooze \
There are two types of acceleration forces:

- Static forces are forces that are constantly being applied to the object (such as friction or gravity).
- Dynamic forces are “moving” forces applied to the object at various rates (such as vibration, or the force exerted on a ball).

\
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

| Sensor                    | Utilitie                                                                                                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AbsoluteOrientationSensor | Describes the device's physical orientation in relation to the Earth's reference coordinate system.                                                                               |
| Accelerometer             | Provides the acceleration applied to the device along all three axes.                                                                                                             |
| AmbientLightSensor        | Returns the current light level or illuminance of the ambient light around the hosting device.                                                                                    |
| GravitySensor             | Provides the gravity applied to the device along all three axes.                                                                                                                  |
| Gyroscope                 | Provides the angular velocity of the device along all three axes.                                                                                                                 |
| LinearAccelerationSensor  | Provides the acceleration applied to the device along all three axes, but without the contribution of gravity.                                                                    |
| Magnetometer              | Provides information about the magnetic field as detected by the device's primary magnetometer sensor.                                                                            |
| OrientationSensor         | The base class for the AbsoluteOrientationSensor. This interface cannot be used directly, instead it provides properties and methods accessed by interfaces that inherit from it. |
| RelativeOrientationSensor | Describes the device's physical orientation without regard to the Earth's reference coordinate system.                                                                            |

### Code

#### Vanilla JS

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

```tsx
import Link from 'next/link'
import { usePaths } from '@/lib/paths'

export const ProductLinkComponent = () => {
  const paths = usePaths()
  return (
    <Link href={paths.products._slug(line?.variant?.product?.slug).$url()}>
      <a>Product link</a>
    </Link>
  )
}
```
