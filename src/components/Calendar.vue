<template>
<v-layout fill-height>
  <v-flex>
    <v-sheet height="64" dark color='transparent'>
      <v-toolbar flat color="transparent" dark>
        <v-btn outlined class="mr-4" @click="setToday">
          Today
        </v-btn>
        <v-btn fab text small @click="prev">
          <v-icon small>arrow_back_ios</v-icon>
        </v-btn>
        <v-btn fab text small @click="next">
          <v-icon small>arrow_forward_ios</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn fab text small @click="import_cal" v-on="on">
              <v-icon>{{ cal_import }}</v-icon>
            </v-btn>
          </template>
          <span>Import</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn fab text small class="mr-4" @click="export_cal" v-on="on">
              <v-icon>{{ cal_export }}</v-icon>
            </v-btn>
          </template>
          <span>Export</span>
        </v-tooltip>
        <v-menu bottom right>
          <template v-slot:activator="{ on }">
            <v-btn outlined v-on="on">
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right>arrow_drop_down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = '4day'">
              <v-list-item-title>4 days</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>Week</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-sheet>
    <v-sheet class="fill-height-cal-sheet" color="transparent" height="688">
      <v-calendar backgroundcolor="transparent" dark ref="calendar" v-model="focus" :events="events" :event-color="getEventColor" :event-margin-bottom="3" :now="today" :type="type" @click:event="showEvent" @click:more="viewDay" @click:date="viewDay"
        @change="updateRange">
      </v-calendar>
      <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" full-width offset-x>
        <v-card color="rgba(0,0,0,0.8)" min-width="350px" flat>
          <v-toolbar :color="selectedEvent.color" dark>
            <!-- <v-btn icon @click="edit_cal_event">
              <v-icon>edit</v-icon>
            </v-btn> -->
            <!-- <v-toolbar-title v-model="selectedEvent.name" v-html="selectedEvent.name"> :disabled="cal_event_edit_disabled"-->
            <v-text-field hide-details solo flat background-color='transparent' v-model="selectedEvent.name"></v-text-field>
            <!-- </v-toolbar-title> -->
            <!-- <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn> -->
          </v-toolbar>
          <v-card-text>
            <v-layout column fill-height pl-3 pr-3>
              <v-flex>
                <v-layout row fill-height>
                  <v-flex shrink>
                    <span class="calendar-details-category">Start:</span>
                  </v-flex>
                  <v-flex>
                    <span class="calendar-details start" v-html="selectedEvent.start"></span>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex>
                <v-layout row fill-height>
                  <v-flex shrink>
                    <span class="calendar-details-category">End:</span>
                  </v-flex>
                  <v-flex>
                    <span class="calendar-details end" v-html="selectedEvent.end"></span>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex>
                <v-layout row fill-height>
                  <v-flex shrink>
                    <span class="calendar-details-category">Time:</span>
                  </v-flex>
                  <v-flex>
                    <span class="calendar-details end" v-html="selectedEvent.time"></span>
                  </v-flex>
                </v-layout>
              </v-flex>
              <!-- <v-flex shrink>
                    <v-layout column fill-height>
                      <v-flex shrink>
                        <span class="calendar-details-category">Start:</span>
                      </v-flex>
                      <v-flex shrink>
                        <span class="calendar-details-category">End:</span>
                      </v-flex>
                      <v-flex shrink>
                        <span class="calendar-details-category">Time:</span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex>
                    <v-layout column fill-height>
                      <v-flex>
                        <span class="calendar-details start" v-html="selectedEvent.start"></span>
                      </v-flex>
                      <v-flex>
                        <span class="calendar-details end" v-html="selectedEvent.end"></span>
                      </v-flex>
                      <v-flex>
                        <span class="calendar-details end" v-html="selectedEvent.time"></span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex> -->
              <v-flex>
                <v-layout row fill-height>
                  <v-flex shrink>
                    <span class="calendar-details-category">Notes:</span>
                  </v-flex>
                  <v-flex>
                    <v-textarea :key="auto_grow_hack" rows="1" row-height="1" auto-grow hide-details solo flat background-color='transparent' v-model="selectedEvent.details" id="calendar-details"></v-textarea>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <!-- <v-layout row fill-height>
              <v-flex shrink>
                <v-layout column fill-height width="3em">
                  <v-flex shrink>
                    <span class="calendar-details-category">Details:</span>
                  </v-flex>
                  <v-flex shrink>
                    <span class="calendar-details-category">Start:</span>
                  </v-flex>
                  <v-flex shrink>
                    <span class="calendar-details-category">End:</span>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex shrink>
                <v-layout column fill-height shrink>
                  <v-flex shrink>
                    <span class="calendar-details" v-html="selectedEvent.details"></span>
                  </v-flex>
                  <v-flex>
                    <span class="calendar-details start" v-html="selectedEvent.start"></span>
                  </v-flex>
                  <v-flex>
                    <span class="calendar-details end" v-html="selectedEvent.end"></span>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout> -->
          </v-card-text>
          <v-card-actions>
            <v-btn text color="white" @click="selectedOpen = false">
              Cancel
            </v-btn>
            <v-btn text color="white" @click="save_changes">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
  </v-flex>
</v-layout>
</template>

<script>
import shared from '../shared.js'
import {
  EventBus
} from '../event-bus.js'
import fs from 'fs'
import {
  homedir
} from 'os'
import {
  mdiCalendarImport,
  mdiCalendarExport
} from '@mdi/js'
import {
  remote
} from 'electron'

export default {
  data: () => ({
    cal_import: mdiCalendarImport,
    cal_export: mdiCalendarExport,
    today: shared.formatDate(new Date()).substring(0, 10),
    focus: shared.formatDate(new Date()).substring(0, 10),
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedEvent_backup: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    cal_event_edit_disabled: true,
    auto_grow_hack: true,
    // events: [{
    //     name: 'Vacation',
    //     details: 'Going to the beach!',
    //     start: '2018-12-29',
    //     end: '2019-01-01',
    //     color: 'blue',
    //   },
    //   {
    //     name: 'Meeting',
    //     details: 'Spending time on how we do not have enough time',
    //     start: '2019-01-07 09:00',
    //     end: '2019-01-07 09:30',
    //     color: 'indigo',
    //   },
    //   {
    //     name: 'Large Event',
    //     details: 'This starts in the middle of an event and spans over multiple events',
    //     start: '2018-12-31',
    //     end: '2019-01-04',
    //     color: 'deep-purple',
    //   },
    //   {
    //     name: '3rd to 7th',
    //     details: 'Testing',
    //     start: '2019-01-03',
    //     end: '2019-01-07',
    //     color: 'cyan',
    //   },
    //   {
    //     name: 'Big Meeting',
    //     details: 'A very important meeting about nothing',
    //     start: '2019-01-07 08:00',
    //     end: '2019-01-07 11:30',
    //     color: 'red',
    //   },
    //   {
    //     name: 'Another Meeting',
    //     details: 'Another important meeting about nothing',
    //     start: '2019-01-07 10:00',
    //     end: '2019-01-07 13:30',
    //     color: 'brown',
    //   },
    //   {
    //     name: '7th to 8th',
    //     start: '2019-01-07',
    //     end: '2019-01-08',
    //     color: 'blue',
    //   },
    //   {
    //     name: 'Lunch',
    //     details: 'Time to feed',
    //     start: '2019-01-07 12:00',
    //     end: '2019-01-07 15:00',
    //     color: 'deep-orange',
    //   },
    //   {
    //     name: '30th Birthday',
    //     details: 'Celebrate responsibly',
    //     start: '2019-01-03',
    //     color: 'teal',
    //   },
    //   {
    //     name: 'New Year',
    //     details: 'Eat chocolate until you pass out',
    //     start: '2019-01-01',
    //     end: '2019-01-02',
    //     color: 'green',
    //   },
    //   {
    //     name: 'Conference',
    //     details: 'The best time of my life',
    //     start: '2019-01-21',
    //     end: '2019-01-28',
    //     color: 'grey darken-1',
    //   },
    //   {
    //     name: 'Hackathon',
    //     details: 'Code like there is no tommorrow',
    //     start: '2019-01-30 23:00',
    //     end: '2019-02-01 08:00',
    //     color: 'black',
    //   },
    //   {
    //     name: 'event 1',
    //     start: '2019-01-14 18:00',
    //     end: '2019-01-14 19:00',
    //     color: '#4285F4',
    //   },
    //   {
    //     name: 'event 2',
    //     start: '2019-01-14 18:00',
    //     end: '2019-01-14 19:00',
    //     color: '#4285F4',
    //   },
    //   {
    //     name: 'event 5',
    //     start: '2019-01-14 18:00',
    //     end: '2019-01-14 19:00',
    //     color: '#4285F4',
    //   },
    //   {
    //     name: 'event 3',
    //     start: '2019-01-14 18:30',
    //     end: '2019-01-14 20:30',
    //     color: '#4285F4',
    //   },
    //   {
    //     name: 'event 4',
    //     start: '2019-01-14 19:00',
    //     end: '2019-01-14 20:00',
    //     color: '#4285F4',
    //   },
    //   {
    //     name: 'event 6',
    //     start: '2019-01-14 21:00',
    //     end: '2019-01-14 23:00',
    //     color: '#4285F4',
    //   },
    //   {
    //     name: 'event 7',
    //     start: '2019-01-14 22:00',
    //     end: '2019-01-14 23:00',
    //     color: '#4285F4',
    //   },
    // ],
  }),
  computed: {
    title() {
      const {
        start,
        end
      } = this
      // console.log(this)
      // console.log(start)
      // console.log(end)
      if (!start || !end) {
        return ''
      }

      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth

      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear

      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)

      switch (this.type) {
        case 'month':
          return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC',
        month: 'long',
      })
    },
  },
  methods: {
    import_cal() {
      // console.log(remote.dialog);
      remote.dialog.showOpenDialog({
        properties: ['openFile']
      }, files => {
        if (files != undefined && files.length === 1) {
          // console.log(files);
          fs.readFile(files[0], (err, data) => {
            var imported_events = JSON.parse(data);
            // var new_event = this.remove_id(imported_events[0]);
            // console.log(new_event);
            // console.log(imported_events[0]);
            // this.$db.find(new_event, (err, docs) => {
            //   console.log(docs);
            // });
            // console.log(imported_events);
            // var mod_events = [];
            for (const imported_event of imported_events) {
              let new_event = this.remove_id(imported_event); //changes event before callback
              // console.log(new_event);
              this.$db.find(new_event, (err, docs) => {
                // console.log(err);
                // console.log(docs);
                if (docs === undefined || docs.length === 0) {
                  // console.log('no such doc');
                  // console.log(new_event);
                  this.$db.insert(new_event, (err, newrec) => {
                    // console.log(err);
                    // console.log(newrec);
                    this.loadEvents();
                  });
                }
              });
              // this.$db.insert(this.remove_id(imported_event), (err, newrec) => {
              //   console.log(err);
              //   console.log(newrec);
              // });
            }
          })
        }
      });
    },
    remove_id(old_event) { //this moves _id to original_id
      var new_event = {};
      // delete Object.assign(new_event, old_event, {
      //   ["original_id"]: old_event["_id"]
      // })["_id"];
      delete Object.assign(new_event, old_event)["_id"];
      return new_event;
      // return Object.assign({}, old_event);
    },
    export_cal() {
      var path = homedir() + '/Downloads/calendar.json';
      var i = 1;
      while (fs.existsSync(path)) {
        i += 1;
        path = homedir() + '/Downloads/calendar_' + i + '.json';
      }
      // console.log(path);
      fs.writeFile(path, JSON.stringify(this.events), (err) => {
        //throws error
        // console.log(err);
      });
    },
    save_changes() {
      // todo: split event
      if (this.selectedEvent.name == this.selectedEvent_backup.name && this.selectedEvent.details == this.selectedEvent_backup.details) {
        this.selectedOpen = false;
        // console.log("nothing changed")
        return;
      }
      var new_event = {};
      delete Object.assign(new_event, this.selectedEvent, {
        ["original_id"]: this.selectedEvent["_id"]
      })["_id"];
      this.$db.insert(new_event, (err, newrec) => {
        new_event = newrec
        // console.log(new_event)
        this.$db.update({
          _id: this.selectedEvent._id
        }, {
          $set: {
            status: "replaced",
            new_id: new_event._id
          }
        }, {}, (err, numReplaced) => {

        });
        // this.$db.find({
        //   status: "replaced"
        // }, function(err, docs) {
        //   // docs is an array containing documents that have name as bigbounty
        //   // If no document is found, docs is equal to []
        //   console.log(docs)
        // });
      });
      // console.log(new_event);
      // console.log(this.selectedEvent);
      this.selectedOpen = false;
    },
    force_refresh() {
      this.auto_grow_hack = !this.auto_grow_hack;
    },
    edit_cal_event() {
      // console.log(this.events)
      this.cal_event_edit_disabled = !this.cal_event_edit_disabled;
    },
    loadEvents() {
      this.$db.find({
        start: {
          $regex: /./
          // $regex: /24/
        },
        // name: "test_import v3",
        $not: {
          status: 'replaced'
        }
        // status: {
        //   $ne: 'replaced'
        // }
      }, (err, docs) => {
        // console.log(docs);
        this.events = docs;
      })
    },
    updateEvents(new_rec) {
      this.events.push(new_rec);
      // console.log('updating');
    },
    viewDay({
      date
    }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = this.today
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({
      nativeEvent,
      event
    }) {
      const open = () => {
        this.selectedEvent = event
        Object.assign(this.selectedEvent_backup, event)
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
        // this.force_refresh()
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange({
      start,
      end
    }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      // console.log(start)
      this.start = start
      this.end = end
    },
    nth(d) {
      return d > 3 && d < 21 ?
        'th' : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    },
  },
  beforeMount() {
    // console.log(this);
    this.loadEvents();
  },
  mounted() {
    EventBus.$on('send_newrec', newrec => {
      // console.log('receiving');
      this.updateEvents(newrec);
    });
  }
}
</script>

<style>
.theme--dark.v-calendar-daily .v-calendar-daily__intervals-body {
  color: white;
}

.fill-height-cal-sheet {
  /* height: calc(100% - 64px); */
}

.theme--dark.v-calendar-weekly {
  border-left: none;
}

.theme--dark.v-calendar-daily,
.theme--dark.v-calendar-weekly {
  background: transparent;
}

.theme--dark.v-calendar-weekly .v-calendar-weekly__day.v-outside {
  background: rgba(0, 0, 0, 0.5);
}

.theme--dark.v-calendar-weekly .v-calendar-weekly__head-weekday.v-outside {
  background: transparent;
}

.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background: rgba(0, 0, 0, 0.5);
}

.v-calendar.v-calendar-events .v-calendar-weekly__day,
.v-calendar.v-calendar-events .v-calendar-weekly__head-weekday {
  margin-left: 0px;
  margin-right: 0px;
  /* overwrote margin-right: -1px; */
}

.theme--dark.v-calendar-weekly .v-calendar-weekly__day,
.theme--dark.v-calendar-weekly .v-calendar-weekly__head-weekday {
  /* border-right: #9e9e9e 1px solid;
  border-bottom: #9e9e9e 1px solid; */
  border-left: 1px solid var(--neon-box-shadow-highlight);
  /* border-right: none;  */
  /* there is a 1px border-right, turning it off would have weekday and head mismatch due to flex */
  /* border-right: 1px solid var(--neon-box-shadow-highlight); */
  border-bottom: 1px solid var(--neon-box-shadow-highlight);
}

.theme--dark.v-calendar-daily .v-calendar-daily_head-day,
.theme--dark.v-calendar-daily .v-calendar-daily__day {
  border-right: 1px solid var(--neon-box-shadow-highlight);
  border-bottom: 1px solid var(--neon-box-shadow-highlight);
}

/* .theme--dark.v-calendar-weekly .v-calendar-weekly__head-weekday:last-child  */
.theme--dark.v-calendar-weekly .v-calendar-weekly__day:last-child {
  border-right: 1px solid var(--neon-box-shadow-highlight);
}

.theme--dark.v-calendar-weekly .v-calendar-weekly__head-weekday:first-child {
  border-left: none;
}

.theme--dark.v-calendar-weekly .v-calendar-weekly__head-weekday:last-child {
  border-right: none;
}

/* .v-calendar-weekly__head-weekday {
  flex: 1;
} */


.theme--dark.v-calendar-daily .v-calendar-daily__day-interval {
  border-top: 1px solid var(--neon-box-shadow-highlight);
}

.theme--dark.v-calendar-daily .v-calendar-daily__intervals-head,
.theme--dark.v-calendar-daily .v-calendar-daily__intervals-body {
  border-right: 1px solid var(--neon-box-shadow-highlight);
}

.calendar-details,
#calendar-details {
  color: hsl(var(--neon-color-complement-shadow), 100%, 75%);
  /* width: 300px; */
  /* display: inline-block; */
  font-family: "iceland", cursive;
  word-wrap: break-word;
  font-size: 1.5em;
  /* white-space: normal;
  margin: 0; */
  /* padding-right: 8em; */

  /* padding-left: 1em; */
}

#calendar-details {
  position: relative;
  top: 0;
}

.calendar-details.start,
.calendar-details.end {
  /* padding-right: 8em; */
  /* width: 5em; */
}

.theme--dark.v-calendar-weekly .v-calendar-weekly__head-weekday.v-past {
  color: white;
}

.calendar-details-category {
  /* padding-left: 1em; */
  padding-right: 0.5em;
  font-family: "iceland", cursive;
  font-size: 1.5em;
  width: 3em;
  display: block;
  /* color: black; */
  /* display: inline-block; */
}

.v-textarea>.v-input__control>.v-input__slot {
  display: block;
}

.v-textarea.v-text-field--enclosed .v-text-field__slot textarea {
  padding-top: 0;
  margin-top: 0;
}
</style>
