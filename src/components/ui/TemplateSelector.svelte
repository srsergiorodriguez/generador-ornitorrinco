<!-- src/lib/components/ui/TemplateSelector.svelte -->
<script>
  let { plantillas, onSelect } = $props();
  let opcionSeleccionada = $state("");

  function manejarSeleccion(evento) {
    const id = evento.target.value;
    if (!id) return;

    const plantilla = plantillas.find(p => p.id === id);
    if (plantilla) {
      onSelect(plantilla.texto);
    }
    
    // Reseteamos el selector para que pueda volver a elegir la misma u otra
    opcionSeleccionada = "";
  }
</script>

<select 
  class="ui-form-input" 
  style="max-width: 350px; padding: 0.3rem 0.5rem; font-size: 0.85rem; border-radius: 4px; border: 1px solid var(--color-primario); color: var(--color-primario); background-color: #fdfdfd; cursor: pointer;"
  bind:value={opcionSeleccionada} 
  onchange={manejarSeleccion}
>
  <option value="">💡 Insertar plantilla de la Facultad...</option>
  {#each plantillas as plantilla}
    <option value={plantilla.id}>{plantilla.titulo}</option>
  {/each}
</select>