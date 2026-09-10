const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'cuajadaland.aternos.me:18384', // <--- REEMPLAZA ESTO POR LA IP DE TU SERVER
        port:18384,                // Puerto predeterminado de Minecraft
        username: 'fabio24/7',    // Nombre genérico del bot/NPC dentro del juego
        version: false              // Autodetecta la versión exacta del servidor (1.8 a 1.21+)
    });

    bot.on('spawn', () => {
        console.log(`[NPC] El bot ha aparecido correctamente en el mapa.`);
        // Si tu servidor No-Premium requiere contraseña, descomenta la línea de abajo:
        // setTimeout(() => bot.chat('/login erickJKN'), 4000);
    });

    bot.on('login', () => {
        console.log(`[NPC] Conexión establecida con el servidor de Minecraft.`);
    });

    // Rutina automatizada del NPC: Buscar cofre, interactuar, cerrar y saltar (Cada 45 segundos)
    setInterval(async () => {
        if (!bot || !bot.entity) return;

        try {
            // 1. Localizar el bloque de cofre en un radio de 5 bloques
            const chestBlock = bot.findBlock({
                matching: bot.registry.blocksByName.chest.id,
                maxDistance: 5
            });

            if (chestBlock) {
                console.log('[NPC] Interactuando con el contenedor cercano...');
                
                // 2. Abrir el contenedor (genera la animación y sonido físico en el servidor)
                const chest = await bot.openChest(chestBlock);
                console.log('[NPC] Contenedor abierto.');
                
                // Mantener la interfaz abierta durante 2 segundos simulando actividad de inventario
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // 3. Cerrar la interfaz del contenedor
                chest.close();
                console.log('[NPC] Contenedor cerrado.');
            } else {
                console.log('[NPC] Aviso: No se detectó ningún contenedor válido cerca.');
            }

            // 4. Ejecutar acción de salto físico para evitar la inactividad (Anti-AFK)
            await new Promise(resolve => setTimeout(resolve, 1000));
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
            console.log('[NPC] Acción anti-inactividad completada con éxito.');

        } catch (err) {
            console.log(`[NPC] Error en el ciclo de ejecución: ${err.message}`);
        }
    }, 45000);

    // Sistema de auto-reconexión segura tras expulsiones o reinicios del servidor
    bot.on('end', (reason) => {
        console.log(`[NPC] Conexión finalizada por: ${reason}. Reintentando en 25 segundos...`);
        setTimeout(createBot, 25000);
    });

    bot.on('error', (err) => console.log(`[NPC] Error crítico de red detectado: ${err}`));
}

createBot();
