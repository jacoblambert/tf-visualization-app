import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

const ThreeScene: React.FC<{ transformations: any[] }> = ({ transformations }) => {
  const mountRef = useRef(null)
  const sceneRef = useRef(new THREE.Scene())
  const fontLoaderRef = useRef(new FontLoader())

  useEffect(() => {
    const mount = mountRef.current
    const scene = sceneRef.current

    // Scene setup
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    // Camera position above and behind the origin, looking towards the x-axis
    camera.position.set(-5, 5, 5 )
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    const controls = new OrbitControls(camera, renderer.domElement)

    // Axes helper
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    // Rotate the scene to make z-axis upwards
    scene.rotation.x = -Math.PI / 2

    // Initial world frame
    createFrame('World', new THREE.Color(1, 1, 1), [0, 0, 0], [0, 0, 0])

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      mount.removeChild(renderer.domElement)
    }
  }, [])

  useEffect(() => {
    const scene = sceneRef.current

    // Clear existing transformations
    while (scene.children.length > 1) { // Keep the AxesHelper
      scene.remove(scene.children[1])
    }

    // Recreate the world frame
    createFrame('World', new THREE.Color(1, 1, 1), [0, 0, 0], [0, 0, 0])

    // Add all transformations
    transformations.forEach((trans) => {
      const { name, parent, x, y, z, roll, pitch, yaw } = trans
      createFrame(name, new THREE.Color(1, 1, 1), [x, y, z], [roll, pitch, yaw])
    })
  }, [transformations])

  const createCustomArrow = (color: THREE.Color) => {
    const group = new THREE.Group()

    // Cylinder for the arrow body
    const cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 12)
    const cylinderMaterial = new THREE.MeshBasicMaterial({ color: color })
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
    cylinder.rotation.x = -Math.PI / 2
    cylinder.position.z = 0.5
    group.add(cylinder)

    // Cone for the arrow head
    const coneGeometry = new THREE.ConeGeometry(0.2, 0.5, 12)
    const coneMaterial = new THREE.MeshBasicMaterial({ color: color })
    const cone = new THREE.Mesh(coneGeometry, coneMaterial)
    cone.rotation.x = Math.PI / 2
    cone.position.z = 1.25
    group.add(cone)

    return group
  }

  const createFrame = async (name, color, position = [0, 0, 0], rotation = [0, 0, 0]) => {
    const group = new THREE.Group()

    const xArrow = createCustomArrow(new THREE.Color(1, 0, 0)) // Red
    xArrow.rotation.y = Math.PI / 2
    const yArrow = createCustomArrow(new THREE.Color(0, 1, 0)) // Green
    yArrow.rotation.x = -Math.PI / 2
    const zArrow = createCustomArrow(new THREE.Color(0, 0, 1)) // Blue

    group.add(xArrow)
    group.add(yArrow)
    group.add(zArrow)

    try {
      const font = await fontLoaderRef.current.loadAsync('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json')
      const textGeometry = new TextGeometry(name, {
        font: font,
        size: 0.4,
        height: 0.08,
      })
      const textMaterial = new THREE.MeshBasicMaterial({ color: color })
      const textMesh = new THREE.Mesh(textGeometry, textMaterial)
      textMesh.rotation.x = Math.PI / 2
      textMesh.position.set(0.2, 0.04, 0.3)
      group.add(textMesh)
    } catch (error) {
      console.error('Error loading font:', error)
    }

    group.position.set(...position)
    group.rotation.set(...rotation.map((angle) => THREE.MathUtils.degToRad(angle)))
    sceneRef.current.add(group)

    return group
  }

  return <div ref={mountRef} className="w-full h-full" />
}

export default ThreeScene
