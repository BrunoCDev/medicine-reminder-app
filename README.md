# Medicine Reminder

App was built in React Native, it provides a way to keep track of medication that needs to be taken and remind the user to take that medication at a certain time.

## Server

Front-End and Server are separated on GitHub:

[Server](https://github.com/BrunoCDev/medicine-reminder-api)
[Front-end](https://github.com/BrunoCDev/medicine-reminder-app)

## Download

Currently under maintenance.

## Description

Here are some of the features:

* Add medication to a list.
* Setup alarms for each medication (optional).
* Get a notification when alarm fires off, and redirects user to that specific medication page (even if app is not running).
* Check for bad interactions between all the medications in the list.
* Theme colors are fully customizable by the user.
* User is stored on local storage, so when app is reopened the user doesn't have to login again.

## Getting Started

If you want to test the app in a development environment you need to add an API_HOST .env variable.

Starting the app:

```
yarn
yarn run:android
```

## Build APK

Deploy the test APK:

```
yarn deploy
```

## Technologies Used

* React Native
* React Redux
* PostgreSQL
* Node (express)

## Authors

* **Bruno Carvalho** - Full Stack - [Portfolio](https://brunoc.me/) - [GitHub](https://github.com/Brunocdev)
