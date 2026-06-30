// @ts-nocheck
import { CreateMLCEngine } from '@mlc-ai/web-llm';
import { untrack } from 'svelte';

export const formData = $state({
  // Módulo: Asistente Platypus
  platypusDescEnfoque: "",
  platypusDescMetodos: "",
  platypusDescFases: "",
  
  platypusObjQue: "",
  platypusObjComo: "",
  platypusObjParaQue: "",

  platypusDatosAlmacenamiento: "",
  platypusDatosRetencion: "",
  platypusDatosAcceso: "",

  platypusContencionResponsables: "",
  platypusContencionAcciones: "",
  platypusContencionRutas: "",

  platypusMuestras: "El proyecto, debido a que se desarrolla en el marco de las prácticas de las artes y las humanidades, no corresponde a una investigación en ciencias naturales y no contempla la toma de muestras biológicas de ningún tipo.",

  // Módulo: Consentimiento y asentimiento informado
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
  datosUsoIa: false,

  isValidating: false,
  validationResult: "",

  // Feature flagging
  habilitarSincronizacion: true,
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

export async function validarComoConsejero(herramientaActiva) {
  if (!aiState.isReady || !aiState.engine) return;

  aiState.isValidating = true;
  aiState.validationResult = "";

  const campoVacio = "[SECCIÓN SIN DILIGENCIAR]";
  let estaVacio = false;
  let datos = "";
  let rolContexto = "";
  let reglasContexto = "";

  // 1. CONFIGURACIÓN DINÁMICA SEGÚN LA HERRAMIENTA ACTIVA
  if (herramientaActiva === 'platypus') {
    estaVacio = !formData.platypusDescEnfoque && !formData.platypusDescMetodos && !formData.platypusDescFases && !formData.platypusObjQue && !formData.platypusProtocoloDatos;
    
    datos = `
    --- DESCRIPCIÓN ---
    Enfoque: ${formData.platypusDescEnfoque || campoVacio}
    Métodos: ${formData.platypusDescMetodos || campoVacio}
    Fases: ${formData.platypusDescFases || campoVacio}
    
    --- OBJETIVO ---
    ${(formData.platypusObjQue || formData.platypusObjComo || formData.platypusObjParaQue) ? (formData.platypusObjQue + ' ' + formData.platypusObjComo + ' ' + formData.platypusObjParaQue) : campoVacio}
    
    --- DATOS Y PRIVACIDAD ---
    Almacenamiento: ${formData.platypusDatosAlmacenamiento || campoVacio}
    Retención: ${formData.platypusDatosRetencion || campoVacio}
    Acceso: ${formData.platypusDatosAcceso || campoVacio}
    
    --- CONTENCIÓN EMOCIONAL ---
    ${(formData.platypusContencionResponsables || formData.platypusContencionAcciones) ? (formData.platypusContencionResponsables + ' ' + formData.platypusContencionAcciones) : 'No aplica'}
    `;
    
    rolContexto = "evaluar la solidez metodológica y procedimental de la propuesta para la plataforma institucional.";
    reglasContexto = "Busca huecos metodológicos. Por ejemplo, si mencionan 'entrevistas', advierte si falta especificar si serán grabadas; si mencionan 'almacenamiento', advierte si falta la plataforma específica.";
  
  } else if (herramientaActiva === 'consentimiento') {
    estaVacio = !formData.justificacionObjetivos && !formData.metodologiasLibres && !formData.descripcionRiesgos;
    
    datos = `
    --- JUSTIFICACIÓN Y OBJETIVOS ---
    ${formData.justificacionObjetivos || campoVacio}
    
    --- METODOLOGÍA (Explicada al participante) ---
    ${formData.metodologiasLibres || campoVacio}
    
    --- RIESGOS REPORTADOS ---
    ${formData.descripcionRiesgos || campoVacio}
    
    --- MEDIDAS DE CONTENCIÓN ---
    ${formData.medidasContencion || campoVacio}
    `;
    
    rolContexto = "evaluar la claridad, transparencia y protección al participante en el proceso de consentimiento informado.";
    reglasContexto = "Verifica que el lenguaje sea comprensible para un participante no académico. Asegúrate de que los riesgos estén claramente expuestos y que tengan medidas de contención lógicas y directas. Alerta si se usa jerga excesiva.";
  
  } else if (herramientaActiva === 'politica') {
    estaVacio = !formData.datosCapturados && !formData.manejoDatos && !formData.tiempoConservacion && !formData.finalidadEspecifica;
    
    datos = `
    --- FINALIDAD DEL TRATAMIENTO ---
    ${formData.finalidadEspecifica || campoVacio}
    
    --- TIPOS DE DATOS CAPTURADOS ---
    ${formData.datosCapturados || campoVacio}
    
    --- MANEJO Y SEGURIDAD ---
    ${formData.manejoDatos || campoVacio}
    
    --- TIEMPO DE CONSERVACIÓN ---
    ${formData.tiempoConservacion || campoVacio}
    `;
    
    rolContexto = "evaluar el cumplimiento de las normativas de protección de datos (Habeas Data) y seguridad de la información.";
    reglasContexto = "Verifica que se especifique claramente qué datos se recogen, cómo se encriptan o protegen, quién tiene acceso y en qué momento exacto se destruyen. Alerta sobre prácticas inseguras como uso de USBs personales o falta de anonimización.";
  }

  // 2. GUARDARRAÍL DE PROCESAMIENTO
  if (estaVacio) {
    aiState.validationResult = "💡 El formulario se encuentra completamente vacío. Por favor, diligencie al menos una sección de su documento para que el Consejero IA pueda analizarla y ofrecerle sugerencias concretas.";
    aiState.isValidating = false;
    return;
  }

  // 3. PROMPT MAESTRO DINÁMICO
  const promptConsejero = `Eres un Consejero Técnico del Comité de Ética de la Facultad de Artes y Humanidades.
Tu objetivo es leer los apuntes del investigador y ${rolContexto}

APUNTES DEL INVESTIGADOR:
${datos}

REGLAS DE COMPORTAMIENTO:
1. TONO: Profesional, directo y técnico. PROHIBIDO usar adulaciones (nada de "buen trabajo", "excelente estructura", etc.).
2. VACÍOS: Si ves el texto "${campoVacio}", indica directamente qué información hace falta ahí con un breve ejemplo pertinente.
3. CONCRECIÓN: ${reglasContexto}
4. EXCEPCIÓN: Omite cualquier mención a muestras biológicas o riesgos clínicos. Asume siempre un contexto de artes y humanidades.

Responde ÚNICAMENTE con esta estructura (usa viñetas para cada punto):
📌 Observaciones Técnicas:
[Analiza aquí los textos diligenciados y señala huecos lógicos, riesgos éticos o ambigüedades]

💡 Sugerencias de Completitud:
[Indica aquí qué secciones vitales faltan por llenar y qué se espera exactamente en ellas]`;

  try {
    const messages = [
      { role: "system", content: "Eres un asesor técnico riguroso, útil y directo. No adulas." },
      { role: "user", content: promptConsejero }
    ];

    const chunks = await aiState.engine.chat.completions.create({
      messages,
      temperature: 0.1, // Temperatura baja para mantener el análisis lógico y evitar alucinaciones
      stream: true,
    });

    for await (const chunk of chunks) {
      aiState.validationResult += chunk.choices[0]?.delta?.content || "";
    }
  } catch (error) {
    console.error("Error en consejería:", error);
    aiState.validationResult = "Ocurrió un error técnico al intentar generar los consejos. Revise la consola.";
  } finally {
    aiState.isValidating = false;
  }
}

// --- FUNCIONES DE PERSISTENCIA ---

export function persistir() {
  localStorage.setItem('eticaSuite_backup', JSON.stringify(formData));
}

// 1. Guardar en el navegador
export function guardarEnNavegador() {
  try {
    localStorage.setItem('eticaSuite_backup', JSON.stringify(formData));
  } catch (error) {
    console.error("Error guardando en localStorage:", error);
  }
}

// 2. Cargar del navegador
export function cargarDelNavegador() {
  try {
    const backup = localStorage.getItem('eticaSuite_backup');
    if (backup) {
      const parsed = JSON.parse(backup);
      Object.assign(formData, parsed);
      return true;
    }
  } catch (error) {
    console.error("Error cargando de localStorage:", error);
  }
  return false;
}

// 3. Exportar como archivo .json
export function exportarProyectoJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
  const enlace = document.createElement('a');
  enlace.setAttribute("href", dataStr);
  
  const nombreBase = formData.tituloProyecto ? formData.tituloProyecto.replace(/\s+/g, '_') : 'Proyecto_Etica';
  enlace.setAttribute("download", `${nombreBase}.json`);
  
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
}

// 4. Importar desde archivo .json
export function importarProyectoJSON(evento) {
  const archivo = evento.target.files[0];
  if (!archivo) return;

  const lector = new FileReader();
  lector.onload = (e) => {
    try {
      const contenido = JSON.parse(e.target.result);
      Object.assign(formData, contenido);
      guardarEnNavegador(); // Actualizamos también el caché local
      alert("Proyecto cargado exitosamente.");
    } catch (error) {
      alert("Error al leer el archivo. Asegúrese de que sea un .json válido de la Suite.");
    }
  };
  lector.readAsText(archivo);
}

// --- FUNCIONES DE SINCRONIZACIÓN Y AUTOCOMPLETADO ---

export async function autocompletarDesdePlatypus(herramientaDestino) {
  if (!aiState.isReady || !aiState.engine) {
    alert("Por favor, active el Asistente IA primero.");
    return;
  }

  aiState.isGenerating = true;

  // 1. Recopilar el contexto base de Platypus
  const contextoPlatypus = `
    ENFOQUE Y MÉTODOS: ${formData.platypusDescEnfoque} ${formData.platypusDescMetodos}
    OBJETIVO: ${formData.platypusObjQue} ${formData.platypusObjComo} ${formData.platypusObjParaQue}
    DATOS (ALMACENAMIENTO Y RETENCIÓN): ${formData.platypusDatosAlmacenamiento} ${formData.platypusDatosRetencion}
    PRIVACIDAD Y ANONIMIZACIÓN: ${formData.platypusDatosAcceso}
    CONTENCIÓN EMOCIONAL: ${formData.platypusContencion}
  `;

  let promptSincronizacion = "";

  // 2. Definir las instrucciones y el formato JSON esperado según el destino
  if (herramientaDestino === 'consentimiento') {
    promptSincronizacion = `Eres un asistente experto en ética de investigación. Extrae la información del proyecto y reescríbela para un Consentimiento Informado dirigido a participantes (lenguaje sencillo, sin jerga).
    
    INFORMACIÓN DEL PROYECTO:
    ${contextoPlatypus}
    
    REGLA VITAL: Los textos se insertarán en medio de oraciones preexistentes. NO uses mayúsculas iniciales, NO uses frases introductorias, y NO pongas punto final.
    
    Devuelve ÚNICAMENTE un objeto JSON válido con estas 4 claves:
    {
      "justificacionObjetivos": "Completa la frase 'Este estudio se realiza con el propósito de...'. Inicia directamente con un verbo en infinitivo.",
      "metodologiasLibres": "Completa la frase 'Su participación consistirá en...'. Inicia directamente con verbos en infinitivo (ej. participar en entrevistas, permitir la observación).",
      "descripcionRiesgos": "Describe brevemente los riesgos (fatiga, impacto emocional) sin frases introductorias.",
      "medidasContencion": "Describe las medidas de protección y rutas de apoyo directo, empezando por la acción."
    }`;
  } else if (herramientaDestino === 'politica') {
    promptSincronizacion = `Eres un oficial de protección de datos (Habeas Data). Extrae la información y redacta fragmentos para una Política de Tratamiento de Datos.
    
    INFORMACIÓN DEL PROYECTO:
    ${contextoPlatypus}
    
    REGLA VITAL: Los textos se insertarán como continuaciones de oraciones preexistentes. NO uses frases introductorias. NO uses punto final.
    
    Devuelve ÚNICAMENTE un objeto JSON válido con estas 4 claves:
    {
      "finalidadEspecifica": "Inicia con verbos en infinitivo. Describe el uso que se le dará a los datos.",
      "datosCapturados": "Lista directamente los tipos de datos (ej. grabaciones de audio, notas de campo, nombres).",
      "manejoDatos": "Describe directamente los protocolos de seguridad, cifrado y anonimización aplicados.",
      "tiempoConservacion": "Especifica directamente los tiempos exactos de retención y el destino final (ej. destrucción o archivo)."
    }`;
  }

  try {
    const messages = [
      { role: "system", content: "Eres un sistema de procesamiento de datos. Responde estrictamente con JSON válido sin bloques de código ni texto adicional." },
      { role: "user", content: promptSincronizacion }
    ];

    const response = await aiState.engine.chat.completions.create({
      messages,
      temperature: 0.2, // Baja temperatura para garantizar consistencia estructural
    });

    const respuestaTexto = response.choices[0]?.message?.content || "";
    
    // Limpiar la respuesta en caso de que la IA devuelva bloques markdown ```json ... ```
    const jsonLimpio = respuestaTexto.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const datosParseados = JSON.parse(jsonLimpio);

    // 3. Inyectar los datos en el estado global
    if (herramientaDestino === 'consentimiento') {
      if (datosParseados.justificacionObjetivos) formData.justificacionObjetivos = datosParseados.justificacionObjetivos;
      if (datosParseados.metodologiasLibres) formData.metodologiasLibres = datosParseados.metodologiasLibres;
      if (datosParseados.descripcionRiesgos) formData.descripcionRiesgos = datosParseados.descripcionRiesgos;
      if (datosParseados.medidasContencion) formData.medidasContencion = datosParseados.medidasContencion;
    } else if (herramientaDestino === 'politica') {
      if (datosParseados.finalidadEspecifica) formData.finalidadEspecifica = datosParseados.finalidadEspecifica;
      if (datosParseados.datosCapturados) formData.datosCapturados = datosParseados.datosCapturados;
      if (datosParseados.manejoDatos) formData.manejoDatos = datosParseados.manejoDatos;
      if (datosParseados.tiempoConservacion) formData.tiempoConservacion = datosParseados.tiempoConservacion;
    }

    alert("Campos autocompletados con éxito. Por favor, revise y ajuste los textos generados.");

  } catch (error) {
    console.error("Error en sincronización:", error);
    alert("Hubo un error al procesar el texto o la IA no devolvió el formato esperado. Revise que haya ingresado suficiente información en Platypus.");
  } finally {
    aiState.isGenerating = false;
  }
}

// --- FUNCIÓN DE DESARROLLO / PRUEBAS ---

export function llenarDatosPruebaPlatypus() {
  const confirmar = confirm("Esto sobrescribirá los datos actuales en el formulario Platypus. ¿Desea continuar?");
  if (!confirmar) return;

  formData.platypusDescEnfoque = "La investigación se enmarca en un paradigma cualitativo e interpretativo de corte etnográfico, orientado a comprender las dinámicas de conceptualización estética. Se evitará la recolección de variables clínicas, financieras o biométricas, centrándose exclusivamente en narrativas y opiniones sobre la práctica artística.";
  
  formData.platypusDescMetodos = "La recolección primaria se realizará mediante entrevistas semiestructuradas (grabadas en audio) y diarios de campo de observación participante. Los guiones temáticos están diseñados para no indagar en aspectos de la vida privada. Las conversaciones informales solo serán registradas previo asentimiento verbal continuo del interlocutor.";
  
  formData.platypusDescFases = "Fase 1: Preproducción, obtención de avales y diseño de guiones. Fase 2: Trabajo de campo (entrevistas) durante 4 meses. Fase 3: Transcripción, codificación axial mediante software cualitativo, y destrucción de audios originales.";
  
  formData.platypusObjQue = "delimitar los procesos de conceptualización estética contemporánea";
  formData.platypusObjComo = "mediante la aplicación del método etnográfico y la teoría fundamentada";
  formData.platypusObjParaQue = "para construir un marco comprensivo sobre la validación del arte en contextos universitarios emergentes";
  
  formData.platypusDatosAlmacenamiento = "Los audios crudos y el libro de transcripciones se almacenarán en una carpeta institucional de Microsoft SharePoint asignada por la universidad, protegida con cifrado en reposo y autenticación de doble factor (2FA). Queda estrictamente prohibido el uso de discos duros portátiles no cifrados o nubes comerciales personales.";
  
  formData.platypusDatosRetencion = "Los audios crudos con voces identificables serán destruidos de forma segura 6 meses después de su transcripción y validación. Las transcripciones anonimizadas y la matriz de códigos se conservarán por 5 años para auditorías académicas, tras lo cual serán eliminadas de los servidores institucionales.";
  
  formData.platypusDatosAcceso = "Solo el investigador principal accederá a los audios. La transcripción se hará in-house sin intermediarios. Se aplicará un protocolo de disociación: los nombres reales se reemplazarán por identificadores alfanuméricos (ej. P-01). El documento llave que vincula nombres e IDs se guardará en un servidor local sin conexión a red, separado de las transcripciones.";
  
  formData.platypusContencion = "Dado que los informantes pertenecen a la misma facultad del investigador, existe riesgo de represalias sociales o presión de pares. Para mitigarlo, se garantizará anonimato absoluto en cualquier publicación (no se usarán detalles descriptivos que permitan triangulación). Si el participante manifiesta fatiga, se pausará la sesión. Se habilitará un correo institucional exclusivo para gestionar solicitudes de retiro de datos (opt-out) válidas hasta la fase de codificación.";
  
  alert("Datos de prueba de alta rigurosidad cargados en el Asistente Platypus.");
}