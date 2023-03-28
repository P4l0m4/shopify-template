<script setup>
import { reactive, ref } from 'vue'
import emailjs from '@emailjs/browser'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, email, sameAs } from '@vuelidate/validators'

const state = reactive({
  email: '',
  name: '',
  firstName: '',
  message: '',
  rgpd: false,
  isSubmitting: false,
  sent: false,
  HP: false,
})

const rules = {
  firstName: {
    required,
    maxLength: maxLength(50),
  },
  name: {
    required,
    maxLength: maxLength(50),
  },
  email: {
    required,
    email,
  },
  message: {
    required,
    minLength: minLength(50),
    maxLength: maxLength(2000),
  },
  rgpd: {
    sameAs: sameAs(true),
  },
}

const v$ = useVuelidate(rules, state)
const form = ref(null)

async function submit() {
  const valid = await v$.value.$validate()
  console.log(valid)

  if (valid) {
    if (state.HP === false) {
      await emailjs.sendForm('service_ewyd8q9', 'template_8v0v4kr', form.value, 'N_c62x-VytInJOnZY')
    }

    state.sent = true
    state.isSubmitting = false
    state.name = ''
    state.firstName = ''
    state.email = ''
    state.message = ''
    state.rgpd = false
    v$.value.$reset()
  }
}
</script>

<template>
  <form ref="form" class="form" @submit.prevent="submit">
    <!-- CHAMP NOM -->
    <div class="form__group" :class="{ 'form__group--error': v$.name.$invalid }">
      <label class="form__group__label">Nom</label>
      <input v-model.trim="state.name" class="form__group__input" placeholder="Michel" name="name" />

      <div v-if="v$.name.$dirty && v$.name.required.$invalid" class="form__error">Ce champ est requis</div>

      <div v-if="v$.name.$dirty && v$.name.maxLength.$invalid" class="form__error">
        Maximum de caractères :
        {{ v$.name.maxLength.$params.max }}.
      </div>
    </div>

    <!-- CHAMP PRENOM -->
    <div class="form__group" :class="{ 'form__group--error': v$.firstName.$invalid }">
      <label class="form__group__label">Prénom</label>
      <input v-model.trim="state.firstName" class="form__group__input" placeholder="Dupont" name="firstName" />

      <div v-if="v$.firstName.$dirty && v$.firstName.required.$invalid" class="form__error">Ce champ est requis</div>

      <div v-if="v$.firstName.$dirty && v$.firstName.maxLength.$invalid" class="form__error">
        Maximum de caractères :
        {{ v$.firstName.maxLength.$params.max }}.
      </div>
    </div>

    <!-- CHAMP EMAIL -->
    <div class="form__group" :class="{ 'form__group--error': v$.email.$dirty }">
      <label class="form__group__label">Email</label>
      <input v-model.trim="state.email" class="form__group__input" placeholder="michel.dupont@gmail.com" name="email" />

      <div v-if="v$.email.$dirty && v$.email.required.$invalid" class="form__error">Ce champ est requis</div>

      <div v-else-if="v$.email.$dirty && v$.email.email.$invalid" class="form__error">
        Veuillez renseigner un email valide
      </div>
    </div>

    <!-- CHAMP MESSAGE -->
    <div class="form__group" :class="{ 'form__group--error': v$.message.$dirty }">
      <label class="form__group__label">Message</label>
      <textarea
        v-model.trim="state.message"
        class="form__group__textarea"
        placeholder="Bonjour..."
        name="message"
      ></textarea>

      <div v-if="v$.message.$dirty && v$.message.required.$invalid" class="form__error">Ce champ est requis</div>
      <div v-if="v$.message.$dirty && v$.message.minLength.$invalid" class="form__error">
        Minimum de caractères :
        {{ v$.message.minLength.$params.min }}
      </div>
      <div v-if="v$.message.$dirty && v$.message.maxLength.$invalid" class="form__error">
        Minimum de caractères :
        {{ v$.message.maxLength.$params.max }}
      </div>
    </div>

    <!-- CHAMP RGPD -->
    <div class="form__group" :class="{ 'form__group--error': v$.rgpd.$dirty }">
      <div class="form__group__checkbox-container">
        <input id="rgpd" v-model.trim="state.rgpd" type="checkbox" class="form__group__input" />
        <label for="rgpd" class="form__group__checkbox-container__text">
          Vous acceptez que les informations saisies dans ce formulaire soient transmises par mail à Tekila Web Factory.
        </label>
      </div>
      <div v-if="v$.rgpd.$dirty && v$.rgpd.sameAs.$invalid" class="form__error">Ce champ est requis</div>
    </div>

    <input id="HP" v-model="state.HP" class="HP" type="checkbox" name="not_a_robot" @change="checkIfHP" />
    <label for="HP" class="HP"> Je ne suis pas un robot </label>

    <button class="form__button button-primary-small" type="submit" :disabled="state.isSubmitting">Envoyer</button>

    <p v-if="sent" class="form__error">Message envoyé !</p>
  </form>
</template>

<style lang="scss" scoped>
.form {
  width: clamp(240px, 100%, 384px);
  background-color: $base-color;
  background-color: rgba(255, 255, 255, 0.04);
  border: rgba(255, 255, 255, 0.06) solid 1px;
  padding: 16px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  // border-radius: $radius;
  @media (min-width: $tablet-screen) {
    padding: 24px;
    gap: 24px;
  }

  &__group {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;

    &__input,
    &__textarea {
      border: 2px solid $text-color;
      // border-radius: $small-radius;
      height: 44px;
      width: 100%;
      caret-color: $text-color;
      padding: 12px;
      color: $text-color;
      // font-weight: $slim-weight;
      background-color: $base-color;

      &::placeholder {
        color: $text-color;
        // font-weight: $slim-weight;
        opacity: 0.4;
      }
      &[type='checkbox'] {
        width: 50px;
        height: 20px;
        cursor: pointer;
        // accent-color: $base-color;
      }
    }
    &__textarea {
      resize: none;
      height: 140px;
    }

    &__label {
      // font-weight: $medium-weight;
      color: $text-color;
      position: absolute;
      // background-color: $base-color;
      padding: 0 6px;
      top: -12px;
      left: 8px;
    }
    &__checkbox-container {
      color: $text-color;
      display: flex;
      gap: 8px;
      justify-content: space-between;
      width: 100%;
      flex-direction: row;

      &__text {
        // font-weight: $slim-weight;
        font-size: 12px;
      }
    }
  }
  &__button {
    width: 100%;
    padding: 8px;
    background: $text-color;
    // border-radius: $small-radius;
    // color: $base-color;
    // font-weight: $medium-weight;
    position: relative;
    cursor: pointer;

    // &:hover {
    //   background: linear-gradient(
    //     90deg,
    //     rgba(236, 159, 5, 1) 40%,
    //     rgba(236, 86, 5, 1) 100%
    //   );
    // }
  }

  &__error {
    // font-weight: $slim-weight;
    font-size: 12px;
  }
}
.HP {
  display: none;
}
</style>
