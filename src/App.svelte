<script>
  import { 
    formData, aiState, initGlobalEngine, validarComoConsejero, 
    cargarDelNavegador, exportarProyectoJSON, importarProyectoJSON 
  } from './state/formStore.svelte.js';
  import { onMount } from 'svelte';
  
  import Step1General from './components/forms/Step1_General.svelte';
  import Step2Methodology from './components/forms/Step2_Methodology.svelte';
  import Step3Risks from './components/forms/Step3_Risks.svelte';
  import Step4DataPolicy from './components/forms/Step4_DataPolicy.svelte';
  import Step5Platypus from './components/forms/Step5_Platypus.svelte';
  
  import PlantillaConsentimiento from './components/templates/Consentimiento.svelte';
  import PlantillaAsentimiento from './components/templates/Asentimiento.svelte';
  import PlantillaPolitica from './components/templates/PoliticaDatos.svelte';
  import PlantillaPlatypus from './components/templates/PlantillaPlatypus.svelte';

  import Glosario from './components/ui/Glosario.svelte';
  import InstructionsPanel from './components/ui/InstructionsPanel.svelte';
  import ValidationModal from './components/ui/ValidationModal.svelte';

  let herramientaActiva = $state('platypus');
  let pasoActual = $state(1);
  let mostrarModalIA = $state(false);
  let mostrarGuia = $state(false);
  let mostrarGlosario = $state(false);
  let mostrarModalValidacion = $state(false);

  let vistaDocumentoActual = $state('consentimiento');
  let datosCargados = $state(false); // Bandera para evitar que el autoguardado borre los datos al inicio

  // 1. Cargar datos al iniciar
  onMount(() => {
    cargarDelNavegador();
    datosCargados = true; // Habilita el autoguardado solo después de cargar
  });

  // 2. Autoguardado reactivo y seguro
  $effect(() => {
    if (datosCargados) {
      localStorage.setItem('eticaSuite_backup', JSON.stringify(formData));
    }
  });

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
    
    let sufijo = 'Documento';
    if (herramientaActiva === 'consentimiento') sufijo = 'Consentimiento';
    else if (herramientaActiva === 'politica') sufijo = 'PoliticaDatos';
    else if (herramientaActiva === 'platypus') sufijo = 'Borrador_Platypus';

    const nombreBase = formData.tituloProyecto ? formData.tituloProyecto.replace(/\s+/g, '_') : 'Proyecto';
    enlace.download = `${nombreBase}_${sufijo}.doc`;
    
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

  function abrirConsejeria() {
    mostrarModalValidacion = true;
    validarComoConsejero(herramientaActiva);
  }
</script>

<main class="layout-pantalla-completa">
  <header class="layout-encabezado" style="display: flex; justify-content: space-between; align-items: center; border-bottom: none;">
    <div>
      <h1 style="font-size: 1.4rem; margin-bottom: 0.2rem;">Suite de Ética de Investigación</h1>
      <p style="color: var(--color-texto-secundario); font-size: 0.9rem; margin-bottom: 0;">Facultad de Artes y Humanidades</p>
    </div>
    
    <div style="display: flex; gap: 0.5rem; align-items: center;">

      <button class="ui-btn ui-btn-secundario" onclick={() => mostrarGuia = true}>
        Instrucciones
      </button>

      <button class="ui-btn ui-btn-secundario" onclick={() => mostrarGlosario = true}>
        Glosario
      </button>

      {#if !formData.iaActivada}
        <button class="ui-btn ui-btn-secundario" onclick={() => mostrarModalIA = true}>
          Activar Asistente IA
        </button>
      {:else if aiState.isInitializing}
        <div style="display: flex; flex-direction: column; align-items: flex-end; width: 200px; margin-left: 0.5rem;">
          <span style="font-size: 0.8rem; font-weight: 600; color: var(--color-texto-secundario); margin-bottom: 2px;">
            Preparando IA ({aiState.progressPercent}%)
          </span>
          <div style="width: 100%; background-color: var(--color-borde); border-radius: 4px; overflow: hidden;">
            <div style="height: 5px; background-color: var(--color-primario); width: {aiState.progressPercent}%; transition: width 0.2s;"></div>
          </div>
        </div>
      {:else if aiState.isReady}
        <span style="font-size: 0.9rem; color: #4CAF50; font-weight: bold; margin-left: 0.5rem;">
          Asistente IA Listo
        </span>
      {/if}


      <button class="ui-btn ui-btn-secundario" onclick={exportarProyectoJSON} title="Descargar archivo JSON del proyecto">
        Guardar Proyecto
      </button>
      
      <label class="ui-btn ui-btn-secundario" style="margin: 0; cursor: pointer;" title="Cargar archivo JSON de un proyecto anterior">
        Cargar Proyecto
        <input type="file" accept=".json" style="display: none;" onchange={importarProyectoJSON} />
      </label>
    </div>
  </header>

  {#if mostrarGuia}
    <InstructionsPanel cerrarGuia={() => mostrarGuia = false} />
  {/if}

  <nav style="background-color: var(--color-blanco); border-bottom: 1px solid var(--color-borde); padding: 0 2rem; display: flex; gap: 1rem;">
    <button 
      class="ui-tab-btn {herramientaActiva === 'platypus' ? 'activo' : ''}" 
      style="padding: 1rem 0.5rem; border-bottom-width: 3px;"
      onclick={() => herramientaActiva = 'platypus'}
    >
      Asistente Platypus
    </button>
    <button 
      class="ui-tab-btn {herramientaActiva === 'consentimiento' ? 'activo' : ''}" 
      style="padding: 1rem 0.5rem; border-bottom-width: 3px;"
      onclick={() => herramientaActiva = 'consentimiento'}
    >
      Consentimiento y Asentimiento Informado
    </button>
    <button 
      class="ui-tab-btn {herramientaActiva === 'politica' ? 'activo' : ''}" 
      style="padding: 1rem 0.5rem; border-bottom-width: 3px;"
      onclick={() => herramientaActiva = 'politica'}
    >
      Política de Tratamiento de Datos
    </button>
  </nav>

  <div class="layout-pantalla-dividida">
    <section class="panel-interfaz">
      
      {#if herramientaActiva === 'platypus'}
        <div class="ui-tabs">
          <button class="ui-tab-btn activo">Formulario Institucional</button>
        </div>
        <div style="padding: 2rem; flex: 1;">
          <Step5Platypus />
        </div>
      {:else if herramientaActiva === 'consentimiento'}
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
      {:else if herramientaActiva === 'politica'}
        <div class="ui-tabs">
          <button class="ui-tab-btn activo">Definición de Tratamiento</button>
        </div>
        <div style="padding: 2rem; flex: 1;">
          <Step4DataPolicy />
        </div>
      {/if}

    </section>

    <section class="panel-fondo-previa">
      <div style="width: 100%; max-width: 800px; display: flex; justify-content: space-between; margin: 0 auto 1rem auto; align-items: center;">
        
        {#if herramientaActiva === 'consentimiento'}
          <div style="display: flex; gap: 0.5rem; background: var(--color-borde); padding: 0.25rem; border-radius: 6px;">
            <button 
              class="ui-btn {vistaDocumentoActual === 'consentimiento' ? 'ui-btn-primario' : 'ui-btn-secundario'}" 
              style="padding: 0.4rem 0.8rem; font-size: 0.85rem;"
              onclick={() => vistaDocumentoActual = 'consentimiento'}>
              Consentimiento (Adultos)
            </button>
            <button 
              class="ui-btn {vistaDocumentoActual === 'asentimiento' ? 'ui-btn-primario' : 'ui-btn-secundario'}" 
              style="padding: 0.4rem 0.8rem; font-size: 0.85rem;"
              onclick={() => vistaDocumentoActual = 'asentimiento'}>
              Asentimiento (Menores)
            </button>
          </div>
        {:else if herramientaActiva === 'platypus'}
          <strong>Borrador Plataforma Platypus</strong>
        {:else}
          <strong>Vista Previa del Documento</strong>
        {/if}

        <div style="display: flex; gap: 0.5rem; align-items: center;">
          {#if formData.iaActivada && aiState.isReady}
            <button class="ui-btn" style="background-color: #2c3e50; color: white; border: none; font-size: 0.85rem; padding: 0.4rem 0.8rem;" onclick={abrirConsejeria}>
              Consejero IA
            </button>
            <div style="width: 1px; height: 24px; background-color: var(--color-borde); margin: 0 0.5rem;"></div>
          {/if}
          <button class="ui-btn ui-btn-primario" onclick={copiarTexto}>Copiar</button>
          <button class="ui-btn ui-btn-primario" onclick={exportarWord}>Word</button>
          <button class="ui-btn ui-btn-primario" onclick={imprimirPDF}>PDF</button>
        </div>
      </div>
      
      <div class="doc-papel" id="documento-exportable">
        {#if herramientaActiva === 'platypus'}
          <PlantillaPlatypus />
        {:else if herramientaActiva === 'consentimiento'}
          {#if vistaDocumentoActual === 'consentimiento'}
            <PlantillaConsentimiento />
          {:else}
            <PlantillaAsentimiento />
          {/if}
        {:else if herramientaActiva === 'politica'}
          <PlantillaPolitica />
        {/if}
      </div>
    </section>
  </div>

  {#if mostrarModalIA}
    <div class="ui-modal-overlay">
      <div class="ui-modal-content">
        <h3 class="ui-modal-titulo">Asistencia de Redacción Inteligente</h3>
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

  {#if mostrarGlosario}
    <Glosario cerrarGlosario={() => mostrarGlosario = false} />
  {/if}

  {#if mostrarModalValidacion}
    <ValidationModal cerrarModal={() => mostrarModalValidacion = false} />
  {/if}
</main>