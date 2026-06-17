<!-- src/lib/components/templates/PoliticaDatos.svelte -->
<script>
  import { formData } from '../../state/formStore.svelte.js';
</script>

<div class="contenido-legal">
  <p class="doc-centrado"><strong>Universidad de los Andes - Facultad de Artes y Humanidades</strong></p>
  <p class="doc-centrado"><strong>Política de Tratamiento de Datos Personales y Autorización de Uso de Imagen</strong></p>
  
  <p>En cumplimiento de la Ley 1581 de 2012 (Ley Estatutaria de Protección de Datos Personales) y sus decretos reglamentarios, <strong>{formData.responsableTratamiento || 'la Universidad de los Andes'}</strong> informa que los datos recolectados en el marco del proyecto <em>{#if formData.tituloProyecto}{formData.tituloProyecto}{:else}<span class="doc-marcador-vacio">[Título del proyecto]</span>{/if}</em> serán tratados bajo los principios de finalidad, libertad y transparencia.</p>

  <p><strong>1. Finalidad del tratamiento:</strong><br>
    Los datos serán tratados con la finalidad de {#if formData.finalidadEspecifica}<strong>{formData.finalidadEspecifica}</strong>{:else}<span class="doc-marcador-vacio">[Describa la finalidad]</span>{/if}.
  </p>

  <p><strong>2. Datos recolectados:</strong><br>
    La investigación recolectará datos consistentes en {#if formData.datosCapturados}<strong>{formData.datosCapturados}</strong>{:else}<span class="doc-marcador-vacio">[Liste los datos]</span>{/if}.
  </p>

  {#if formData.incluyeAudiovisual}
  <p><strong>3. Autorización de Uso de Imagen y Voz:</strong><br>
    Al aceptar esta política, el titular autoriza expresamente a los investigadores el uso de su imagen, voz y registro audiovisual para fines estrictamente académicos, investigativos y de divulgación cultural (tales como exposiciones, publicaciones y repositorios digitales), sin ánimo de lucro y respetando siempre su dignidad y buen nombre.
  </p>
  {/if}

  <p><strong>{#if formData.incluyeAudiovisual}4{:else}3{/if}. Derechos del titular:</strong><br>
    Como titular de la información, usted tiene derecho a conocer, actualizar y rectificar sus datos personales, así como a revocar la autorización o solicitar la supresión de los mismos cuando considere que no se respetan los principios constitucionales y legales. Los datos serán conservados durante la vigencia del proyecto y su posterior archivo histórico.
  </p>

  <p><strong>{#if formData.incluyeAudiovisual}5{:else}4{/if}. Canales de atención:</strong><br>
    Para ejercer sus derechos de Habeas Data, puede dirigirse al correo electrónico: <strong>{formData.emailContactoDatos || 'habeasdata@uniandes.edu.co'}</strong> o contactar directamente a: <strong>{#if formData.contactoResponsableDatos}{formData.contactoResponsableDatos}{:else}<span class="doc-marcador-vacio">[Nombre o dependencia de contacto]</span>{/if}</strong>.
  </p>
  
  <div class="bloque-indivisible">
    <br><br>
    <p><strong>Firma del Titular:</strong> ___________________________________<br>
    Nombre: <br>
    Cédula: <br>
    Fecha: </p>
  </div>
</div>