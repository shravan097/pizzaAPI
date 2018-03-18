# pizzaAPI
A RESTful API for Pizza Web Application.

# Docs
##  /signup
**Type of Request: POST**
This route can be used to sign up a user.

**Input:**
``` javascript
{
    "email": "something@something.com", //Type:String,Required
    "password":"test", //Type:String, Required
    "typeOfUser":"Manager", //Type:Enum["Manager","Chef","Customer"],Required
    "blackListed":"False", //Type:Boolean,Default:False
    }
````
**Output:**
``` javascript
// IF USER DOES NOT EXIST AND EVERYTHING IS VALID
{
    "message":"User Created"
}
```
``` javascript
// IF USER ALREADY EXISTS
{
    "message":"User Created!"
}
```
``` javascript
// IF NOT VALID, ERROR IS THROWN
{
    "error":{ ... }
}
```
##  /login
**Type of Request: POST**
This route can be used to login an user. If logged in succesfully, a **token** will be provided as output that will be valid for **1h**. The token will be used as authentication for any privilledged acess.

**NOTE**: TOKEN must be kept secured and should be added on HEADER as following to do any privillege actions for certain user.
` key: authorization, value: Bearer TOKEN_HERE`


**Input:**
``` javascript
{
	"email": "test@test.com", //Type: String, Required
	"password":"test", //Type: String, Required
	"typeOfUser":"Manager" //Type: String, Required
}
```
**Output:**
``` javascript
//IF SUCCESSFUL
{
    "message": "Auth Successful",
    "token": "SOME_TOKEN_HERE"
}
```

``` javascript
//IF Authentication Fail
{
    "message": "Auth Failed!"
}
```
``` javascript
// IF NOT VALID, ERROR IS THROWN
{
    "error": "User Invalid!"
}
```




