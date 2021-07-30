<template>
    <v-row>
        <v-col cols="12">
            <div class="title font-weight-bold">
                Calendar
            </div>
            <v-divider></v-divider>
        </v-col>
        <v-col cols="4">
            <create-event-form
                class="pa-4"
                @after:submit="setEvents($event)"
            >
            </create-event-form>
        </v-col>
        <v-col cols="8">
            <event-calendar :events="events" />
        </v-col>
        <v-snackbar
            v-model="snackbar.show"
            :timeout="snackbar.timeout"
            :color="snackbar.color"
            top
            right
        >
            {{ snackbar.message }}
        </v-snackbar>
    </v-row>
</template>

<script>
export default {
    components: {
        CreateEventForm: () => import(/* webpackChunkName: 'createEventForm' */ '../components/forms/CreateEventForm'),
        EventCalendar: () => import(/* webpackChunkName: 'eventCalendar' */ '../components/partials/EventCalendar')
    },
    data: () => ({
        events: [],
        snackbar: {},
    }),
    methods: {
        setEvents(event) {
            this.events = event.events.map(item => {
                return {
                    name: item.name,
                    start: item.date,
                    end: null
                }
            })

            this.setSnackBar(event.message, event.success)
        },
        setSnackBar(message, status) {
            this.snackbar = {
                show: true,
                message,
                timeout: 2000,
                color: status ? 'success' : 'error'
            }
        }
    }
}
</script>