# Onbaording api
This is based on the apollo graphql server. All codes are deployed in serverless with mongodb as backend.

This application is powered by `onboarding-api` and it has its standalone and lambda wrapper to run either in local development/ server or simply AWS Lambda(Serverless Function).

### Directory Structure
 - **resolvers** - All the resolvers for gql definition.
 - **scalars** - Custom scalars for graphql like datetime, BigInt etc
 - **services** - Has the internal/external services like database or thirdparty lib
 - **gql** - Contains all the graphql definitions
    
