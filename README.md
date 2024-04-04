# Prix Tour 

[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://github.dev/WagnerNasc/prix-tour)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![SonarQube](https://img.shields.io/badge/SonarQube-black?style=for-the-badge&logo=sonarqube&logoColor=4E9BCD)
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

This project aims to provide tourist spots data.

## 📊 Analyze Backend

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=prix-tour-backend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=prix-tour-backend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=prix-tour-backend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=prix-tour-backend)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=prix-tour-backend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=prix-tour-backend)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=prix-tour-backend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=prix-tour-backend)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=prix-tour-backend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=prix-tour-backend)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=prix-tour-backend&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=prix-tour-backend)

## 📊 Analyze Frontend

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=prix-tour-frontend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=prix-tour-frontend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=prix-tour-frontend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=prix-tour-frontend)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=prix-tour-frontend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=prix-tour-frontend)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=prix-tour-frontend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=prix-tour-frontend)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=prix-tour-frontend&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=prix-tour-frontend)

## 🔨️ Prototype

The beginning of it all was a drawing made based on a list of features.

- Create an attraction
- See a description for the attraction
- List inside a map
- Search by on localization and name

![Excalidraw](https://github.com/WagnerNasc/prix-tour/assets/65175718/e42a0a50-c8de-448f-9b35-80c4a8daa595)

## 🔑️ Key components

Prix Tour has some components that are worth the nottice.

1. Forms

The application uses [Formik](https://formik.org/docs/overview) for building forms with validation provided by [Zod](https://zod.dev). This approach allows for a modularized way to render fields and display error messages.

2. Map

To integrate Google Maps into React, the app utilizes the [visgl-react-google-maps](https://visgl.github.io/react-google-maps/) library. This integration follows a structured approach with an API Provider (accepting the Maps API Key), a Container (managing the map's size), and the Map component provided by the library. Additionally, the app uses the [Google Maps JavaScript MarkerClusterer](https://github.com/googlemaps/js-markerclusterer) for clustering markers. The info window that appears when a user clicks a marker is built with inline HTML and CSS.

3. Selects

The application includes two types of select components, both based on [react-select](https://react-select.com). The first select component (searchBar) renders options as the user types into the input. The second select component includes pagination, loading new items as the user scrolls to the end until there are no more pages. Both select components are customized using a separate file and importing CSSObjectWithLabel, a type from react-select.

## 📸 Homepage

![Homepage](https://github.com/WagnerNasc/prix-tour/assets/65175718/df4e95e7-3697-40f5-a457-7130f017b010)

## 🎲 ERD (Entity Relationship Model)

![prix-tour-db - diagram](https://github.com/WagnerNasc/prix-tour/assets/54827039/4c2d99ae-0b18-45ac-9ec2-cd3b91529a61)

## ⚡ Running Project

Before running the project, make sure you have the following requirements:

Building with docker:

```shell
docker-compose up -d
```

## 🧗️Authors

- [Júlia Andrade](https://github.com/kyaramero)
- [Wagner Nascimento](https://github.com/WagnerNasc)

## 📓️ License

This project is licensed under the [CC BY-NC-SA 4.0 DEED](https://creativecommons.org/licenses/by-nc-sa/4.0/)
