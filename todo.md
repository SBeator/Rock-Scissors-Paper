# To do/bug list

## To do
- Add multiple player support for Game
  - ~~Add wait logic and status changing~~
  - ~~Add join room logic~~
  - ~~Add punch and get punch status logic~~
  - ~~People can see result~~
  - ~~Restart punch~~
  - ~~Share join link~~
- ~~Use promise to write all the logic in db.js~~
- Use i18n strings
- Use promise to write websocket
- ~~Use websocket instead of db~~
- Add testing
- Add more game socket hanlder
  - Other player is disconnected
  - Get ready for game
  - Re-join game if disconnect or refresh

## bugs
- Need lots of refactor in react structures
- Create room API need to remove the unused data in db
  - Remove user from other rooms
- Join room API need to remove the unused data in db
  - Remove user from other rooms
  - Can't join room if there are more than 2 users in room.
- ~~Join room will create room itself.~~
- db.js: Don't need find room if room doesn't exist
- Only return nessecery data
- Add error handler for playing
- Don't use hard code string
- Game layout is bad
- Websocket error handling
  - DB error
  - parameter error
  - connects array error