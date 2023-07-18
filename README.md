# Books Aplication Using NodeJs and Express (IBM)
Final project for [developing back-end apps with Node.js and Express](https://www.coursera.org/learn/developing-backend-apps-with-nodejs-and-express?specialization=ibm-full-stack-cloud-developer)


### Built With
* JavaScript
* Node.js
* Express.Js
* NPM
* MongoDB & Mongoose


## Features

- Authentication
    - User can create an account with email.
    - Passwords are encrypted.
    - Each user has JWT. 
      
- Authorization
    - Only authenticated users are authorized to perform the operations.
    - Only Admin can add new books.

- MongoDB & Mongoose
    - All data are stored in mongodb
- Error Handling
    - A global error handling function has been implemented in this project.
- MVC
## Routes List:

### User

| Method     | URI                               | Action                                                  |
|------------|-----------------------------------|---------------------------------------------------------|
| `POST`     | `api/user/`                       | `\Controllers\authController@signUp`                    |
| `POST`     | `api/user/login`                  | `\Controllers\authController@login`                     |

### Books

| Method     | URI                               | Action                                                  |
|------------|-----------------------------------|---------------------------------------------------------|
| `GET`      | `api/book/`                       | `\Controllers\bookController@getAllBooks`               |
| `POST`     | `api/book/add/`                   | `\Controllers\bookController@addBook`                   |

### Review

| Method     | URI                               | Action                                                  |
|------------|-----------------------------------|---------------------------------------------------------|
| `GET`      | `api/book/:id/review/`            | `\Controllers\reviewController@getAllReviews`           |
| `POST`     | `api/book/:id/review/`            | `\Controllers\reviewController@addReview`               |
| `PUT`      | `api/book/:id/review/`            | `\Controllers\reviewController@updateReview`            |
| `DELETE`   | `api/book/:id/review/`            | `\Controllers\reviewController@deleteReview`            |
