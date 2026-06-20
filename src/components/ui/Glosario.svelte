<!-- src/lib/components/ui/Glosario.svelte -->
<script>
  let { cerrarGlosario } = $props();

  let terminos = $state([]);
  let busqueda = $state("");
  let cargando = $state(true);

  // Función nativa para cargar y procesar el CSV
  async function cargarGlosario() {
    try {
      const response = await fetch('./glosario.csv');
      const text = await response.text();
      
      // Separar por líneas y limpiar espacios
      const lineas = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      
      // Ignorar la primera línea (los encabezados) y mapear el resto
      terminos = lineas.slice(1).map(linea => {
        const [concepto, definicion, ejemplo] = linea.split(';');
        return { concepto, definicion, ejemplo };
      });
    } catch (error) {
      console.error("Error cargando el glosario:", error);
    } finally {
      cargando = false;
    }
  }

  // Filtrado reactivo basado en la búsqueda
  let terminosFiltrados = $derived(
    terminos.filter(t => 
      t.concepto?.toLowerCase().includes(busqueda.toLowerCase()) || 
      t.definicion?.toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  // Cargar datos al montar el componente
  import { onMount } from 'svelte';
  onMount(cargarGlosario);
</script>

<div class="ui-modal-overlay">
  <div class="ui-modal-content" style="max-width: 700px; max-height: 85vh; display: flex; flex-direction: column;">
    
    <!-- Encabezado del Modal -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-borde); padding-bottom: 1rem; margin-bottom: 1rem;">
      <h3 class="ui-modal-titulo" style="margin: 0;"><span>📚</span> Glosario de Ética</h3>
      <button class="ui-btn ui-btn-secundario" onclick={cerrarGlosario} style="padding: 0.3rem 0.6rem;">Cerrar</button>
    </div>

    <!-- Buscador -->
    <div style="margin-bottom: 1.5rem;">
      <input 
        type="text" 
        class="ui-form-input" 
        placeholder="Buscar un concepto (ej. Riesgo, Anonimato)..." 
        bind:value={busqueda}
      />
    </div>

    <!-- Lista de Términos -->
    <div style="overflow-y: auto; flex: 1; padding-right: 0.5rem;">
      {#if cargando}
        <p style="text-align: center; color: var(--color-texto-secundario);">Cargando conceptos...</p>
      {:else if terminosFiltrados.length === 0}
        <p style="text-align: center; color: var(--color-texto-secundario);">No se encontraron términos para "{busqueda}".</p>
      {:else}
        {#each terminosFiltrados as termino}
          <div style="background: #fafafa; border: 1px solid var(--color-borde); border-radius: 6px; padding: 1.2rem; margin-bottom: 1rem;">
            <h4 style="margin-top: 0; color: var(--color-primario); font-size: 1.1rem;">{termino.concepto}</h4>
            <p style="font-size: 0.95rem; line-height: 1.5; color: var(--color-texto); margin-bottom: 0.8rem;">
              {termino.definicion}
            </p>
            <div style="background: #eef2f5; padding: 0.8rem; border-radius: 4px; border-left: 3px solid var(--color-primario);">
              <strong style="font-size: 0.85rem; color: var(--color-texto-secundario); display: block; margin-bottom: 0.3rem;">EJEMPLO PRÁCTICO:</strong>
              <span style="font-size: 0.9rem; font-style: italic; color: #444;">"{termino.ejemplo}"</span>
            </div>
          </div>
        {/each}
      {/if}
    </div>

  </div>
</div>