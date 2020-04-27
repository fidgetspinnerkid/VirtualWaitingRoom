# Virtual Waiting Room

A no-setup system for doctors to check in patients from their cars!

# Features

  - Connect the doctor's browser to the patient's phone browser via a peer2peer link.
  - Protected Health Information does not pass through 3rd party servers!

### Tech

To form the direct doctor browser to patient browser connection, we use a secure protocol called WebRTC. WebRTC is supported in almost all major browsers, and can be secured via any standard SSL based connection on the web.

To accelerate development time, we used PeerJS's wrapper for WebRTC. It is simple, intuitive, and easy to use. Definitely go check it out!

For our formbuilder, we borrow the work of the wonderful people who made JQuery Formbuilder, and to display our dynamic table on the doctor side, we use datatables.js, which adds tons of extra features to a normally boring HTML table, such as search functionality and pagination!

To prettify our website, we use Bootstrap, and we use JQuery because it is so versatile.

### How to Use

Everything we've coded can be deployed as a static site! (One of the things we're proud of is our cost-effectiveness.)

Just go into a folder and run the index.html in a browser with all the javascript files in the same root directory.

If we have some more time, we can link some repls!

Stay safe, everybody!
