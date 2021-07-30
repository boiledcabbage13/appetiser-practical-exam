<template>
    <div>
        <v-row>
            <v-col>
                <div class="title font-weight-bold">
                    {{ today | monthYearDate }}
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-sheet height="400">
                <v-calendar
                    ref="calendar"
                    :now="today"
                    :value="today"
                    :events="events"
                    color="primary"
                    type="month"
                ></v-calendar>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    props: {
        events: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    filters: {
        monthYearDate: function(value) {
            if (value) {
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                
                let date = new Date(value)
                return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
            }

            return null
        }
    },
    computed: {
        today: function() {
            if (this.events.length) {
                return this.events[0].start
            }

            return new Date().toISOString().substr(0, 10)
        }
    }
  }
</script>