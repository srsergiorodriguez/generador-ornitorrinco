<!-- src/lib/components/forms/PlatypusAssistant.svelte -->
<script>
  import { formData } from '../../state/formStore.svelte.js';

  // Función auxiliar para copiar al portapapeles
  function copiarAlPortapapeles(idElemento) {
    const texto = document.getElementById(idElemento).innerText;
    navigator.clipboard.writeText(texto).then(() => alert("¡Texto copiado listo para pegar en Platypus!"));
  }

  // Ensamblaje de la Descripción del Proyecto (Máx 1000 palabras)
  let descripcionPlatypus = $derived(
    `${formData.justificacionObjetivos ? formData.justificacionObjetivos + '.' : '[Falta justificación].'} ` +
    `A nivel metodológico, la investigación contempla: ${formData.metodologiasLibres || '[Falta metodología]'}. ` +
    `El procedimiento detallado consistirá en: ${formData.descripcionProcedimientos || '[Faltan procedimientos]'}.`
  );

  // Respuesta por defecto para Muestras Biológicas (Típica de Artes y Humanidades)
  const textoMuestrasBiologicas = "El proyecto, debido a que se desarrolla en el marco de las prácticas de las artes y las humanidades, no corresponde a una investigación en ciencias naturales y no contempla la toma de muestras biológicas de ningún tipo.";

  // Protocolo de Datos Ensamblado
  let protocoloDatos = $derived(
    `El ciclo de vida y tratamiento de los datos seguirá un protocolo riguroso. Los datos recolectados consisten en: ${formData.datosCapturados || '[Faltan datos]'}. ` +
    `Para la protección de la información, se implementarán las siguientes medidas: ${formData.manejoDatos || '[Falta manejo de datos]'}. ` +
    `Estos datos serán conservados ${formData.tiempoConservacion || 'durante la vigencia del proyecto'}. ` +
    `El acceso estará restringido al equipo de investigación liderado por ${formData.investigadorPrincipal || '[Nombre del investigador]'} y la finalidad de este tratamiento será ${formData.finalidadEspecifica || '[Falta finalidad]'}.`
  );
</script>

<div style="max-width: 800px; margin: 0 auto;">
  <h2 style="color: var(--color-primario); margin-bottom: 0.5rem;">Asistente de Formulario Platypus</h2>
  <p style="color: var(--color-texto-secundario); margin-bottom: 2rem; line-height: 1.5;">
    Utilice los botones "Copiar" para trasladar fácilmente la información de su proyecto a los campos correspondientes en la plataforma institucional Platypus para su solicitud de Aval Ético.
  </p>

  <!-- BLOQUE: Descripción del proyecto -->
  <div style="background: #fff; border: 1px solid var(--color-borde); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
      <div>
        <h4 style="margin: 0; color: #333;">Descripción del proyecto</h4>
        <p style="font-size: 0.85rem; color: #666; margin-top: 0.2rem;">Debe contemplar el enfoque general y los métodos específicos.</p>
      </div>
      <button class="ui-btn ui-btn-secundario" onclick={() => copiarAlPortapapeles('platypus-desc')} style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">📋 Copiar</button>
    </div>
    <div id="platypus-desc" style="background: #fafafa; padding: 1rem; border-radius: 4px; font-size: 0.95rem; line-height: 1.6; color: #444;">
      {descripcionPlatypus}
    </div>
  </div>

  <!-- BLOQUE: Objetivo General -->
  <div style="background: #fff; border: 1px solid var(--color-borde); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
      <div>
        <h4 style="margin: 0; color: #333;">Objetivo general de la propuesta</h4>
      </div>
      <button class="ui-btn ui-btn-secundario" onclick={() => copiarAlPortapapeles('platypus-obj')} style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">📋 Copiar</button>
    </div>
    <div id="platypus-obj" style="background: #fafafa; padding: 1rem; border-radius: 4px; font-size: 0.95rem; line-height: 1.6; color: #444;">
      {formData.justificacionObjetivos || '[Debe llenar la justificación en el paso 1]'}
    </div>
  </div>

  <!-- BLOQUE: Muestras Biológicas -->
  <div style="background: #fff; border: 1px solid var(--color-borde); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
      <div>
        <h4 style="margin: 0; color: #333;">Toma de muestras biológicas</h4>
        <p style="font-size: 0.85rem; color: #666; margin-top: 0.2rem;">Respuesta estándar para humanidades.</p>
      </div>
      <button class="ui-btn ui-btn-secundario" onclick={() => copiarAlPortapapeles('platypus-bio')} style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">📋 Copiar</button>
    </div>
    <div id="platypus-bio" style="background: #fafafa; padding: 1rem; border-radius: 4px; font-size: 0.95rem; line-height: 1.6; color: #444;">
      {textoMuestrasBiologicas}
    </div>
  </div>

  <!-- BLOQUE: Contención Emocional -->
  <div style="background: #fff; border: 1px solid var(--color-borde); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
      <div>
        <h4 style="margin: 0; color: #333;">Contención emocional (Si es pertinente)</h4>
      </div>
      <button class="ui-btn ui-btn-secundario" onclick={() => copiarAlPortapapeles('platypus-contencion')} style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">📋 Copiar</button>
    </div>
    <div id="platypus-contencion" style="background: #fafafa; padding: 1rem; border-radius: 4px; font-size: 0.95rem; line-height: 1.6; color: #444;">
      {formData.medidasContencion || '[Debe llenar las medidas de contención en el paso 3 de Riesgos]'}
    </div>
  </div>

  <!-- BLOQUE: Protocolo de Datos -->
  <div style="background: #fff; border: 1px solid var(--color-borde); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
      <div>
        <h4 style="margin: 0; color: #333;">Cargue el protocolo de manejo de datos</h4>
        <p style="font-size: 0.85rem; color: #666; margin-top: 0.2rem;">Detalla tiempo, almacenamiento y accesos.</p>
      </div>
      <button class="ui-btn ui-btn-secundario" onclick={() => copiarAlPortapapeles('platypus-datos')} style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">📋 Copiar</button>
    </div>
    <div id="platypus-datos" style="background: #fafafa; padding: 1rem; border-radius: 4px; font-size: 0.95rem; line-height: 1.6; color: #444;">
      {protocoloDatos}
    </div>
  </div>

  <!-- CHECKLIST DE ANEXOS OBLIGATORIOS -->
  <div style="background: #eef2f5; border-left: 4px solid var(--color-primario); border-radius: 4px; padding: 1.5rem; margin-bottom: 2rem;">
    <h4 style="margin-top: 0; margin-bottom: 1rem; color: #333;">✅ Lista de Chequeo de Anexos para Platypus</h4>
    <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8; color: #444;">
      <li><strong>Certificado del curso de ética</strong> en la investigación (CITI o Ética en la Investigación BN).</li>
      <li>Documento final en PDF del <strong>Consentimiento Informado</strong> (Descargado desde esta Suite).</li>
      <li>Documento final en PDF de la <strong>Política de Tratamiento de Datos</strong> (Descargado desde esta Suite).</li>
      {#if formData.nivelRiesgo !== 'Sin Riesgo'}
        <li>Instrumentos de recolección de datos (Guiones de entrevista, encuestas, etc.).</li>
      {/if}
    </ul>
  </div>

</div>