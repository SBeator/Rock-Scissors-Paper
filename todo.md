# To do/bug list

## To do

1. ~~Use server render instead of static html~~
1. Use Redux
  1. TODO: Change GameControl to redux
  1. ~~Make sure player can join room correctly~~
  1. Change status message in different action
  1. Make sure the action object is correct in game reducer
  1. TODO: remove the first two lines after JOIN_ROOM action is created
  1. TODO: Change punch to punching and punched
  1. TODO: handle ready actions
  1. TODO: handle other player left action

1. Add more game socket handler
  1. Other player is disconnected
  1. Get ready for game
  1. Re-join game if disconnect or refresh
1. Use i18n strings
1. Add animation and more icons to make game beautiful
1. Add testing

### Done
- ~~Add multiple player support for Game~~
  - ~~Add wait logic and status changing~~
  - ~~Add join room logic~~
  - ~~Add punch and get punch status logic~~
  - ~~People can see result~~
  - ~~Restart punch~~
  - ~~Share join link~~
- ~~Use promise to write all the logic in db.js~~
- ~~Use websocket instead of db~~
- ~~Use promise to write websocket~~

-----------------
## bugs
- Need lots of refactor in react structures (Do it after redux)
- Add error handler for playing
- Websocket error handling
  - DB error
  - parameter error
  - connects array error
- DB bugs
  - Create room API need to remove the unused data in db
    - Remove user from other rooms
  - Join room API need to remove the unused data in db
    - Remove user from other rooms
    - Can't join room if there are more than 2 users in room.
  - db.js: Don't need find room if room doesn't exist
  - Only return nessecery data


### Done
- ~~Join room will create room itself.~~

