# Notifications App
This purpose of this app is to demonstrate to how I would go about designing and the architecture of a Notifications app or a similar problem or a similar problem, the real implementation of an integration would require proper configurations an tokens. However in the app those implementations are encapsulated in the Notifications providers and can be changes with the well configured ones any time we need this app live.

## Problem
Backend implementation to sending notification to users via multiple providers

Currently Providers:
    - Push notifications (through firebase)
    - SMS notifications  (through a simulation provider called [bipsms](https://www.npmjs.com/package/bipsms))


## Design Pattern and Solution used

- [**Factory design pattern**](https://www.tutorialspoint.com/design_pattern/factory_pattern.htm), where you can create an instance of the needed provider type using it's name

- As we only need one object from each type to fire the notification, so **Singleton** design pattern was used in the `NotificationsFactory` class to create only one instance from each notifications provider as to optimize memory.

Models and Controllers are used to save the schema and do the needed CRUD operations on them.


note: calling non existing provider types will throw an error.

## System Design & explanation

- Notify action will be triggered either manually by triggering an endpoint or automatically via a Crone Job
- Notifications will be inserted in MongoDB (via consol, admin or endpoints) linked to existing user(s)
- New notifications will be marked as yellow (pending)

### The Crone job
A crone job with a configurable time interval will fetch pending notifications and fire them according to:
    1- Their type
    2- The number of users
In case of a group of users the Job will use the notifyMany method of each provider, for single users it will use Notify one.

### The api
It can be managed in several ways, it can take the notification message and fires it immediately,
or it can fetch a certain notification from the DB using it's ID then fires it,
or will simply triggers the notify action. It depends on the business requirements but I chose to do the latter.

### Mark as done
After either triggering option a notification should be either updated to green if success or red if failed
Red Notifications can be later alerted to admin or retried within a certain time interval
