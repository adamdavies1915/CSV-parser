# CSV-parser

You should be able to run everything with docker by doing the following:

``` docker compose up ```

This will start up a mongo DB and a node container.
You can test out the API by going to the swagger page at http://localhost:3000/api-docs and uploading one of the two test CSV files.
For testing on start up 2 mappings will be added default and acme. These are stored in the mongo DB.

## Assumptions

- The list of vehicles is not for a database of cars in which case VIN would also be a unique identifier.
