We will build Rest Apis that can create and retrieve tambola tickets.

The following table shows overview of the Rest APIs that will be exported:

- POST    `api/tickets`                                           add new Tickets with payload sets having integer values
- GET     `api/tickets/?page_number = 0 & page_size = 10`         get Tickets with pagination
```
npm install
```
### Run
```
node start

```

### Note:
```
Please update your credentials in app/config/db.config.js

```



