# Zenderu Motion

Estudio de producción de anuncios de video de Zenderu: composiciones en **Remotion** (`src/`) y el
pipeline creativo en Python (`creative/`) con generación por IA, post-producción y entregas.

| Documento | Para qué |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Contexto y reglas para agentes (Antigravity, Claude, etc.) |
| [`creative/README.md`](creative/README.md) | Manual operativo y comandos del pipeline |
| [`CREATIVE-PIPELINE.md`](CREATIVE-PIPELINE.md) | Marca, templates, prompts e infraestructura |
| [`creative/RESULTADOS.md`](creative/RESULTADOS.md) | Rendimiento de cada anuncio y aprendizajes |
| [`creative/PERSONAJE.md`](creative/PERSONAJE.md) | Biblia del personaje conceptual |
| [`creative/GUION_Y_ANIMACION.md`](creative/GUION_Y_ANIMACION.md) | Método de guion, planos y animación |
| [`creative/CHECKLIST_PAUTA.md`](creative/CHECKLIST_PAUTA.md) | Revisión antes de pautar |
| [`zenderu_handoff/HANDOFF.md`](zenderu_handoff/HANDOFF.md) | Historia técnica y pendientes |

## Remotion

```console
npm i --loglevel=error   # instalar dependencias
npm run dev              # Remotion Studio
npx remotion render      # renderizar
npx remotion upgrade     # actualizar Remotion
```

Algunas entidades necesitan licencia de empresa de Remotion: ver
[los términos](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).

## Configuración

Copiar `.env.example` a `.env` y completar las claves. `.env` está en `.gitignore`: nunca commitear valores reales.
