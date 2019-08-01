import Datastore from 'nedb'
import path from 'path'
import {
  remote
} from 'electron'

export default new Datastore({
  autoload: true,
  timerstampData: true,
  // filename: path.join(process.env.NODE_ENV !== 'production' ? '.' : remote.app.getPath('userData'), 'data/timer.db')
  filename: path.join(remote.app.getPath('userData'), 'timer.db')
})

console.log(path.join(remote.app.getPath('userData'), 'timer.db'))