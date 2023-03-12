import Datastore from '@seald-io/nedb'
import path from 'path'
import { ipcRenderer } from 'electron'


export default ipcRenderer.invoke('getPath').then(
  (dataPath)=> { 
    console.log(path.join(dataPath, 'timer.db'))
    return new Datastore({
    autoload: true,
    timerstampData: true,
    // filename: path.join(process.env.NODE_ENV !== 'production' ? '.' : remote.app.getPath('userData'), 'data/timer.db')
    filename: path.join(dataPath, 'timer.db')
  })
}
)

// new Datastore({
//   autoload: true,
//   timerstampData: true,
//   // filename: path.join(process.env.NODE_ENV !== 'production' ? '.' : remote.app.getPath('userData'), 'data/timer.db')
//   filename: path.join(dataPath, 'timer.db')
// })

// console.log(path.join(dataPath, 'timer.db'))
