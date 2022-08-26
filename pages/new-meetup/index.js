// our-domain.com/new-meetup

import React, { useContext } from 'react'
import { useRouter } from 'next/router'

import NotificationContext from '../../store/notification-context'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

const NewMeetupPage = () => {
    const router = useRouter()
    const notificationCtx = useContext(NotificationContext)

    async function addMeetupHandler (meetupData) {
        
        // .:. show pending notification
        notificationCtx.showNotification({
            title: 'Signing Up...',
            message: 'Add new meetup',
            status: 'pending',
        })

        // .:. send post request
        fetch('/api/new-meetup-api', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {'Content-Type': 'application/json'}
        })
            .then( (response) => {
                if (response.ok) {
                    return response.json()
                }
                // .:. throw error
                return response.json().then( (data) => {
                    throw new Error(data.message || 'Something went wrong')
                })
            })
            .then(data => {
                notificationCtx.showNotification({
                    title: 'Success...',
                    message: 'Successfully added new meetup',
                    status: 'success',
                })
                console.log(data)
                
                // .:. Nagivate programmatically
                console.log('### before Next Router programatic')
                router.push('/')
            })
            .catch(error => {
                notificationCtx.showNotification({
                    title: 'Oops, Error...',
                    message: error.message || 'Something went wrong',
                    status: 'error',
                })
            })
        
        // const resultData = await res.json()
        
        // console.log('####### meetup handler end data: ', resultData)
    }

    return <NewMeetupForm onAddMeetup={addMeetupHandler}/>
}

export default NewMeetupPage