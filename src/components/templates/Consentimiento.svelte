<script>
  import { formData } from '../../state/formStore.svelte.js';
</script>

<div class="contenido-legal">
  <p class="doc-centrado"><strong>Universidad de los Andes - Facultad de Artes y Humanidades</strong></p>
  <p class="doc-centrado"><strong>Formato de Consentimiento Informado</strong></p>
  
  <p><strong>Título del proyecto:</strong> 
    {#if formData.tituloProyecto} {formData.tituloProyecto} {:else} <span class="doc-marcador-vacio">[Título del proyecto]</span> {/if}
  </p>
  
  <p><strong>Investigador responsable:</strong> 
    {#if formData.investigadorPrincipal} {formData.investigadorPrincipal} {:else} <span class="doc-marcador-vacio">[Nombre del investigador]</span> {/if}
  </p>
  
  <p><strong>1. Justificación y objetivos:</strong><br>
    {#if formData.justificacionObjetivos} {formData.justificacionObjetivos} {:else} <span class="doc-marcador-vacio">[Ingrese justificación]</span> {/if}
  </p>

  <p><strong>2. Procedimientos y participación:</strong><br>
    Su participación consistirá en hacer parte de {#if formData.metodologiasLibres}<strong>{formData.metodologiasLibres}</strong>{:else}<span class="doc-marcador-vacio">[Describa metodologías]</span>{/if}. Los aportes recopilados servirán como base para la producción de {#if formData.resultadosLibres}<strong>{formData.resultadosLibres}</strong>{:else}<span class="doc-marcador-vacio">[Describa resultados]</span>{/if}.
    {#if formData.descripcionProcedimientos}
      <br>{formData.descripcionProcedimientos}
    {/if}
  </p>

  <p><strong>3. Riesgos y molestias esperadas:</strong><br>
    De acuerdo con la Resolución 008430 de 1993 del Ministerio de Salud, esta investigación se clasifica como {#if formData.nivelRiesgo !== "Sin Riesgo"} de {/if} <strong>{formData.nivelRiesgo}</strong>. {#if formData.descripcionRiesgos}{formData.descripcionRiesgos}{:else}<span class="doc-marcador-vacio">[Describa los riesgos]</span>{/if} En caso de experimentar algún malestar derivado de las actividades, {#if formData.medidasContencion}{formData.medidasContencion}{:else}<span class="doc-marcador-vacio">[Describa las medidas de contención]</span>{/if}.
  </p>

  <p><strong>4. Beneficios esperados:</strong><br>
    Su participación no conlleva una remuneración económica directa. Sin embargo, usted contribuirá a {#if formData.beneficios}{formData.beneficios}{:else}<span class="doc-marcador-vacio">[Describa los beneficios]</span>{/if}.
  </p>

  <p><strong>5. Confidencialidad y manejo de datos:</strong><br>
    {#if formData.manejoDatos}{formData.manejoDatos}{:else}<span class="doc-marcador-vacio">[Describa el manejo de datos]</span>{/if} Usted tiene el derecho de solicitar el retiro o la anonimización de sus aportes en cualquier momento.
  </p>

  {#if formData.incluyeAudiovisual}
    <p><strong>6. Autorización para registro audiovisual:</strong><br>
      Al firmar este documento, usted autoriza a los investigadores a utilizar fotografías, audios o grabaciones de video en las que usted pueda aparecer o participar, de forma exclusiva para fines académicos, de investigación y divulgación cultural, sin ánimo de lucro.
    </p>
  {/if}

  <p><strong>Participación voluntaria:</strong><br>
    Su participación es estrictamente voluntaria. Usted tiene total libertad de negarse a participar o retirar su consentimiento en cualquier etapa del estudio sin ninguna consecuencia negativa o penalidad.
  </p>

  <p><strong>Declaración de Consentimiento:</strong><br>
    He leído y comprendido la información proporcionada. Se me han explicado los objetivos, riesgos y beneficios del proyecto y todas mis preguntas han sido respondidas. Con pleno conocimiento, autorizo mi participación en la investigación.
  </p>

  <div class="bloque-indivisible">
    <br><br>
    <p><strong>Firma del Participante:</strong> ___________________________________<br>
    Nombre: <br>
    Fecha: </p>

    <br>
    <p><strong>Firma del Investigador Responsable:</strong> _______________________<br>
    Nombre: {formData.investigadorPrincipal}</p>

    <br>
    <p><strong>Firma Testigo 1:</strong> ________________________________________<br>
    Nombre y Relación:</p>

    <br>
    <p><strong>Firma Testigo 2:</strong> ________________________________________<br>
    Nombre y Relación:</p>
  </div>
</div>