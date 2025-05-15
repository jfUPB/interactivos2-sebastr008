### Prerrequisitos para replicar el proyecto

- node.js (obligatorio)
- Cuenta GitHub
- GitHub desktop (opcional, mejor por su fácilidad al clonar repositorios)
- Navegador web moderno

---
### Paso a paso para instalar node.js

Para poder replicar exitosamente este proyecto debes entrar a la página oficial y descargar su instalador. Debes de asegurarte de descargar el instalador correcto (si tu PC es de 32 bits descarga el instalador x86 y si es de 64 bits descarga el de x64)

Para poder saber la arquitectura de tu PC es tan sencillo como darle click derecho al icono de windows en tu barra de tareas, luego le das a sistema  y fijarse en donde dice "Tipo de sistema" ahí te dira de cuantos bits es tu PC

---

### Clonar el respositorio 


#### Clonar con GitHub Desktop (RECOMENDADO PARA PRINCIPIANTES)

1. **Abrir GitHub Desktop**  
Ejecuta la aplicación GitHub Desktop en tu computadora.

2. **Iniciar sesión**  
Si no has iniciado sesión, hazlo con tu cuenta de GitHub.

3. **Clonar un repositorio**  
- Haz clic en **File > Clone Repository**.  
- Selecciona la pestaña **URL**.  
- Pega la URL HTTPS del repositorio (ejemplo: `https://github.com/usuario/repositorio.git`).  
- Elige la carpeta local donde quieres guardar el proyecto.  
- Haz clic en **Clone**.

4. **Listo**  
El repositorio se descargará y aparecerá en GitHub Desktop listo para usarse.

---

#### Clonar con Git Bash (NO RECOMENDADO PARA PRINCIPIANTES

1. **Abrir Git Bash**  
   En tu computadora, busca y abre la aplicación **Git Bash**.

2. **Navegar a la carpeta donde quieres clonar**  
   Usa el comando `cd` para ir a la carpeta deseada.  
   Por ejemplo, para ir a Documentos:  

```bash
cd ~/Documents
```

3. **Copiar la URL del repositorio**  
Ve al repositorio en GitHub y copia la URL HTTPS (algo como `https://github.com/usuario/repositorio.git`).

4. **Clonar el repositorio**  
En Git Bash, escribe:  

```bash
git clone https://github.com/usuario/repositorio.git
```

Reemplaza la URL con la que copiaste.

5. **Entrar a la carpeta del repositorio**  

```bash
cd repositorio
```


6. **Listo**  
Ahora tienes el proyecto en tu máquina para trabajar.


#### Consejos

- Asegúrate de tener Git instalado para usar Git Bash.  
- Con GitHub Desktop no necesitas usar comandos; todo es gráfico.  
- En ambos casos, puedes abrir la carpeta del proyecto con tu editor de código favorito para empezar a trabajar.

### Iniciando el proyecto

Para poder iniciar la aplicación exitosamente, primeramente debes de abrir una Consola de Comandos (CMD), esto lo puedes hacer desde el menú de Windows y escribiendo CMD.

Una vez lo hayas encontrado, le das click derecho y luego le das donde dice ejecutar como administrador

Te pedirá que le des permisos y le das en aceptar.

Luego tendrás que ir a la carpeta en donde está el proyecto, para eso puedes usar

```cmd
cd "Ruta de la carpeta"
```
Una vez estés dentro de la carpeta, para poder iniciar la apliación deberás escribir lo siguiente

```cmd
npm start
```

Y le das enter.

Una vez le des enter te saldrá un mensaje parecido a esto 

```cmd
> audio-collaboration@1.0.0 start
> node server.js

Servidor escuchando en http://localhost:3000
```

Esa dirección URL es en donde estará la aplicación. 

Felicidades! Ahora tienes corriendo la aplicación, el primer usuario que entre será el host y se encargará de elegir, reproducir, pausar y sincronizar la música, si abres una pestaña nueva en el navegador y pones la misma dirección URL entrarás como GUEST y podrás ecualizar la música a tu gusto moviendo la bolita.
