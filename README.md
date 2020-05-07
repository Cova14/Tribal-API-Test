# Tribal-API-Test
Api Test for Tribal MnC

In this document is the info to work with the API

First of, we need to install some tools (latest versions):
- Node.js
- NPM

Once we have this, clone the project and run:
### `npm install`

And then: 
### `nodemon index.js`

You should have your app running in the port 8000!


## How the API works

We have a single index.js file doing all the job.
Basically, we're calling 3 different API's and putting their data into a single response.
We're using node and express to do this.

### Making the calls

We're using axios to make 2 calls, this is because the API response is in a JSON format.
For the third one, we're using the library 'xml2js' to convert the XML response into JSON and put them all together.

Now, due to this being originaly an XML we are using certain syntax to acces the data: 
`result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0].GetByNameResponse[0].GetByNameResult[0]['diffgr:diffgram'][0].ListByName[0]['SQL']`

After all this, we're just putting everything together in a single response separating the results based on which API they were called by.

Also we're using the 'cors' library to avoid any issue and allow any CORS request
