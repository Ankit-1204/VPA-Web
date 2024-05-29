const Dialogflow = require('@google-cloud/dialogflow');



const CREDENTIALS = JSON.parse(process.env.CREDENTIAL)
const projectId=CREDENTIALS.project_id;

const config={
    credentials:{
        private_key:CREDENTIALS['private_key'],
        client_email:CREDENTIALS['client_email']
    }
}
const sessionClient = new Dialogflow.SessionsClient(config);

const scheduleMeet = async (req,res) => {
    console.log(req);
    

    const sessionPath = sessionClient.projectAgentSessionPath(projectId, '123');
    console.log('arrived 1st');
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: req.body.query,
                languageCode: 'en-US',
            },
        },
    };

    try {
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        console.log(result);
        return{
            response:result.fulfillmentText
        }
        
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
};


module.exports={
    scheduleMeet
}