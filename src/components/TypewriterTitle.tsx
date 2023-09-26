"use client"
import React from 'react'
import Typewriter from 'typewriter-effect'
type Props = {}

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter options={{
        loop: true,
    }}
    onInit={(typewriter) => {
        typewriter.typeString('Extremely Productive 2x').pauseFor(1000).deleteAll().typeString(" DALL Open AI Inspired").pauseFor(1000).deleteAll().typeString("Elliot Chang..... brainbuster").start()
    }}/>
  )
}

export default TypewriterTitle