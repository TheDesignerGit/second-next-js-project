import { MongoClient } from "mongodb";
import Head from 'next/head'

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>YoYoYo!</title>
        <meta name='description' content='A collection of the best meetups this side of the Mississipi' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {

  const client = await MongoClient.connect(
    'mongodb+srv://thedesigner:03JdIWOvRRiGMgbs@cluster0.grbpghc.mongodb.net/?retryWrites=true&w=majority'
    )
  const db = client.db() 

  const meetupCollection = db.collection('meetups')
  
  const meetupsRaw = await meetupCollection.find().toArray()
  // console.log("*******getStaticProps data: ", meetupsRaw)

  const meetups = meetupsRaw.sort(x => Math.random() - 0.5)

  client.close()

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString()
      })),
    },
    // revalidate: 1000
  };
}

export default HomePage;
