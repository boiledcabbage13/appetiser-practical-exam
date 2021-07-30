const BASE_PATH = '/events';

export const EventModuleRoutes = [
  {
    path: BASE_PATH,
    name: 'EventsModule',
    component: () => import(/* webpackChunkName: 'eventsModule' */ '../EventsModule'),
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'Event',
        component: () => import(/* webpackChunkName: 'eventPage' */ '../pages/EventPage')
      }
    ]
  }
]
