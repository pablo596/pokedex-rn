# Pokedex

Pokedex es una aplicación móvil creada con React Native para Android utilizando TypeScript.

## Empezando

Para ejecutar y continuar con el desarrollo de este proyecto, debe tener el entorno de react native configurado en su computadora.
Si no es así, sigue la guía oficial de React Native "Comenzar" en el siguiente enlace:

- [React Native: Get Started](https://reactnative.dev/docs/environment-setup)

## Como usar

**Paso 1:**

Descargue o clone este repositorio usando el siguiente enlace:

```
https://github.com/pablo596/pokedex-rn.git
```

**Paso 2:**

Vaya a la raíz del proyecto y ejecute el siguiente comando en la consola para obtener las dependencias requeridas:

**_Dependiendo del administrador de paquetes realice los siguientes comandos:_**

**_YARN_**

```
yarn
```

**_NPM_**

```
npm install
```

**Paso 3:**

En la consola, vaya a la raíz del proyecto y ejecute el siguiente comando para ejecutar la aplicación en el dispositivo android conectado.

**_YARN_**

```
yarn android
```

**_NPM_**

```
npx react-native run-android
```

## Pokedex Características:

### Screens

- LoginScreen: `Es la página inicial con el botón de autenticación por Google.`

- HomeScreen: `Es el inicial siempre y cuando esté autenticado; en ésta página se enlistan las regiones.`

- PokemonsByRegionScreen: `Al escoger una región, en ésta página se enlistan los pokemons que pertenecen a esa región y se muestra un FAB en la parte derecha inferior para activar la selección de pokemons para la creación de un equipo.`

- PokemonScreen: `Es una página de detalle del pokemon seleccionado; se puede acceder a ella desde las tarjetas de los pokemos que estan disponibles en la página "PokemonsByRegionScreen".`

- ProfileScreen: `Imágen y nombre del usuario tomado de la autenticación de Google con un botón para dirigirse hacia "TeamsScreen".`

- TeamsScreen: `Es una página donde se enlistan las regiones, parecido al home, con la peculiaridad de que al estar aqui y seleccionar una región, navega hacia la página "ListTeamsScreen" donde se enlistan los equipos creados que pertenecen a la región que se seleccionó en "TeamsScreen".`

- ListTeamsScreen: `En ésta página se enlistan los equipos creados que pertenecen a la región seleccionada, se muestra cada equipo en una tarjeta y se muestra el nombre del equipo, la descripción del pokedex, los pokemons  que pertenecen al equipo, enlistados en un scroll list horizontal y de los pokemons se muestra el nombre, número, tipo y su imágen.`

### Librerías utilizadas

- [React Native Async Storage](https://github.com/react-native-async-storage/async-storage)
- [React Native Firebase](https://github.com/invertase/react-native-firebase)
- [React Native Google Signin](https://github.com/react-native-google-signin/google-signin)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [React Native Popup Menu](https://github.com/instea/react-native-popup-menu)
- [React Native Image Colors](https://github.com/osamaqarem/react-native-image-colors)
- [Axios](https://github.com/axios/axios)

### Estructura del proyecto

Aquí está la estructura de carpetas principales que proporciona react native.

```
pokedex/
|- android/
|- ios/
|- lib/
|- vendor/
|- assets/
```

Aquí está la estructura de carpetas que se ha usado en este proyecto

```
pokedex
|- src/
   |- api/
   |- assets/
   |- components/
   |- context/
   |- helpers/
   |- hooks/
   |- interfaces/
   |- navigator/
   |- screens/
   |- theme/
```

Ahora un pequeño resumen de lo que contiene cada carpeta creada para el proyecto.

```
1. api - Aquí se almacena la instancia de axios para la reutilización y peticiones a la api de https://pokeapi.co/
2. assets - Aquí se almacenan dos imágenes que se utilizan en la app.
3. components - Aquí se almacenan todos los componentes creados para que puedan ser reutilizados en la app.
4. context - Aquí se almacenan los context para manejar el estado global de la app.
5. helpers - Aquí se almacenan pequeñas funciones de utilidad que se pueden reutilizar.
6. hooks - Aquí se almacenan hooks personalizados.
7. interfaces - Aquí se almacenan los tipados de los datos de acuerdo a las necesidades de la app.
8. navigator - Aquí se almacena la configuración de las rutas y la navegación de la app.
9. screens - Aquí se almacenan los componentes principales o las screens que se visualizan en la app.
10. theme - Aquí se almacenan datos de estilo que se pueden reutilizar en la app.

```
