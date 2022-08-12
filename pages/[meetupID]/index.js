// our-domain.com/*anything and everything*

import { useRouter } from "next/router"
import Head from 'next/head'
import { MongoClient, ObjectId } from "mongodb"

import MeetupDetail from "../../components/meetups/MeetupDetail"

const MeetupDetails = (props) => {
    // const router = useRouter()
    // const currentID = router.query.meetupID
    // let detail = {}

    // for (let x of props.meetupData) {
    //     if(x.id === props.meetupID) {
    //         detail = x
    //     } else {}
    // }

    console.log('meetup detail page props:', props)

    return (
        <>
        <Head>
            <title>{props.selectedMeetup.title}</title>
            <meta name='description' content={props.selectedMeetup.description} />
        </Head>
        <MeetupDetail 
            id={props.selectedMeetup._id}
            image={props.selectedMeetup.image}
            title={props.selectedMeetup.title}
            address={props.selectedMeetup.address}
        />
        </>
    )
}

export async function getStaticPaths() {

    const client = await MongoClient.connect(
        'mongodb+srv://thedesigner:03JdIWOvRRiGMgbs@cluster0.grbpghc.mongodb.net/?retryWrites=true&w=majority'
        )
    const db = client.db() 

    const meetupCollection = db.collection('meetups')

    const meetups = await meetupCollection.find({}, {_id: 1}).toArray()

    client.close()

    return {
        paths: meetups.map( meetup => ({ 
            params : {
                meetupID: meetup._id.toString()
            }
        }) ),
        fallback: 'blocking'
    }
}

export async function getStaticProps(context) {

    const meetupID = context.params.meetupID
    // console.log('meetup detail, getStatticProps meetup ID', meetupID) 

    const client = await MongoClient.connect(
        'mongodb+srv://thedesigner:03JdIWOvRRiGMgbs@cluster0.grbpghc.mongodb.net/?retryWrites=true&w=majority'
        )
    const db = client.db()

    const meetupCollection = db.collection('meetups')

    const selectedMeetup = await meetupCollection.findOne({_id: ObjectId(meetupID)})

    client.close()

    console.log('selectedMeetup: ', selectedMeetup)

    return {
        props: {
            selectedMeetup: {...selectedMeetup, _id: selectedMeetup._id.toString()},
            meetupID: meetupID
        }
    }
}

export default MeetupDetails