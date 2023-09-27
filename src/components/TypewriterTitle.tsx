"use client"
import React from 'react'
import Typewriter from 'typewriter-effect'
type Props = {}

const TypewriterTitle = (props: Props) => {
  return (
    <>
    <Typewriter options={{
        loop: true,
    }}
    onInit={(typewriter) => {
        typewriter.typeString('Extremely Productive 2x 🚀').pauseFor(2000).deleteAll().typeString(" DALL-E OpenAI 📔").pauseFor(2000).deleteAll().typeString("Elliot Chang..... BrainBuster 🧠").start()
    }}/>
    </>
  )
}

export default TypewriterTitle