<template>
    <div v-if="toolchangeMacros.length > 1">
        <v-row v-for="(row, index) in rows" :key="'row_' + index" class="mt-0">
            <v-col>
                <v-item-group class="_btn-group py-0 px-3">
                    <extruder-control-panel-tools-item v-for="macro in row" :key="macro.name" :macro="macro" />
                </v-item-group>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { mdiPrinter3dNozzle } from '@mdi/js'
import { Component, Mixins } from 'vue-property-decorator'
import { PrinterStateMacro, PrinterStateToolchangeMacro } from '@/store/printer/types'
import BaseMixin from '@/components/mixins/base'
import ControlMixin from '@/components/mixins/control'

@Component({})
export default class ExtruderControlPanel extends Mixins(BaseMixin, ControlMixin) {
    mdiPrinter3dNozzle = mdiPrinter3dNozzle

    get macros() {
        return this.$store.getters['printer/getMacros']
    }

    get toolchangeMacros(): PrinterStateToolchangeMacro[] {
        return this.macros
            .filter((macro: PrinterStateMacro) => macro.name.toUpperCase().match(/^T\d+/))
            .sort((a: PrinterStateMacro, b: PrinterStateMacro) => {
                const numberA = parseInt(a.name.slice(1))
                const numberB = parseInt(b.name.slice(1))

                return numberA - numberB
            })
    }

    get rows() {
        const cols = 6
        let rows = []

        for (let i = 0; i < this.toolchangeMacros.length; i += cols) {
            rows.push(this.toolchangeMacros.slice(i, i + cols))
        }

        return rows
    }
}
</script>

<style scoped>
._btn-group {
    border-radius: 4px;
    display: inline-flex;
    flex-wrap: nowrap;
    max-width: 100%;
    min-width: 100%;

    .v-btn {
        border-radius: 0;
        border-color: rgba(255, 255, 255, 0.12);
        border-style: solid;
        border-width: thin;
        box-shadow: none;
        height: 28px;
        opacity: 0.8;
        min-width: auto !important;
    }

    .v-btn:first-child {
        border-top-left-radius: inherit;
        border-bottom-left-radius: inherit;
    }

    .v-btn:last-child {
        border-top-right-radius: inherit;
        border-bottom-right-radius: inherit;
    }

    .v-btn:not(:first-child) {
        border-left-width: 0;
    }
}
</style>
