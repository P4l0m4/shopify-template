<script setup>
import { ref } from 'vue'
// import { client } from '@/services/shopify'

// const filtered = await client.product.fetchQuery({ first: 20, sortKey: 'PRICE', reverse: false })

// console.log(filtered)
const priceSortingSelected = ref('')
const emit = defineEmits(['closeOverlay', 'filter'])

const minimumPrice = ref(0)
const maximumPrice = ref(100)

function setPrice() {
  const min = parseInt(minimumPrice.value)
  const max = parseInt(maximumPrice.value)
  const price = {
    min: min > max ? max : min,
    max: min > max ? min : max,
  }
  emit('filter', { price })
}
</script>
<template>
  <Transition name="fade">
    <div class="overlay" @click="emit('closeOverlay')">
      <div class="overlay__drawer" @click.stop>
        <div class="overlay__drawer__group">
          <div
            class="range-slider flat"
            data-ticks-position="top"
            style="
              --min: 0;
              --max: 100;
              --value-a: 0;
              --value-b: 100;
              --suffix: '€';
              --text-value-a: '0';
              --text-value-b: '100';
            "
          >
            <input
              v-model="minimumPrice"
              type="range"
              min="0"
              max="100"
              oninput="this.parentNode.style.setProperty('--value-a',this.value); this.parentNode.style.setProperty('--text-value-a', JSON.stringify(this.value))"
              @change="setPrice"
            />
            <output></output>
            <input
              v-model="maximumPrice"
              type="range"
              min="0"
              max="100"
              oninput="this.parentNode.style.setProperty('--value-b',this.value); this.parentNode.style.setProperty('--text-value-b', JSON.stringify(this.value))"
              @change="setPrice"
            />
            <output></output>
            <div class="range-slider__progress"></div>
          </div>
        </div>
        <div class="overlay__drawer__group">
          Prix
          <div class="overlay__drawer__group__price">
            <button
              class="overlay__drawer__group__price__button"
              :class="{ 'overlay__drawer__group__price__button--selected': priceSortingSelected === 'high' }"
              @click.stop="priceSortingSelected = 'high'"
            >
              <img class="icon" src="@/assets/icons/high.svg" alt="" />
            </button>
            <button
              class="overlay__drawer__group__price__button"
              :class="{ 'overlay__drawer__group__price__button--selected': priceSortingSelected === 'low' }"
              @click.stop="priceSortingSelected = 'low'"
            >
              <img class="icon" src="@/assets/icons/low.svg" alt="" />
            </button>
          </div>
        </div>
      </div></div
  ></Transition>
</template>
<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  background: rgba(0, 0, 0, 0.1);
  z-index: 2;
  backdrop-filter: blur(16px);
  justify-content: flex-end;
  cursor: pointer;

  &__drawer {
    width: clamp(200px, 24%, 400px);
    height: 100%;
    background-color: $base-color;
    display: flex;
    padding: 4rem 1rem;
    flex-direction: column;
    gap: 2rem;
    animation: slide-from-right 0.2s;

    &__group {
      display: flex;
      flex-direction: column;
      font-size: 0.75rem;
      gap: 0.5rem;

      &__price {
        display: flex;
        width: 100%;
        justify-content: center;
        gap: 0.5rem;

        &__button {
          padding: 0.5rem;
          background-color: $primary-color;
          border-radius: calc($radius/2);
          box-shadow: $shadow;
          align-items: center;
          display: flex;
          cursor: pointer;

          &--selected {
            border: 2px solid $selected-color;
          }
        }
      }
    }

    .range-slider.overlay {
      --primary-color: #d6e9ff;
      --track-height: 50px;
      --thumb-size: var(--track-height);
      --thumb-color: var(--primary-color);
      --thumb-shadow: none;
      --progress-flll-shadow: none;
      --progress-shadow: none;
      --progress-background: none;
      --progress-radius: 0px;
      --ticks-color: var(--primary-color);
      --ticks-height: 0;
      --ticks-thickness: 0;
      --ticks-gap: 0px; // must specify units
      --min-max-font: 600 18px Arial;
      --min-max-opacity: 1;
      --show-min-max: none;

      color: $secondary-color;

      input {
        &:hover {
          // cannot use "--thumb-shadow-hover" because the "--is-left-most" variable is needed (which is declared per-input)
          // "--is-left-most" is either "0" or "1"
          --thumb-shadow: calc(25px - (50px * var(--is-left-most))) 0 0 -15px #0366d6 inset;
        }

        &:active {
          --thumb-color: inherit;
        }
      }

      .range-slider {
        &__values {
          width: calc(100% - 50% / (var(--max) - var(--min)));
        }
      }
    }
    .range-slider {
      --primary-color: #333333;

      --value-offset-y: var(--ticks-gap);
      --value-active-color: white;
      --value-background: transparent;
      --value-background-hover: var(--primary-color);
      --value-font: 700 12px/1 Arial;

      --fill-color: var(--primary-color);
      --progress-background: #eee;
      --progress-radius: 20px;
      --track-height: calc(var(--thumb-size) / 2);

      --min-max-font: 12px Arial;
      --min-max-opacity: 0.5;
      --min-max-x-offset: 10%; // 50% to center

      --thumb-size: 20px;
      --thumb-color: white;
      --thumb-shadow: 0 0 3px rgba(0, 0, 0, 0.4), 0 0 1px rgba(0, 0, 0, 0.5) inset, 0 0 0 99px var(--thumb-color) inset;

      --thumb-shadow-active: 0 0 0 calc(var(--thumb-size) / 4) inset var(--thumb-color),
        0 0 0 99px var(--primary-color) inset, 0 0 3px rgba(0, 0, 0, 0.4);

      --thumb-shadow-hover: var(--thumb-shadow);

      --ticks-thickness: 1px;
      --ticks-height: 5px;
      --ticks-gap: var(--ticks-height, 0); // vertical space between the ticks and the progress bar
      --ticks-color: silver;

      // ⚠️ BELOW VARIABLES SHOULD NOT BE CHANGED
      --step: 1;
      --ticks-count: Calc(var(--max) - var(--min)) / var(--step);
      --maxTicksAllowed: 30;
      --too-many-ticks: Min(1, Max(var(--ticks-count) - var(--maxTicksAllowed), 0));
      --x-step: Max(
        var(--step),
        var(--too-many-ticks) * (var(--max) - var(--min))
      ); // manipulate the number of steps if too many ticks exist, so there would only be 2
      --tickInterval: 100/ ((var(--max) - var(--min)) / var(--step)) * var(--tickEvery, 1);
      --tickIntervalPerc: calc(
        (100% - var(--thumb-size)) / ((var(--max) - var(--min)) / var(--x-step)) * var(--tickEvery, 1)
      );

      --value-a: Clamp(
        var(--min),
        var(--value, 0),
        var(--max)
      ); // default value ("--value" is used in single-range markup)
      --value-b: var(--value, 0); // default value
      --text-value-a: var(--text-value, '');

      --completed-a: calc((var(--value-a) - var(--min)) / (var(--max) - var(--min)) * 100);
      --completed-b: calc((var(--value-b) - var(--min)) / (var(--max) - var(--min)) * 100);
      --ca: Min(var(--completed-a), var(--completed-b));
      --cb: Max(var(--completed-a), var(--completed-b));

      // breakdown of the below super-complex brain-breaking CSS math:
      // "clamp" is used to ensure either "-1" or "1"
      // "calc" is used to inflat the outcome into a huge number, to get rid of any value between -1 & 1
      // if absolute diff of both completed % is above "5" (%)
      // ".001" bumps the value just a bit, to avoid a scenario where calc resulted in "0" (then clamp will also be "0")
      --thumbs-too-close: Clamp(-1, 1000 * (Min(1, Max(var(--cb) - var(--ca) - 5, -1)) + 0.001), 1);
      --thumb-close-to-min: Min(1, Max(var(--ca) - 2, 0)); // 2% threshold
      --thumb-close-to-max: Min(1, Max(98 - var(--cb), 0)); // 2% threshold

      @mixin thumb {
        appearance: none;
        height: var(--thumb-size);
        width: var(--thumb-size);
        transform: var(--thumb-transform);
        border-radius: var(--thumb-radius, 50%);
        background: var(--thumb-color);
        box-shadow: var(--thumb-shadow);
        border: none;
        pointer-events: auto;
        transition: 0.1s;
      }

      display: inline-block;
      height: Max(var(--track-height), var(--thumb-size));
      // margin: calc((var(--thumb-size) - var(--track-height)) * -.25) var(--thumb-size) 0;
      background: linear-gradient(to right, var(--ticks-color) var(--ticks-thickness), transparent 1px) repeat-x;
      background-size: var(--tickIntervalPerc) var(--ticks-height);
      background-position-x: calc(var(--thumb-size) / 2 - var(--ticks-thickness) / 2);
      background-position-y: var(--flip-y, bottom);

      padding-bottom: var(--flip-y, var(--ticks-gap));
      padding-top: calc(var(--flip-y) * var(--ticks-gap));

      position: relative;
      z-index: 1;

      &[data-ticks-position='top'] {
        --flip-y: 1;
      }

      // mix/max texts
      &::before,
      &::after {
        --offset: calc(var(--thumb-size) / 2);
        content: counter(x);
        display: var(--show-min-max, block);
        font: var(--min-max-font);
        position: absolute;
        bottom: var(--flip-y, -2.5ch);
        top: calc(-2.5ch * var(--flip-y));
        opacity: Clamp(0, var(--at-edge), var(--min-max-opacity));
        transform: translateX(calc(var(--min-max-x-offset) * var(--before, -1) * -1)) scale(var(--at-edge));
        pointer-events: none;
      }

      &::before {
        --before: 1;
        --at-edge: var(--thumb-close-to-min);
        counter-reset: x var(--min);
        left: var(--offset);
      }

      &::after {
        --at-edge: var(--thumb-close-to-max);
        counter-reset: x var(--max);
        right: var(--offset);
      }

      &__values {
        position: relative;
        top: 50%;
        line-height: 0;
        text-align: justify;
        width: 100%;
        pointer-events: none;
        margin: 0 auto;
        z-index: 5;

        // trick so "justify" will work
        &::after {
          content: '';
          width: 100%;
          display: inline-block;
          height: 0;
          background: red;
        }
      }

      &__progress {
        --start-end: calc(var(--thumb-size) / 2);
        --clip-end: calc(100% - (var(--cb)) * 1%);
        --clip-start: calc(var(--ca) * 1%);
        --clip: inset(-20px var(--clip-end) -20px var(--clip-start));
        position: absolute;
        left: var(--start-end);
        right: var(--start-end);
        top: calc(var(--ticks-gap) * var(--flip-y, 0) + var(--thumb-size) / 2 - var(--track-height) / 2);
        //  transform: var(--flip-y, translateY(-50%) translateZ(0));
        height: calc(var(--track-height));
        background: var(--progress-background, #eee);
        pointer-events: none;
        z-index: -1;
        border-radius: var(--progress-radius);

        // fill area
        &::before {
          content: '';
          position: absolute;
          // left: Clamp(0%, calc(var(--ca) * 1%), 100%); // confine to 0 or above
          // width: Min(100%, calc((var(--cb) - var(--ca)) * 1%)); // confine to maximum 100%
          left: 0;
          right: 0;
          clip-path: var(--clip);
          top: 0;
          bottom: 0;
          background: var(--fill-color, black);
          box-shadow: var(--progress-flll-shadow);
          z-index: 1;
          border-radius: inherit;
        }

        // shadow-effect
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          box-shadow: var(--progress-shadow);
          pointer-events: none;
          border-radius: inherit;
        }
      }

      & > input {
        -webkit-appearance: none;
        width: 100%;
        height: var(--thumb-size);
        margin: 0;
        position: absolute;
        left: 0;
        top: calc(
          50% - Max(var(--track-height), var(--thumb-size)) / 2 + calc(var(--ticks-gap) / 2 * var(--flip-y, -1))
        );
        cursor: -webkit-grab;
        cursor: grab;
        outline: none;
        background: none;

        &:not(:only-of-type) {
          pointer-events: none;
        }

        &::-webkit-slider-thumb {
          @include thumb;
        }
        &::-moz-range-thumb {
          @include thumb;
        }
        &::-ms-thumb {
          @include thumb;
        }

        &:hover {
          --thumb-shadow: var(--thumb-shadow-hover);
          & + output {
            --value-background: var(--value-background-hover);
            --y-offset: -5px;
            color: var(--value-active-color);
            box-shadow: 0 0 0 3px var(--value-background);
          }
        }

        &:active {
          --thumb-shadow: var(--thumb-shadow-active);
          cursor: grabbing;
          z-index: 2; // when sliding left thumb over the right or vice-versa, make sure the moved thumb is on top
          + output {
            transition: 0s;
          }
        }

        &:nth-of-type(1) {
          --is-left-most: Clamp(0, (var(--value-a) - var(--value-b)) * 99999, 1);
          & + output {
            &:not(:only-of-type) {
              --flip: calc(var(--thumbs-too-close) * -1);
            }

            --value: var(--value-a);
            --x-offset: calc(var(--completed-a) * -1%);
            &::after {
              content: var(--prefix, '') var(--text-value-a) var(--suffix, '');
            }
          }
        }

        &:nth-of-type(2) {
          --is-left-most: Clamp(0, (var(--value-b) - var(--value-a)) * 99999, 1);
          & + output {
            --value: var(--value-b);
          }
        }

        // non-multiple range should not clip start of progress bar
        &:only-of-type {
          ~ .range-slider__progress {
            --clip-start: 0;
          }
        }

        & + output {
          --flip: -1;
          --x-offset: calc(var(--completed-b) * -1%);
          --pos: calc(((var(--value) - var(--min)) / (var(--max) - var(--min))) * 100%);

          pointer-events: none;
          position: absolute;
          z-index: 5;
          background: var(--value-background);
          border-radius: 10px;
          padding: 2px 4px;
          left: var(--pos);
          transform: translate(
            var(--x-offset),
            calc(150% * var(--flip) - (var(--y-offset, 0px) + var(--value-offset-y)) * var(--flip))
          );
          transition: all 0.12s ease-out, left 0s;

          &::after {
            content: var(--prefix, '') var(--text-value-b) var(--suffix, '');
            font: var(--value-font);
          }
        }
      }
    }

    input[type='range']:focus {
      outline: none;
      border: transparent solid 2px;
    }
  }
}
</style>
