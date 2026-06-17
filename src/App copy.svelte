<script>
  import { formData, aiState, initGlobalEngine } from './state/formStore.svelte.js';
  
  import Step1General from './components/forms/Step1_General.svelte';
  import Step2Methodology from './components/forms/Step2_Methodology.svelte';
  import Step3Risks from './components/forms/Step3_Risks.svelte';
  import PlantillaConsentimiento from './components/templates/Consentimiento.svelte';

  // NUEVO: Estado global para manejar qué herramienta de la suite estamos usando
  let herramientaActiva = $state('consentimiento'); 
  let pasoActual = $state(1);
  let mostrarModalIA = $state(false);

  // Funciones de Exportación
  function copiarTexto() {
    const docText = document.getElementById('documento-exportable').innerText;
    navigator.clipboard.writeText(docText).then(() => alert("¡Texto copiado!"));
  }

  function exportarWord() {
    const docHTML = document.getElementById('documento-exportable').innerHTML;
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Documento Etico</title></head><body>";
    const footer = "</body></html>";
    const blob = new Blob(['\ufeff', header + docHTML + footer], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    const nombreArchivo = formData.tituloProyecto ? formData.tituloProyecto.replace(/\s+/g, '_') : 'Documento_Etica';
    enlace.download = `${nombreArchivo}.doc`;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
  }

  function imprimirPDF() { window.print(); }

  function aceptarIA() {
    formData.iaActivada = true;
    mostrarModalIA = false;
    initGlobalEngine(); 
  }
</script>

<main class="layout-pantalla-completa">
  <header class="layout-encabezado" style="display: flex; justify-content: space-between; align-items: center; border-bottom: none;">
    <div>
      <h1 style="font-size: 1.4rem; margin-bottom: 0.2rem;">Suite de Ética de Investigación</h1>
      <p style="color: var(--color-texto-secundario); font-size: 0.9rem; margin-bottom: 0;">Facultad de Artes y Humanidades</p>
    </div>
    
    <div>
      {#if !formData.iaActivada}
        <button class="ui-btn ui-btn-secundario" onclick={() => mostrarModalIA = true} style="display: flex; align-items: center; gap: 0.5rem;">
          <span>✨</span> Activar Asistente de IA
        </button>
      {:else if aiState.isInitializing}
        <div style="display: flex; flex-direction: column; align-items: flex-end; width: 240px;">
          <span style="font-size: 0.8rem; font-weight: 600; color: var(--color-texto-secundario); margin-bottom: 2px;">
            Preparando IA ({aiState.progressPercent}%)
          </span>
          <div style="width: 100%; background-color: var(--color-borde); border-radius: 4px; overflow: hidden;">
            <div style="height: 5px; background-color: var(--color-primario); width: {aiState.progressPercent}%; transition: width 0.2s;"></div>
          </div>
        </div>
      {:else if aiState.isReady}
        <span style="font-size: 0.9rem; color: #4CAF50; font-weight: bold; display: flex; align-items: center; gap: 0.5rem;">
          <span>✓</span> Asistente de IA Listo
        </span>
      {/if}
    </div>
  </header>

  <nav style="background-color: var(--color-blanco); border-bottom: 1px solid var(--color-borde); padding: 0 2rem; display: flex; gap: 1rem;">
    <button 
      class="ui-tab-btn {herramientaActiva === 'consentimiento' ? 'activo' : ''}" 
      style="padding: 1rem 0.5rem; border-bottom-width: 3px;"
      onclick={() => herramientaActiva = 'consentimiento'}
    >
      Consentimiento Informado
    </button>
    <button 
      class="ui-tab-btn {herramientaActiva === 'politica' ? 'activo' : ''}" 
      style="padding: 1rem 0.5rem; border-bottom-width: 3px;"
      onclick={() => herramientaActiva = 'politica'}
    >
      Política de Tratamiento de Datos
    </button>
  </nav>

  {#if herramientaActiva === 'consentimiento'}
    <div class="layout-pantalla-dividida">
      <section class="panel-interfaz">
        <div class="ui-tabs">
          <button onclick={() => pasoActual = 1} class="ui-tab-btn {pasoActual === 1 ? 'activo' : ''}">1. General</button>
          <button onclick={() => pasoActual = 2} class="ui-tab-btn {pasoActual === 2 ? 'activo' : ''}">2. Metodología</button>
          <button onclick={() => pasoActual = 3} class="ui-tab-btn {pasoActual === 3 ? 'activo' : ''}">3. Riesgos</button>
        </div>

        <div style="padding: 2rem; flex: 1;">
          {#if pasoActual === 1} <Step1General />
          {:else if pasoActual === 2} <Step2Methodology />
          {:else if pasoActual === 3} <Step3Risks />
          {/if}
        </div>
        
        <div style="display: flex; justify-content: space-between; padding: 1rem 2rem; border-top: 1px solid var(--color-borde); background: #fafafa;">
          <button class="ui-btn ui-btn-secundario" disabled={pasoActual === 1} onclick={() => pasoActual--}>Atrás</button>
          <button class="ui-btn ui-btn-primario" disabled={pasoActual === 3} onclick={() => pasoActual++}>Siguiente</button>
        </div>
      </section>

      <section class="panel-fondo-previa">
        <div style="width: 100%; max-width: 800px; display: flex; justify-content: space-between; margin: 0 auto 1rem auto; align-items: center;">
          <strong>Vista Previa del Documento</strong>
          <div style="display: flex; gap: 0.5rem;">
            <button class="ui-btn ui-btn-primario" onclick={copiarTexto}>Copiar</button>
            <button class="ui-btn ui-btn-primario" onclick={exportarWord}>Word</button>
            <button class="ui-btn ui-btn-primario" onclick={imprimirPDF}>PDF</button>
          </div>
        </div>
        
        <div class="doc-papel" id="documento-exportable">
          <PlantillaConsentimiento />
        </div>
      </section>
    </div>
  
  {:else if herramientaActiva === 'politica'}
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; padding: 4rem; background-color: var(--color-fondo);">
      <h2 style="color: var(--color-texto-secundario);">Generador de Política de Tratamiento de Datos</h2>
      <p style="color: var(--color-texto-secundario);">Este módulo está en construcción y se agregará próximamente a la suite.</p>
    </div>
  {/if}

  {#if mostrarModalIA}
    <div class="ui-modal-overlay">
      <div class="ui-modal-content">
        <h3 class="ui-modal-titulo"><span>✨</span> Asistencia de Redacción Inteligente</h3>
        <p style="font-size: 0.95rem; line-height: 1.5; color: var(--color-texto-secundario); margin-bottom: 1rem;">
          Esta herramienta utiliza Inteligencia Artificial local para ayudarle a redactar los textos con el tono formal adecuado para el comité de ética.
        </p>
        
        <p style="font-size: 0.9rem; line-height: 1.5; color: var(--color-alerta); background-color: var(--color-alerta-fondo); padding: 0.8rem; border-radius: 4px; margin-bottom: 1rem; border: 1px solid #ebccd1;">
          <strong>Importante:</strong> Como cualquier modelo de lenguaje, la IA puede omitir información, alterar el sentido original o cometer errores de redacción. Por favor, <strong>revise y valide siempre</strong> el texto generado antes de exportar el documento definitivo.
        </p>

        <p style="font-size: 0.95rem; line-height: 1.5; color: var(--color-texto-secundario); margin-bottom: 1rem;">
          <strong>Privacidad total:</strong> Los datos nunca salen de su computador. Para lograr esto, su navegador descargará un motor de IA por única vez (aprox. 800 MB).
        </p>
        <div class="ui-modal-acciones">
          <button class="ui-btn ui-btn-secundario" onclick={() => mostrarModalIA = false}>Cancelar</button>
          <button class="ui-btn ui-btn-primario" onclick={aceptarIA}>Entendido, activar IA</button>
        </div>
      </div>
    </div>
  {/if}
</main>