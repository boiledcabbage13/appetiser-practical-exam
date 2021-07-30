<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <v-text-field
            v-model="form.name"
            placeholder="Event Name"
            label="Event Name"
            :rules="requiredRules"
        ></v-text-field>
        <div class="caption">
            Select at least 1
        </div>
        <div class="d-flex">
            <v-checkbox
                v-for="(weekName, key) in weekNames"
                :key="key"
                v-model="form.days"
                :label="weekName.short"
                :value="key"
                class="ma-2"
                :rules="requiredRules"
            ></v-checkbox>
        </div>
        <div class="date-range-picker d-flex">
            <div class="date-from">
                <v-menu
                    v-model="dateFromMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="form.dateFrom"
                            label="From"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            :rules="requiredRules"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="form.dateFrom"
                        @input="dateFromMenu = false"
                    ></v-date-picker>
                </v-menu>
            </div>
            <div class="date-to">
                <v-menu
                    v-model="dateToMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="form.dateTo"
                            label="To"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            :rules="requiredRules"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="form.dateTo"
                        @input="dateToMenu = false"
                    ></v-date-picker>
                </v-menu>
            </div>
        </div>
        <slot name="actions" :form="form"></slot>
        <v-btn
            :disabled="!valid"
            color="primary"
            class="mt-4"
            @click="submit"
            :loading="loading"
        >
            Submit
        </v-btn>
    </v-form>
</template>

<script>
import { eventRepositoryApi } from '../../../../services/repositories'

export default {
    data: () => ({
        valid: false,
        dateFromMenu: false,
        dateToMenu: false,
        form: {
            days: []
        },
        requiredRules: [
            v => !!v || 'This field is required',
        ],
        weekNames: [
            { long: 'Sunday', short: 'Sun' },
            { long: 'Monday', short: 'Mon' },
            { long: 'Tuesday', short: 'Tue' },
            { long: 'Wednesday', short: 'Wed' },
            { long: 'Thursday', short: 'Thu' },
            { long: 'Friday', short: 'Fri' },
            { long: 'Saturday', short: 'Sat' },
        ],
        loading: false
    }),
    methods: {
        validate () {
            return this.$refs.form.validate() && this.form.days.length
                ? true
                : false
        },
        async submit() {
            if (this.validate()) {
                this.loading = true

                await eventRepositoryApi.create(this.form)
                    .then(response => {
                        let {
                            data: {
                                data: items
                            }
                        } = response

                        this.$emit('after:submit', {
                            message: response.data.message,
                            success: true,
                            events: items
                        })
                    })
                    .catch(() => {
                          this.$emit('after:submit', {
                            message: 'Something went wrong.',
                            success: false,
                            events: []
                        })
                    })
                    .finally(() => {
                        this.loading = false
                    })
            }
        }
    }
}
</script>