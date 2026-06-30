<script>
  import { formData } from '../../state/formStore.svelte.js';
  import AiTextarea from '../ui/AiTextarea.svelte';
  import TemplateSelector from '../ui/TemplateSelector.svelte';
  
  import { 
    plantillasEnfoque, 
    plantillasMetodos, 
    plantillasFases,
    plantillasAlmacenamiento,
    plantillasRetencion,
    plantillasAcceso,
    plantillasContencion 
  } from '../../lib/data/plantillas.js';

  function inyectarTexto(campo, textoPlantilla) {
    formData[campo] = textoPlantilla;
  }
</script>

<div>
  <div style="background: #fafafa; border: 1px solid var(--color-borde); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
    <h3 style="margin-top: 0; margin-bottom: 1rem; color: #333; font-size: 1.1rem;">Descripción del proyecto (Máx 1000 palabras) *</h3>
    
    <div class="ui-form-group" style="margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 1rem;">
        <label class="ui-form-label" style="margin-bottom: 0;">A. Enfoque general</label>
        <TemplateSelector plantillas={plantillasEnfoque} onSelect={(texto) => inyectarTexto('platypusDescEnfoque', texto)} />
      </div>
      <AiTextarea 
        id="platypusEnfoque" 
        bind:value={formData.platypusDescEnfoque} 
        rows={4} 
        placeholder="Seleccione un enfoque estandarizado arriba o describa su paradigma metodológico..."
        instruccionesIA="Redacta un párrafo riguroso explicando exclusivamente el enfoque general y el paradigma metodológico de la investigación." 
      />
    </div>
    
    <div class="ui-form-group" style="margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 1rem;">
        <label class="ui-form-label" style="margin-bottom: 0;">B. Métodos específicos</label>
        <TemplateSelector plantillas={plantillasMetodos} onSelect={(texto) => inyectarTexto('platypusDescMetodos', texto)} />
      </div>
      <AiTextarea 
        id="platypusMetodos" 
        bind:value={formData.platypusDescMetodos} 
        rows={4} 
        placeholder="Seleccione métodos estandarizados arriba o detalle sus instrumentos de recolección..."
        instruccionesIA="Redacta un párrafo detallando los instrumentos y métodos específicos de recolección de información." 
      />
    </div>
    
    <div class="ui-form-group">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 1rem;">
        <label class="ui-form-label" style="margin-bottom: 0;">C. Fases del estudio</label>
        <TemplateSelector plantillas={plantillasFases} onSelect={(texto) => inyectarTexto('platypusDescFases', texto)} />
      </div>
      <AiTextarea 
        id="platypusFases" 
        bind:value={formData.platypusDescFases} 
        rows={3} 
        placeholder="Seleccione la estructura de fases arriba o describa las etapas operativas..."
        instruccionesIA="Redacta de manera clara las etapas o fases operativas del proyecto." 
      />
    </div>
  </div>

  <div style="background: #fafafa; border: 1px solid var(--color-borde); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
    <h3 style="margin-top: 0; margin-bottom: 0.5rem; color: #333; font-size: 1.1rem;">Objetivo general de la propuesta *</h3>
    <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-bottom: 1.5rem;">El sistema unirá estas tres partes en un solo párrafo fluido.</p>
    
    <div class="ui-form-group" style="margin-bottom: 1.5rem;">
      <label class="ui-form-label" style="margin-bottom: 0.5rem; display: block;">A. Acción y Objeto (¿Qué se investigará?)</label>
      <AiTextarea id="platypusObjQue" bind:value={formData.platypusObjQue} rows={2} placeholder="Ej: Analizar las transformaciones del paisaje mortuorio en el sur de Colombia..." instruccionesIA="Mejora este fragmento para que inicie con un verbo en infinitivo. Sé conciso y no pongas punto final." />
    </div>
    
    <div class="ui-form-group" style="margin-bottom: 1.5rem;">
      <label class="ui-form-label" style="margin-bottom: 0.5rem; display: block;">B. Medio (¿Cómo se logrará?)</label>
      <AiTextarea id="platypusObjComo" bind:value={formData.platypusObjComo} rows={2} placeholder="Ej: ...a través de la recopilación de historias orales y revisión de archivos parroquiales..." instruccionesIA="Mejora este fragmento metodológico conectándolo con la palabra 'mediante' o 'a través de'. No pongas punto final." />
    </div>
    
    <div class="ui-form-group">
      <label class="ui-form-label" style="margin-bottom: 0.5rem; display: block;">C. Finalidad (¿Para qué?)</label>
      <AiTextarea id="platypusObjParaQue" bind:value={formData.platypusObjParaQue} rows={2} placeholder="Ej: ...para comprender las dinámicas de memoria colectiva en contextos de conflicto." instruccionesIA="Mejora este fragmento conectándolo con la palabra 'para' o 'con el fin de'. Explica el propósito último de la investigación." />
    </div>
  </div>

  <div style="background: #fafafa; border: 1px solid var(--color-borde); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
    <h3 style="margin-top: 0; margin-bottom: 1rem; color: #333; font-size: 1.1rem;">Protocolo de manejo de datos *</h3>
    
    <div class="ui-form-group" style="margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 1rem;">
        <label class="ui-form-label" style="margin-bottom: 0;">A. Plataforma y almacenamiento</label>
        <TemplateSelector plantillas={plantillasAlmacenamiento} onSelect={(texto) => inyectarTexto('platypusDatosAlmacenamiento', texto)} />
      </div>
      <AiTextarea 
        id="platypusDatosAlm" 
        bind:value={formData.platypusDatosAlmacenamiento} 
        rows={3} 
        placeholder="Seleccione política de plataformas arriba o redacte la suya..."
        instruccionesIA="Redacta formalmente dónde y cómo se almacenarán los datos digitales o físicos de manera segura." 
      />
    </div>
    
    <div class="ui-form-group" style="margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 1rem;">
        <label class="ui-form-label" style="margin-bottom: 0;">B. Tiempo de retención</label>
        <TemplateSelector plantillas={plantillasRetencion} onSelect={(texto) => inyectarTexto('platypusDatosRetencion', texto)} />
      </div>
      <AiTextarea 
        id="platypusDatosRet" 
        bind:value={formData.platypusDatosRetencion} 
        rows={3} 
        placeholder="Seleccione tiempos de retención estandarizados arriba..."
        instruccionesIA="Redacta formalmente cuánto tiempo se conservarán los datos y cuál será su disposición final (ej. eliminación)." 
      />
    </div>
    
    <div class="ui-form-group">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 1rem;">
        <label class="ui-form-label" style="margin-bottom: 0;">C. Acceso y privacidad (Limpieza ética)</label>
        <TemplateSelector plantillas={plantillasAcceso} onSelect={(texto) => inyectarTexto('platypusDatosAcceso', texto)} />
      </div>
      <AiTextarea 
        id="platypusDatosAcc" 
        bind:value={formData.platypusDatosAcceso} 
        rows={4} 
        placeholder="Seleccione protocolos de anonimización o reconocimiento de autoría arriba..."
        instruccionesIA="Redacta formalmente quiénes tendrán acceso a los datos crudos y cómo se anonimizarán o protegerán." 
      />
    </div>
  </div>

  <div style="background: #fafafa; border: 1px solid var(--color-borde); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;">
      <h3 style="margin-top: 0; margin-bottom: 0; color: #333; font-size: 1.1rem;">Contención emocional (Si aplica)</h3>
      <TemplateSelector plantillas={plantillasContencion} onSelect={(texto) => inyectarTexto('platypusContencion', texto)} />
    </div>
    
    <div class="ui-form-group">
      <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-top: 0; margin-bottom: 0.5rem;">
        Seleccione una plantilla estándar si su proyecto lo requiere, y rellene los datos entre corchetes <strong>[ ]</strong>.
      </p>
      <AiTextarea 
        id="platypusContencion" 
        bind:value={formData.platypusContencion} 
        rows={6} 
        placeholder="Describa quién será responsable de brindar apoyo, qué acciones inmediatas se tomarán y cuáles son las rutas institucionales..."
        instruccionesIA="Pule este texto asegurando que suene como un protocolo institucional formal y defensivo, integrando orgánicamente la información que el investigador proporcionó. Mantén las referencias a las rutas de atención." 
      />
    </div>
  </div>

  <div class="ui-form-group">
    <label class="ui-form-label" style="margin-bottom: 0.5rem; display: block;">Toma de muestras biológicas *</label>
    <p style="font-size: 0.85rem; color: var(--color-texto-secundario); margin-bottom: 0.5rem;">Respuesta por defecto para Artes y Humanidades.</p>
    <textarea class="ui-form-input" bind:value={formData.platypusMuestras} rows="2"></textarea>
  </div>
</div>