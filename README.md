# Detect Fall Usin Accelerometer & Web APIs

## Overview

An accelerometer is a device that allows you to measure and analyse linear and angular acceleration ( the rate of change of an object’s velocity ) and takes measurements in one, two or three planes, this function is essential for many devices and systems whether it's to detect if a system is falling to detect seismic activity or to flip your phone to snooze \
There are two types of acceleration forces:

- Static forces are forces that are constantly being applied to the object (such as friction or gravity).
- Dynamic forces are “moving” forces applied to the object at various rates (such as vibration, or the force exerted on a ball).

## Sensor Web APIs

The Sensor API is a set of interfaces built on a common design that exposes device sensors to the web platform in a consistent manner, and the accelerometer API is one of them .
\
The Generic Sensor API specification defines a sensor interface, but you never use it as a web developer. Instead, use one of its subclasses to get a particular type of sensor data. For example, the accelerometer interface returns the device's acceleration along all three axes when reading.
\
 The sensor may or may not correspond exactly to the physical device sensor. For example, a gyroscope interface corresponds exactly to a physical device interface. Alternatively, the AbsoluteOrientationSensor interface provides algorithmically aggregated information from two or more device sensors. These sensor types are called low level and high level. The latter type of sensor is also called a fusion sensor (or virtual or synthetic sensor).

| First Header              | Second Header                                                                                       |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| AbsoluteOrientationSensor | Describes the device's physical orientation in relation to the Earth's reference coordinate system. |
| Content Cell              | Content Cell                                                                                        |
