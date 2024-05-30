# Overwatch Balancer Website
## Description
The Overwatch Balancer Website is a web application designed to help users create balanced teams for the game Overwatch. Users can manually add players with corresponding ranks in tank, damage, and support roles. The website then uses the "balance by pair" algorithm to form two balanced teams. The application is built using Next.js and is fully functional on both PCs and smartphones, supporting all major web browsers.

## Features
Add Players: Users can add players with specific roles (tank, damage, support) and ranks.
Balance Teams: Automatically form two balanced teams using the "balance by pair" algorithm.
Local Storage: Save player presets to the browser's local storage and load them later.
No Authorization Required: The website does not require user login or authentication.

## Getting Started
Prerequisites

Ensure you have the following installed on your machine:

Node.js (v12.x or later)
npm (v6.x or later)

## Installation
Clone the repository:
```
git clone https://github.com/yourusername/overwatch-balancer.git
cd overwatch-balancer
```
Install the dependencies:
```
npm install
```
Running the Application
Start the development server:
```
npm run dev
```
Open your browser and navigate to http://localhost:3000 to access the application.

## Usage
Add Players:
Navigate to the "Add Player" section.
Enter the player's name, select their roles (tank, damage, support), and specify their ranks.
Click "Add" to add the player to the list.

Balance Teams:
After adding the players, click the "Balance by pair" button.
The application will use the "balance by pair" algorithm to form two balanced teams and display the results.

Save Presets:
Click the "Save" button to save the current list of players to the browser's local storage.

Load Presets:
Click the "Load" button to load previously saved player presets from the local storage.

## Design document
[Link to design document](https://docs.google.com/document/d/18dBekn1yftHZqIz4o7t1zI1zkKmuvQFpK3UVtZa-l2E/edit?usp=sharing)

## Screenshot
![image](https://github.com/Patriot0911/balancer/assets/135731067/b7991ed9-953a-41f8-bcf6-ab18831c87b4)
