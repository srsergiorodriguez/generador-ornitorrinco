<!-- src/lib/components/forms/Step4_DataPolicy.svelte -->
<script>
  import { formData } from '../../state/formStore.svelte.js';
  import AiTextarea from '../ui/AiTextarea.svelte';
</script>

<div class="ui-form-group">
  <label class="ui-form-label">1. Título del Proyecto:</label>
  <input class="ui-form-input" bind:value={formData.tituloProyecto} placeholder="Ej. Historias del Arte Transculturales..." />
</div>

<div class="ui-form-group" style="margin-top: 1.5rem;">
  <label class="ui-form-label">2. Responsable del Tratamiento:</label>
  <input class="ui-form-input" bind:value={formData.responsableTratamiento} placeholder="Ej. Universidad de los Andes - Facultad de Artes y Humanidades" />
</div>

<div class="ui-form-group" style="margin-top: 1.5rem;">
  <label class="ui-form-label">3. Finalidad específica del tratamiento:</label>
  <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-bottom: 0.5rem;">
    Explique para qué usará la información personal. El texto continuará esta frase: <em>"Los datos serán tratados con la finalidad de..."</em>
  </p>
  <AiTextarea 
    id="finalidadDatos"
    bind:value={formData.finalidadEspecifica}
    rows={3}
    esFragmento={true}
    instruccionesIA={`REGLA: El texto se insertará a la mitad de una oración. DEBE comenzar en minúscula y NO llevar punto final.
EJEMPLO ESPERADO:
Usuario: para contactarlos después y publicar en la web
Tu respuesta: establecer contacto futuro con los participantes y gestionar la publicación académica en repositorios digitales`}
  />
</div>

<div class="ui-form-group" style="margin-top: 1.5rem;">
  <label class="ui-form-label">4. Datos personales a recolectar:</label>
  <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-bottom: 0.5rem;">
    Liste los datos. El texto continuará esta frase: <em>"La investigación recolectará datos consistentes en..."</em>
  </p>
  <AiTextarea 
    id="datosCapturados"
    bind:value={formData.datosCapturados}
    rows={3}
    esFragmento={true}
    instruccionesIA={`REGLA: El texto se insertará a la mitad de una oración. DEBE comenzar en minúscula y NO llevar punto final.
EJEMPLO ESPERADO:
Usuario: nombres completos, correos y fotos
Tu respuesta: nombres completos, correos electrónicos y registros fotográficos`}
  />
</div>

<div class="ui-form-group" style="margin-top: 1.5rem;">
  <label class="ui-form-label">5. Nombre del contacto para Habeas Data:</label>
  <input class="ui-form-input" type="text" bind:value={formData.contactoResponsableDatos} placeholder="Ej. Nombre del Investigador o Coordinación" />
</div>

<div class="ui-form-group" style="margin-top: 1.5rem;">
  <label class="ui-form-label">6. Correo electrónico de contacto:</label>
  <input class="ui-form-input" type="email" bind:value={formData.emailContactoDatos} placeholder="Ej. habeasdata@uniandes.edu.co" />
</div>