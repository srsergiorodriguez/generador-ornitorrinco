<!-- src/lib/components/templates/Asentimiento.svelte -->
<script>
  import { formData } from '../../state/formStore.svelte.js';
</script>

<div class="contenido-legal" style="font-family: Arial, sans-serif; line-height: 1.5;">
  <p class="doc-centrado"><strong>Universidad de los Andes</strong></p>
  
  <!-- 1. Título del Documento -->
  <p class="doc-centrado"><strong>Asentimiento Informado para Participación en Investigación</strong></p>
  <p class="doc-centrado"><strong>{#if formData.tituloProyecto}{formData.tituloProyecto}{:else}<span class="doc-marcador-vacio">[Título del proyecto]</span>{/if}</strong></p>

  <!-- 2. Introducción -->
  <p><strong>¡Hola!</strong> Mi nombre es <strong>{#if formData.investigadorPrincipal}{formData.investigadorPrincipal}{:else}<span class="doc-marcador-vacio">[Nombre del investigador]</span>{/if}</strong> y soy investigador/a de la Universidad de los Andes.</p>
  
  <!-- 3. Descripción del Procedimiento -->
  <p><strong>¿De qué se trata esto?</strong><br>
    Te estoy invitando a participar en un estudio porque queremos entender mejor sobre <em>{#if formData.justificacionObjetivos}{formData.justificacionObjetivos}{:else}<span class="doc-marcador-vacio">[Justificación]</span>{/if}</em>. 
    <br><br>
    Si decides participar, haremos lo siguiente: {#if formData.metodologiasLibres}{formData.metodologiasLibres}{:else}<span class="doc-marcador-vacio">[Describa metodologías]</span>{/if}.
  </p>

  <!-- 4. Riesgos y Beneficios -->
  <p><strong>¿Puede pasar algo malo o algo bueno?</strong><br>
    Es posible que sientas alguna molestia, como: {#if formData.descripcionRiesgos}{formData.descripcionRiesgos}{:else}<span class="doc-marcador-vacio">[Describa los riesgos]</span>{/if}. Pero no te preocupes, si en algún momento te sientes mal, {#if formData.medidasContencion}{formData.medidasContencion}{:else}<span class="doc-marcador-vacio">[Describa las medidas]</span>{/if}.
    <br><br>
    Participar en esto nos ayudará a {#if formData.beneficios}{formData.beneficios}{:else}<span class="doc-marcador-vacio">[Describa los beneficios]</span>{/if}. No recibirás dinero por participar.
  </p>

  <!-- 5. Confidencialidad -->
  <p><strong>¿Quién sabrá lo que me cuentes?</strong><br>
    Todo lo que hablemos será un secreto. {#if formData.manejoDatos}{formData.manejoDatos}{:else}<span class="doc-marcador-vacio">[Describa el manejo de datos]</span>{/if}. Solo el equipo de investigación podrá ver esta información.
  </p>

  <!-- 7. Voluntariedad -->
  <p><strong>Tú decides</strong><br>
    Participar es completamente voluntario. Si dices que sí ahora, pero luego cambias de opinión y ya no quieres participar, puedes decírmelo en cualquier momento y no habrá ningún problema ni afectará nada.
  </p>

  <!-- 8. Contacto -->
  <p><strong>¿Tienes preguntas?</strong><br>
    Si tienes alguna duda sobre lo que vamos a hacer, puedes preguntarme ahora mismo o contactarme más adelante.
  </p>

  <!-- 9. Consentimiento -->
  <p><strong>Tu decisión</strong><br>
    He leído (o me han leído) y comprendido la información proporcionada. Acepto participar en el estudio.
    <br> Sí ___ No ___
  </p>

  <!-- 10. Autorización de datos personales -->
  <p><strong>Uso de tu información</strong><br>
    La Universidad de los Andes, como institución que almacena y recolecta datos personales, requiere obtener su autorización para recolectar, usar, suprimir, procesar, verificar, dar tratamiento, actualizar y disponer de los datos que han sido suministrados y que se han incorporado en las bases de datos con que cuenta la Universidad (incluyendo fotografía o producción Audiovisual (Video), biométricos). La información será utilizada para el desarrollo de las funciones propias de la Universidad en su condición de institución de educación superior, de forma directa o a través de terceros.<br><br>
    De igual manera usted declara que está al tanto de los derechos que le asisten como titular de datos, especialmente los de conocer, actualizar y rectificar sus datos personales frente a la Universidad de los Andes, y los demás consagrados en el Manual de Política de Tratamiento de Datos Personales de la Universidad (<a href="https://secretariageneral.uniandes.edu.co/images/documents/Manual-Politica-Tratamiento-Datos-Personales-2020-Uniandes.pdf">Ver link</a>), las normas pertinentes y aplicables, así como del carácter facultativo de la respuesta a las preguntas, si se le llegasen a hacer, cuando estas versen sobre datos sensibles o sobre los datos de las niñas, niños y adolescentes.<br><br>
    Para ejercer su derecho de Habeas Data, usted puede direccionar sus peticiones al correo: habeasdata@uniandes.edu.co.
  </p>

  <p>Autorizo el tratamiento de datos personales:<br> Sí ___ No ___</p>
  <p>Autorizo el tratamiento de datos sensibles:<br> Sí ___ No ___</p>

  {#if formData.incluyeAudiovisual}
    <p>Autorizo de forma no exclusiva la utilización de mis derechos de imagen para su fijación sobre fotografías o procedimientos análogos a la fotografía, o producciones Audiovisuales (Videos). La presente autorización se da tanto para formato o soporte material, y se extiende a la utilización en medio óptico, magnético, electrónico, en red, mensajes de datos o similar conocido o por conocer en el futuro, todos ellos relacionados con la investigación únicamente. Esta autorización se da sin limitación territorial y por el por el tiempo máximo de protección legal de derecho de autor en Colombia.</p>
    <p>Autorizo uso de imagen:<br> Sí ___ No ___</p>
    <p>Autorizo grabación de audio y/o video:<br> Sí ___ No ___</p>
    <p>Autorizo la transcripción del audio y/o video:<br> Sí ___ No ___</p>
  {/if}

  <div class="bloque-indivisible">
    <br>
    <p><strong>Firma del Participante:</strong> ___________________________________<br>
    No. Documento: <br>
    Fecha: </p>
  </div>

  <!-- 11. Testigos -->
  <div class="bloque-indivisible">
    <p><strong>Testigos (2)</strong><br>
    He presenciado la firma del participante.</p>
    <p><strong>Firma Testigo 1:</strong> ________________________________________<br>
    No. Documento:</p>
    <br>
    <p><strong>Firma Testigo 2:</strong> ________________________________________<br>
    No. Documento:</p>
  </div>
</div>