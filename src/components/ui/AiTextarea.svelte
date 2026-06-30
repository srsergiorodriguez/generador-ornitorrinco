<script>
  import { formData, aiState, procesarTextoConIA } from '../../state/formStore.svelte.js';

  let {
    value = $bindable(),
    id,
    rows = 4,
    placeholder = "",
    instruccionesIA = "",
    esFragmento = false
  } = $props();

  let isGenerating = $state(false);
  let textoAnterior = $state(null); 

  async function llamarIA() {
    if (!value || !value.trim()) {
      alert("Por favor, escriba primero algunas ideas.");
      return;
    }

    isGenerating = true;
    try {
      // Pasamos la bandera al procesador
      const resultado = await procesarTextoConIA(value, instruccionesIA, esFragmento);
      textoAnterior = value; 
      value = resultado;     
    } catch (error) {
      console.error(error);
      alert("Hubo un error al procesar el texto con IA.");
    } finally {
      isGenerating = false;
    }
  }

  function deshacer() {
    if (textoAnterior !== null) {
      value = textoAnterior; 
      textoAnterior = null;  
    }
  }
</script>

<div style="display: flex; flex-direction: column; gap: 0.5rem;">
  <textarea 
    class="ui-form-input" 
    {id} 
    bind:value 
    {rows} 
    {placeholder}
  ></textarea>
  
  {#if formData.iaActivada}
    <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
      <button 
        class="ui-btn ui-btn-secundario" 
        style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; padding: 0.4rem 0.8rem;" 
        onclick={llamarIA}
        disabled={isGenerating || !aiState.isReady}
      >
        <span style="font-size: 1.1rem;">✨</span> 
        {isGenerating ? 'Redactando...' : !aiState.isReady ? 'Esperando IA...' : 'Mejorar con IA'}
      </button>

      {#if textoAnterior !== null && !isGenerating}
        <button 
          class="ui-btn ui-btn-secundario" 
          style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; padding: 0.4rem 0.8rem; background-color: #f9e2e2; color: #d9534f; border: 1px solid #d9534f;" 
          onclick={deshacer}
        >
          <span>↩️</span> Deshacer cambio de IA
        </button>
      {/if}
    </div>
  {/if}
</div>