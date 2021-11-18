## Sendbird's Friends API

Sendbird allows users to enter a personal discovery key (which must be unique)

Then, other users can upload a unique key as part of a friend discovery. Sendbird searches for this unique key and informs users if there's a match. 

### Steps:

1) Connect to Sendbird chat.
2) Add your personal discovery key.

3) Other users will send discovery keys asking Sendbird to find users and make a friendship.
4) If there's a match between the discovery key you upload and any other user's personal discovery key, then Sendbird will inform via User Handle.
5) This handle is fired and you can invoke the makeFriend function to become friend of this user.

Other options are: Delete friend and delete a match between a personal discovery key and a discovery key request so a user will never be informed as a match.

### Youtube video

See how this demo works.

https://www.youtube.com/watch?v=8EQeq2Ny5kA

