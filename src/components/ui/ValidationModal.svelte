<script>
  import { aiState } from '../../state/formStore.svelte.js';
  let { cerrarModal } = $props();
</script>

<div class="ui-modal-overlay">
  <div class="ui-modal-content" style="max-width: 700px;">
    <h3 class="ui-modal-titulo" style="color: #2c3e50;">Consejería Ética Asistida</h3>
    
    <p style="font-size: 0.9rem; color: var(--color-texto-secundario); margin-bottom: 1.5rem; line-height: 1.5;">
      El asistente virtual ha revisado sus apuntes para ofrecerle sugerencias constructivas que fortalezcan su propuesta antes de enviarla al comité.
    </p>

    {#if aiState.isValidating && aiState.validationResult.length === 0}
      <div style="padding: 2rem; text-align: center; color: var(--color-texto-secundario);">
        <div class="spinner" style="margin: 0 auto 1rem auto; width: 30px; height: 30px; border: 3px solid #f3f3f3; border-top: 3px solid var(--color-primario); border-radius: 50%; animation: spin 1s linear infinite;"></div>
        Leyendo la propuesta y formulando sugerencias...
      </div>
    {:else}
      <div style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 6px; padding: 1.5rem; margin-bottom: 1.5rem; max-height: 50vh; overflow-y: auto; white-space: pre-wrap; font-size: 0.95rem; line-height: 1.6; color: #333;">
        {aiState.validationResult}
      </div>
    {/if}

    <div class="ui-modal-acciones">
      <button class="ui-btn ui-btn-primario" onclick={cerrarModal} disabled={aiState.isValidating}>
        {aiState.isValidating ? 'Analizando...' : 'Entendido'}
      </button>
    </div>
  </div>
</div>

<style>
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>