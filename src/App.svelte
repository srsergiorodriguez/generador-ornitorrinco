<script>
  import { 
    formData, aiState, initGlobalEngine, validarComoConsejero, 
    cargarDelNavegador, exportarProyectoJSON, importarProyectoJSON,
    autocompletarDesdePlatypus, llenarDatosPruebaPlatypus
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
  let datosCargados = $state(false); 

  onMount(() => {
    cargarDelNavegador();
    formData.iaActivada = false;
    datosCargados = true; 
  });

  $effect(() => {
    if (datosCargados) {
      localStorage.setItem('eticaSuite_backup', JSON.stringify(formData));
    }
  });

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

  function nuevoProyecto() {
    const confirmar = confirm("¿Está seguro de que desea iniciar un nuevo proyecto? Se perderán todos los datos que no haya guardado en un archivo .json.");
    if (confirmar) {
      localStorage.removeItem('eticaSuite_backup');
      window.location.reload();
    }
  }
</script>

<main class="layout-pantalla-completa">
  <header class="layout-encabezado">
    <div>
      <h1 class="header-titulo">Suite de Ética de Investigación</h1>
      <p class="header-subtitulo">Facultad de Artes y Humanidades</p>
    </div>
    
    <div class="ui-grupo-acciones">

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
        <div class="ai-progreso-contenedor">
          <span class="ai-progreso-texto">Preparando IA ({aiState.progressPercent}%)</span>
          <div class="ai-progreso-fondo">
            <div class="ai-progreso-barra" style="width: {aiState.progressPercent}%;"></div>
          </div>
        </div>
      {:else if aiState.isReady}
        <span class="ai-listo-texto">Asistente IA Listo</span>
      {/if}

      <button class="ui-btn ui-btn-dev" onclick={llenarDatosPruebaPlatypus} title="Rellenar Platypus con datos de prueba">
        Dev: Cargar Prueba
      </button>

      <button class="ui-btn ui-btn-secundario" onclick={nuevoProyecto} title="Limpiar todo e iniciar un proyecto en blanco">
        Nuevo Proyecto
      </button>

      <button class="ui-btn ui-btn-secundario" onclick={exportarProyectoJSON} title="Descargar archivo JSON del proyecto">
        Guardar
      </button>
      
      <label class="ui-btn ui-btn-secundario" style="margin: 0; cursor: pointer;" title="Cargar archivo JSON de un proyecto anterior">
        Abrir
        <input type="file" accept=".json" style="display: none;" onchange={importarProyectoJSON} />
      </label>
    </div>
  </header>

  {#if mostrarGuia}
    <InstructionsPanel cerrarGuia={() => mostrarGuia = false} />
  {/if}

  <nav class="layout-nav">
    <button class="ui-tab-btn {herramientaActiva === 'platypus' ? 'activo' : ''}" onclick={() => herramientaActiva = 'platypus'}>
      Asistente Platypus
    </button>
    <button class="ui-tab-btn {herramientaActiva === 'consentimiento' ? 'activo' : ''}" onclick={() => herramientaActiva = 'consentimiento'}>
      Consentimiento y Asentimiento
    </button>
    <button class="ui-tab-btn {herramientaActiva === 'politica' ? 'activo' : ''}" onclick={() => herramientaActiva = 'politica'}>
      Política de Datos
    </button>
  </nav>

  <div class="layout-pantalla-dividida">
    <section class="panel-interfaz">
      
      {#if herramientaActiva === 'platypus'}
        <div class="ui-tabs">
          <button class="ui-tab-btn activo">Formulario Institucional</button>
        </div>
        <div class="panel-contenido">
          <Step5Platypus />
        </div>

      {:else if herramientaActiva === 'consentimiento'}
        <div class="ui-tabs">
          <button onclick={() => pasoActual = 1} class="ui-tab-btn {pasoActual === 1 ? 'activo' : ''}">1. General</button>
          <button onclick={() => pasoActual = 2} class="ui-tab-btn {pasoActual === 2 ? 'activo' : ''}">2. Metodología</button>
          <button onclick={() => pasoActual = 3} class="ui-tab-btn {pasoActual === 3 ? 'activo' : ''}">3. Riesgos</button>
        </div>

        {#if formData.iaActivada && aiState.isReady && formData.habilitarSincronizacion}
          <div class="ui-banner">
            <div class="ui-banner-contenido">
              <strong class="ui-banner-titulo">Sincronización Inteligente</strong>
              <span class="ui-banner-texto">Utilice los datos del borrador de Platypus para redactar automáticamente este documento.</span>
            </div>
            <button class="ui-btn ui-btn-primario ui-btn-sm" onclick={() => autocompletarDesdePlatypus('consentimiento')} disabled={aiState.isGenerating}>
              {aiState.isGenerating ? 'Generando...' : 'Autocompletar'}
            </button>
          </div>
        {/if}

        <div class="panel-contenido">
          {#if pasoActual === 1} <Step1General />
          {:else if pasoActual === 2} <Step2Methodology />
          {:else if pasoActual === 3} <Step3Risks />
          {/if}
        </div>
        <div class="panel-footer-navegacion">
          <button class="ui-btn ui-btn-secundario" disabled={pasoActual === 1} onclick={() => pasoActual--}>Atrás</button>
          <button class="ui-btn ui-btn-primario" disabled={pasoActual === 3} onclick={() => pasoActual++}>Siguiente</button>
        </div>

      {:else if herramientaActiva === 'politica'}
        <div class="ui-tabs">
          <button class="ui-tab-btn activo">Definición de Tratamiento</button>
        </div>

        {#if formData.iaActivada && aiState.isReady && formData.habilitarSincronizacion}
          <div class="ui-banner">
            <div class="ui-banner-contenido">
              <strong class="ui-banner-titulo">Sincronización Inteligente</strong>
              <span class="ui-banner-texto">Utilice los datos de Platypus para redactar los artículos de esta política.</span>
            </div>
            <button class="ui-btn ui-btn-primario ui-btn-sm" onclick={() => autocompletarDesdePlatypus('politica')} disabled={aiState.isGenerating}>
              {aiState.isGenerating ? 'Generando...' : 'Autocompletar'}
            </button>
          </div>
        {/if}

        <div class="panel-contenido">
          <Step4DataPolicy />
        </div>
      {/if}
    </section>

    <section class="panel-fondo-previa">
      <div class="preview-header">
        
        {#if herramientaActiva === 'consentimiento'}
          <div class="preview-tabs-container">
            <button class="ui-btn ui-btn-sm {vistaDocumentoActual === 'consentimiento' ? 'ui-btn-primario' : 'ui-btn-secundario'}" onclick={() => vistaDocumentoActual = 'consentimiento'}>
              (Consentimiento) Adultos
            </button>
            <button class="ui-btn ui-btn-sm {vistaDocumentoActual === 'asentimiento' ? 'ui-btn-primario' : 'ui-btn-secundario'}" onclick={() => vistaDocumentoActual = 'asentimiento'}>
              (Asentimiento) Menores
            </button>
          </div>
        {:else if herramientaActiva === 'platypus'}
          <strong>Borrador Plataforma Platypus</strong>
        {:else}
          <strong>Vista Previa del Documento</strong>
        {/if}

        <div class="ui-grupo-acciones">
          {#if formData.iaActivada && aiState.isReady}
            <button class="ui-btn ui-btn-consejero ui-btn-sm" onclick={abrirConsejeria}>Consejero IA</button>
            <div class="ui-separador-vertical"></div>
          {/if}
          <button class="ui-btn ui-btn-primario ui-btn-sm" onclick={copiarTexto}>Copiar</button>
          <button class="ui-btn ui-btn-primario ui-btn-sm" onclick={exportarWord}>Word</button>
          <button class="ui-btn ui-btn-primario ui-btn-sm" onclick={imprimirPDF}>PDF</button>
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
        <p class="ui-modal-texto">
          Esta herramienta utiliza Inteligencia Artificial local para ayudarle a redactar los textos con el tono formal adecuado para el comité de ética.
        </p>
        <p class="ui-modal-alerta">
          <strong>Importante:</strong> Como cualquier modelo de lenguaje, la IA puede omitir información, alterar el sentido original o cometer errores de redacción. Por favor, <strong>revise y valide siempre</strong> el texto generado antes de exportar el documento definitivo.
        </p>
        <p class="ui-modal-texto">
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