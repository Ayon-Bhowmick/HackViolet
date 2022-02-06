#### HackViolet
# VioletLight
## Together & Safe
### Description
Blue lights are great on college campuses.**explain what blue light is for** But, students spend a lot of time off campus going to parties and exploring town. It can be very scary when you’re with a group of friends and someone goes missing. Especially for women and minorities, who are unfortunately targeted. This is where VioletLight comes in. VioletLight is a mobile app that allows users to create groups and keep track of those in their group using geolocation technology. Users select a safe meeting spot as well as the maximum distance they feel comfortable with traveling away from each other. VioletLight will send notification when users become too far from the safe spot or has a low battery charge. It also allows for emergency messages that will alert everyone in the group. While this app was made with women and students in mind, it can also just be generally beneficial and helpful for anyone who may feel unsafe or wants to be more secure and prepared.

Before today no one in our hackathon group knew anything about creating phone apps. Together we learned how to use React Native and the tools that come with it like Expo go. After a few hours of a mixture of tutorials and trial and error, we started to get the hang of creating components and manipulating the framework properly. Bridging the learning curve for React Native was the least of our problems though. I’d say our biggest roadblock was with setting up and integrating the backend. Databases are also something none of us had much experience with. Initially we wanted to use a database directly connected to the app. However, it was difficult to make an api in React Native, so one of us made an API using Next.js and hosted it from his laptop. Because of this for now you have to be on the same wifi in order to access and communicate with the database. We also struggled with using Twilio. Sending emergency text messages is a very important and integral part of our app design and it’s the thing that took us the longest to set up. We finally realized(after several hours) that Someone had mistyped the phone number we had been trying to send messages to and after making that correction it seemed to work fine. We also had to call Twilio through the API we made because using it with React Native was not natively supported.

We began by coming together and brainstorming app ideas. We had so many great ideas, it was difficult to just choose one. This was the second hackathon we’ve participated in, although this one was much larger. While scary at first, once we began participating in the discord and workshops everyone was so kind and helpful that it felt like a really great community. We were able to connect with people over social media and really felt like we were able to make some great friendships! 


While we all helped each other and switched around tasks, Josh and Tiana worked mainly on the front end and design of the app. Josh started off by using Figma to completely 
Prototype the layout of our app. Using this as a guide Tiana then coded the general layout of the app and drew out the lamp logo seen on the first two pages. Ayon made the database and the API and hosted the API off his laptop. Erick connected the app to Twilio using the API. 

### How to Run
* npm i 
* npm run
* npm run dev
* scan the QR code in the terminal with Phone
### Team Members:
1. Ayon Bhowmick
2. Tiana Aldroubi
3. Erick Tepen
4. Josh Tripoli
