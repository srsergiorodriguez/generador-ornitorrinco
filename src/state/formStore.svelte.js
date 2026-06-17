// src/lib/state/formStore.svelte.js
import { CreateMLCEngine } from '@mlc-ai/web-llm';

export const formData = $state({
  tituloProyecto: "",
  investigadorPrincipal: "",
  justificacionObjetivos: "",
  metodologiasLibres: "",
  resultadosLibres: "",
  descripcionProcedimientos: "",
  nivelRiesgo: "Riesgo Mínimo",
  descripcionRiesgos: "",
  medidasContencion: "",
  beneficios: "",
  manejoDatos: "",
  incluyeAudiovisual: false,
  iaActivada: false,

  // Módulo: Política de Tratamiento de Datos
  responsableTratamiento: "Universidad de los Andes - Facultad de Artes y Humanidades",
  contactoResponsableDatos: "",
  emailContactoDatos: "habeasdata@uniandes.edu.co",
  finalidadEspecifica: "",
  datosCapturados: "", // Ej: nombres, audios, correos
  tiempoConservacion: "Durante la vigencia del proyecto y su posterior archivo histórico",
  finalidadUsoIa: false,
  datosUsoIa: false
});

export const aiState = $state({
  engine: null,
  isInitializing: false,
  progressText: "",
  progressPercent: 0,
  isReady: false
});

export async function initGlobalEngine() {
  if (aiState.engine || aiState.isInitializing) return;
  aiState.isInitializing = true;
  try {
    const selectedModel = "Qwen2.5-1.5B-Instruct-q4f16_1-MLC"; 
    aiState.engine = await CreateMLCEngine(selectedModel, {
      initProgressCallback: (progress) => {
        aiState.progressText = progress.text;
        aiState.progressPercent = Math.round((progress.progress || 0) * 100);
      }
    });
    aiState.isReady = true;
  } catch (error) {
    console.error("Error cargando WebLLM global:", error);
  } finally {
    aiState.isInitializing = false;
  }
}

export async function procesarTextoConIA(textoOriginal, instruccionesEspecificas, esFragmento = false) {
  if (!aiState.isReady || !aiState.engine) throw new Error("Motor no listo");

  const promptSistema = `Eres un editor académico para comités de ética.
Tu tarea es formalizar el texto del usuario siguiendo ESTRICTAMENTE estas instrucciones y el formato del ejemplo provisto.

${instruccionesEspecificas}

REGLAS INQUEBRANTABLES:
1. Conserva todos los detalles originales.
2. No agregues datos inventados.
3. Devuelve SOLO el texto final editado, sin comillas.`;

  const completion = await aiState.engine.chat.completions.create({
    messages: [
      { role: "system", content: promptSistema },
      { role: "user", content: `Edita este texto: ${textoOriginal}` }
    ],
    temperature: 0.1, 
  });

  let resultado = completion.choices[0].message.content.trim();
  resultado = resultado.replace(/^["'«»“”]+|["'«»“”]+$/g, '');

  if (esFragmento && resultado.length > 0) {
    resultado = resultado.charAt(0).toLowerCase() + resultado.slice(1);
    if (resultado.endsWith('.')) {
      resultado = resultado.slice(0, -1);
    }
  }

  return resultado;
}