## Application architecture

In order to keep the application fast, adaptable and easy to work with the codebase is structured in a way which enforces this.

### Folder src structure

- **applications** | Contains all applications
- **docs** | Contains documentation on specific technical aspects of the mono-repo
- **packages** | Contains all packages needed for specific applications

### Application src structure

- **assets** | Contains all static assets required in the app.
- **components** | Contains specific component to the application
- **config** | Set up for the internal and external services
- **routes** | Handles all the internal and inbound linking and routing
- **pages** | Contains all the interfaces and the logic required
- **services** | Standalone services which take care of some specific business logic so it doesn't confuscate the components.
- **types** | Type definitions, auto-generated using GraphQL schema
