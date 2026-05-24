# Keyword Registry REST service
## Intro
This is a Java-based web application that registers and tracks keywords. The application is built on Java Spring Boot,
backed by DynamoDB, and hosted on EC2.

## Data model
The data is stored in a NoSQL database with the date as the primary key and keyword as the range key. Below is a
snapshot of the data.

| date (S)   | keyword (S) | count (N) | previousCount (N) |
| ---------- | ----------- | ---------:| -----------------:|
| 2018-04-24 | bar         | 1         | 0                 |
| 2018-04-24 | baz         | 1         | 0                 |
| 2018-04-24 | foo         | 4         | 12                |
| 2018-04-24 | foobar      | 1         | 0                 |
| 2018-04-23 | bar         | 0         | 2                 |
| 2018-04-23 | foo         | 12        | 3                 |
| 2018-04-23 | foobar      | 0         | 1                 |

## Application Design
The application is a REST microservice built on Java Spring Boot. The application maintains no state and could be scaled
by deploying multiple instances of the application.

Class descriptions:
* DynamoDBConfig.java: Loads configuration from application.properties file
* ResourceController.java: Maintains resource endpoints
* DynamoDBAccess.java: Functionality for reading to and writing from DynamoDB
* DatabaseAccess.java: Interface for database access functions
* Keyword.java: Model class representing a single keyword on a single date
* KeywordRollup.java: Model class for representing a collection of keywords for a single date
* MyService.java: Contains application logic
* MyApplication.java: Main class

## Deployment
At present the application is running on an EC2 instance which can be accessed at 18.236.83.47:33333/registry/.
The deployment process was done by hand and would greatly benefit from automation and containerization.

## Usage
To add to the registry, issue a PUT request against /registry/{keyword}.
`curl -X PUT 18.236.83.47:33333/registry/foo`

To read from the registry, issue a GET request against /registry/
`curl 18.236.83.47:33333/registry/`

## Related

- [[Interviews MOC]]
- [[20180504-mathias-klous]] - follow-up
