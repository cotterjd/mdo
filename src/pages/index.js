import React, { useState } from 'react'
import tw, { styled } from 'twin.macro'

const Container = styled.div`
  ${tw`px-20`}
`
const Heading = styled.h1`
  ${tw`text-center text-3xl`}
  `
const Button = styled.button`
    ${tw`bg-blue-500 hover:bg-blue-800 text-white p-2 rounded`}
    `
const Input = styled.input`
  ${tw`bg-gray-400`}
`
const Form = styled.form`
  ${tw`grid grid-rows-4`}
`

export default function Home() {
  const [numChildren, setNumChildren] = useState(0)
  const [cost, setCost] = useState(0)

  const setNumberOfChildren = evt => {
    setNumChildren(evt.target.value)
  }
  const calculateCost = evt => {
    setCost(numChildren * 100)
  }

  return <Container>
    <Heading>Children of Life Mother's Day Out</Heading> 
    <Form>
      <div>
        2 days a week <Input name="plan" type="radio" />
        4 days a week <Input name="plan" type="radio" />
      </div>
      <div>Number of Children <Input type="text" onChange={setNumberOfChildren} /></div>
      <div>Church Member <Input type="checkbox" /></div>
      <Button onClick={calculateCost}>Calculate Cost</Button>
    </Form>
    Cost: { cost }
  </Container>
  
}


