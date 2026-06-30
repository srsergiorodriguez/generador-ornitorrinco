<!-- src/lib/components/templates/PlantillaPlatypus.svelte -->
<script>
  import { formData } from '../../state/formStore.svelte.js';
</script>

<div class="contenido-legal" style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <p class="doc-centrado" style="margin-bottom: 2rem;">
    <strong>Borrador de Solicitud de Aval - Plataforma Platypus</strong>
  </p>

  <p><strong>Descripción del proyecto</strong><br>
    <span style="white-space: pre-wrap;">
      {#if formData.platypusDescEnfoque || formData.platypusDescMetodos || formData.platypusDescFases}
        {#if formData.platypusDescEnfoque}{formData.platypusDescEnfoque}{"\n\n"}{/if}
        {#if formData.platypusDescMetodos}{formData.platypusDescMetodos}{"\n\n"}{/if}
        {#if formData.platypusDescFases}{formData.platypusDescFases}{/if}
      {:else}
        <span class="doc-marcador-vacio">[Debe completar las secciones de la descripción]</span>
      {/if}
    </span>
  </p>

  <p><strong>Objetivo general de la propuesta</strong><br>
    <span style="white-space: pre-wrap;">
      {#if formData.platypusObjQue || formData.platypusObjComo || formData.platypusObjParaQue}
        {#if formData.platypusObjQue}{formData.platypusObjQue.trim()}{" "}{/if}
        {#if formData.platypusObjComo}{formData.platypusObjComo.trim()}{" "}{/if}
        {#if formData.platypusObjParaQue}{formData.platypusObjParaQue.trim()}{/if}
      {:else}
        <span class="doc-marcador-vacio">[Debe completar las partes del objetivo general]</span>
      {/if}
    </span>
  </p>

  <p><strong>Protocolo de manejo de datos</strong><br>
    <span style="white-space: pre-wrap;">
      {#if formData.platypusDatosAlmacenamiento || formData.platypusDatosRetencion || formData.platypusDatosAcceso}
        {#if formData.platypusDatosAlmacenamiento}{formData.platypusDatosAlmacenamiento}{"\n\n"}{/if}
        {#if formData.platypusDatosRetencion}{formData.platypusDatosRetencion}{"\n\n"}{/if}
        {#if formData.platypusDatosAcceso}{formData.platypusDatosAcceso}{/if}
      {:else}
        <span class="doc-marcador-vacio">[Debe completar el protocolo de manejo de datos]</span>
      {/if}
    </span>
  </p>

  <p><strong>Contención emocional</strong><br>
    <span style="white-space: pre-wrap;">
      {#if formData.platypusContencion}
        {formData.platypusContencion}
      {:else}
        No aplica para este proyecto.
      {/if}
    </span>
  </p>

  <p><strong>Toma de muestras biológicas</strong><br>
    <span style="white-space: pre-wrap;">{formData.platypusMuestras}</span>
  </p>

  <hr style="border: none; border-top: 1px solid #ccc; margin: 2rem 0;">
  
  <p><strong>Lista de Chequeo de Anexos a subir en la plataforma:</strong></p>
  <ul>
    <li>Certificado del curso de ética en la investigación.</li>
    <li>Consentimiento Informado (y Asentimiento si aplica).</li>
    <li>Política de Tratamiento de Datos.</li>
    <li>Instrumentos de recolección (guiones, encuestas, etc.).</li>
  </ul>
</div>