# Intuitive Bot

Intuitive Bot is an AI powered shopping assistant for retail shops. Imagine yourself being able to ask your personal assistant to order products from shops near you. Imagine receiving personalized recommendations, and getting answers to all your queries related to products without having the hassle of manually visiting stores.

#### Introduction video  
https://youtu.be/J-hPARCTXFw

#### Live demo 
https://intuitivebot.firebaseapp.com/

## Deploy

There are two parts of the project which - 
* The backend to be deployed on Firebase Cloud Functions
* The Dialogflow flow data to be deployed to Dialogflow

First deploy on Firebase Cloud Functions and then on Dialogflow.

The instructions to deploy dialogflow is in respective folders.
* [dialogflow](./dialogflow)


## Instructions to deploy on Firebase
### Create a Firebase Project
* Create new a project on [Firebase](https://console.firebase.google.com). Note the project Id.
* Enable Firestore and Storage in the newly created Firebase project.

### Deploy Code
* Install [NodeJS](https://nodejs.org/en/download/) from its official site.
    Check installation
    `node -v`
* NPM comes with NodeJS when installed from official site. Install if it is not there.
    Check installation
    `npm -v`
    
* From root directory of the project. Run these commands-
```
npm i -g firebase-tools
```
**NOTE** - If you get an permission error in linux while running above command, try with **sudo**.
* Check installation
```
firebase --version
```
```
cd firebase
firebase login
```
This will open your browser.
* Login with your account with which you created firebase project.
* Replace **PROJECT_ID** in **.firebaserc** file with your project ID.

```
cd functions
npm i
firebase deploy
```
In case you face any issues, please reach out to shivam.cse17@nituk.ac.in 

### Contributors
* [Satyam Kumar](https://linkedin.com/in/satyamcse/)
* [Shivam Singla](https://linkedin.com/in/singla-shivam/)
