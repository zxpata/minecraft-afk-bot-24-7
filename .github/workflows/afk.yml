name: Minecraft NPC Bot 24/7

on:
  push:
    branches: [ main ]
  workflow_dispatch: # Permite encender el NPC de forma manual desde el panel web

jobs:
  run-bot:
    runs-on: ubuntu-latest
    steps:
    - name: Clonar repositorio
      uses: actions/checkout@v4

    - name: Configurar Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 18

    - name: Instalar dependencias de Mineflayer
      run: npm install mineflayer

    - name: Ejecutar script del NPC
      run: node bot.js
