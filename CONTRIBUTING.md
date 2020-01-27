***These guidelines are a work-in-progress please contact Bailey Tincher via Slack for more info***

We welcome all Pull Requests! Check out our issues or open your own with a feature request.

## Building the Project

```bash
git clone https://github.com/acm-uiuc/mmm
cd mmm
yarn install
```

In `serverless-config/` create a `secrets.json` file with the following. You'll need to 
either create your own MongoDB database instance in the cloud or run one locally.
```json
{
  "dev": {
    "MONGODB_URI": "<optional-database-uri-here>"
  }
}
```

```bash
yarn offline
```

A local instance of the API server is now live.