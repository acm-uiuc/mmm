# ACM Member-to-Meeting Matcher (MMM)

One of the biggest pain points of ACM is the decentralized nature of SIG information, especially
meetings. With over 20 SIG’s and 1000’s of members in ACM, it is impossible to keep up to date
on each SIG’s events and focuses on a regular basis. By consolidating some of this information,
SIG’s can gain better visibility and traction from the broader ACM student population. By
maintaining a centralized database of relevant keywords or topics for each SIG, as well as an up
to date schedule of meetings and topics, we can make a significant step towards achieving this
goal.

## API

***API basename***: `https://89gebvx4j9.execute-api.us-east-1.amazonaws.com/dev`

### /events

#### POST 

Schema
```json
{
  "body": {
    "event": {
      "name": {
        "type": "string",
        "required": true
      },
      "description": {
        "type": "string"
      },
      "location": {
        "type": "string"
      },
      "org": {
        "type": "string",
        "required": true
      },
      "creator": {
        "type": "string",
        "required": true
      },
      "eventDate": {
        "startTime": {
          "type": "string",
          "format": "date-time"
        },
        "endTime": {
          "type": "string",
          "format": "date-time"
        }
      },
      "topics": {
        "type": "array"
      }
    }
  }
}
```

Example
```json
{
  "body": {
    "event": {
      "org": {
        "_id": "aida"
      },
      "name": "Awesome Hack IL Project Meeting",
      "topics": ["python", "data", "ai"],
      "location": "Siebel",
      "eventDate": {
        "startTime": "2020-03-01T03:00:04.238Z",
        "endTime": "2020-03-02T03:00:07.880Z"
      },
      "description": "My really awesome event",
      "creator": "tincher2"
    }
  }
}
```

#### GET

Schema
```json
{
  "queryStringParameters": {
    "whereTopic": {
      "type": "object"
      // MongoDB where clause
    },
    "limit": {
      "type": "number",
      "default": 50,
      "max": 50
    }
  }
}
```

Example
```json
{
  "queryStringParameters": {
    "whereTopic": {
      "org": {
        "_id": "aida"
      }
    }
  }
}
```

Returns
```json
{
    "message": "Fetched 2 events",
    "events": [
        {
            "name": "smoke-test-event-39eec079-09fd-4d04-890f-bb6db5e8d5b8",
            "org": {
                "_id": "aida",
                "name": "AI/DA",
                "kind": "sig"
            },
            "description": "hello world",
            "creator": "tincher2",
            "location": "Siebel",
            "eventDate": {
                "startTime": "2020-03-01T03:00:04.238Z",
                "endTime": "2020-03-02T03:00:04.238Z"
            },
            "topics": []
        },
        {
            "name": "smoke-test-event-04af6c04-1f7a-4e7e-94d0-1430382c0d5c",
            "org": {
                "_id": "aida",
                "name": "AI/DA",
                "kind": "sig"
            },
            "description": "hello world",
            "creator": "tincher2",
            "location": "Siebel",
            "eventDate": {
                "startTime": "2020-03-01T03:00:04.238Z",
                "endTime": "2020-03-02T03:00:04.238Z"
            },
            "topics": [
                {
                    "_id": "smoke-test-topic-3ff1e0b4-7a42-4673-b22e-fbc418b42e3c",
                    "kind": "other"
                }
            ]
        }
    ]
}
```

### /topics

#### POST 

Schema
```json
{
  "body": {
    "topic": {
      "name": {
        "type": "string",
        "required": true
      },
      "kind": {
        "type": "string",
        "required": true,
        "enum": ["language", "domain", "social", "other"]
      }
    }
  }
}
```

Example
```json
{
  "body": {
    "topic": {
      "name": "Python",
      "kind": "language"
    }
  }
}
```

#### GET

Schema
```json
{
  "queryStringParameters": {
    "whereTopic": {
      "type": "object"
      // MongoDB where clause
    },
    "limit": {
      "type": "number",
      "default": 50,
      "max": 50
    }
  }
}
```

Example
```json
{
  "queryStringParameters": {
    "whereTopic": {
      "kind": "language"
    }
  }
}
```

Returns
```json
{
    "message": "Fetched 2 topics",
    "topics": [{"name": "Python", "kind": "language"}, {"name": "Artificial Intelligence", "type": "domain"}]
}
```

### /orgs

#### GET

Response Example
```json
{
    "message": "Fetched 1 org",
    "orgs": [{"_id": "aida", "name": "Artificial Intelligence and Data Analytics", "kind": "sig"}]
}
```

## Tech Stack

[Amazon Web Services (AWS) Serverless Suite](): Compute
[Serverless Framework](): Deployment automation and environment scripting
[MongoDB Atlas](): Database
[Webpack + Babel + Node.js](): Compilation and runtime environment
[Yarn](): Package and dependency manager
[Middy.js](): Extensible middleware framework for the Serverless Framework
[Jest](): Unit testing
[Prettier + eslint](): Linting

## Codebase structure

```
docs/
serverless-config/
  secrets.json
src/
  callbacks/  # Templates for HTTP callbacks
  input-schemas/  # Strongly typed HTTP request validation
  middleware/  # Additional utilities that run before/after handler execution
  models/  # MongoDB data models
  routes/  # Endpoint handlers
  utils/  # Miscellaneous tools for endpoints
tests/
  routes/  # Route specific unit tests
.babelrc
serverless.yml  # Environment and deployment configuration
webpack.config.js
```

## Contact

This project is maintained by [Bailey Tincher](), with significant work done by [Ben Nordick](),
[Jackie Oh](), and [Jeff Taylor-Chang](). If you would like to contribute, read our guidelines
in [CONTRIBUTING.md]() and submit a PR!