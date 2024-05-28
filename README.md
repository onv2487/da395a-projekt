# Getting Started

## Detta är en rubrik 

### `npm install`
Installs the necessary dependencies

### `npm start`
Runs the app in the development mode.\
Open http://localhost:3000 to view it in your browser.

## Applikationsbeskrivning

Applikationen hittar matrecept och använder Spoonacular API som hämtar receptdata. Denna applikation gör det möjligt för användaren att söka efter olika recept och spara sina favoriter för senare åtkomst. Recepten sparas i localStorage med möjlighet att sortera de i olika kategorier. När användaren känner att de inte vill ha kvar receptet har de möjligheten att radera den. 

React är ramverket som används för denna webbapplikation, eftersom den är flexibel och lätt att förstå. Å andra sidan har vi haft en föreläsning om React och även gjort labbar vilket ökar förståelse av ramverket ytterligare. 


Vue kanske har en lägre inlärningskurva, men med tanke på att vi redan har erfarenhet av React, minskas detta arguments tyngd för valet mellan react och Vue. Å andra sidan är Angular något helt nytt för mig/oss vilket var helt utesluten. Reacts enkelhet och fokus på komponentbaserad utveckling kändes mest lämplig för detta projekt. 

Spoonacular API används för att hämta receptdata. API:et är väldokumenterat, tillförlitlig och erbjuder en mängs olika recept. 

## Funktionalitet
1. Söka Recept: Användaren har möjlighet att söka olika recept.
2. Spara Favoritrecept: Användaren kan spara sina favoriter lokalt (localStorage) för enkelt åtkomst senare.
3. Kategori: Användaren kan spara sina recept under olika kategorier, detta görs genom en window.promt.
4. Radera Recept: Användaren kan i efterhand radera de recept som inte behövs
5. Responsiv Design: Applikationen är responsiv och användarvänlig på olika enheter, ink. mobiltelefoner och surfplattor. 

## Teknisk Implementation
1. API-anrop: `fetch`och bibliotek som `axios` gör API-anrop till Spoonacular API.
2. State management: Reacts inbyggda state management hanterar applikationens tillstånd 
3. Responsiv Design: CSS Flecbox och Grid tillsammans med media queries används, för att säkerställa att applikationen är responsiv. 

## Bibliotek och Verktyg 
Nedan bibliotek och verkty används i denna applikation: 
1. React: Ett JavaScript-bibliotek för att bygga användargränssnitt. 
2. React Router: Ett bibliotek för att hantera navigering och växling av sidor i React-applikation.
3. Axios: Ett JavaScript-bibliotek för att göra HTTP-begäranden från webbläsaren
4. Spoonacular API: Ett externt API som tidigare inte använts i kursen. API hämtar receptdata och information om bland annat ingredienser för olika maträtter. 