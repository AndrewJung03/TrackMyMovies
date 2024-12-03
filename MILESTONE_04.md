Milestone 04 - Final Project Documentation
===

NetID
---
aj3245

Name
---
Andrew Jung

Repository Link
---
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJung03

URL for deployed site 
---
http://linserv1.cims.nyu.edu:12142/

URL for form 1 (from previous milestone) 
---
http://linserv1.cims.nyu.edu:12142/add-movie
\
http://linserv1.cims.nyu.edu:12142/edit-movie 

Special Instructions for Form 1
---
/add-movie: A form that allows a user to add a movie to their watched list. It has fields for a title, review, a note, release date, and can upload a movie poster picture.

/edit-movie: Requires a registered user to already have added a movie. When clicking on the edit button it will open /edit/(followed by the specific movie in the database). The user can then edit any of the fields.

URL for form 2 (for current milestone)
---
http://linserv1.cims.nyu.edu:12142/my-movies

Special Instructions for Form 2
---
Allows users to query their list of movies by title. Users can input a keyword or partial title in the search field to filter their movie collection. Can press seach again with nothing in the search bar to reset the page to load all the user's movies.

URL for form 3 (from previous milestone) 
---
http://linserv1.cims.nyu.edu:12142/login 
\
http://linserv1.cims.nyu.edu:12142/register

Special Instructions for Form 3
---
/login: Allows users to login into their account
/register: Allows user to register for an account

First link to github line number(s) for constructor, HOF, etc.
---
[HOF To Process Images]
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJung03/blob/a5775da5458eac32acce379e9626186e4f16b242/app.mjs#L14C1-L19C1
\
[HOF To Authenticate]
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJung03/blob/a5775da5458eac32acce379e9626186e4f16b242/app.mjs#L44C1-L51C3

Second link to github line number(s) for constructor, HOF, etc.
---
[Constructors for users and movies] 
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJung03/blob/master/db.mjs
\
[User Constructor Example]
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJung03/blob/a5775da5458eac32acce379e9626186e4f16b242/auth.mjs#L4C1-L16C2
\
[Movie Constructor Example]
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJung03/blob/a5775da5458eac32acce379e9626186e4f16b242/app.mjs#L117C1-L136C1

Short description for links above
---
[HOF To Process Images] 
Authenticates users
\
[HOF To Authenticate]
Procceses image
\
[Constructors for users and movies]
schemas
\
[Movie and User Constructor Example] 
code where constructor is used

Link to github line number(s) for schemas (db.js or models folder)
---
https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJung03/blob/master/db.mjs

Description of research topics above with points
---
* (3 points) Unit testing with JavaScript
    * Testing software where individual components of the codebase are tested
    * Implement Mocha Test (testing framework)
    * 4 tests minimum in order to ensure functionality
* (2 points) CSS Framework
    * A collection of CSS and js tools that provide help with styling
    * User bootstrap for custom styling
    * Create user interface that is userfriendly and aesthetic 
* (5 points) Automated Functional Testing
    * Tools that automatically test all functionality of a web app
    * Headless Chrome to automate testing
    * Use Headless Chrome to create automated tests, with links to testing code and screen captures of test results

10 points total out of 8 required points

Links to github line number(s) for research topics described above (one link per line)
---
* [Unit testing with JavaScript]
    * https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJung03/blob/master/tests/auth.test.js 
* [CSS Framework] 
    * https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJung03/tree/master/views (All .hbs files have css styling and bootstrap)
    * https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-AndrewJung03/blob/master/public/css/style.css (style.css)


Optional project notes 
--- 
(TODO: optionall add add any other information required for using/testing the final project)

Attributions
---
(TODO:  list sources that you have based your code off of, 1 per line, with file name, a very short description, and an accompanying url... for example: routes/index.js - Authentication code based off of http://foo.bar/baz ... alternatively, if you have already placed annotations in your project, answer "See source code comments")
