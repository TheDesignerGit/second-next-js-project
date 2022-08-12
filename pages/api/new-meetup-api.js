// POST /api/new-meetup
import { MongoClient } from 'mongodb'

async function handler (req, res) {
    if (req.method === 'POST') {
        const data = req.body

        const client = await MongoClient.connect(
            'mongodb+srv://thedesigner:03JdIWOvRRiGMgbs@cluster0.grbpghc.mongodb.net/?retryWrites=true&w=majority'
            )
        const db = client.db()
        console.log('****************API Route start - database: ', db)

        const meetupCollection = db.collection('meetups')
        
        const result = await meetupCollection.insertOne(data)

        console.log('****************API Route - after insert result:', result)

        client.close()
        res.status(201).json({ message: 'Meetup Inserted Successfully'})
    }
}

export default handler