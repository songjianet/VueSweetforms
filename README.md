<h1 align="center">
  <a><img src="https://github.com/ChronicStone/sweetforms/blob/main/logo_sweetforms.svg" alt="Vue SweetForms" width="200"></a>
</h1>

<h4 align="center">A Vue 3 package based on  <a href="https://github.com/TuSimple/naive-ui" target="_blank">Naive UI</a> that provides highly customizable promised-based popup forms, with features like form advanced validation, optional http request handling, multiple-steps, and many more !</h4>

<p align="center">
  <a href="https://badge.fury.io/js/%40chronicstone%2Fsweetforms">
    <img src="https://badge.fury.io/js/%40chronicstone%2Fsweetforms.svg" alt="npm version" height="18">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#documentation-and-live-examples">Documentation & Live Examples</a> •
  <a href="#improvements-roadmap">Improvements roadmap</a> •
  <a href="#credits">Credits</a>
</p>

## Key Features

- Grid-based templating
  - Highly customizable layout, based on css grid
  - Responsiveness control through breakpoints (Tailwindcss-like API)
- A lot of field types supported
  - List of supported field types : 'text' | 'textarea' | 'password' | 'number' | 'slider' | 'switch' | 'select' | 'radio' | 'checkbox' | 'checkboxGroup' | 'date' | 'time' | 'datetime' | 'datetimerange' | 'daterange' | 'month' | 'year' | 'file' | 'array' | 'object'
  - Support deeply nested form objects
  - Supports custom vue components as fields [COMING SOON]
- Advanced cross-fields dependency
  - Cross-field field disabling / hiding (supports async)
  - Cross-field validation (supports async) (In progress)
  - Cross-field computed option list for list-like inputs (Select, radio group, ...) (supports async)
- Advanced validation based on [Vuelidate](https://vuelidate-next.netlify.app/)
- Dark/Light mode
- Highly customizable design
- Supports multiple steps forms
- And many more !

## How To Use

#### 1. Install the package
```bash
npm i -s @chronicstone/vue-sweetforms
```

#### 2. Import styles in main.js
```js
import "vue-sweetforms/dist/style.css"
```


#### 3. Wrap your app with the FormProvider component
```vue
// App.vue

<script setup>
  import { FormProvider } from "vue-sweetforms"
</script>

<template>
  <FormProvider>
    <!-- Your app content here -->
    <router-view/>
  </FormProvider
</template>
```

#### 4. Use the form API anywhere in your app :
```vue
<script setup>
  import { useSweetform } from "vue-sweetforms"
  import axios from "axios"
  
  const GetDogBreeds =  async () => await axios.get('https://dog.ceo/api/breeds/list/all').then(response => Object.keys(response.data.message).map(item => ({ label: item, value: item }))).catch(_ => [])
  
  const GetSubbreedByBreed = async ({ dogBreed }) => !dogBreed ? [] : await axios.get(`https://dog.ceo/api/breed/${dogBreed}/list`).then(response => response.data.message.map(item => ({ label: item, value: item }))).catch(err => [])
  
  const { createForm } = useSweetform()
  
  
  const OpenForm = async () => {
    const { isCompleted, formData } = await createForm({
      title: "Demonstration",
      onSubmit: (formData) => alert(JSON.stringify(formData)),
      onCancel: () => alert('CANCELLED'),
      gridSize: 6,
      fields: [
        { key: "firstName", type: "text", label: "First name", placeholder: "John", size: 2 },
        { key: "lastName", type: "text", label: "Last name", placeholder: "Doe", size: 2 },
        { key: "email", type: "text", label: "Email address", placeholder: "john.doe@gmail.com", size: 2 },
        { key: "dogBreed", type: "select", label: "Dog breed", placeholder: "Select a breed", options: GetDogBreeds, size: 3 },
        { key: "dogSubBreed", type: "select", label: "Dog sub-breed", placeholder: "Select a sub-breed", dependencies: ['dogBreed'], options: GetSubbreedByBreed, size: 3 }     
      ]
    })
  }
</script>

<template>
  <button @click="OpenForm">OPEN FORM</button>
</template>
```

## Documentation and live examples

COMING SOON

## Improvements roadmap

COMING SOON

## Credits

This packages uses [Naive UI](https://github.com/TuSimple/naive-ui) component library internally to render most field types. Particular thanks to [@TuSimple](https://github.com/TuSimple) who was of a big help in how to immplement the underlying concepts behin


MIT

---

> GitHub [@ChronicStone](https://github.com/ChronicStone) &nbsp;&middot;&nbsp;
