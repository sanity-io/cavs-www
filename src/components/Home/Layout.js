import THREE from 'three-js/three'
import Component3D from './DSpace/Component3D'
import React from 'react'
import Vantage from './DSpace/Vantage'
import { NavPath, NavStops } from './DSpace/Navigator'

function ensureBasicVantagePoint(obj, distance) {
  // Only set if no current vantage point
  if (obj.vantages) return
  const vantage = new Vantage(obj)
  vantage.position.z = distance || 800
  obj.add(vantage)
  obj.vantages = [vantage]
}

function wrapReactComponents(objs) {
  return objs.map(obj => {
    if (React.isValidElement(obj)) {
      return new Component3D(obj)
    }
    return obj
  })
}

export class Barrel extends THREE.Object3D {
  constructor(options) {
    super()
    this.spacing = options.spacing || 10
    const objs = wrapReactComponents(options.components) //.map((c) => new Component3D(c))
    objs.forEach(obj => {
      ensureBasicVantagePoint(obj)
    })
    this.centroid = new THREE.Object3D()
    this.centroid.add(...objs)
    this.add(this.centroid)
    this.objs = objs
    this.vantages = objs[0].vantages
    this.nav = new NavStops(objs, { cyclic: true })
  }

  update() {
    let unitWidth = 0
    const objs = this.centroid.children
    this.height = objs[0].height
    this.width = objs[0].width
    this.vantages = objs[0].vantages
    objs.forEach(o => {
      if (o.width > unitWidth) {
        unitWidth = o.width
      }
    })
    const len = objs.length
    const diameter = (unitWidth + this.spacing) * len
    const radius = diameter / (2 * Math.PI)
    this.centroid.position.z = radius
    let angle = Math.PI
    const deltaAngle = Math.PI * 2 / len
    for (let i = 0; i < len; i++) {
      const obj = objs[i]
      // HACK to zoom out from big items
      if (obj.width > 1000 || obj.height > 1000) {
        obj.vantages[0].position.z = 1000
      }
      obj.position.x = Math.sin(angle) * radius
      obj.position.z = Math.cos(angle) * radius
      obj.position.y = objs[0].height / 2 - obj.height / 2
      obj.rotation.y = angle + Math.PI
      angle -= deltaAngle
    }
  }
}


export class Theme extends THREE.Object3D {
  constructor(options) {
    super()
    const objs = wrapReactComponents(options.components) //options.components.map((c) => new Component3D(c))

    // Create vantage points for each object
    objs.forEach(obj => ensureBasicVantagePoint(obj))

    this.add(...objs)
    this.objs = objs

    this.randoms = objs.map(() => {
      return Math.random()
    })

    // this.nav = new NavPath(objs)
    this.vantages = [objs[0].vantages[0]]
    this.width = 0
    this.height = 0
    this.t = 0

    this.xCurl = Math.random() * 0.8 - 0.4
    this.yCurl = Math.random() * 0.8 - 0.4
    this.zDisplacement = Math.random() * 40 - 20
  }

  update() {
    const len = this.children.length
    let prev = null
    let obj = null
    this.width = 0
    this.height = 0
    this.t += 1
    for (let i = 0; i < len; i++) {
      prev = obj
      obj = this.children[i]
      if (prev) {
        if (prev.height === null || obj.height == null) break

        const oldPos = obj.position.clone()
        obj.position.copy(prev.position)
        obj.quaternion.copy(prev.quaternion)
        const displacement = new THREE.Vector3(0, - prev.height / 2 - obj.height / 2 - 100, this.zDisplacement)
        displacement.applyQuaternion(prev.quaternion)
        obj.position.addVectors(obj.position, displacement)

        obj.rotation.x += this.xCurl
        obj.rotation.y += this.yCurl
        // obj.quaternion.multiply(prev.quaternion)


        // obj.position.x = (this.randoms[i] - 0.5) * 1000

        // obj.position.z = (this.randoms[i] - 0.5) * 100

        // obj.position.x = obj.width
        // obj.rotation.y = i * Math.sin(this.t / 100) * 0.2


        // obj.rotation.y = i * (this.randoms[i] - 0.5) * 0.05
        // obj.rotation.x = i * -0.05


        // if (i == 4) obj.position.z = 100
        // obj.position.z = i * 200
        if (obj.width > this.width) {
          this.width = obj.width
          this.height = -obj.position.y + obj.height / 2
        }
      }
    }
  }
}


export class Column extends THREE.Object3D {
  constructor(options) {
    super()

    const objs = wrapReactComponents(options.components) //options.components.map((c) => new Component3D(c))

    // Create vantage points for each object
    objs.forEach(obj => ensureBasicVantagePoint(obj))

    this.add(...objs)

    this.objs = objs

    this.nav = new NavPath(objs)

    this.vantages = [objs[0].vantages[0]]

    this.width = 0
    this.height = 0
    this.t = 0
  }

  update() {
    const len = this.children.length
    let prev = null
    let obj = null
    this.width = 0
    this.height = 0
    this.t += 1
    for (let i = 0; i < len; i++) {
      prev = obj
      obj = this.children[i]
      if (prev) {
        if (prev.height === null || obj.height == null) break
        obj.position.y = prev.position.y - prev.height / 2 - obj.height / 2
        // obj.position.x = obj.width
        // obj.rotation.y = i * Math.sin(this.t / 100) * 0.2
        obj.rotation.y = i * 0.09
        // if (i == 4) obj.position.z = 100
        // obj.position.z = i * 200
        if (obj.width > this.width) {
          this.width = obj.width
          this.height = -obj.position.y + obj.height / 2
        }
      }
    }
  }
}
