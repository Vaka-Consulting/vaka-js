## Component based development

Components are first build before setting op pages or views.

### Functional vs Presentational

- Functional components are components that contains all logic and data handling. Data and handlers are passed to Presentational components via props.
- Presentational components to do the presentation of a layout.

## Design tokens

The app uses Design Tokens to convert Design elements into:

- JS variables
- CSS variables

We use **Style dictionary** to achieve this.

## Setting up components

### Storybook

Storybook is used for creating a UI component library.
In this project we use it to develop and view (presentational / UI) components.

### Chromatic: Reviewing components

Chromatic is used to deploy Storybook to a platform where it is easy to share with designers and other team members or even stakeholders.
Chromatic handles UI tests and reviewing options.

## Applications

These are set up either with **NEXT.JS** or **CREATE REACT APP**. It depends on the purpose of the application.
