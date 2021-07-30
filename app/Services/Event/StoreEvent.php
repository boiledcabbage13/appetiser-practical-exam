<?php

namespace App\Services\Event;

use App\Models\Event;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class StoreEvent {
    /**
     * @param $data [product_id, quantity]
     * 
     * @return Event
     */

    public function execute($data) {
        $dates = $this->getDates($data['dateFrom'], $data['dateTo'], $data['days']);

        $results = [];

        foreach ($dates as $key => $date) {
            $data = Event::create([
                'name' => $data['name'],
                'date' => $date
            ]);

            $results[] = $data;
        }


        return $results;
    }

    private function getDates($dateFrom, $dateTo, $days) {
        $dates = CarbonPeriod::create($dateFrom, $dateTo);

        $results = [];

        foreach ($days as $key => $day) {
            foreach ($dates as $key => $date) {
                /**
                 * 0 for Sunday,
                 * ...
                 * 6 for Saturday
                 */
                if ($date->dayOfWeek == $day) {
                    array_push($results, $date->format('Y-m-d'));
                }
            }
        }
        
        return $results;
    }
}