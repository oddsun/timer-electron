# timer-electron
[![GitHub license](https://img.shields.io/github/license/oddsun/timer-electron)](https://github.com/oddsun/timer-electron/blob/master/LICENSE)
[![build](https://github.com/oddsun/timer-electron/actions/workflows/electron_release.yml/badge.svg)](https://github.com/oddsun/timer-electron/actions/workflows/electron_release.yml)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/oddsun/timer-electron)


Modern cross-platform timer/countdown app written using Vuetify and ElectronJS.

## Key Features

1. Modern Stunning Look: Borderless; Transparent background. 
![main](https://user-images.githubusercontent.com/1161465/173975835-734702a4-df5f-4d73-be2b-cc641ad79e7f.png)


2. Auto-cycling of app wide color theme at the click of a button ("Cycle Color" near bottom)
3. Timer turns Neon when running
![neon](https://user-images.githubusercontent.com/1161465/173975967-19aa7c50-801f-4e51-b2b7-5efcc3f9d027.png)
4. Has timer and countdown
5. Keeps recent history on right
6. Can enter Title ("Problem Number") and Comments for the current timer/countdown record
7. Timer can be minimized to show only essential informatin by the "minimize icon" on top right corner  
![min](https://user-images.githubusercontent.com/1161465/173976778-9c3a165a-c682-4ef9-b70b-6fddf93f264d.png)


8. Timer/countdown are auto saved to local database (NeDB) and displayed on calendar tab
![calendar](https://user-images.githubusercontent.com/1161465/173976115-1f6ab668-4edb-48db-b38f-7350152b72da.png)
9. Comments, titles for each record are editable on calendar tab and autosaved to local database (NeDB)
10. Records can be exported/imported to/from json
![import](https://user-images.githubusercontent.com/1161465/173976822-d56c7597-42be-4bac-be45-729843a374f7.png)
![export](https://user-images.githubusercontent.com/1161465/173976829-54bbca8a-4ace-4443-ba76-9c5131517827.png)
e.g. json export
```json
[{"name":"","start":"2022-06-15 21:59:11","end":"2022-06-15 22:00:38","details":"","time":"00:01:26","color":"hsl(178,100%,35%)","_id":"JPN6ULraxxwGKXPc"},
{"name":"","start":"2022-06-15 21:58:51","end":"2022-06-15 21:58:56","details":"","time":"00:00:05","color":"hsl(120,100%,35%)","_id":"Kv59UAzpnk2fCeXK","status":"replaced","new_id":"gmEAHrDqFSTucAZN"},
{"name":"test1","start":"2022-06-15 21:58:51","end":"2022-06-15 21:58:56","details":"","time":"00:00:05","color":"hsl(120,100%,35%)","original_id":"Kv59UAzpnk2fCeXK","_id":"gmEAHrDqFSTucAZN"},
{"name":"","start":"2022-06-13 02:06:11","end":"2022-06-13 02:06:14","details":"","time":"00:00:03","color":"hsl(75,100%,35%)","_id":"iz01M0abXr3MTz1o"},
{"name":"","start":"2022-06-15 21:58:39","end":"2022-06-15 21:58:49","details":"","time":"00:00:10","color":"hsl(105,100%,35%)","_id":"wKAGoG4geoN3OrYY"}]
```

## Known bugs
1. Top strip (i.e. TIMER, CALENDAR tab and minimize icon) is not clickable on Windows. Seems to be covered by invisible window title bar that prevents clicking. But these buttons can still be accessed via Tab by cycling focus.
