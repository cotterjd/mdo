import React, { useState } from 'react'
import tw, { styled } from 'twin.macro'

const Container = styled.div`
  ${tw`px-20`}
`
const Heading = styled.h1`
  ${tw`text-center text-3xl`}
  `
const Button1 = styled.button`
    ${tw`bg-blue-500 hover:bg-blue-800 text-white p-2 rounded`}
    `
const Button2 = styled.button`
    ${tw`bg-green-500 hover:bg-green-800 text-white p-2 rounded`}
    `
const Input = styled.input`
  ${tw`bg-gray-300`}
`
const Form = styled.form`
  ${tw`grid grid-rows-5`}
`

export default function Home() {

  return <Container>
    <Heading>Children of Life Mother's Day Out</Heading> 
    <ChildForm />
  </Container>
  
}

function ChildForm () {
  const defaultChild = {dateOfBirth: ``}
  const [children, setChildren] = useState([defaultChild])
  const showOptions = evt => {
    console.log(`show options`)
  }
  const addChild = evt => {
    const newChildren = children.concat(defaultChild)
    setChildren(newChildren)
  }
  const updateChildBirthDate = (evt, index) => {
    const updatedChildren = children.map((ch, i) => {
      if (i === index) return { ...ch, dateOfBirth: evt.target.value }
      return ch
    })
    setChildren(updatedChildren)
  }
  return <Form>
      <div>Church Member <Input type="checkbox" /></div>
      { children.map((ch, i) => <div>Date of Birth <Input type="text" placeholder="MM/DD/YYYY" onChange={evt => updateChildBirthDate(evt, i)} /></div>)
      }
      <Button2 onClick={addChild}>Add Child</Button2>
      <Button1 onClick={showOptions}>Show Options</Button1>
    </Form>
}


