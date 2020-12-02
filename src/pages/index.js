import React, { useState, useEffect } from 'react'
import tw, { styled } from 'twin.macro'

const img1 = require(`../images/img1.jpg`)
const img2 = require(`../images/img2.jpg`)
const img3 = require(`../images/img3.jpg`)
const img4 = require(`../images/img4.jpg`)
const img5 = require(`../images/img5.jpg`)
const img6 = require(`../images/img6.jpg`)
const img7 = require(`../images/img7.jpg`)
const img8 = require(`../images/img8.jpg`)
const img9 = require(`../images/img9.jpg`)
const img10 = require(`../images/img10.jpg`)
const Container = styled.div`
  ${tw`px-20`}
`
const Heading = styled.h1`
  ${tw`text-center text-3xl`}
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
const Page = styled.div`
`
const BannerContainer = styled.div`
  display: flex;
`
/*
 * 400px h
 * 450px w
 */
const RowOneImg = styled.img`
  max-height: 400px;
  max-width: 500px;
`
const RowTwoImg = styled.img`
  max-height: 400px;
  max-width: 400px;
`

export default function Home() {
  return <Container>
    <Heading>Children of Life Mother's Day Out</Heading> 
    <ChildForm />
  </Container>
  
}

/* Assumptions
 * church attendees get 10% off for each child
 * any additional child get 10% off (applied after any other discounts)
 * 2nd (or 3rd or 4th etc) child will be the child with the lower cost for purposes of above discount
 * No 4 day a week option for children under 3
 * 3+ can do 2 or 4 days a week
 * 2 day a week under 1 is $185
 * 2 day a week 2+ is $165
 * 4 day a week is $330
 */
function ChildForm () {
  const defaultChild = {dateOfBirth: ``, age: 0}
  const [children, setChildren] = useState([defaultChild])
  const [isChurchMember, setIsChurchMember] = useState(false)
  const [daysAWeek, setDaysAWeek] = useState(4)
  const [warning, setWarning] = useState(``)
  const [total, setTotal] = useState(0)
  const [breakdown, setBreakdown] = useState({
    children: [{ 
      age: 0,
      subtotal: 0,
      discounts: ``,
      total: 0,
    }],
    total: 0
  })

  useEffect(() => {
    const ages = children.map(getAge)
    /* DEBUG 
    console.log(daysAWeek)
    console.log(daysAWeek === 4)
    console.log(ages)
    console.log(ages.some(age => age < 3))
    console.log(daysAWeek === 4 && ages.some(age => age < 3)) 
    */
    if (daysAWeek === 4 && ages.some(age => age < 3)) setWarning(`No 4 day a week option for children under 3`)
    else setWarning(``)

    const cost = ages.reduce((cost, age, i) => {
        let childCost = 0
        if (age === 0) childCost = 185
        else childCost = daysAWeek === 2 ? 165 : 330
        return cost+= (i > 0 ? childCost * .9 : childCost)
      }, 0)
    // setTotal(isChurchMember ? cost * .9 : cost)
    const total = isChurchMember ? cost * .9 : cost
    setBreakdown({
      children: ages.map(getBreakdown),
      total,
    })

    function getBreakdown (age, index) {
      const subtotal = age === 0 ? 185 : (daysAWeek === 2 ? 165 : 330)
      const afterChurchDiscount = isChurchMember ? subtotal * 0.9 : subtotal
      const afterAdditionalChildDiscount = index > 0 ? afterChurchDiscount * 0.9 : afterChurchDiscount
      const discounts = [] 
      if (isChurchMember) discounts.push(`Church Member`)
      if (index > 0) discounts.push(`Additional Child`)
      return {
        age,
        subtotal,
        discounts: discounts.join(`, `),
        total: afterAdditionalChildDiscount,
      }
    }
  }, [children, isChurchMember, daysAWeek])
  const addChild = evt => {
    evt.preventDefault()
    const newChildren = children.concat(defaultChild)
    setChildren(newChildren)
  }
  const updateChildBirthDate = (evt, index) => {
    evt.preventDefault()
    const updatedChildren = children.map((ch, i) => {
      if (i === index) return { ...ch, dateOfBirth: evt.target.value }
      return ch
    })
    setChildren(updatedChildren)
  }
  return <Page>
    <BannerContainer>
      <RowOneImg src={img1} />
      <RowOneImg src={img2} />
      <RowOneImg src={img3} />
      <RowOneImg src={img4} />
      <RowOneImg src={img5} />
    </BannerContainer>
    <BannerContainer>
      <RowTwoImg src={img6} />
      <RowTwoImg src={img7} />
      <RowTwoImg src={img8} />
      <RowTwoImg src={img9} />
      <RowTwoImg src={img10} />
    </BannerContainer>
    <Form>
      <div>Church Member <Input onChange={evt => setIsChurchMember(!isChurchMember)} type="checkbox" /></div>
      <div>
        4 Days/Week <input type="radio" name="daysaweek" onChange={evt => setDaysAWeek(4)} />
        &nbsp;
        2 Days/Week <input type="radio" name="daysaweek" onChange={evt => setDaysAWeek(2)} />
      </div>
      { children.map((ch, i) => <div key={i}>Date of Birth <Input type="text" placeholder="MM/DD/YYYY" onChange={evt => updateChildBirthDate(evt, i)} /></div>)
      }
      <Button2 onClick={addChild}>Add Child</Button2>
      <font color="red">{warning}</font>
      { breakdown.children[0].age !== null && breakdown.children.map(child => {
          return <div style={{paddingTop: "10px"}}>
            <div>{child.age}-year-old</div>
            <div>subtotal: {child.subtotal}</div>
            <div>discounts: {child.discounts}</div>
            <div>child cost: {child.total.toFixed(2)}</div>
          </div>
        })
      }
      <div style={{paddingTop: "10px"}}>
        <span><strong>Total:</strong>{breakdown.total.toFixed(2)}</span>
      </div>
    </Form>
   </Page>
}
function getAgeFromBirthDay (birthDate) {
  if (!birthDate) return 0
  return Math.floor(((new Date()).getTime() - (new Date(birthDate)).getTime()) / 1000 / 60 / 60 / 24 / 356)
}
function getAge (child) {
  return getAgeFromBirthDay(child.dateOfBirth)
}
