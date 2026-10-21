<script setup lang="ts">
import { screwFlightContent as content } from '~/data/screw-flight-calculator';
import type { ScrewFlightResult } from '~/utils/calculate-screw-flight';

const props = defineProps<{ result: ScrewFlightResult | null }>();

const blank = computed(() => {
  if (!props.result) return null;

  const centerX = 220;
  const centerY = 185;
  const outerRadius = 123;
  const innerRadius = (props.result.blankInnerDiameter / props.result.blankOuterDiameter) * outerRadius;
  const halfGap = props.result.cutoutAngleRad / 2;
  const start = Math.PI / 2 + halfGap;
  const end = Math.PI / 2 - halfGap;
  const point = (radius: number, angle: number) =>
    `${(centerX + radius * Math.cos(angle)).toFixed(3)} ${(centerY + radius * Math.sin(angle)).toFixed(3)}`;
  const largeSector = props.result.sectorAngleRad > Math.PI ? 1 : 0;
  const largeCutout = props.result.cutoutAngleRad > Math.PI ? 1 : 0;

  return {
    path: `M ${point(outerRadius, start)} A ${outerRadius} ${outerRadius} 0 ${largeSector} 1 ${point(outerRadius, end)} L ${point(innerRadius, end)} A ${innerRadius} ${innerRadius} 0 ${largeSector} 0 ${point(innerRadius, start)} Z`,
    sectorArc: `M ${point(outerRadius * 0.69, start)} A ${outerRadius * 0.69} ${outerRadius * 0.69} 0 ${largeSector} 1 ${point(outerRadius * 0.69, end)}`,
    cutoutArc: `M ${point(innerRadius * 0.72, end)} A ${innerRadius * 0.72} ${innerRadius * 0.72} 0 ${largeCutout} 1 ${point(innerRadius * 0.72, start)}`,
    innerLeft: centerX - innerRadius,
    innerRight: centerX + innerRadius,
    outerCutLeft: centerX - outerRadius * Math.sin(halfGap),
    outerCutRight: centerX + outerRadius * Math.sin(halfGap),
    innerCutLeft: centerX - innerRadius * Math.sin(halfGap),
    innerCutRight: centerX + innerRadius * Math.sin(halfGap),
    outerCutY: centerY + outerRadius * Math.cos(halfGap),
    innerCutY: centerY + innerRadius * Math.cos(halfGap),
    outerDimensionY: centerY + outerRadius * Math.cos(halfGap) + 44,
    innerDimensionY: centerY + innerRadius * Math.cos(halfGap) + 28,
  };
});
</script>

<template>
  <section class="screw-flight-diagrams content-section site-container" :aria-label="content.sketchTitle">
    <figure class="screw-flight-diagrams__card">
      <figcaption class="screw-flight-diagrams__title">{{ content.finishedSketchTitle }}</figcaption>
      <svg
        class="screw-flight-diagrams__drawing"
        viewBox="0 0 440 390"
        role="img"
        :aria-label="content.finishedSketchAlt"
      >
        <defs>
          <linearGradient id="flight-finished-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop class="screw-flight-diagrams__gradient-start" offset="0" />
            <stop class="screw-flight-diagrams__gradient-end" offset="1" />
          </linearGradient>
          <marker
            id="flight-finished-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path class="screw-flight-diagrams__arrow" d="M 0 0 L 10 5 L 0 10 Z" />
          </marker>
        </defs>
        <path
          class="screw-flight-diagrams__finished-body"
          d="M 112 172 C 145 210 154 307 188 307 C 222 307 248 69 293 51 C 324 39 341 107 348 172 L 348 184 C 323 143 311 128 286 149 C 253 177 243 211 211 206 C 172 199 145 169 112 172 Z"
        />
        <path
          class="screw-flight-diagrams__finished-edge"
          d="M 112 172 C 152 176 177 140 212 158 C 253 190 296 117 348 172"
        />
        <path class="screw-flight-diagrams__axis" d="M 91 174 H 367" />

        <path
          class="screw-flight-diagrams__extension"
          d="M 66 51 H 293 M 66 307 H 188 M 112 172 V 355 M 348 172 V 355 M 348 51 H 384 M 348 141 H 384 M 348 195 H 384 M 112 143 V 172 M 141 143 V 171"
        />
        <line
          class="screw-flight-diagrams__dimension"
          x1="66"
          y1="53"
          x2="66"
          y2="305"
          marker-start="url(#flight-finished-arrow)"
          marker-end="url(#flight-finished-arrow)"
        />
        <line
          class="screw-flight-diagrams__dimension"
          x1="114"
          y1="355"
          x2="346"
          y2="355"
          marker-start="url(#flight-finished-arrow)"
          marker-end="url(#flight-finished-arrow)"
        />
        <line
          class="screw-flight-diagrams__dimension"
          x1="384"
          y1="53"
          x2="384"
          y2="139"
          marker-start="url(#flight-finished-arrow)"
          marker-end="url(#flight-finished-arrow)"
        />
        <line
          class="screw-flight-diagrams__dimension"
          x1="384"
          y1="143"
          x2="384"
          y2="193"
          marker-start="url(#flight-finished-arrow)"
          marker-end="url(#flight-finished-arrow)"
        />
        <line
          class="screw-flight-diagrams__dimension"
          x1="114"
          y1="143"
          x2="139"
          y2="143"
          marker-start="url(#flight-finished-arrow)"
          marker-end="url(#flight-finished-arrow)"
        />
        <text class="screw-flight-diagrams__label" x="45" y="183">{{ content.sketchSymbols.outer }}</text>
        <text class="screw-flight-diagrams__label" x="222" y="378">{{ content.sketchSymbols.pitch }}</text>
        <text class="screw-flight-diagrams__label" x="395" y="114">{{ content.sketchSymbols.height }}</text>
        <text class="screw-flight-diagrams__label" x="395" y="190">{{ content.sketchSymbols.inner }}</text>
        <text class="screw-flight-diagrams__label" x="119" y="132">{{ content.sketchSymbols.thickness }}</text>

        <path
          class="screw-flight-diagrams__leader"
          d="M 197 74 H 230 L 281 97"
          marker-end="url(#flight-finished-arrow)"
        />
        <path
          class="screw-flight-diagrams__leader"
          d="M 197 112 H 231 L 260 152"
          marker-end="url(#flight-finished-arrow)"
        />
        <text class="screw-flight-diagrams__label" x="179" y="79">{{ content.sketchSymbols.outerHelix }}</text>
        <text class="screw-flight-diagrams__label" x="179" y="117">{{ content.sketchSymbols.innerHelix }}</text>
      </svg>
      <p class="screw-flight-diagrams__note">{{ content.finishedSketchDescription }}</p>
    </figure>

    <figure class="screw-flight-diagrams__card">
      <figcaption class="screw-flight-diagrams__title">{{ content.sketchTitle }}</figcaption>
      <svg
        v-if="blank"
        class="screw-flight-diagrams__drawing"
        viewBox="0 0 440 390"
        role="img"
        :aria-label="content.sketchAlt"
      >
        <defs>
          <marker
            id="flight-blank-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path class="screw-flight-diagrams__arrow" d="M 0 0 L 10 5 L 0 10 Z" />
          </marker>
        </defs>
        <path class="screw-flight-diagrams__blank-body" :d="blank.path" />
        <path class="screw-flight-diagrams__axis" d="M 81 185 H 359 M 220 48 V 316" />
        <circle class="screw-flight-diagrams__center" cx="220" cy="185" r="3" />

        <path class="screw-flight-diagrams__extension" d="M 97 185 V 41 M 343 185 V 41" />
        <path
          class="screw-flight-diagrams__dimension"
          d="M 99 41 H 341"
          marker-start="url(#flight-blank-arrow)"
          marker-end="url(#flight-blank-arrow)"
        />
        <text class="screw-flight-diagrams__label" x="209" y="29">{{ content.sketchSymbols.blankOuter }}</text>

        <line
          class="screw-flight-diagrams__dimension"
          :x1="blank.innerLeft + 2"
          y1="185"
          :x2="blank.innerRight - 2"
          y2="185"
          marker-start="url(#flight-blank-arrow)"
          marker-end="url(#flight-blank-arrow)"
        />
        <text class="screw-flight-diagrams__label" x="210" y="176">{{ content.sketchSymbols.blankInner }}</text>

        <path class="screw-flight-diagrams__extension" :d="`M 97 185 V 223 M ${blank.innerLeft} 185 V 223`" />
        <line
          class="screw-flight-diagrams__dimension"
          x1="99"
          y1="223"
          :x2="blank.innerLeft - 2"
          y2="223"
          marker-start="url(#flight-blank-arrow)"
          marker-end="url(#flight-blank-arrow)"
        />
        <text class="screw-flight-diagrams__label" x="125" y="244">{{ content.sketchSymbols.height }}</text>

        <path
          class="screw-flight-diagrams__cutout-arc"
          :d="blank.sectorArc"
          marker-start="url(#flight-blank-arrow)"
          marker-end="url(#flight-blank-arrow)"
        />
        <path
          class="screw-flight-diagrams__cutout-arc"
          :d="blank.cutoutArc"
          marker-start="url(#flight-blank-arrow)"
          marker-end="url(#flight-blank-arrow)"
        />
        <text class="screw-flight-diagrams__label" x="212" y="224">{{ content.sketchSymbols.cutout }}</text>
        <text class="screw-flight-diagrams__label" x="212" y="91">{{ content.sketchSymbols.sector }}</text>

        <line
          class="screw-flight-diagrams__extension"
          :x1="blank.innerCutLeft"
          :y1="blank.innerCutY"
          :x2="blank.innerCutLeft"
          :y2="blank.innerDimensionY + 8"
        />
        <line
          class="screw-flight-diagrams__extension"
          :x1="blank.innerCutRight"
          :y1="blank.innerCutY"
          :x2="blank.innerCutRight"
          :y2="blank.innerDimensionY + 8"
        />
        <line
          class="screw-flight-diagrams__dimension"
          :x1="blank.innerCutLeft + 1"
          :y1="blank.innerDimensionY"
          :x2="blank.innerCutRight - 1"
          :y2="blank.innerDimensionY"
          marker-start="url(#flight-blank-arrow)"
          marker-end="url(#flight-blank-arrow)"
        />
        <text class="screw-flight-diagrams__label" :x="blank.innerCutRight + 14" :y="blank.innerDimensionY + 5">
          {{ content.sketchSymbols.innerCut }}
        </text>

        <line
          class="screw-flight-diagrams__extension"
          :x1="blank.outerCutLeft"
          :y1="blank.outerCutY"
          :x2="blank.outerCutLeft"
          :y2="blank.outerDimensionY + 8"
        />
        <line
          class="screw-flight-diagrams__extension"
          :x1="blank.outerCutRight"
          :y1="blank.outerCutY"
          :x2="blank.outerCutRight"
          :y2="blank.outerDimensionY + 8"
        />
        <line
          class="screw-flight-diagrams__dimension"
          :x1="blank.outerCutLeft + 1"
          :y1="blank.outerDimensionY"
          :x2="blank.outerCutRight - 1"
          :y2="blank.outerDimensionY"
          marker-start="url(#flight-blank-arrow)"
          marker-end="url(#flight-blank-arrow)"
        />
        <text class="screw-flight-diagrams__label" :x="blank.outerCutRight + 14" :y="blank.outerDimensionY + 5">
          {{ content.sketchSymbols.outerCut }}
        </text>

        <path
          class="screw-flight-diagrams__leader"
          d="M 368 109 H 347 L 317 113"
          marker-end="url(#flight-blank-arrow)"
        />
        <path
          class="screw-flight-diagrams__leader"
          d="M 355 148 H 330 L 267 154"
          marker-end="url(#flight-blank-arrow)"
        />
        <path
          class="screw-flight-diagrams__leader"
          d="M 368 278 H 342 L 313 281"
          marker-end="url(#flight-blank-arrow)"
        />
        <text class="screw-flight-diagrams__label" x="375" y="114">{{ content.sketchSymbols.outerHelix }}</text>
        <text class="screw-flight-diagrams__label" x="361" y="153">{{ content.sketchSymbols.innerHelix }}</text>
        <text class="screw-flight-diagrams__label" x="375" y="283">{{ content.sketchSymbols.thickness }}</text>
      </svg>
      <p class="screw-flight-diagrams__note">{{ content.sketchDescription }}</p>
    </figure>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/styles/mixins' as *;

.screw-flight-diagrams {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  padding-bottom: 0;

  &__card {
    min-width: 0;
    padding: 24px;
    margin: 0;
    background: $soft;
    border: 1px solid $line;
    border-radius: 18px;
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
    line-height: 1.35;
    color: $ink;
  }

  &__drawing {
    display: block;
    width: 100%;
    max-width: 440px;
    height: auto;
    margin: 12px auto 0;
  }

  &__finished-body {
    fill: url('#flight-finished-gradient');
    stroke: $navy;
    stroke-width: 2;
  }

  &__finished-edge {
    fill: none;
    stroke: $navy;
    stroke-width: 2;
  }

  &__gradient-start {
    stop-color: $blue;
  }

  &__gradient-end {
    stop-color: $navy;
  }

  &__blank-body {
    fill: rgba($blue, 0.22);
    stroke: $blue;
    stroke-width: 2;
  }

  &__center,
  &__arrow {
    fill: $navy;
  }

  &__axis {
    fill: none;
    stroke: $muted;
    stroke-width: 1;
    stroke-dasharray: 4 5;
  }

  &__extension {
    fill: none;
    stroke: $muted;
    stroke-width: 1;
  }

  &__dimension {
    fill: none;
    stroke: $navy;
    stroke-width: 1.4;
  }

  &__cutout-arc,
  &__leader {
    fill: none;
    stroke: $blue;
    stroke-width: 1.5;
  }

  &__label {
    font-size: 16px;
    font-weight: 700;
    fill: $navy;
  }

  &__note {
    margin: 10px 0 0;
    font-size: 13px;
    line-height: 1.6;
    color: $muted;
  }
}

@include tablet {
  .screw-flight-diagrams {
    grid-template-columns: 1fr;
  }
}
</style>
