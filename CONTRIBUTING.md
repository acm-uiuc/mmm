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

## Making changes

First things first, if you are making a change you should pull an issue on our GitHub
that way we know what you're working on and can both make sure it's a good change and
so we know that someone is working on it.

We have scripts to automate linting and changes, use them before pushing commits. Your
commits must have good messages that succinctly describe the change. Each commit should
represent a bite-size, _buildable_ change. That is, all changes in a commit should be
related to each other, and larger changes should be separated into multiple commits.
However, each commit should not leave the server in a _broken_ state. We should be able
to rollback to any commit and still have a working server that passes all the tests.

To achieve this, you may find you need to [squash commits](https://github.com/servo/servo/wiki/Beginner's-guide-to-rebasing-and-squashing).
If you have Git related questions, please ask! Don't let these get in the way of
wanting to make changes.

```
yarn commit  # Lints the codebase and pulls up the git commit window
```

Your changes should _always_ pass our unit test suite. If you are making breaking changes
to the functionality of an endpoint or adding a new features, then you should change or add unit
tests under the `tests/` folder for that addition. This keeps us productive and ensures
that we do not unknowingly break behavior down the road.

```
yarn test  # Runs your changes against our unit tests
```

When you are all done, submit a PR and once we review and workout changes, we'll merge in
your changes!
