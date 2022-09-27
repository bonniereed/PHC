# Parkhub nodeJS Challenge

# Description
This is an example of a RESTFUL API that processes data from the Santa Monica Parking API with a single endpoint.

This endpoint processes a zipcode and returns the following data:

An array of lots with the following data for each lot
Available spaces in each lot
Name for each lot
Steet Address
An array of meters with the following data for each meter:
"active" status
meter ID
How many active meters there are in that zip code
How many lots have available spaces in that zip code

This is an example of the expected return:
```JSON
{
    "90401": {
        "lots": [
            //array of lots returned based on zipcode selection
        ],
        "meters": [
            //array of meters returned based on zipcode selection
        ]
    }
}
```

# Usage:

* Open this zipped folder in VScode
* Right click on the 'index.js' file and select 'Open in integrated terminal'
* In the terminal, type  `npm i`
* To run the server, type `node .`
* Open a web browser and navigate to `localhost:3001/api/(Zipcode of your choice)`

