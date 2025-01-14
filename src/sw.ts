/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="WebWorker" />

declare let self: ServiceWorkerGlobalScope
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'

// disable workbox logs
self.__wb_disable_dev_logs = true
cleanupOutdatedCaches() // cleanup everything that's not needed anymore

precacheAndRoute(self.__WB_MANIFEST) //cache our new stuff
self.skipWaiting()
clientsClaim()
