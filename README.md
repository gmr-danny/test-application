
# ![](https://i.imgur.com/a3A3nAu.png)


## About
This is our recreation of the popular app, Tinder, with an additional feature of suggesting date ideas and venues. Ember is a dating app that matches not only users with the same profile preferences, but also matches dates preferences in order to make real life dating more easy. This is a server rendered app using Express.js. 

### Technologies Used

* **Node.js, Express.js**
* **MongoDB / Mongoose**
* **Javascript**
* **Embedded Javascript**
* **HTML**
* **CSS**
* **Git**

### Installation Requirements

Clone the repo and install the following NPM packages:

```npm install node express body-parser method-override mongodb mongoose express-sessions bcrypt ejs```


### Features
* User register/login
* User's profile setup
* User's preferences definition
* User's prefered dates definition
* Navigete thru other users that matches the preferences and prefered dates
* No one near matching your preferences
* Match Screen
* View all matches

### Drawbacks & Issues/Bugs 
* Small DB, not enough users, low chance of matching
* Age preference isn't working properly 

## User Stories

**Starting Screen:**

The user presses either ‘register’ to create an account or ‘login’ if the user already has an account.

*1-) Login:*

The user enters information and presses enter. If user enters the wrong info, notification will show up for the user to enter login information again. If user enters the correct information, the user will go to Main Screen.

*b) Register:*

The user enters information to register an account. User proceeds to screen i. :
Screen i.
		User selects preferences on what type of people the user wants to date. After user is done, the user proceeds to

*Screen ii.* Default: user has no preferences.

*Screen ii.*
		User selects what type of dates the user wants to go on. Default: user wants to go on all types of dates.


**Main Screen:**

User is presented with a potential user profile. The user can either press “heart” button if the user wants a date or “X” button to reject. Despite whether the user pressed “heart” or “X” button, the screen will change and present a new user profile for this user.

* *Case #1:*
If the user matches with another user profile, i.e. both users pressed “heart” button on each other, this user proceeds to Matched Screen.

* *Case #2:*
User runs out of people to date, then user will be prompt to go back and edit User preferences.

The user can press “profile” button to view the user’s own profile and move to Edit Profile Screen.

The user can press “dates” button to view the user’s scheduled dates (matched user and agreed location)

**Edit Profile Screen**

In this screen, the user can edit the user’s own information. Once the user is done, the user goes back the the main screen.

**Matched Screen**

In this screen, the user is matched with another user. The user now sees a list of potential venues/date locations to choose from and invite the matched user to a date.

**Strech Goals**

* **Scheduled Dates/Date requests**

In this screen, the dates are listed. The user can deleted any of the dates listed.  


### Wireframes

**Register screen**
# ![](https://i.imgur.com/QlOpMw7.png)

**Login screen**
# ![](https://i.imgur.com/IlzP6CI.png)

**Profile screen**
# ![](https://i.imgur.com/FEEwJZi.png)

**Preferences screen**
# ![](https://i.imgur.com/TZ8HY5w.png)

**Prefered dates**
# ![](https://i.imgur.com/Klm0xca.png)

**Swipe screen**
# ![](https://i.imgur.com/g2r7E7f.png)

**Match screen**
# ![](https://i.imgur.com/n6S97ce.png)

**Anyone available for now**
# ![](https://i.imgur.com/Mb9aFjo.png)

**Edit your profile screen**
# ![](https://i.imgur.com/PEVBAZK.png)

**Your Matches screen**
# ![](https://i.imgur.com/b25PoMz.png)


### Information Flow:
# ![](https://i.imgur.com/rMbPxiR.png)

### ERD
# ![](https://i.imgur.com/F1uZYgu.png)

### Authors
* **Cesar Martins** - [GitHub](https://git.generalassemb.ly/cesarmartins)

* **Danny Wong** - [GitHub](https://git.generalassemb.ly/dawong8)
