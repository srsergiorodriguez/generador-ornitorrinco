<script>
  import { formData } from '../../state/formStore.svelte.js';
  import AiTextarea from '../ui/AiTextarea.svelte';
</script>

<div class="ui-form-group">
  <label class="ui-form-label" for="titulo">Título del Proyecto:</label>
  <input class="ui-form-input" id="titulo" type="text" bind:value={formData.tituloProyecto} placeholder="Ej. Historias del Arte Transculturales..." />
</div>

<div class="ui-form-group">
  <label class="ui-form-label" for="investigador">Investigador Principal:</label>
  <input class="ui-form-input" id="investigador" type="text" bind:value={formData.investigadorPrincipal} placeholder="Nombre completo" />
</div>

<div class="ui-form-group">
  <label class="ui-form-label" for="justificacion">Justificación y Objetivos:</label>
  <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-bottom: 0.5rem;">Describa brevemente el propósito de la investigación de manera comprensible.</p>
  
  <AiTextarea 
    id="justificacion"
    bind:value={formData.justificacionObjetivos}
    rows={5}
    placeholder="Ej. Vamos a visitar museos para recolectar historias..."
    esFragmento={false}
    instruccionesIA={`REGLA: Redacta un párrafo formal, completo y autocontenido explicando el qué y el para qué de la investigación. DEBE iniciar con mayúscula y terminar con punto final.
EJEMPLO ESPERADO:
Usuario: vamos a visitar museos para recolectar historias sobre objetos antiguos
Tu respuesta: La presente investigación tiene como objetivo principal realizar visitas a espacios museales para recopilar historias orales asociadas a la cultura material, con el fin de preservar y analizar la memoria histórica.`}
  />
</div>