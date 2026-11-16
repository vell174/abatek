<script setup lang="ts">
import type { MetalShape } from '~/data/metal-calculator';

defineProps<{ shape: MetalShape; title: string }>();
</script>

<template>
  <svg class="metal-profile-diagram" viewBox="0 0 320 300" role="img" :aria-label="`Схема профиля: ${title}`">
    <title>{{ title }}</title>
    <defs>
      <marker id="metal-profile-arrow" markerWidth="7" markerHeight="7" refX="3" refY="3" orient="auto-start-reverse">
        <path class="metal-profile-diagram__arrow" d="M6 0 0 3.5 6 7" />
      </marker>
    </defs>

    <template v-if="shape === 'sheet'">
      <rect class="metal-profile-diagram__solid" x="76" y="54" width="168" height="184" />
    </template>
    <template v-else-if="shape === 'strip'">
      <rect class="metal-profile-diagram__solid" x="56" y="116" width="208" height="60" />
    </template>
    <template v-else-if="shape === 'square'">
      <rect class="metal-profile-diagram__solid" x="82" y="68" width="156" height="156" />
    </template>
    <template v-else-if="shape === 'round' || shape === 'rebar'">
      <circle class="metal-profile-diagram__solid" cx="160" cy="146" r="84" />
      <template v-if="shape === 'rebar'">
        <path
          class="metal-profile-diagram__rib"
          d="M116 76 131 91 M166 62 178 78 M209 84 223 100 M242 143 225 150 M213 205 200 190 M161 230 153 212 M103 203 117 188 M77 144 95 139"
        />
      </template>
    </template>
    <template v-else-if="shape === 'hexagon'">
      <polygon class="metal-profile-diagram__solid" points="160,54 236,100 236,192 160,238 84,192 84,100" />
    </template>
    <template v-else-if="shape === 'round-pipe' || shape === 'flange'">
      <circle class="metal-profile-diagram__solid" cx="160" cy="146" r="88" />
      <circle class="metal-profile-diagram__cutout" cx="160" cy="146" r="55" />
      <template v-if="shape === 'flange'">
        <circle
          v-for="(point, index) in [
            [160, 73],
            [233, 146],
            [160, 219],
            [87, 146],
          ]"
          :key="index"
          class="metal-profile-diagram__bolt"
          :cx="point[0]"
          :cy="point[1]"
          r="7"
        />
      </template>
    </template>
    <template v-else-if="shape === 'profile-pipe'">
      <rect class="metal-profile-diagram__solid" x="66" y="64" width="188" height="164" rx="8" />
      <rect class="metal-profile-diagram__cutout" x="91" y="89" width="138" height="114" rx="4" />
    </template>
    <template v-else-if="shape === 'angle'">
      <path class="metal-profile-diagram__solid" d="M76 55 H113 V201 H244 V238 H76 Z" />
    </template>
    <template v-else-if="shape === 'channel' || shape === 'bent-channel'">
      <path class="metal-profile-diagram__solid" d="M76 55 H244 V89 H111 V204 H244 V238 H76 Z" />
    </template>
    <template v-else-if="shape === 'beam'">
      <path class="metal-profile-diagram__solid" d="M68 55 H252 V86 H178 V207 H252 V238 H68 V207 H142 V86 H68 Z" />
    </template>
    <template v-else-if="shape === 'elbow'">
      <path class="metal-profile-diagram__elbow" d="M75 225 V150 A91 91 0 0 1 166 59 H244" />
    </template>

    <line
      class="metal-profile-diagram__dimension"
      x1="76"
      y1="258"
      x2="244"
      y2="258"
      marker-start="url(#metal-profile-arrow)"
      marker-end="url(#metal-profile-arrow)"
    />
    <text class="metal-profile-diagram__symbol" x="160" y="282" text-anchor="middle">
      {{ shape === 'round' || shape === 'rebar' || shape === 'round-pipe' || shape === 'flange' ? 'd' : 'a' }}
    </text>
    <line
      class="metal-profile-diagram__dimension"
      x1="53"
      y1="55"
      x2="53"
      y2="238"
      marker-start="url(#metal-profile-arrow)"
      marker-end="url(#metal-profile-arrow)"
    />
    <text class="metal-profile-diagram__symbol" x="30" y="150" text-anchor="middle">b</text>
    <text
      v-if="['round-pipe', 'profile-pipe', 'angle', 'channel', 'bent-channel', 'beam', 'flange'].includes(shape)"
      class="metal-profile-diagram__symbol"
      x="250"
      y="110"
    >
      t
    </text>
  </svg>
</template>

<style scoped lang="scss">
.metal-profile-diagram {
  display: block;
  width: 100%;
  height: auto;
  color: $navy;

  &__solid {
    fill: rgba($blue, 0.23);
    stroke: $navy;
    stroke-width: 2.5;
  }

  &__cutout,
  &__bolt {
    fill: #fff;
    stroke: $navy;
    stroke-width: 2.5;
  }

  &__rib,
  &__elbow {
    fill: none;
    stroke: $navy;
    stroke-width: 3;
  }

  &__elbow {
    stroke-width: 34;
  }

  &__dimension,
  &__arrow {
    fill: none;
    stroke: $blue;
    stroke-width: 1.7;
  }

  &__symbol {
    font-size: 19px;
    font-weight: 700;
    fill: $navy;
  }
}
</style>
