// our-domain.com/new-meetup

import React from 'react'
import { useRouter } from 'next/router'

import NewMeetupForm from '../../components/meetups/NewMeetupForm'

const NewMeetupPage = () => {
    const router = useRouter()

    async function addMeetupHandler (meetupData) {
        console.log('meetup handler enter', meetupData)
        const res = await fetch('/api/new-meetup-api', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {'Content-Type': 'application/json'}
        })
        
        const resultData = await res.json()
        
        console.log('####### meetup handler end data: ', resultData)
        router.push('/')
    }

    return <NewMeetupForm onAddMeetup={addMeetupHandler}/>
}

export default NewMeetupPage